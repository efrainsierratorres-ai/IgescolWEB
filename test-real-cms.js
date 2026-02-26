import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bdvysezpcxhzgxyweuce.supabase.co';
const supabaseAnonKey = 'sb_publishable_tWgHMQFi7DkWPhsMUhbo9Q_jML6j0c0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkMore() {
    console.log('Checking REAL project tables...');
    const { data: proj, error: err1 } = await supabase.from('projects').select('*');
    const { data: prof, error: err2 } = await supabase.from('profiles').select('*');

    if (err1) console.error('Projects Error:', err1.message);
    else console.log('Projects found:', proj.length);

    if (err2) console.error('Profiles Error:', err2.message);
    else console.log('Profiles found:', prof.length);

    const { data: cms } = await supabase.from('cms_content').select('section_name, content').eq('section_name', 'header').single();
    if (cms) console.log('Header content exists:', Object.keys(cms.content).join(', '));
}

checkMore();
