import { useState, useEffect, useRef } from "react";

export default function useClickOutside(initialIsVisible, idPreventClose = "") {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef(null);

  const handleHideDropdown = (event) => {
    const elPrevent = idPreventClose
      ? document.getElementById(idPreventClose)
      : null;
    if (event.key === "Escape" && !elPrevent) {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = (event) => {
    const elPrevent = idPreventClose
      ? document.getElementById(idPreventClose)
      : null;

    if (ref.current && !ref.current.contains(event.target) && !elPrevent) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    if (isComponentVisible) {
      document.addEventListener("keydown", handleHideDropdown, true);
      document.addEventListener("click", handleClickOutside, true);
    } else {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("keydown", handleHideDropdown, true);
    }

    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isComponentVisible]);

  return [ref, isComponentVisible, setIsComponentVisible];
}
