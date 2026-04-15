import { useSelector } from 'react-redux';
import { format, startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns';
//
import DatePicker from 'react-datepicker';
import IconArrow from '../../../assets/svg/IconArrow';
import 'react-datepicker/dist/react-datepicker.css';

import { selectCurrentView, selectViewRange } from '../../redux/calendar/calendarSlice';
import { CustomEventPreview } from '../modals/ModalCustomEventsPreview';

const Sidebar = ({
    getDate = () => {},
    onDateChange = () => {},
    previewEvent,
    handleCloseEvent,
    handleOpenEditEvent
}) => {
    const currentView = useSelector(selectCurrentView);
    const { start, end, type } = useSelector(selectViewRange);

    const calendarDate = getDate() || new Date(start);

    let rangeStart, rangeEnd;

    if (type === 'dayGridMonth') {
        rangeStart = startOfMonth(calendarDate);
        rangeEnd = endOfMonth(calendarDate);
    } else {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const actualEndDate = new Date(endDate.getTime() - 1);

        rangeStart = startOfDay(startDate);
        rangeEnd = endOfDay(actualEndDate);
    }

    const handleDateChange = (date) => {
        onDateChange(date);
    };

    return (
        <div className="calendar__sidebar">
            <div className={currentView}>
                <DatePicker
                    inline
                    selected={calendarDate}
                    startDate={rangeStart}
                    endDate={rangeEnd}
                    selectsRange
                    onChange={handleDateChange}
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
            <CustomEventPreview
                previewEvent={previewEvent}
                onClose={handleCloseEvent}
                handleOpenEditEvent={handleOpenEditEvent}
            />
        </div>
    );
};

export default Sidebar;
