import * as SecureStore from "expo-secure-store";
import { apiClient, ApiResponse } from "./client";
import { API_PREFIX } from "./config";

export interface LoginRequestDto {
  userId: string;
  password: string;
}

export interface AuthResponseDto {
  access_token: string;
  refresh_token: string;
  user: any; // Simplified for now
}

export const authApi = {
  login: async (dto: LoginRequestDto) => {
    const response = await apiClient.post<ApiResponse<AuthResponseDto>>(
      `${API_PREFIX}/auth/login`,
      dto,
    );
    const { access_token, refresh_token, user } = response.data.data;
    await SecureStore.setItemAsync("access_token", access_token);
    await SecureStore.setItemAsync("refresh_token", refresh_token);
    return user;
  },

  logout: async () => {
    try {
      await apiClient.post(`${API_PREFIX}/auth/logout`);
    } finally {
      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("refresh_token");
    }
  },

  getMe: async () => {
    const response = await apiClient.get<ApiResponse<any>>(
      `${API_PREFIX}/users/me`,
    );
    if (!response.data) {
      throw new Error("Invalid response from server");
    }
    return response.data.data;
  },
};
