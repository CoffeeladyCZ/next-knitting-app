"use client";

import { useTranslation } from "react-i18next";
import { useGetPatternDetail } from "../../api/hooks";
import parse from "html-react-parser";
import { Icon } from "../component-library/Icon";
import { SnowflakeIcon } from "lucide-react";

type Props = {
  id: string;
}

export const PatternDetail = ({ id }: Props) => {
  const { t } = useTranslation();

  const { data, isLoading, isError, error } = useGetPatternDetail(Number(id));

  if (isLoading) {
    return <div>{t("loading")}</div>;
  }

  if (isError) {
    return <div>{t("error", { error: error?.message })}</div>;
  }

  return (
    <>
      <h1 className="text-3xl mb-4 text-primary">{data?.pattern.name}</h1>
      <div className="flex gap-6">
        <div className="text-left">
          <div className="w-80 h-96 border-orange border-3 p-2 mb-2 overflow-hidden">
            <img
              src={data?.pattern?.photos?.[0]?.medium_url}
              alt={data?.pattern.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-left">{`${t("patterns.detail.author")}: ${data?.pattern.pattern_author?.name}`}</p>
          {data?.pattern.price && (
            <p className="text-left">{`${t("patterns.detail.price")}: ${data?.pattern.price} ${data?.pattern.currency}`}</p>
          )}
          <p className="text-left pb-2">{`${t("patterns.detail.craft")}: ${data?.pattern?.craft?.name}`}</p>
          <a
            href={data?.pattern.download_location?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md text-primary hover:underline"
          >
            {t("patterns.detail.download")}
          </a>
          <Icon as={SnowflakeIcon} className="text-primary mt-5 size-15" />
        </div>
        <p className="text-md text-left">
          {parse(data?.pattern.notes_html as string)}
        </p>
      </div>
    </>
  );
};
