import { useTranslation } from "react-i18next";
//
import "./css/styles.scss";

export default function ErrorPage() {
  const { t } = useTranslation(["common"]);

  return (
    <div className="errors-page">
      <div className="flex-column align-center gap-10">
        <h1 className="title fs-7">{t("oops")}</h1>
        <p className="txt fs-3">{t("something_went_wrong")}</p>
      </div>
    </div>
  );
}
