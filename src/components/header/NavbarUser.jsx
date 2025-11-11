import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reducer } from "../../const/Reducer";
import { signOut } from "../../modules/auth/authSlice";
import classNames from "classnames";
//
import IconDefaultAvatar from "../../assets/svg/IconDefaultAvatar";
import IconSetting from "../../assets/svg/IconSetting";
import IconLogout from "../../assets/svg/IconLogout";
import IconArrow from "../../assets/svg/IconArrow";

export default function NavbarUser() {
  const dispatch = useDispatch();
  const [state, dispatchState] = useReducer(reducer, {
    isVisible: false,
  });
  const { isVisible } = state;

  const profiles = useSelector((state) => state?.user?.profiles);

  const { first_name, last_name } = profiles;

  const handleOpen = () => {
    dispatchState({ isVisible: !isVisible });
  };

  const handleSignOut = async () => {
    await dispatch(signOut()).unwrap();
  };

  return (
    <div
      className={classNames("dropdown wrap-nav nav-user", {
        active: isVisible === true,
      })}
    >
      <div className="btn-default user" onClick={handleOpen}>
        <div className="user__avt">
          <IconDefaultAvatar />
        </div>
        <div className="user__name">{`${first_name} ${last_name}`}</div>
        <div className="arrow">
          <IconArrow />
        </div>
      </div>
      <div className="dropdown__menu content-full">
        <ul>
          <li className="items svg-9">
            <IconSetting />
            Settings
          </li>
          <div className="line"></div>
          <li className="items svg-9" onClick={handleSignOut}>
            <IconLogout />
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}
