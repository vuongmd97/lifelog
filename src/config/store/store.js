import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../modules/auth/authSlice';
import calendarReducer from '../../modules/redux/calendar/calendarSlice';
import userReducer from '../../modules/redux/users/userSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        calendar: calendarReducer,
        user: userReducer
    }
});
