import { useSelector } from 'react-redux';
import { format } from 'date-fns';
//
import DatePicker from 'react-datepicker';
import IconArrow from '../../../assets/svg/IconArrow';
import 'react-datepicker/dist/react-datepicker.css';

import { selectCurrentView } from '../../redux/calendar/calendarSlice';

const Sidebar = () => {
    const currentView = useSelector(selectCurrentView);

    return (
        <div className="calendar__sidebar">
            <div className={currentView}>
                <DatePicker
                    inline
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
