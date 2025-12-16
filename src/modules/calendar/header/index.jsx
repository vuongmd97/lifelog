import { forwardRef, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import IconArrow from '../../../assets/svg/IconArrow';
import DropdownPopper from '../../../components/dropdowns/DropdownPopper';

import { selectCurrentView } from '../../redux/calendar/calendarSlice';
import { CALENDAR_MODES } from '../const';

const Header = forwardRef((props, ref) => {
    const { t } = useTranslation('calendar');

    const currentView = useSelector(selectCurrentView);
    const refDropdown = useRef(null);

    const getCalendarMode = () => [
        {
            id: CALENDAR_MODES.DAY_GRID_MONTH,
            name: t('month')
        },
        {
            id: CALENDAR_MODES.DAY_GRID_WEEK,
            name: t('week')
        },
        {
            id: CALENDAR_MODES.DAY_GRID_DAY,
            name: t('day')
        }
    ];

    const _customButton = () => {
        const active = getCalendarMode().find((mode) => mode.id === currentView)?.name;
        return (
            <>
                {active}
                <div className="arrow">
                    <IconArrow />
                </div>
            </>
        );
    };

    return (
        <div className="calendar-header">
            <div className="header-items --left">
                <DropdownPopper ref={refDropdown} customButton={_customButton()}>
                    <ListOptions options={getCalendarMode()} />
                </DropdownPopper>
            </div>
            <div className="header-items --center">
                <div className="tabs calendar-toolbar">
                    <div className="tabs__items btn-default svg-9">
                        <IconArrow left />
                    </div>
                    <div className="tabs__items btn-default">Today</div>
                    <div className="tabs__items btn-default title">title</div>
                    <div className="tabs__items btn-default svg-9">
                        <IconArrow right />
                    </div>
                </div>
            </div>
        </div>
    );
});

const ListOptions = ({ options = [] }) => {
    return (
        <ul>
            {options.map((opt) => (
                <li key={opt.id} className={classNames('items')}>
                    {opt.name}
                </li>
            ))}
        </ul>
    );
};

export default Header;
