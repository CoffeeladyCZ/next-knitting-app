import { env } from "../configs/env";
import { API_ROUTES } from "../api/constants";
import type {
  PatternCategoriesResponse,
  PatternResponse,
  YarnResponse,
  PatternDetailResponse,
} from "../api/types";

interface RavelryClientOptions {
  query?: string;
  page?: number;
  pageSize?: number;
}

const getCredentials = () => {
  const username = env.RAVELRY_USERNAME;
  const apiKey = env.RAVELRY_KEY;
  return Buffer.from(`${username}:${apiKey}`).toString("base64");
};

const baseUrl = env.RAVELRY_URL;

async function fetchRavelry<T>(
  endpoint: string,
  queryParams?: Record<string, string>,
): Promise<T> {
  let url = `${baseUrl}/${endpoint}`;

  if (queryParams) {
    const params = new URLSearchParams(queryParams);
    url += `?${params.toString()}`;
  }

  const credentials = getCredentials();

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Ravelry API error: ${response.status}. ${errorBody.substring(0, 100)}`,
    );
  }

  return response.json() as Promise<T>;
}

export async function getPatterns(
  options: RavelryClientOptions = {},
): Promise<PatternResponse> {
  const { query, page = 1, pageSize = 9 } = options;
  const queryParams: Record<string, string> = {
    page: page.toString(),
    page_size: pageSize.toString(),
  };

  if (query) {
    queryParams.query = query;
  }

  return fetchRavelry<PatternResponse>(API_ROUTES.PATTERNS, queryParams);
}

export async function getPatternDetail(
  id: number,
): Promise<PatternDetailResponse> {
  return fetchRavelry<PatternDetailResponse>(
    `${API_ROUTES.PATTERNS_DETAIL}/${id}.json`,
  );
}

export async function getPatternCategories(): Promise<PatternCategoriesResponse> {
  return fetchRavelry<PatternCategoriesResponse>(
    API_ROUTES.PATTERNS_CATEGORIES,
  );
}

export async function getYarns(): Promise<YarnResponse> {
  return fetchRavelry<YarnResponse>(API_ROUTES.YARNS);
}
