import { useRef, useEffect, useMemo, forwardRef, useReducer, useImperativeHandle } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reducer } from '../../const/Reducer';
import { format } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';
//
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

import { HOLIDAY_CALENDARS, GOOGLE_CALENDAR_API_KEY } from './const';

//
import {
    selectCurrentView,
    selectDateSelected,
    selectTimezone,
    selectShowHolidays,
    selectHolidayCountry
} from '../redux/calendar/calendarSlice';

const DATE_FNS_LOCALES = {
    vi: vi,
    en: enUS
};

const MainCalendar = forwardRef((_, ref) => {
    const dispatch = useDispatch();
    const currentView = useSelector(selectCurrentView);
    const dateSelected = useSelector(selectDateSelected);
    const timezone = useSelector(selectTimezone);
    const showHolidays = useSelector(selectShowHolidays);
    const holidayCountry = useSelector(selectHolidayCountry);

    const [state, dispatchState] = useReducer(reducer, {
        events: [],
        settingsCalendar: {
            timeZone: timezone,
            firstDay: 0,
            initialDate: dateSelected,
            allDaySlot: true,
            editable: true,
            slotDuration: '00:15',
            initialView: currentView,
            slotMinWidth: 30,
            headerToolbar: false,
            googleCalendarApiKey: GOOGLE_CALENDAR_API_KEY
        }
    });
    const { events, settingsCalendar } = state;

    const refWrapCalendar = useRef(null);
    const refCalendar = useRef(null);

    const dateLocale = DATE_FNS_LOCALES[holidayCountry] || enUS;

    const _getDate = () => {
        return refCalendar.current.getApi().getDate();
    };

    const _getTitle = () => {
        const api = refCalendar.current.getApi();
        const view = api.view;
        const date = api.getDate();

        const fmt = (d, pattern) => format(d, pattern, { locale: dateLocale });

        switch (view.type) {
            case 'dayGridMonth':
                return fmt(date, 'MMMM yyyy');

            case 'timeGridWeek': {
                const start = view.currentStart;
                const end = new Date(view.currentEnd.getTime() - 1);

                if (start.getFullYear() === end.getFullYear()) {
                    if (start.getMonth() === end.getMonth()) {
                        return `${fmt(start, 'MMM dd')} – ${fmt(end, 'dd, yyyy')}`;
                    }

                    return `${fmt(start, 'MMM dd')} – ${fmt(end, 'MMM dd, yyyy')}`;
                }

                return `${fmt(start, 'MMM dd, yyyy')} – ${fmt(end, 'MMM dd, yyyy')}`;
            }

            case 'timeGridDay':
                return fmt(date, 'EEEE, MMM dd, yyyy');

            default:
                return view.title;
        }
    };

    const _onNext = () => {
        refCalendar.current.getApi().next();
    };

    const _onPrev = () => {
        refCalendar.current.getApi().prev();
    };

    const _onToday = () => {
        refCalendar.current.getApi().today();
    };

    useImperativeHandle(ref, () => ({
        onNext: _onNext,
        onPrev: _onPrev,
        onToday: _onToday,
        getDate: _getDate,
        getTitle: _getTitle
    }));

    const eventSources = useMemo(() => {
        const sources = [];

        if (events && events.length > 0) {
            sources.push({
                events: events,
                color: '#3b82f6'
            });
        }

        // Holiday events from Google Calendar
        if (showHolidays && GOOGLE_CALENDAR_API_KEY && holidayCountry) {
            const holidayCalendar = HOLIDAY_CALENDARS[holidayCountry];
            if (holidayCalendar) {
                sources.push({
                    googleCalendarId: holidayCalendar.id,
                    color: holidayCalendar.color,
                    className: 'holiday-event'
                });
            }
        }

        return sources;
    }, [events, showHolidays, holidayCountry]);

    useEffect(() => {
        if (!refCalendar.current) return;
        refCalendar.current.getApi().changeView(currentView);
    }, [currentView]);

    // Handle calendar resize
    useEffect(() => {
        if (!refWrapCalendar.current) return;

        const ro = new ResizeObserver(() => {
            if (refCalendar.current) {
                refCalendar.current.getApi().updateSize();
            }
        });

        // listen refWrapCalendar size changes
        ro.observe(refWrapCalendar.current);

        return () => ro.disconnect();
    }, []);

    return (
        <div ref={refWrapCalendar} className="calendar-content">
            <FullCalendar
                ref={refCalendar}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin]}
                selectable
                droppable
                eventSources={eventSources}
                {...settingsCalendar}
                height="100%"
            />
        </div>
    );
});

export default MainCalendar;
