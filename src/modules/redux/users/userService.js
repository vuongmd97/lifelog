import { supabase } from "../../../config/supabase/client";

export const UserService = {
  async fetchUserProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user.id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async upsertProfiles(profileData) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        ...profileData,
      })
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },
};
