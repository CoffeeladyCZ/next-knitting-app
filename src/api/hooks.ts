import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./constants";
import {
  getPatterns,
  getPatternCategories,
  getYarns,
  getPatternDetail,
  getPatternComments,
  getProjects,
} from "./queries";

export const useGetPatterns = (
  query?: string,
  page: number = 1,
  pageSize: number = 9,
) =>
  useQuery({
    queryFn: () => getPatterns(query, page, pageSize),
    queryKey: [QUERY_KEYS.LIST, query, page, pageSize],
    enabled: true,
  });

export const useGetYarns = () =>
  useQuery({
    queryFn: getYarns,
    queryKey: [QUERY_KEYS.YARNS],
  });

export const useGetPatternsCategories = () =>
  useQuery({
    queryFn: getPatternCategories,
    queryKey: [QUERY_KEYS.PATTERNS_CATEGORIES],
  });

export const useGetPatternDetail = (id: number) =>
  useQuery({
    queryFn: () => getPatternDetail(id),
    queryKey: [QUERY_KEYS.PATTERNS_DETAIL, id],
  });

export const useGetPatternComments = (id: number) =>
  useQuery({
    queryFn: () => getPatternComments(id),
    queryKey: [QUERY_KEYS.PATTERNS_COMMENTS, id],
  });

export const useGetProjects = (username: string) =>
  useQuery({
    queryFn: () => getProjects(username),
    queryKey: [QUERY_KEYS.PROJECTS_LIST, username],
    enabled: !!username,
  });
