import { useReducer } from "react";
import { useSelector } from "react-redux";
import { reducer } from "../../../const/Reducer";
//
import UsersInfo from "./components/UsersInfo";
import UsersForm from "./components/UsersForm";

export default function Users() {
  const profiles = useSelector((state) => state.user.profiles);
  const [state, dispatchState] = useReducer(reducer, {
    isEdit: false,
  });

  const { isEdit } = state;

  const _onEdit = () => dispatchState({ isEdit: true });
  const _offEdit = () => dispatchState({ isEdit: false });

  return (
    <>
      {isEdit ? (
        <UsersForm data={profiles || {}} onClose={_offEdit} />
      ) : (
        <UsersInfo data={profiles || {}} onEdit={_onEdit} />
      )}
    </>
  );
}
