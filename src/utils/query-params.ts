import { Key } from "react";

export function useQueryParams() {
  const searchParams = new URLSearchParams(window.location.search);
  const object = Object.fromEntries(searchParams);
  return object;
}

export function queryStringify(
  queryParams: Record<Key, string | number | boolean>
): string {
  return [...Object.entries(queryParams)]
    .map(([key, value], index) => `${index === 0 ? "?" : ""}${key}=${value}`)
    .join("&");
}
