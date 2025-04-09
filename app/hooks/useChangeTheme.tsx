import { useEffect } from "react";

export const useChangeTheme = (newTheme: string) => {
  useEffect(() => {
    const htmlElement = document.documentElement;

    if (htmlElement) {
      htmlElement.setAttribute("data-theme", newTheme);
    }
  }, [newTheme]);
};
