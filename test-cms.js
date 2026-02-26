import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://jxdwtefpenasycychwsa.supabase.co';
const supabaseAnonKey = 'sb_publishable_d_woy9S7z69eDqf8NfO0Mg_O-RHYmRi';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkLeads() {
    const { data, error } = await supabase.from('leads').select('*').limit(1);
    if (error) console.error(error);
    else console.log('Leads found:', data.length);
}
checkLeads();
