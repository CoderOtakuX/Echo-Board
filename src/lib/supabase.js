import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qtvmgrakhblkbesaywkc.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseKey) {
    console.error('[Supabase] Missing API Key! Please set VITE_SUPABASE_ANON_KEY in your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey || 'MISSING_KEY');
