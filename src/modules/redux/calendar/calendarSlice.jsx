import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CalendarService } from './calendarService';

export const fetchPreferences = createAsyncThunk('calendar/fetchPreferences', async (_, { getState }) => {
    const userId = getState().auth.userId;
    const data = await CalendarService.fetchPreferences(userId);
    return data;
});

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

const initialState = {
    currentView: 'dayGridMonth',
    dateSelected: new Date().toISOString(),
    dateFormat: 'YYYY-MM-DD',
    timezone: 'local',
    showHolidays: true,
    holidayCountry: 'VN',
    error: null,
    loadPreferences: false
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
                state.dateSelected = action.payload.current_date || state.dateSelected;
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
            });
    }
});

export const { setCurrentView, setDateSelected, setDateFormat, setTimezone, setShowHolidays, setHolidayCountry } =
    calendarSlice.actions;

export default calendarSlice.reducer;

// Selectors
export const selectCurrentView = (state) => state.calendar.currentView;
export const selectDateSelected = (state) => state.calendar.dateSelected;
export const selectDateFormat = (state) => state.calendar.dateFormat;
export const selectTimezone = (state) => state.calendar.timezone;
export const selectShowHolidays = (state) => state.calendar.showHolidays;
export const selectHolidayCountry = (state) => state.calendar.holidayCountry;
export const selectCalendarState = (state) => state.calendar;
