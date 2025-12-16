import { useRef, useEffect, useMemo, forwardRef, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reducer } from '../../const/Reducer';
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

const MainCalendar = forwardRef((props, ref) => {
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

    const refCalendar = useRef(null);

    const getSettingsCalendar = () => {
        const result = { ...settingsCalendar };
        return result;
    };

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
    }, []);

    return (
        <div className="calendar-content">
            <FullCalendar
                ref={refCalendar}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin]}
                selectable
                droppable
                eventSources={eventSources}
                {...(getSettingsCalendar() || {})}
            />
        </div>
    );
});

export default MainCalendar;
