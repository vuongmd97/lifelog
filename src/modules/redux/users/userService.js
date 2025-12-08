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
    },

    async updatePassword(newPassword) {
        const { error } = await supabase.auth.updateUser({
            password: newPassword
        });

        if (error) throw error;
        return true;
    },

    async uploadAvatar(file, userId) {
        const fileName = `${userId}/avatar.jpg`;

        const { data, error } = await supabase.storage.from('avatars').upload(fileName, file, {
            contentType: file.type,
            upsert: true
        });

        if (error) throw error;

        const {
            data: { publicUrl }
        } = supabase.storage.from('avatars').getPublicUrl(data.path);

        return `${publicUrl}?t=${Date.now()}`;
    }
};
