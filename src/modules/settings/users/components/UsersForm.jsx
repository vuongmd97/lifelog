import { forwardRef } from "react";

const UsersForm = forwardRef(({ data, onClose = () => {} }, ref) => {
  return (
    <div className="form-default">
      <div className="form-header">
        <div className="logo"></div>
        <div className="btn-default" onClick={onClose}>
          Close
        </div>
      </div>
    </div>
  );
});

export default UsersForm;
