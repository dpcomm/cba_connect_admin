import axios from "axios";
import { BASE_URL, REQUEST_TIMEOUT_MS } from "./config";
import {
    authTokenRequestInterceptor,
    createResponseErrorInterceptor,
    responseSuccessInterceptor,
} from "./interceptors";

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
});

// 만든 인터셉터 장착
apiClient.interceptors.request.use(authTokenRequestInterceptor);
apiClient.interceptors.response.use(
  responseSuccessInterceptor,
  // 에러 인터셉터는 apiClient 인스턴스(재요청용)를 주입해서 생성
  createResponseErrorInterceptor(apiClient),
);
