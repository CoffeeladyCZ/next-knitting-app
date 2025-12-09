import type {
  PatternCategoriesResponse,
  PatternResponse,
  YarnResponse,
  PatternDetailResponse,
} from "./types";

async function fetchFromApi<T>(
  endpoint: string,
  queryParams?: Record<string, string>
): Promise<T> {
  let url = endpoint;

  if (queryParams) {
    const params = new URLSearchParams(queryParams);
    url += `?${params.toString()}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}. Message: ${errorBody.substring(0, 100)}...`
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("Error calling API route:", (error as Error).message);
    throw error as Error;
  }
}

export const getPatternCategories =
  async (): Promise<PatternCategoriesResponse> => {
    return fetchFromApi<PatternCategoriesResponse>("/api/ravelry/categories");
  };

export const getYarns = async (): Promise<YarnResponse> => {
  return fetchFromApi<YarnResponse>("/api/ravelry/yarns");
};

export const getPatterns = async (
  query?: string,
  page: number = 1,
  pageSize: number = 9,
): Promise<PatternResponse> => {
  const queryParams: Record<string, string> = {
    page: page.toString(),
    page_size: pageSize.toString(),
  };
  if (query) {
    queryParams.query = query;
  }
  return fetchFromApi<PatternResponse>("/api/ravelry/patterns", queryParams);
};

export const getPatternDetail = async (
  id: number,
): Promise<PatternDetailResponse> => {
  return fetchFromApi<PatternDetailResponse>(`/api/ravelry/patterns/${id}`);
};

