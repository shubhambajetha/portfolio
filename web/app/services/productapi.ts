import type { ApiResponse } from "../utilis";
import type { listing, listingpayload } from "../types/listingtype";
import { endpoints } from "../endpoint";
import { apiClient } from "./apiclient";

function listingRequestBody(payload: Partial<listingpayload>, thumbnailFile?: File, galleryFiles: File[] = []): listingpayload | FormData {
  if (!thumbnailFile && galleryFiles.length === 0) return payload as listingpayload;

  const body = new FormData();
  for (const [key, value] of Object.entries(payload)) {
    if (value !== undefined && value !== null) {
      body.append(key, Array.isArray(value) ? JSON.stringify(value) : String(value));
    }
  }
  if (thumbnailFile) body.append("thumbnailFile", thumbnailFile);
  galleryFiles.forEach((file) => body.append("galleryFiles", file));
  return body;
}

export async function createlisting(payload: listingpayload, thumbnailFile?: File, galleryFiles?: File[]): Promise<ApiResponse<listing>> {
  const body = listingRequestBody(payload, thumbnailFile, galleryFiles);
  const response = await apiClient.post<ApiResponse<listing>>(
    endpoints.listingcategory.createlisting,
    body,
    body instanceof FormData ? { headers: { "Content-Type": "multipart/form-data" } } : undefined,
  );
  return response.data;
}

export async function getalllistings(): Promise<ApiResponse<listing[]>> {
  const response = await apiClient.get<ApiResponse<listing[]>>(
    endpoints.listingcategory.getlisting,
  );
  return response.data;
}

export async function getsinglelisting(id: string): Promise<ApiResponse<listing>> {
  const response = await apiClient.get<ApiResponse<listing>>(
    endpoints.listingcategory.getsinglelisting(id),
  );
  return response.data;
}

export async function updatelisting(
  id: string,
  payload: Partial<listingpayload>,
  thumbnailFile?: File,
  galleryFiles?: File[],
): Promise<ApiResponse<listing>> {
  const body = listingRequestBody(payload, thumbnailFile, galleryFiles);
  const response = await apiClient.patch<ApiResponse<listing>>(
    endpoints.listingcategory.updatelisting(id),
    body,
    body instanceof FormData ? { headers: { "Content-Type": "multipart/form-data" } } : undefined,
  );
  return response.data;
}

export async function deletelisting(id: string): Promise<ApiResponse<{ id: string }>> {
  const response = await apiClient.delete<ApiResponse<{ id: string }>>(
    endpoints.listingcategory.deletelisting(id),
  );
  return response.data;
}
