import { useTranslation } from "react-i18next";
//

export default function UsersInfo({ data, onEdit = () => {} }) {
  console.log("profiles", data);
  const { t } = useTranslation(["settings"]);

  const _renderRows = (label, description) => {
    return (
      <>
        {!!description && (
          <div className="rows">
            <div className="rows__label">{label}</div>
            <div className="rows__info">{description}</div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="form-default">
      <div className="form-header">
        <div className="logo"></div>
        <div className="btn-default" onClick={onEdit}>
          Edit
        </div>
      </div>
      <div className="form-content">
        {_renderRows(t("first_name"), data.first_name)}
        {_renderRows(t("last_name"), data.last_name)}
        {_renderRows(t("email"), data.email)}
        {_renderRows(t("phone"), data.phone)}
      </div>
    </div>
  );
}
