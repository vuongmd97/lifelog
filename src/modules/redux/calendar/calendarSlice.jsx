import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CalendarService } from './calendarService';

export const fetchPreferences = createAsyncThunk('calendar/fetchPreferences', async (_, { getState }) => {
    const userId = getState().auth.userId;
    const data = await CalendarService.fetchPreferences(userId);
    return data;
});

export const fetchCustomEvents = createAsyncThunk(
    'calendar/fetchCustomEvents',
    async ({ start, end }, { getState }) => {
        const userId = getState().auth.userId;
        const data = await CalendarService.fetchCustomEvents(userId, start, end);
        return data;
    }
);

export const changeViews = createAsyncThunk('calendar/changeViews', async (payload, { getState }) => {
    const userId = getState().auth.userId;
    const { view, date = null } = payload;
    const data = await CalendarService.changeViews(userId, view, date);
    return data;
});

export const goToNextPeriodAsync = createAsyncThunk('calendar/goToNextPeriodAsync', async (newDate, { getState }) => {
    const userId = getState().auth.userId;
    const { currentView } = getState().calendar;

    const data = await CalendarService.changeViews(userId, currentView, newDate);
    return data;
});

export const goToPrevPeriodAsync = createAsyncThunk('calendar/goToPrevPeriodAsync', async (newDate, { getState }) => {
    const userId = getState().auth.userId;
    const { currentView } = getState().calendar;

    const data = await CalendarService.changeViews(userId, currentView, newDate);
    return data;
});

export const goToTodayAsync = createAsyncThunk('calendar/goToTodayAsync', async (newDate, { getState }) => {
    const userId = getState().auth.userId;
    const { currentView } = getState().calendar;

    const data = await CalendarService.changeViews(userId, currentView, newDate);
    return data;
});

export const createEvent = createAsyncThunk('calendar/createEvent', async (payload) => {
    return await CalendarService.createEvent(payload);
});

export const updateEvent = createAsyncThunk('calendar/updateEvent', async (payload) => {
    const { id, ...rest } = payload;
    return await CalendarService.updateEvent(id, rest);
});

export const deleteEvent = createAsyncThunk('calendar/deleteEvent', async (id) => {
    await CalendarService.deleteEvent(id);
    return id;
});

const INITIAL_CUSTOM_EVENT_MODAL = {
    isOpen: false,
    mode: 'create',
    eventId: null,
    draftRange: {
        start: null,
        end: null
    }
};

const initialState = {
    currentView: 'dayGridMonth',
    dateSelected: new Date().toISOString(),
    dateFormat: 'YYYY-MM-DD',
    timezone: 'local',
    showHolidays: true,
    holidayCountry: 'en',
    error: null,
    loadPreferences: false,
    viewRange: {
        start: null,
        end: null,
        type: null
    },

    customEvents: [],
    customEventModal: { ...INITIAL_CUSTOM_EVENT_MODAL },
    previewEventId: null,
    loadEvents: false
};

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setCurrentView: (state, action) => {
            state.currentView = action.payload;
        },
        setDateSelected: (state, action) => {
            state.dateSelected = action.payload;
        },
        setDateFormat: (state, action) => {
            state.dateFormat = action.payload;
        },
        setTimezone: (state, action) => {
            state.timezone = action.payload;
        },
        setShowHolidays: (state, action) => {
            state.showHolidays = action.payload;
        },
        setHolidayCountry: (state, action) => {
            state.holidayCountry = action.payload;
        },
        setViewRange: (state, action) => {
            state.viewRange = action.payload;
        },

        // Custom Event Modal
        setPreviewEventId: (state, action) => {
            state.previewEventId = action.payload;
        },
        clearPreviewEvent: (state) => {
            state.previewEventId = null;
        },
        openCustomEventModal: (state, action) => {
            const { mode = 'create', eventId = null, draftRange = { start: null, end: null } } = action.payload || {};

            state.customEventModal = {
                isOpen: true,
                mode,
                eventId,
                draftRange: {
                    start: draftRange.start ?? null,
                    end: draftRange.end ?? null
                }
            };
        },
        closeCustomEventModal: (state) => {
            state.customEventModal = { ...INITIAL_CUSTOM_EVENT_MODAL };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPreferences.pending, (state) => {
                state.loadPreferences = true;
            })
            .addCase(fetchPreferences.fulfilled, (state, action) => {
                state.currentView = action.payload.current_view || state.currentView;
                state.dateSelected = action.payload.current_date || state.dateSelected;
                state.loadPreferences = false;
            })
            .addCase(fetchPreferences.rejected, (state, action) => {
                state.error = action.error.message;
                state.loadPreferences = false;
            })

            .addCase(goToNextPeriodAsync.fulfilled, (state, action) => {
                state.currentView = action.payload.current_view;
                state.dateSelected = action.payload.current_date;
            })

            .addCase(goToPrevPeriodAsync.fulfilled, (state, action) => {
                state.currentView = action.payload.current_view;
                state.dateSelected = action.payload.current_date;
            })

            .addCase(goToTodayAsync.fulfilled, (state, action) => {
                state.currentView = action.payload.current_view;
                state.dateSelected = action.payload.current_date;
            })

            .addCase(changeViews.fulfilled, (state, action) => {
                state.currentView = action.payload.current_view;
                state.dateSelected = action.payload.current_date;
            })
            .addCase(changeViews.rejected, (state, action) => {
                state.error = action.error.message;
            })

            .addCase(createEvent.fulfilled, (state, action) => {
                state.customEvents.push(action.payload);
            })

            .addCase(fetchCustomEvents.pending, (state) => {
                state.loadEvents = true;
            })
            .addCase(fetchCustomEvents.fulfilled, (state, action) => {
                state.customEvents = action.payload;
                state.loadEvents = false;
            })
            .addCase(fetchCustomEvents.rejected, (state, action) => {
                state.error = action.error.message;
                state.loadEvents = false;
            })

            .addCase(deleteEvent.fulfilled, (state, action) => {
                const id = action.payload;
                state.customEvents = state.customEvents.filter((e) => e.id !== id);
            })
            .addCase(deleteEvent.rejected, (state, action) => {
                state.error = action.error.message;
            })

            .addCase(updateEvent.fulfilled, (state, action) => {
                const { id, ...rest } = action.payload;
                state.customEvents = state.customEvents.map((e) => (e.id === id ? { ...e, ...rest } : e));
            })
            .addCase(updateEvent.rejected, (state, action) => {
                state.error = action.error.message;
            });
    }
});

export const {
    setCurrentView,
    setDateSelected,
    setDateFormat,
    setTimezone,
    setShowHolidays,
    setHolidayCountry,
    setViewRange,
    setPreviewEventId,
    clearPreviewEvent,
    openCustomEventModal,
    closeCustomEventModal
} = calendarSlice.actions;

export default calendarSlice.reducer;

// Selectors
export const selectCurrentView = (state) => state.calendar.currentView;
export const selectDateSelected = (state) => state.calendar.dateSelected;
export const selectDateFormat = (state) => state.calendar.dateFormat;
export const selectTimezone = (state) => state.calendar.timezone;
export const selectShowHolidays = (state) => state.calendar.showHolidays;
export const selectHolidayCountry = (state) => state.calendar.holidayCountry;
export const selectViewRange = (state) => state.calendar.viewRange;
export const selectCalendarState = (state) => state.calendar;
export const selectCustomEvents = (state) => state.calendar.customEvents;

export const selectPreviewEvent = (state) => {
    const id = state.calendar.previewEventId;
    if (id == null) return null;
    return state.calendar.customEvents.find((e) => String(e.id) === String(id)) ?? null;
};
