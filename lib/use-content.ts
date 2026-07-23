import { useLocale, type Locale } from "@/lib/locale-context";

export type Localized<T> = Record<Locale, T>;

export function useLocalized<T>(content: Localized<T>): T {
  const { locale } = useLocale();
  return content[locale];
}
