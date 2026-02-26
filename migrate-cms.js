import { createClient } from '@supabase/supabase-js';

const source = { url: 'https://bdvysezpcxhzgxyweuce.supabase.co', key: 'sb_publishable_tWgHMQFi7DkWPhsMUhbo9Q_jML6j0c0' };
const target = { url: 'https://jxdwtefpenasycychwsa.supabase.co', key: 'sb_publishable_d_woy9S7z69eDqf8NfO0Mg_O-RHYmRi' };

async function migrate() {
    const sClient = createClient(source.url, source.key);
    const tClient = createClient(target.url, target.key);

    console.log('Fetching content from BDV...');
    const { data, error: sErr } = await sClient.from('cms_content').select('section_name, content');

    if (sErr) {
        console.error('Source Error:', sErr.message);
        return;
    }

    console.log(`Found ${data.length} sections. Upserting to JXD...`);

    for (const row of data) {
        const { error: tErr } = await tClient
            .from('cms_content')
            .upsert({ section_name: row.section_name, content: row.content }, { onConflict: 'section_name' });

        if (tErr) {
            console.error(`Error in section ${row.section_name}:`, tErr.message);
        } else {
            console.log(`Migrated: ${row.section_name}`);
        }
    }
    console.log('Migration complete!');
}

migrate();
