import { apiClient, ApiResponse } from "./client";
import { API_PREFIX } from "./config";

export interface SystemConfig {
  application: {
    name: string;
    versionName: string;
    versionCode: number;
  };
  consents: {
    privacyPolicy: {
      url: string;
      version: number;
    };
  };
  currentTermId: number;
  currentRetreatId: number;
}

export interface ScanResultDto {
  userId: string;
  name: string;
  phone: string;
  group: string;
  feePaid: boolean;
  checkedInAt: string | null;
  notes?: string;
}

export type ApplicationFilterType =
  | "ALL"
  | "NOT_CHECKED_IN"
  | "FEE_UNPAID"
  | "EVENT_WIN";

export interface ApplicationListItem {
  userId: string;
  name: string;
  phone: string;
  feePaid: boolean;
  checkedInAt: string | null;
  groupName?: string;
  notes?: string;
}

export interface ApplicationListResponse {
  items: ApplicationListItem[];
  total: number;
  page: number;
  pageSize: number;
}

export const adminApi = {
  getSystemConfig: async () => {
    const response = await apiClient.get<ApiResponse<SystemConfig>>(
      `${API_PREFIX}/system`,
    );
    return response.data.data;
  },

  scanUser: async (userId: string, retreatId: number) => {
    const response = await apiClient.get<ApiResponse<ScanResultDto>>(
      `${API_PREFIX}/application/admin/scan/${userId}/${retreatId}`,
    );
    return response.data.data;
  },

  checkIn: async (userId: string, retreatId: number) => {
    const response = await apiClient.post<ApiResponse<void>>(
      `${API_PREFIX}/application/admin/check-in`,
      { userId, retreatId: Number(retreatId) },
    );
    return response.data;
  },

  getApplicationList: async (
    retreatId: number,
    search?: string,
    filter?: ApplicationFilterType,
    page?: number,
  ) => {
    const params = new URLSearchParams();
    params.append("retreatId", retreatId.toString());
    if (search) params.append("search", search);
    if (filter && filter !== "ALL") params.append("filter", filter);
    if (page) params.append("page", page.toString());

    const url = `${API_PREFIX}/application/admin/list?${params.toString()}`;
    console.log("🔍 API Request URL:", url);
    console.log("🔍 Filter value:", filter);

    const response =
      await apiClient.get<
        ApiResponse<ApplicationListResponse | ApplicationListItem[]>
      >(url);

    console.log("✅ API Response:", JSON.stringify(response.data, null, 2));

    const data = response.data.data;

    // Handle both array response and paginated response
    if (Array.isArray(data)) {
      return {
        items: data,
        total: data.length,
        page: 1,
        pageSize: data.length,
      };
    }

    return data;
  },
};
