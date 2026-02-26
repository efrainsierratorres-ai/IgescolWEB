import { createClient } from '@supabase/supabase-js';

const p = { url: 'https://jxdwtefpenasycychwsa.supabase.co', key: 'sb_publishable_d_woy9S7z69eDqf8NfO0Mg_O-RHYmRi' };
const supabase = createClient(p.url, p.key);

async function check() {
    const { data: profiles } = await supabase.from('profiles').select('*');
    console.log('Profiles in JXD:', JSON.stringify(profiles, null, 2));
}

check();
