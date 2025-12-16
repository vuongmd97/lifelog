export const HOLIDAY_CALENDARS = {
    VN: {
        id: 'vi.vietnamese#holiday@group.v.calendar.google.com',
        name: 'Holidays in Vietnam',
        color: '#dc2626'
    },
    US: {
        id: 'en.usa#holiday@group.v.calendar.google.com',
        name: 'Holidays in United States',
        color: '#2563eb'
    }
};

export const DAYS_OF_WEEK = [0, 1, 2, 3, 4, 5, 6];

export const GOOGLE_CALENDAR_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const CALENDAR_MODES = {
    DAY_GRID_MONTH: 'dayGridMonth',
    DAY_GRID_WEEK: 'dayGridWeek',
    DAY_GRID_DAY: 'dayGridDay'
};
