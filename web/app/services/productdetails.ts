import { endpoints } from "../endpoint";
import type { ApiResponse } from "../utilis";
import { apiClient } from "./apiclient";

export type ProjectDetailsPayload = {
  overview?: string;
  problemStatement?: string;
  solution?: string;
  features?: string[];
  challenges?: string;
  architecture?: string;
  role?: string;
  duration?: string;
};

export type ProjectDetails = ProjectDetailsPayload & {
  id: string;
  projectListingId: string;
  projectListing?: { title: string; slug: string };
  createdAt: string;
  updatedAt: string;
};

export async function createdetails(
  projectListingId: string,
  payload: ProjectDetailsPayload,
): Promise<ApiResponse<ProjectDetails>> {
  const response = await apiClient.post<ApiResponse<ProjectDetails>>(
    endpoints.detailscategory.createdeatils(projectListingId),
    payload,
  );
  return response.data;
}

export async function getdetails(
  projectListingId: string,
): Promise<ApiResponse<ProjectDetails>> {
  const response = await apiClient.get<ApiResponse<ProjectDetails>>(
    endpoints.detailscategory.getdeatils(projectListingId),
  );
  return response.data;
}

export async function getalldetails(): Promise<ApiResponse<ProjectDetails[]>> {
  const response = await apiClient.get<ApiResponse<ProjectDetails[]>>(
    endpoints.detailscategory.getalldeatils,
  );
  return response.data;
}

export async function updatedetails(
  projectListingId: string,
  payload: ProjectDetailsPayload,
): Promise<ApiResponse<ProjectDetails>> {
  const response = await apiClient.patch<ApiResponse<ProjectDetails>>(
    endpoints.detailscategory.updatedetails(projectListingId),
    payload,
  );
  return response.data;
}

export async function deletedetails(
  projectListingId: string,
): Promise<ApiResponse<unknown>> {
  const response = await apiClient.delete<ApiResponse<unknown>>(
    endpoints.detailscategory.deletedeatils(projectListingId),
  );
  return response.data;
}
