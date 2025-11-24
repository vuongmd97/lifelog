import { supabase } from '../../config/supabase/client';
import { setSession } from './authSlice';

export function initAuthListener(store) {
    // Get the current session when the app initializes
    supabase.auth.getSession().then(({ data: { session } }) => {
        store.dispatch(setSession({ session }));
    });

    // Subscribe to auth state changes (login, logout, token refresh)
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
        store.dispatch(setSession({ session }));
    });

    return () => subscription.subscription.unsubscribe();
}
