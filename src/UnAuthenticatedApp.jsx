import { Routes, Route, Navigate } from "react-router-dom";
import { AUTHENTICATE_ROUTES } from "./config/router/router";
import "./modules/auth/css/auth.scss";

export default function UnAuthenticatedApp() {
  return (
    <div className="lifelog auth-page">
      <Routes>
        {AUTHENTICATE_ROUTES.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        {/* fallback */}
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </div>
  );
}
