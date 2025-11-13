import IconMenu from "../../assets/svg/IconMenu";
import ButtonDarkMode from "./ButtonDarkMode";
import NavbarUser from "./NavbarUser";

export default function Header() {
  return (
    <header className="header">
      <div className="container-header">
        <div className="collapse-sidebar">
          <div className="btn-collapse btn-default --transparent --icon-lg">
            <IconMenu />
          </div>
        </div>
      </div>
      <div className="container-header justify-right">
        <ButtonDarkMode />
        <NavbarUser />
      </div>
    </header>
  );
}
