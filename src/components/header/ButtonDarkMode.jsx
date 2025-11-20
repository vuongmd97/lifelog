import { useReducer, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reducer } from "../../const/Reducer";
import { upsertProfiles } from "../../modules/redux/users/userSlice";
//
import IconMoon from "../../assets/svg/IconMoon";
import IconBrightness from "../../assets/svg/IconBrightness";

export default function ButtonDarkMode() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state?.user?.profiles?.theme);

  const getTheme = () => {
    if (theme) return theme;
    const storageTheme = localStorage.getItem("theme");
    return storageTheme || "";
  };

  const [state, dispatchState] = useReducer(reducer, {
    localTheme: getTheme(),
  });

  const { localTheme } = state;

  useLayoutEffect(() => {
    const t = getTheme();
    if (t) {
      document.body.className = t;
    }
  }, []);

  const handleToggleDarkMode = async () => {
    let newTheme = localTheme === "theme-dark" ? "" : "theme-dark";

    document.body.classList.remove("theme-dark");
    if (newTheme) {
      document.body.classList.add(newTheme);
    }

    localStorage.setItem("theme", newTheme);

    dispatchState({
      localTheme: newTheme,
    });

    await dispatch(upsertProfiles({ theme: newTheme })).unwrap();
  };

  return (
    <div className="btn-default --icon-sm svg-9" onClick={handleToggleDarkMode}>
      {localTheme === "theme-dark" ? <IconMoon /> : <IconBrightness />}
    </div>
  );
}
