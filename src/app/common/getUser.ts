//supabaseからユーザー情報を取得したい
import { createClient } from '@/app/utils/supabase/server';

export const getUser = async () => {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  return user;
};
