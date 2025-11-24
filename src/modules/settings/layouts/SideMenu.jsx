import { useReducer } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { reducer } from '../../../const/Reducer';
import classNames from 'classnames';
//
import IconArrow from '../../../assets/svg/IconArrow';

export default function SideMenu() {
    const { t } = useTranslation(['settings']);
    const [state, dispatchState] = useReducer(reducer, {
        isCollapse: false
    });

    const menuItems = [
        {
            value: t('users'),
            path: '/settings/users/'
        },
        {
            value: t('preferences'),
            path: '/settings/preferences/'
        }
    ];

    const { isCollapse } = state;

    const handleCollapseSidebar = () => {
        dispatchState({
            isCollapse: !isCollapse
        });
    };

    return (
        <div
            className={classNames('sidebar-pages', { 'is-collapsed': isCollapse })}
            onClick={isCollapse ? handleCollapseSidebar : undefined}
        >
            <div className="sidebar-header">
                <p className="txt">{t('system_settings')}</p>
                <div
                    className={classNames('btn-default --icon-lg', isCollapse ? '--icon-sm svg-8' : '--icon-lg svg-9')}
                    onClick={handleCollapseSidebar}
                >
                    <IconArrow left={true} />
                </div>
            </div>

            <ul className="sidebar-content flex-column gap-4">
                {menuItems.map((item) => (
                    <li key={item.path}>
                        <NavLink to={item.path} className={({ isActive }) => classNames('items', { active: isActive })}>
                            {item.value}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}
