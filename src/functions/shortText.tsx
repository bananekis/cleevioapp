import { truncate } from "lodash-es";

export const shorten = (str: string, len = 26): string => {
  return truncate(str, { length: len });
};
