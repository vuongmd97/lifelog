import { useSelector } from 'react-redux';
import { format, startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns';
//
import DatePicker from 'react-datepicker';
import IconArrow from '../../../assets/svg/IconArrow';
import 'react-datepicker/dist/react-datepicker.css';

import { selectCurrentView, selectViewRange } from '../../redux/calendar/calendarSlice';

const Sidebar = () => {
    const currentView = useSelector(selectCurrentView);
    const { start, end, type } = useSelector(selectViewRange);

    const startDate = new Date(start);
    const endDate = new Date(end);

    const actualEndDate = new Date(endDate.getTime() - 1);

    let rangeStart, rangeEnd;

    if (type === 'dayGridMonth') {
        rangeStart = startOfMonth(startDate);
        rangeEnd = endOfMonth(startDate);
    } else {
        rangeStart = startOfDay(startDate);
        rangeEnd = endOfDay(actualEndDate);
    }

    return (
        <div className="calendar__sidebar">
            <div className={currentView}>
                <DatePicker
                    inline
                    selected={startDate}
                    startDate={rangeStart}
                    endDate={rangeEnd}
                    selectsRange
                    renderCustomHeader={({
                        date,
                        decreaseMonth,
                        increaseMonth,
                        prevMonthButtonDisabled,
                        nextMonthButtonDisabled
                    }) => (
                        <div className="flexcenter justify-space-between">
                            <div
                                className="btn-default --icon-lg svg-9"
                                onClick={decreaseMonth}
                                disabled={prevMonthButtonDisabled}
                            >
                                <IconArrow left />
                            </div>
                            <div className="datepicker-title">{format(date, 'MMMM yyyy')}</div>
                            <div
                                className="btn-default --icon-lg svg-9"
                                onClick={increaseMonth}
                                disabled={nextMonthButtonDisabled}
                            >
                                <IconArrow right />
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default Sidebar;
