import { Route, Routes } from "react-router-dom";
import { SETTINGS_ROUTES } from "../../../config/router/router";
import SideMenu from "./SideMenu";
//
import "../css/settings.scss";
import NotFoundPage from "../../error/NotFoundPage";

export default function SettingLayout() {
  return (
    <div className="container container-settings">
      <SideMenu />
      <div className="contents-pages flex-1">
        <Routes>
          {SETTINGS_ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}
