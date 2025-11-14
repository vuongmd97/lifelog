import { Route, Routes } from "react-router-dom";
import { SETTINGS_ROUTES } from "../../../config/router/router";
import SideMenu from "./SideMenu";

export default function SettingLayout() {
  return (
    <div className="container container-settings">
      <SideMenu />
      <div className="contents-pages">
        <Routes>
          {SETTINGS_ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </div>
  );
}
