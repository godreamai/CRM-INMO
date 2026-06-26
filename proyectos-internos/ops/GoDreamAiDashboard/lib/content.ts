import { supabase } from './supabase';
import type { ContentItem, ContentEstado } from './types';

export async function getContentCalendar() {
    const { data, error } = await supabase
        .from('content_calendar')
        .select('*')
        .order('fecha_publicacion', { ascending: true });

    if (error) throw error;
    return data as ContentItem[];
}

export async function getContentCalendarByMonth(year: number, month: number) {
    const firstDay = `${year}-${String(month + 1).padStart(2, '0')}-01`;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const lastDay = `${year}-${String(month + 1).padStart(2, '0')}-${String(daysInMonth).padStart(2, '0')}`;

    const { data, error } = await supabase
        .from('content_calendar')
        .select('*')
        .gte('fecha_publicacion', firstDay)
        .lte('fecha_publicacion', lastDay)
        .order('fecha_publicacion', { ascending: true });

    if (error) throw error;
    return data as ContentItem[];
}

export async function createContentItem(item: Omit<ContentItem, 'id' | 'created_at'>) {
    const { data, error } = await supabase
        .from('content_calendar')
        .insert([item])
        .select();

    if (error) throw error;
    return data[0] as ContentItem;
}

export async function updateContentEstado(id: string, estado: ContentEstado) {
    const { data, error } = await supabase
        .from('content_calendar')
        .update({ estado })
        .eq('id', id)
        .select();

    if (error) throw error;
    return data[0] as ContentItem;
}

export async function createMultipleContentItems(items: Omit<ContentItem, 'id' | 'created_at'>[]) {
    const { data, error } = await supabase
        .from('content_calendar')
        .insert(items)
        .select();

    if (error) throw error;
    return data as ContentItem[];
}

export async function updateContentItem(id: string, updates: Partial<Omit<ContentItem, 'id' | 'created_at'>>) {
    const { data, error } = await supabase
        .from('content_calendar')
        .update(updates)
        .eq('id', id)
        .select();

    if (error) throw error;
    return data[0] as ContentItem;
}

export async function deleteContentItem(id: string) {
    const { error } = await supabase
        .from('content_calendar')
        .delete()
        .eq('id', id);

    if (error) throw error;
    return true;
}
