import { createClient } from '@supabase/supabase-js';

const projects = [
    { name: 'JXD (Old)', url: 'https://jxdwtefpenasycychwsa.supabase.co', key: 'sb_publishable_d_woy9S7z69eDqf8NfO0Mg_O-RHYmRi' },
    { name: 'BDV (New)', url: 'https://bdvysezpcxhzgxyweuce.supabase.co', key: 'sb_publishable_tWgHMQFi7DkWPhsMUhbo9Q_jML6j0c0' }
];

async function compare() {
    for (const p of projects) {
        console.log(`--- Checking ${p.name} ---`);
        const supabase = createClient(p.url, p.key);
        const { data: profiles, error: errProf } = await supabase.from('profiles').select('*');
        const { data: cms, error: errCms } = await supabase.from('cms_content').select('section_name');

        if (errProf) console.log(`Profiles: Error ${errProf.message}`);
        else console.log(`Profiles found: ${profiles?.length || 0}`);

        if (errCms) console.log(`CMS: Error ${errCms.message}`);
        else console.log(`CMS Sections: ${cms?.length || 0}`);
    }
}

compare();
