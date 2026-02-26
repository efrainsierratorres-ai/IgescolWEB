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

    const updateContent = async (sectionName, newContent) => {
        try {
            const { error } = await supabase
                .from('cms_content')
                .update({ content: newContent })
                .eq('section_name', sectionName);
            if (error) throw error;
            setContent(prev => ({ ...prev, [sectionName]: newContent }));
            return { success: true };
        } catch (err) {
            console.error('Error updating CMS content:', err);
            return { success: false, error: err };
        }
    };

    useEffect(() => {
        fetchCMS();
    }, [fetchCMS]);

    return { content, loading, error, refresh: fetchCMS, updateContent };
}
