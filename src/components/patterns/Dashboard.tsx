"use client";

import { Search } from "lucide-react";
import { useGetPatterns } from "../../api/hooks";
import { PatternCard } from "./PatternCard";
import { TextField } from "../component-library/TextField";
import {
  Form,
  FormControl,
  FormItem,
  FormMessage,
  FormField,
} from "../component-library/Form";
import { Button } from "../component-library/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  searchFormSchema,
  type SearchSchema,
} from "../../schema/patternSchema";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { Pattern } from "../../api/types";
import { useRouter } from "next/navigation";

export const Patterns = () => {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [allPatterns, setAllPatterns] = useState<Pattern[]>([]);
  const [lastPaginator, setLastPaginator] = useState<{
    page: number;
    last_page: number;
  } | null>(null);

  const { t } = useTranslation();
  const router = useRouter();

  const pageSize = 10;
  const { data, isLoading, isError, error } = useGetPatterns(
    searchQuery,
    page,
    pageSize,
  );

  useEffect(() => {
    setAllPatterns([]);
    setPage(1);
    setLastPaginator(null);
  }, [searchQuery]);

  useEffect(() => {
    if (data?.patterns) {
      if (page === 1) {
        setAllPatterns(data.patterns);
      } else {
        setAllPatterns((prev) => [...prev, ...data.patterns]);
      }
      if (data.paginator) {
        setLastPaginator({
          page: data.paginator.page,
          last_page: data.paginator.last_page,
        });
      }
    }
  }, [data, page]);

  const form = useForm({
    defaultValues: {
      search: "",
    },
    resolver: zodResolver(searchFormSchema),
  });

  const onSubmit = async (values: SearchSchema) => {
    setSearchQuery(values.search.trim() || undefined);
    form.reset();
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const hasNextPage =
    lastPaginator && lastPaginator.page < lastPaginator.last_page;

  const isInitialLoading = isLoading && allPatterns.length === 0;

  if (isInitialLoading) {
    return <div>{t("loading")}</div>;
  }

  if (isError && allPatterns.length === 0) {
    return <div>{t("error", { error: error?.message })}</div>;
  }

  return (
    <div className="flex flex-col p-4">
      <div className="flex items-center gap-2 mb-10 px-4">
        <h1 className="text-3xl text-start">{t("patterns.title")}</h1>
        <p className="text-sm text-gray-500 font-borel">
          {t("patterns.description")}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextField
                    type="text"
                    placeholder={t("patterns.search")}
                    icon={Search}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <div className="text-destructive">
              {t("patterns.error", { error: error })}
            </div>
          )}
        </form>
      </Form>
      <div className="flex flex-wrap gap-4 mt-6">
        {allPatterns.map((pattern) => (
          <PatternCard
            key={pattern.id}
            pattern={pattern}
            onClick={() => router.push(`/patterns/${pattern.id}`)}
          />
        ))}
      </div>
      {hasNextPage && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleNextPage}
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? t("loading") : t("patterns.next")}
          </Button>
        </div>
      )}
      {isError && allPatterns.length > 0 && (
        <div className="text-destructive text-center mt-4">
          {t("error", { error: error?.message })}
        </div>
      )}
    </div>
  );
};
