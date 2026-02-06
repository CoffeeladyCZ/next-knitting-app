"use client";

import { Search } from "lucide-react";
import { useGetPatterns } from "@/api/hooks";
import { PatternCard } from "@/components/patterns/PatternCard";
import { TextField } from "@/components/component-library/TextField";
import {
  Form,
  FormControl,
  FormItem,
  FormMessage,
  FormField,
} from "@/components/component-library/Form";
import { Button } from "@/components/component-library/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema, type SearchSchema } from "@/schema/patternSchema";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import type { Pattern } from "@/api/types";
import { useRouter } from "@/i18n/navigation";
import { PageHeader } from "@/components/PageHeader";
import { setUsernameInStorage } from "@/hooks/useUsername";
import { logger } from "@/lib/logger";

export const Patterns = () => {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [allPatterns, setAllPatterns] = useState<Pattern[]>([]);
  const [lastPaginator, setLastPaginator] = useState<{
    page: number;
    last_page: number;
  } | null>(null);

  const t = useTranslations();
  const router = useRouter();

  useEffect(() => {
    const getBaseUrl = () => {
      if (typeof window !== "undefined") {
        return window.location.origin;
      }
      return "";
    };

    fetch(`${getBaseUrl()}/api/user`)
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          setUsernameInStorage(data.username);
        }
      })
      .catch((error) => {
        logger.error("Error fetching username for storage", error, {
          component: "Dashboard",
        });
      });
  }, []);

  const pageSize = 10;
  const { data, isLoading, isError, error } = useGetPatterns(
    searchQuery,
    page,
    pageSize,
  );

  useEffect(() => {
    setLastPaginator(null);
    if (page !== 1) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <PageHeader />
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
              {t("error", { error: error?.message })}
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
