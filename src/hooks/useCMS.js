import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useCMS() {
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCMS = useCallback(async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('cms_content')
                .select('section_name, content');

            if (error) throw error;

            const cmsData = data.reduce((acc, item) => {
                acc[item.section_name] = item.content;
                return acc;
            }, {});

            setContent(cmsData);
        } catch (err) {
            console.error('Error fetching CMS content:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCMS();
    }, [fetchCMS]);

    return { content, loading, error, refresh: fetchCMS };
}
