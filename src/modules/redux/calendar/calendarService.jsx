import { supabase } from '../../../config/supabase/client';

export const CalendarService = {
    async fetchPreferences(userId) {
        const { data, error } = await supabase.from('preferences').select().eq('user_id', userId).maybeSingle();

        if (error) throw error;
        return data;
    },

    async changeViews(userId, view, date = null) {
        const normalizedDate = date ? new Date(date).toISOString() : null;

        const payload = {
            user_id: userId,
            current_view: view,
            current_date: normalizedDate
        };

        const { data, error } = await supabase.from('preferences').upsert(payload, { onConflict: 'user_id' }).select();

        if (error) throw error;
        return data?.[0] || null;
    }
};
