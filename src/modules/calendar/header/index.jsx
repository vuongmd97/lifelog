import { forwardRef, useRef, useReducer, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { reducer } from '../../../const/Reducer';
import { format } from 'date-fns';
import classNames from 'classnames';
import IconArrow from '../../../assets/svg/IconArrow';
import DropdownPopper from '../../../components/dropdowns/DropdownPopper';

import { changeViews, setCurrentView, selectCurrentView } from '../../redux/calendar/calendarSlice';

import { CALENDAR_MODES } from '../const';

const Header = forwardRef(
    ({ onNext = () => {}, onPrev = () => {}, getDate = () => {}, getTitle = () => {}, onToday = () => {} }, ref) => {
        const { t } = useTranslation('calendar');
        const dispatch = useDispatch();
        const currentView = useSelector(selectCurrentView);
        const refDropdown = useRef(null);

        const [state, dispatchState] = useReducer(reducer, { title: '' });

        const { title } = state;

        const updateTitle = () => {
            const newTitle = getTitle();

            if (newTitle) {
                dispatchState({ title: newTitle });
            }
        };

        useEffect(() => {
            const timer = setTimeout(() => {
                updateTitle();
            }, 100);

            return () => clearTimeout(timer);
        }, [currentView]);

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

        const activeMode = getCalendarMode().find((mode) => mode.id === currentView);

        const _customButton = (activeMode) => {
            return (
                <>
                    {activeMode?.name}
                    <div className="arrow">
                        <IconArrow />
                    </div>
                </>
            );
        };

        const _handleSelect = (id) => {
            refDropdown.current._close();
            if (id === activeMode.id) return;
            dispatch(setCurrentView(id));
            dispatch(changeViews({ view: id }));
        };

        const handleNext = () => {
            onNext();

            setTimeout(() => {
                const currentDate = getDate();
                const newDate = format(currentDate, 'yyyy-MM-dd');
                dispatch(changeViews({ view: currentView, date: newDate }));
                updateTitle();
            }, 0);
        };

        const handleToday = () => {
            onToday();

            setTimeout(() => {
                const currentDate = getDate();
                const newDate = format(currentDate, 'yyyy-MM-dd');
                dispatch(changeViews({ view: currentView, date: newDate }));
                updateTitle();
            }, 0);
        };

        const handlePrev = () => {
            onPrev();

            setTimeout(() => {
                const currentDate = getDate();
                const newDate = format(currentDate, 'yyyy-MM-dd');
                dispatch(changeViews({ view: currentView, date: newDate }));
                updateTitle();
            }, 0);
        };

        return (
            <div className="calendar-header">
                <div className="header-items --left">
                    <DropdownPopper ref={refDropdown} customButton={_customButton(activeMode)}>
                        <ListOptions options={getCalendarMode()} activeMode={activeMode} onSelect={_handleSelect} />
                    </DropdownPopper>
                </div>
                <div className="header-items --center">
                    <div className="tabs calendar-toolbar">
                        <div className="tabs__items btn-default svg-9" onClick={handlePrev}>
                            <IconArrow left />
                        </div>
                        <div className="tabs__items btn-default" onClick={handleToday}>
                            Today
                        </div>
                        <div className="tabs__items btn-default title">{title}</div>
                        <div className="tabs__items btn-default svg-9" onClick={handleNext}>
                            <IconArrow right />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

const ListOptions = ({ options = [], activeMode = '', onSelect = () => {} }) => {
    return (
        <ul>
            {options.map((opt) => {
                const active = opt.id === activeMode.id;

                return (
                    <li key={opt.id} className={classNames('items', { active })} onClick={() => onSelect(opt.id)}>
                        {opt.name}
                    </li>
                );
            })}
        </ul>
    );
};

export default Header;
