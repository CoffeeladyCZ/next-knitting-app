"use client";

import { Card } from "@/components/component-library/Card";
import type { Pattern } from "@/api/types";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/component-library/Icon";
import { DollarSign } from "lucide-react";
import Image from "next/image";

export const PatternCard = ({
  pattern,
  onClick,
}: {
  pattern: Pattern;
  onClick: () => void;
}) => {
  const t = useTranslations();
  return (
    <div className="relative">
      {!pattern.free && (
        <Icon
          as={DollarSign}
          size="xl"
          className="text-secondary absolute top-2 right-2"
        />
      )}
      <Card className="gap-2" onClick={onClick}>
        <Card.Header>
          <Card.Content className="flex flex-col gap-1 w-48">
            <div className="w-48 h-48 border-orange border-3 p-2 overflow-hidden mb-2">
              <Image
                src={pattern.first_photo?.small_url as string}
                alt={pattern.name as string}
                width={192}
                height={192}
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-md font-semibold wrap-break-word">
              {pattern.name}
            </p>
            <p className="wrap-break-word text-sm">
              {t("patterns.card.designer")}: {pattern.designer?.name}
            </p>
          </Card.Content>
        </Card.Header>
      </Card>
    </div>
  );
};
