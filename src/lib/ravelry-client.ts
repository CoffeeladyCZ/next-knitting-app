import { env } from "@/configs/env";
import { API_ROUTES } from "@/api/constants";
import type {
  PatternCategoriesResponse,
  PatternResponse,
  YarnResponse,
  PatternDetailResponse,
  PatternCommentsResponse,
  ProjectResponse,
} from "@/api/types";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";

interface RavelryClientOptions {
  query?: string;
  page?: number;
  pageSize?: number;
}
const getAccessToken = async (): Promise<string | null> => {
  try {
    const tokens = await auth.api.getAccessToken({
      body: { providerId: "ravelry" },
      headers: await headers(),
    });
    if (!tokens) return null;

    return tokens.accessToken;
  } catch (error) {
    console.error("Failed to get access token:", error);
    return null;
  }
};

const baseUrl = env.RAVELRY_URL;

async function fetchRavelry<T>(
  endpoint: string,
  queryParams?: Record<string, string>,
): Promise<T> {
  const token = await getAccessToken();

  if (!token) {
    const error = new Error("Uživatel není přihlášen k Ravelry.") as Error & {
      statusCode?: number;
    };
    error.statusCode = 401;
    throw error;
  }

  const cleanBaseUrl = baseUrl.replace(/\/$/, "");
  const cleanEndpoint = endpoint.replace(/^\//, "");
  let url = `${cleanBaseUrl}/${cleanEndpoint}`;

  if (queryParams) {
    const params = new URLSearchParams(queryParams);
    url += `?${params.toString()}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    const error = new Error(
      `Ravelry API error: ${response.status}. ${errorBody.substring(0, 100)}`,
    ) as Error & { statusCode?: number };
    error.statusCode = response.status;
    throw error;
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

export async function getPatternComments(
  id: number,
): Promise<PatternCommentsResponse> {
  return fetchRavelry<PatternCommentsResponse>(
    `${API_ROUTES.PATTERNS_COMMENTS}/${id}/comments.json`,
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

export async function getProjects(username: string): Promise<ProjectResponse> {
  const endpoint = API_ROUTES.PROJECTS_LIST.replace("{username}", username);
  return fetchRavelry<ProjectResponse>(endpoint);
}
