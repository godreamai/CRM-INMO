import { supabase } from './supabase';
import type { ContentItem, ContentStatus } from './types';

export async function getContentCalendar() {
    const { data, error } = await supabase
        .from('content_calendar')
        .select('*')
        .order('publish_date', { ascending: true });

    if (error) {
        console.error('Error fetching content calendar:', error);
        throw error;
    }

    return data as ContentItem[];
}

export async function createContentItem(item: Omit<ContentItem, 'id'>) {
    const { data, error } = await supabase
        .from('content_calendar')
        .insert([item])
        .select();

    if (error) {
        console.error('Error creating content item:', error);
        throw error;
    }

    return data[0] as ContentItem;
}

export async function createMultipleContentItems(items: Omit<ContentItem, 'id'>[]) {
    const { data, error } = await supabase
        .from('content_calendar')
        .insert(items)
        .select();

    if (error) {
        console.error('Error batch creating content items:', error.message, error.details);
        throw error;
    }

    return data as ContentItem[];
}

export async function updateContentStatus(id: string, status: ContentStatus) {
    const { data, error } = await supabase
        .from('content_calendar')
        .update({ status })
        .eq('id', id)
        .select();

    if (error) {
        console.error('Error updating content status:', error);
        throw error;
    }

    return data[0] as ContentItem;
}

export async function deleteContentItem(id: string) {
    const { error } = await supabase
        .from('content_calendar')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting content item:', error);
        throw error;
    }

    return true;
}
