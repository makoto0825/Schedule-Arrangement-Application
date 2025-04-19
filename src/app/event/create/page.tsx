import React from 'react';
import { createClient } from '@/app/utils/supabase/server';
import CreateEvent from './CreateEvent';

const page = async () => {
  const supabase = await createClient();
  const { data: sessionData } = await supabase.auth.getSession();
  return (
      <CreateEvent userId={sessionData.session?.user.id || ''} />
  );
};

export default page;
