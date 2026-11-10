import type { ApiResponse } from "../utilis";
import type { listing, listingpayload } from "../types/listingtype";
import { endpoints } from "../endpoint";
import { apiClient } from "./apiclient";

export async function createlisting(payload: listingpayload): Promise<ApiResponse<listing>> {
  const response = await apiClient.post<ApiResponse<listing>>(
    endpoints.listingcategory.createlisting,
    payload,
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
): Promise<ApiResponse<listing>> {
  const response = await apiClient.patch<ApiResponse<listing>>(
    endpoints.listingcategory.updatelisting(id),
    payload,
  );
  return response.data;
}

export async function deletelisting(id: string): Promise<ApiResponse<{ id: string }>> {
  const response = await apiClient.delete<ApiResponse<{ id: string }>>(
    endpoints.listingcategory.deletelisting(id),
  );
  return response.data;
}
