import AsyncStorage from "@react-native-async-storage/async-storage";
import type {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import * as SecureStore from "expo-secure-store";
import { API_PREFIX } from "./config";

// 자동 로그인 설정 키
const AUTO_LOGIN_KEY = "auto_login_enabled";

// 토큰 갱신 중인지 체크하는 플래그
let isRefreshing = false;

// 토큰 갱신 중에 들어온 요청들을 대기시키는 큐
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

// 큐에 쌓인 요청들을 처리하는 함수 (성공 시 token 전달, 실패 시 error 전달)
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (token) {
      promise.resolve(token);
    } else {
      promise.reject(error);
    }
  });
  failedQueue = [];
};

// [1] 요청 인터셉터: API 요청 보낼 때 토큰이 있으면 헤더에 실어 보냄
export async function authTokenRequestInterceptor(
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> {
  // 이미 Authorization 헤더가 있다면(예: refresh 요청 등) 건드리지 않음
  if (config.headers?.Authorization) {
    return config;
  }
  const accessToken = await SecureStore.getItemAsync("access_token");
  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}

// [2] 응답 성공 인터셉터: 성공은 그대로 통과
export function responseSuccessInterceptor<T>(
  response: AxiosResponse<T>,
): AxiosResponse<T> {
  return response;
}

// [3] 응답 에러 인터셉터: 401 발생 시 토큰 갱신 시도
export function createResponseErrorInterceptor(apiClient: AxiosInstance) {
  return async function responseErrorInterceptor(
    error: AxiosError<{ message?: string }>,
  ): Promise<unknown> {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 401 에러이고, 아직 재시도하지 않은 요청인 경우에만 진입
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 로그인, 리프레시, 로그아웃 요청에서 401이 나면 갱신 시도 없이 바로 에러 처리 (무한 루프 방지)
      if (
        originalRequest.url?.includes(`${API_PREFIX}/auth/login`) ||
        originalRequest.url?.includes(`${API_PREFIX}/auth/refresh`) ||
        originalRequest.url?.includes(`${API_PREFIX}/auth/logout`)
      ) {
        return Promise.reject(error);
      }

      // 이미 누군가가 토큰 갱신을 진행 중이라면 -> 큐에 줄 서서 기다리기
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          // 큐가 풀리고 새 토큰을 받으면 헤더 갈아끼우고 재요청
          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
          } else {
            originalRequest.headers = {
              Authorization: `Bearer ${token}`,
            } as any;
          }
          return apiClient(originalRequest);
        });
      }

      // 깃발 꽂고 내가 총대 메고 갱신 시작
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await SecureStore.getItemAsync("refresh_token");
        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        // 토큰 갱신 API 호출
        const response = await apiClient.post(
          `${API_PREFIX}/auth/refresh`,
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } },
        );

        const newAccessToken = response.data.data.access_token;

        // 새 토큰 저장
        await SecureStore.setItemAsync("access_token", newAccessToken);

        // 기다리던 요청들에게 새 토큰 배급
        processQueue(null, newAccessToken);

        // 나(첫번째 401난 요청)도 새 토큰 달고 재시도
        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        } else {
          originalRequest.headers = {
            Authorization: `Bearer ${newAccessToken}`,
          } as any;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        // 갱신 실패 시: 대기하던 요청들 전부 에러 처리 및 로그아웃 처리
        processQueue(refreshError, null);
        await SecureStore.deleteItemAsync("access_token");
        await SecureStore.deleteItemAsync("refresh_token");
        await AsyncStorage.removeItem(AUTO_LOGIN_KEY);
        return Promise.reject(refreshError);
      } finally {
        // 갱신 상태 해제
        isRefreshing = false;
      }
    }

    // 401 외의 다른 에러는 그냥 던짐
    return Promise.reject(error);
  };
}
