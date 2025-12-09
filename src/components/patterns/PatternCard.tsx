"use client";

import { Card } from "../component-library/Card";
import type { Pattern } from "../../api/types";
import { useTranslation } from "react-i18next";
import { Icon } from "../component-library/Icon";
import { DollarSign } from "lucide-react";

export const PatternCard = ({
  pattern,
  onClick,
}: {
  pattern: Pattern;
  onClick: () => void;
}) => {
  const { t } = useTranslation();
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
              <img
                src={pattern.first_photo?.small_url}
                alt={pattern.name}
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
