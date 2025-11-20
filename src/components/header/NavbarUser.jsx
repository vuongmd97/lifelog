import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../modules/auth/authSlice";
import { Link } from "react-router-dom";
import classNames from "classnames";
import useClickOutside from "../../hook/useClickOutside";
//
import IconDefaultAvatar from "../../assets/svg/IconDefaultAvatar";
import IconSetting from "../../assets/svg/IconSetting";
import IconLogout from "../../assets/svg/IconLogout";
import IconArrow from "../../assets/svg/IconArrow";

export default function NavbarUser() {
  const dispatch = useDispatch();

  const profiles = useSelector((state) => state?.user?.profiles);

  const { first_name, last_name } = profiles;

  const [refMenu, isMenuVisible, setIsMenuVisible] = useClickOutside(false);

  const handleSignOut = async () => {
    await dispatch(signOut()).unwrap();
  };
  const handleActiveMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div
      ref={refMenu}
      className={classNames("dropdown wrap-nav nav-user", {
        active: isMenuVisible,
      })}
    >
      <div className="btn-default user" onClick={handleActiveMenu}>
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
          <li>
            <Link
              to="/settings/users/"
              className="items svg-9"
              onClick={handleActiveMenu}
            >
              <IconSetting />
              Settings
            </Link>
          </li>
          <li className="line"></li>
          <li className="items svg-9" onClick={handleSignOut}>
            <IconLogout />
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}
