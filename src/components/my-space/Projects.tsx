"use client";

import { useGetProjects } from "@/api/hooks";
import { useUsername } from "@/hooks/useUsername";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { Project } from "@/api/types";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  const [mounted] = useState(() => typeof window !== "undefined");
  const { username } = useUsername();
  const t = useTranslations();

  const { data, isLoading, isError, error } = useGetProjects(username);

  const projects: Project[] = data?.projects || [];
  const isInitialLoading = isLoading && projects.length === 0;

  if (!mounted) {
    return (
      <div className="flex flex-col gap-6 px-4">
        <h2 className="text-2xl text-start">{t("projects.title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <p className="text-gray-500">{t("projects.noProjects")}</p>
        </div>
      </div>
    );
  }

  if (isInitialLoading) {
    return (
      <div className="flex flex-col gap-6 px-4">
        <h2 className="text-2xl text-start">{t("projects.title")}</h2>
        <div>{t("loading")}</div>
      </div>
    );
  }

  if (isError && projects.length === 0) {
    return (
      <div className="flex flex-col gap-6 px-4">
        <h2 className="text-2xl text-start">{t("projects.title")}</h2>
        <div>{t("error", { error: error?.message })}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4">
      <h2 className="text-2xl text-start">{t("projects.title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.length === 0 ? (
          <p className="text-gray-500">{t("projects.noProjects")}</p>
        ) : (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>
      {isError && projects.length > 0 && (
        <div className="text-destructive text-center mt-4">
          {t("error", { error: error?.message })}
        </div>
      )}
    </div>
  );
};
