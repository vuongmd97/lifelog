import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CalendarService } from './calendarService';

const initialState = {
    currentView: 'dayGridMonth',
    dateSelected: new Date().toISOString(),
    dateFormat: 'YYYY-MM-DD',
    timezone: 'local',
    showHolidays: true,
    holidayCountry: 'VN'
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
        goToToday: (state) => {
            state.dateSelected = new Date().toISOString();
        },
        goToNextPeriod: (state) => {
            const date = new Date(state.dateSelected);

            switch (state.currentView) {
                case 'dayGridMonth': {
                    date.setMonth(date.getMonth() + 1);
                    break;
                }
                case 'timeGridWeek': {
                    date.setDate(date.getDate() + 7);
                    break;
                }
                case 'timeGridDay': {
                    date.setDate(date.getDate() + 1);
                    break;
                }
            }

            state.dateSelected = date.toISOString();
        },
        goToPrevPeriod: (state) => {
            const date = new Date(state.dateSelected);

            switch (state.currentView) {
                case 'dayGridMonth': {
                    date.setMonth(date.getMonth() - 1);
                    break;
                }
                case 'timeGridWeek': {
                    date.setDate(date.getDate() - 7);
                    break;
                }
                case 'timeGridDay': {
                    date.setDate(date.getDate() - 1);
                    break;
                }
            }

            state.dateSelected = date.toISOString();
        }
    },
    extraReducers: () => {}
});

export const {
    setCurrentView,
    setDateSelected,
    setDateFormat,
    setTimezone,
    setShowHolidays,
    setHolidayCountry,
    goToToday,
    goToNextPeriod,
    goToPrevPeriod
} = calendarSlice.actions;

export default calendarSlice.reducer;

// Selectors
export const selectCurrentView = (state) => state.calendar.currentView;
export const selectDateSelected = (state) => state.calendar.dateSelected;
export const selectDateFormat = (state) => state.calendar.dateFormat;
export const selectTimezone = (state) => state.calendar.timezone;
export const selectShowHolidays = (state) => state.calendar.showHolidays;
export const selectHolidayCountry = (state) => state.calendar.holidayCountry;
export const selectCalendarState = (state) => state.calendar;
