import type { useTranslations } from "next-intl";

export type TFunction<T extends string = never> = ReturnType<
  typeof useTranslations<T>
>;
