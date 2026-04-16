import { Fragment, useRef, useEffect, useMemo, forwardRef, useReducer, useImperativeHandle } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reducer } from '../../const/Reducer';
import { format, addMinutes } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';
import { formatTimeRange } from '../../utils/DateUtils';
//
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

import SpinnerLoading from '../../components/loaders/SpinnerLoading';

import { HOLIDAY_CALENDARS, GOOGLE_CALENDAR_API_KEY } from './const';

//
import {
    selectCurrentView,
    selectDateSelected,
    selectTimezone,
    selectShowHolidays,
    selectHolidayCountry,
    setViewRange,
    setCurrentView,
    selectCustomEvents,
    fetchCustomEvents,
    selectViewRange,
    setPreviewEventId,
    selectPreviewEvent
} from '../redux/calendar/calendarSlice';
import ModalAddJobs from './modals/ModalAddJobs';
import ModalCustomEvents from './modals/ModalCustomEvents';

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
    const customEvents = useSelector(selectCustomEvents);
    const viewRange = useSelector(selectViewRange);

    const [state, dispatchState] = useReducer(reducer, {
        loadEvents: false,
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
        },
        addJobs: {
            active: false,
            x: '',
            y: '',
            date: ''
        }
    });
    const { settingsCalendar, loadEvents, addJobs } = state;

    const refWrapCalendar = useRef(null);
    const refCalendar = useRef(null);
    const refAddEvent = useRef(null);
    const refViewRange = useRef('');

    const dateLocale = DATE_FNS_LOCALES[holidayCountry] || enUS;

    const previewEvent = useSelector(selectPreviewEvent);

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

    const _handleDateChange = (dates) => {
        const api = refCalendar.current.getApi();
        const view = api.view;

        const start = view.currentStart;
        const end = new Date(view.currentEnd.getTime() - 1);

        const rangeDate = dates[0] >= start && dates[0] <= end;
        if (rangeDate) return;

        refCalendar.current.getApi().gotoDate(dates[0]);
    };

    useImperativeHandle(ref, () => ({
        onNext: _onNext,
        onPrev: _onPrev,
        onToday: _onToday,
        getDate: _getDate,
        getTitle: _getTitle,
        handleDateChange: _handleDateChange,
        handleOpenEditEvent: _handleOpenEditEvent
    }));

    const eventSources = useMemo(() => {
        const sources = [];

        // Holiday events from Google Calendar
        if (showHolidays && GOOGLE_CALENDAR_API_KEY && holidayCountry) {
            const holidayCalendar = HOLIDAY_CALENDARS[holidayCountry];
            if (holidayCalendar) {
                sources.push({
                    googleCalendarId: holidayCalendar.id,
                    color: holidayCalendar.color,
                    className: 'events-none'
                });
            }
        }

        return sources;
    }, [showHolidays, holidayCountry]);

    useEffect(() => {
        if (!refCalendar.current) return;

        const api = refCalendar.current.getApi();

        // Clear old events
        const existingEvents = api.getEvents();
        existingEvents.forEach((event) => {
            if (!event.source) event.remove();
        });

        if (!customEvents?.length) return;

        // Add new events
        api.batchRendering(() => {
            customEvents.forEach((event) => api.addEvent(event));
        });
    }, [customEvents]);

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

    useEffect(() => {
        const rangeChanged =
            !refViewRange || refViewRange.current.start != viewRange.start || refViewRange.current.end != viewRange.end;

        if (rangeChanged) {
            dispatch(
                fetchCustomEvents({
                    start: viewRange.start,
                    end: viewRange.end
                })
            );

            refViewRange.current = viewRange;
        }
    }, [dispatch, viewRange]);

    const handleDatesSet = (arg) => {
        dispatch(
            setViewRange({
                start: arg.startStr,
                end: arg.endStr,
                type: arg.view.type
            })
        );
    };

    const onDateClick = (info) => {
        if (info.view.type === 'dayGridMonth') {
            dispatch(setCurrentView('timeGridDay'));
            refCalendar.current.getApi().gotoDate(info.dateStr);
            return;
        } else {
            handleOpenAddPopup(info);
        }
    };

    const handleOpenAddPopup = (info) => {
        if (info.allDay) return;

        const calendarDiv = info.jsEvent.target;
        const { x, y, height, width } = calendarDiv.getBoundingClientRect();

        const fakeDiv = document.createElement('div');
        fakeDiv.setAttribute('add-jobs', 'true');
        fakeDiv.style.cssText = `
            position: fixed;
            z-index: 9999999;
            top: ${y}px;
            left: ${x}px;
            height: ${height}px;
            width: ${width}px;
            background-color: #8d4afc33;
            border: 2px solid #8d4afc;
            border-radius: 3px;
        `;

        getTitle(info, fakeDiv);

        dispatchState({
            addJobs: {
                active: true,
                x: x + width / 2,
                y,
                date: info.dateStr
            }
        });

        document.body.appendChild(fakeDiv);
    };

    const _handleCloseAddJobs = () => {
        const fakeDiv = document.querySelector('[add-jobs="true"]');

        if (fakeDiv) {
            fakeDiv.remove();

            dispatchState({
                addJobs: {
                    active: false,
                    x: '',
                    y: '',
                    date: ''
                }
            });
        }
    };

    const getTitle = (info, fakeDiv) => {
        const startTime = new Date(info.dateStr);
        const endTime = addMinutes(startTime, 15);

        const timeRange = formatTimeRange(startTime, endTime);

        if (refAddEvent.current) {
            refAddEvent.current._getTimeRange(startTime, endTime);
        }

        fakeDiv.innerHTML = `<p style="white-space: nowrap; font-size: 9px; line-height: 10px; background: #8d4afc; color: #fff; padding: 0px 1px; margin: -1px; overflow: hidden;">${timeRange}</p>`;
    };

    const _handleCreateEvent = () => {
        if (refAddEvent.current) {
            refAddEvent.current._open();
            _handleCloseAddJobs();
        }
    };

    const onEventClick = (info) => {
        const ev = info.event;
        if (ev.source) return;

        dispatch(setPreviewEventId(ev.id));
    };

    const _handleOpenEditEvent = () => {
        if (!previewEvent || !refAddEvent.current) return;
        refAddEvent.current._openEdit(previewEvent);
    };

    return (
        <Fragment>
            <ModalAddJobs data={addJobs} onClose={_handleCloseAddJobs} onCreateEvent={_handleCreateEvent} />

            <ModalCustomEvents ref={refAddEvent} />

            <div ref={refWrapCalendar} className="calendar-content">
                <FullCalendar
                    ref={refCalendar}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin]}
                    selectable
                    droppable
                    eventSources={eventSources}
                    dateClick={onDateClick}
                    eventClick={onEventClick}
                    {...settingsCalendar}
                    height="100%"
                    loading={(loadEvents) => dispatchState({ loadEvents })}
                    datesSet={handleDatesSet}
                />

                {loadEvents && <SpinnerLoading hasColor />}
            </div>
        </Fragment>
    );
});

export default MainCalendar;
