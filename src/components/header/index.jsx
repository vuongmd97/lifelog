import { Link, useLocation } from 'react-router-dom';
//
import IconMenu from '../../assets/svg/IconMenu';
import ButtonDarkMode from './ButtonDarkMode';
import NavbarUser from './NavbarUser';
import logo from '../../assets/img/logo-teal.png';

export default function Header() {
    const { pathname } = useLocation();
    const isCalendar = pathname === '/calendar';

    return (
        <header className="header">
            <div className="container-header">
                <div className="collapse-sidebar">
                    <div className="btn-collapse btn-default --transparent --icon-lg">
                        <IconMenu />
                    </div>
                </div>
                {isCalendar ? (
                    <div className="header-logo">
                        <img src={logo} alt="Logo" />
                    </div>
                ) : (
                    <Link to="/" className="header-logo">
                        <img src={logo} alt="Logo" />
                    </Link>
                )}
            </div>
            <div className="container-header justify-right">
                <ButtonDarkMode />
                <NavbarUser />
            </div>
        </header>
    );
}
