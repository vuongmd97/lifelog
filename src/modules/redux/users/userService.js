import { supabase } from '../../../config/supabase/client';

export const UserService = {
    async fetchUserProfile(userId) {
        const { data, error } = await supabase.from('profiles').select().eq('id', userId).maybeSingle();

        if (error) throw error;
        return data;
    },

    async upsertProfiles(profileData, userId) {
        const { data, error } = await supabase
            .from('profiles')
            .upsert({
                id: userId,
                ...profileData
            })
            .select()
            .maybeSingle();

        if (error) throw error;
        return data;
    }
};
