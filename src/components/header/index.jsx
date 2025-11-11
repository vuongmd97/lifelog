import IconMenu from "../../assets/svg/IconMenu";
import IconMoon from "../../assets/svg/IconMoon";
import IconBrightness from "../../assets/svg/IconBrightness";
import NavbarUser from "./NavbarUser";

export default function Header() {
  const theme = "";
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
        <div className="btn-default --icon-sm svg-9">
          {theme === "theme-dark" ? <IconMoon /> : <IconBrightness />}
        </div>
        <NavbarUser />
      </div>
    </header>
  );
}
