import React from 'react';
import Dashboard from './Dashbord';
import { createClient } from '@/app/utils/supabase/server';
const page = async () => {
  const supabase = await createClient();
  const { data: sessionData } = await supabase.auth.getSession();
  return <Dashboard userId={sessionData.session?.user.id || ''} />;
};

export default page;
