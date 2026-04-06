import { useReducer, useRef } from 'react';
//
import useSiteTitle from '../../hook/useSiteTitle';
import Header from './header';
import MainCalendar from './MainCalendar';
import Sidebar from './sidebar';
import './css/calendar.scss';
import { reducer } from '../../const/Reducer';

export default function CalendarContainer() {
    useSiteTitle('calendar');
    const [dispatch, dispatchState] = useReducer(reducer, {
        previewEvent: null,
        editEvent: null,
        deleteEvent: null
    });

    const { previewEvent } = dispatch;

    const _handlePreviewEvent = (event) => {
        dispatchState({ previewEvent: event });
    };

    const _handleCloseEvent = () => {
        dispatchState({ previewEvent: null });
    };

    const refMainCalendar = useRef(null);

    const _onNext = () => refMainCalendar.current.onNext();
    const _onPrev = () => refMainCalendar.current.onPrev();
    const _onToday = () => refMainCalendar.current.onToday();
    const _getDate = () => refMainCalendar.current?.getDate();
    const _getTitle = () => refMainCalendar.current?.getTitle();
    const _handleDateChange = (dates) => refMainCalendar.current.handleDateChange(dates);

    return (
        <div className="container calendar">
            <div className="calendar__main flex-column gap-16 h-100">
                <Header onNext={_onNext} onPrev={_onPrev} getDate={_getDate} getTitle={_getTitle} onToday={_onToday} />
                <MainCalendar
                    ref={refMainCalendar}
                    previewEvent={previewEvent}
                    handlePreviewEvent={_handlePreviewEvent}
                />
            </div>
            <Sidebar
                getDate={_getDate}
                onDateChange={_handleDateChange}
                previewEvent={previewEvent}
                handleCloseEvent={_handleCloseEvent}
            />
        </div>
    );
}
