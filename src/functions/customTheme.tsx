import { Theme } from "react-select";
import { color } from "../config";

// select-box

export const customTheme = (theme: Theme) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary25: `${color.khaki}`,
      primary50: `${color.khaki}`,
      primary: `${color.navy}`,
      neutral5: `${color.black}`,
      danger: `${color.red}`,
      dangerLight: `${color.red}`,
    },
  };
};
