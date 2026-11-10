import { endpoints } from "../endpoint";
import type { ApiResponse } from "../utilis";
import { apiClient } from "./apiclient";

export type ExperiencePayload = {
  title: string;
  subtitle: string;
  timeDate: string;
  endtimedate: string;
  description: string;
};

export type Experience = ExperiencePayload & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export async function createexperience(
  payload: ExperiencePayload,
): Promise<ApiResponse<Experience>> {
  const response = await apiClient.post<ApiResponse<Experience>>(
    endpoints.experince.createexperience,
    payload,
  );
  return response.data;
}

export async function getallexperience(): Promise<ApiResponse<Experience[]>> {
  const response = await apiClient.get<ApiResponse<Experience[]>>(
    endpoints.experince.getallexperience,
  );
  return response.data;
}

export async function updateexperience(
  id: string,
  payload: Partial<ExperiencePayload>,
): Promise<ApiResponse<Experience>> {
  const response = await apiClient.patch<ApiResponse<Experience>>(
    endpoints.experince.updateexperience(id),
    payload,
  );
  return response.data;
}

export async function deleteexperience(id: string): Promise<ApiResponse<Experience>> {
  const response = await apiClient.delete<ApiResponse<Experience>>(
    endpoints.experince.deleteexperience(id),
  );
  return response.data;
}
