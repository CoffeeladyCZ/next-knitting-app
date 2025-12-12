"use client";

import { useTranslations } from "next-intl";
import { useGetPatternDetail } from "../../api/hooks";
import parse from "html-react-parser";
import { Icon } from "../component-library/Icon";
import { SnowflakeIcon } from "lucide-react";
import Image from "next/image";
import CommentsCard from "./CommentsCard";

type Props = {
  id: string;
};

export const PatternDetail = ({ id }: Props) => {
  const t = useTranslations();

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
      <div className="flex flex-wrap gap-6">
        <div className="text-left w-full lg:w-80 lg:shrink-0">
          <div className="max-w-80 w-full h-auto lg:h-96 border-orange border-3 p-2 mb-2 overflow-hidden">
            {data?.pattern?.photos?.[0]?.medium_url && (
              <Image
                src={data.pattern.photos[0].medium_url}
                alt={data?.pattern.name ?? ""}
                className="w-full h-full object-cover"
                width={320}
                height={384}
              />
            )}
          </div>
          <p className="text-left">{`${t("patterns.detail.author")}: ${data?.pattern.pattern_author?.name}`}</p>
          {data?.pattern.price && (
            <p className="text-left">{`${t("patterns.detail.price")}: ${data?.pattern.price} ${data?.pattern.currency}`}</p>
          )}
          <p className="text-left pb-2">
            {t("patterns.detail.craft")}:
            <span className="text-orange-dark pl-1">
              {data?.pattern?.craft?.name}
            </span>
          </p>
          <a
            href={data?.pattern.download_location?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md text-primary underline"
          >
            {t("patterns.detail.download")}
          </a>
          <Icon as={SnowflakeIcon} className="text-primary mt-5 size-15" />
        </div>
        <div className="text-md text-left flex-1 min-w-60">
          {parse(data?.pattern.notes_html as string)}
        </div>
      </div>
      <CommentsCard id={Number(id)} />
    </>
  );
};
