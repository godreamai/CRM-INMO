import { supabase } from './supabase';
import type { DecisionMaker, OpportunityState, OpportunityNote } from './types';

export interface GetOpportunitiesParams {
    page?: number;
    pageSize?: number;
    search?: string;
    state?: OpportunityState | string;
    sdrAssigned?: string[];
    jobTitles?: string[];
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
}

export async function getOpportunities({
    page = 1,
    pageSize = 10,
    search = '',
    state = '',
    sdrAssigned = [],
    jobTitles = [],
    orderBy = 'created_at',
    orderDirection = 'desc'
}: GetOpportunitiesParams) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // We select decision_makers and join with businesses
    let query = supabase
        .from('decision_makers')
        .select(`
      *,
      businesses (*)
    `, { count: 'exact' });

    if (search) {
        // Search in name or company domain
        query = query.or(`full_name.ilike.%${search}%,first_name.ilike.%${search}%,last_name.ilike.%${search}%,company_domain.ilike.%${search}%`);
    }

    if (state) {
        query = query.eq('state', state);
    }

    if (sdrAssigned.length > 0) {
        const hasUnassigned = sdrAssigned.includes('unassigned');
        const namedSdrs = sdrAssigned.filter(s => s !== 'unassigned');

        if (hasUnassigned && namedSdrs.length > 0) {
            query = query.or(`sdr_assigned.is.null,sdr_assigned.in.(${namedSdrs.join(',')})`);
        } else if (hasUnassigned) {
            query = query.is('sdr_assigned', null);
        } else {
            query = query.in('sdr_assigned', namedSdrs);
        }
    }

    if (jobTitles.length > 0) {
        query = query.in('job_title', jobTitles);
    }

    // Handle multi-level sort if needed, but for now simple
    query = query.order(orderBy, { ascending: orderDirection === 'asc' });

    // Pagination
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
        console.error('Error fetching opportunities:', error);
        throw error;
    }

    return {
        data: data as DecisionMaker[],
        count: count || 0,
        page,
        pageSize,
        totalPages: Math.ceil((count || 0) / pageSize)
    };
}

export async function getOpportunityCounts() {
    try {
        const { data, error } = await supabase
            .from('decision_makers')
            .select('state');

        if (error || !data) {
            console.error('Error fetching opportunity counts:', error);
            return {};
        }

        const counts: Record<string, number> = {};
        data.forEach((item) => {
            if (item.state) {
                counts[item.state] = (counts[item.state] || 0) + 1;
            }
        });

        return counts;
    } catch (err) {
        console.error("Error in getOpportunityCounts:", err);
        return {};
    }
}

export async function getJobTitles() {
    try {
        const { data, error } = await supabase
            .from('decision_makers')
            .select('job_title')
            .not('job_title', 'is', null);

        if (error || !data) {
            console.error('Error fetching job titles:', error);
            return [];
        }

        // Return unique job titles sorted
        const titles = Array.from(new Set(data.map(item => item.job_title))).filter(Boolean) as string[];
        return titles.sort();
    } catch (err) {
        console.error("Error in getJobTitles:", err);
        return [];
    }
}

export async function getSdrs() {
    try {
        const { data, error } = await supabase
            .from('decision_makers')
            .select('sdr_assigned')
            .not('sdr_assigned', 'is', null);

        if (error || !data) {
            console.error('Error fetching SDRs:', error);
            return [];
        }

        // Return unique SDRs sorted
        const sdrs = Array.from(new Set(data.map(item => item.sdr_assigned))).filter(Boolean) as string[];
        return sdrs.sort();
    } catch (err) {
        console.error("Error in getSdrs:", err);
        return [];
    }
}

export async function updateOpportunityState(id: string, newState: OpportunityState, userId?: string) {
    // 1. Get current state first for history
    const { data: currentData } = await supabase
        .from('decision_makers')
        .select('state')
        .eq('id', id)
        .single();

    const oldState = currentData?.state;

    // 2. Update state
    const { data, error } = await supabase
        .from('decision_makers')
        .update({ state: newState })
        .eq('id', id)
        .select();

    if (error) {
        console.error('Error updating opportunity state:', error);
        throw error;
    }

    // 3. Log to history (don't await to not block UI)
    if (oldState !== newState) {
        supabase
            .from('opportunity_history')
            .insert({
                opportunity_id: id,
                old_state: oldState,
                new_state: newState,
                user_id: userId,
                changed_by: userId ? undefined : 'Dashboard UI'
            })
            .then(({ error: historyError }) => {
                if (historyError) console.error('Error logging history:', historyError);
            });
    }

    return data;
}

export async function getRecentActivity(limit = 10) {
    try {
        const { data, error } = await supabase
            .from('recent_activity_view')
            .select('*')
            .limit(limit);

        if (error) throw error;
        return data || [];
    } catch (err) {
        console.error("Error fetching activity:", err);
        return [];
    }
}

export async function getRealMetrics() {
    try {
        const { data, error } = await supabase
            .from('decision_makers')
            .select('state');

        if (error || !data) return {
            totalOpportunities: 0,
            schedulingRate: 0,
            closingRate: 0,
            unqualifiedRate: 0,
            totalInFlow: 0
        };

        const total = data.length;
        const counts = data.reduce((acc: any, item) => {
            acc[item.state] = (acc[item.state] || 0) + 1;
            return acc;
        }, {});

        return {
            totalOpportunities: total,
            schedulingRate: total > 0 ? ((counts['agenda'] || 0) / total) * 100 : 0,
            closingRate: total > 0 ? ((counts['cliente'] || 0) / total) * 100 : 0,
            unqualifiedRate: total > 0 ? ((counts['descalificado'] || 0) / total) * 100 : 0,
            totalInFlow: total - (counts['rechazado'] || 0) - (counts['descalificado'] || 0)
        };
    } catch (err) {
        console.error("Error in getRealMetrics:", err);
        return {
            totalOpportunities: 0,
            schedulingRate: 0,
            closingRate: 0,
            unqualifiedRate: 0,
            totalInFlow: 0
        };
    }
}

export async function getPriorityAlerts() {
    try {
        // This fetches leads that are in a state longer than their limit
        const { data: settings, error: settingsError } = await supabase.from('alert_settings').select('*');
        const { data: opportunities, error: oppsError } = await supabase
            .from('decision_makers')
            .select('id, full_name, state, created_at');

        if (settingsError || oppsError || !settings || !opportunities) return [];

        const alerts: any[] = [];
        const now = new Date();

        // Optimized: Fetch all history in one go to avoid N queries
        const { data: history } = await supabase
            .from('opportunity_history')
            .select('opportunity_id, changed_at')
            .order('changed_at', { ascending: false });

        for (const opp of opportunities) {
            const setting = settings.find(s => s.state === opp.state);
            if (setting) {
                // Find latest change for this opportunity in history
                const lastChange = history?.find(h => h.opportunity_id === opp.id);

                const lastDate = lastChange ? new Date(lastChange.changed_at) : new Date(opp.created_at);
                const diffDays = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

                if (diffDays >= setting.days_limit) {
                    alerts.push({
                        opportunity_id: opp.id,
                        full_name: opp.full_name,
                        state: opp.state,
                        daysInactive: diffDays,
                        severity: setting.severity,
                        limit: setting.days_limit,
                        message: setting.alert_message || `Lead estancado en ${opp.state}`
                    });
                }
            }
        }

        return alerts.sort((a, b) => b.daysInactive - a.daysInactive);
    } catch (err) {
        console.error("Error in getPriorityAlerts:", err);
        return [];
    }
}

export async function getAlertSettings() {
    const { data, error } = await supabase.from('alert_settings').select('*');
    if (error) throw error;
    return data || [];
}

export async function updateAlertSetting(state: string, days: number) {
    const { data, error } = await supabase
        .from('alert_settings')
        .update({ days_limit: days })
        .eq('state', state);
    if (error) throw error;
    return data;
}

export async function updateAlertMessage(state: string, message: string) {
    const { data, error } = await supabase
        .from('alert_settings')
        .update({ alert_message: message })
        .eq('state', state);
    if (error) throw error;
    return data;
}

export async function deleteAlertSetting(state: string) {
    const { error } = await supabase
        .from('alert_settings')
        .delete()
        .eq('state', state);
    if (error) throw error;
}

export async function createAlertSetting(state: string, days: number, message: string, severity: 'low' | 'medium' | 'high' = 'medium') {
    const { data, error } = await supabase
        .from('alert_settings')
        .insert({
            state,
            days_limit: days,
            alert_message: message,
            severity
        })
        .select();
    if (error) throw error;
    return data;
}
export function extractLinkedInHandle(url: string | null): string | null {
    if (!url) return null;
    
    // Remove query parameters
    let cleaned = url.split('?')[0];
    
    // Remove trailing slash
    if (cleaned.endsWith('/')) {
        cleaned = cleaned.slice(0, -1);
    }
    
    // Attempt to get the part after /in/
    const match = cleaned.match(/\/in\/([^\/]+)/i);
    if (match && match[1]) {
        return match[1].toLowerCase();
    }
    
    // If it doesn't match the pattern but starts with https, it might be a malformed URL
    // If it doesn't have slashes, it might be the handle itself
    if (!cleaned.includes('/')) {
        return cleaned.toLowerCase();
    }
    
    return cleaned.toLowerCase();
}

export async function getOpportunityNotes(opportunityId: string): Promise<OpportunityNote[]> {
    const { data, error } = await supabase
        .from('opportunity_notes')
        .select('*')
        .eq('opportunity_id', opportunityId)
        .order('created_at', { ascending: true });
    if (error) throw error;
    return (data || []) as OpportunityNote[];
}

export async function createOpportunityNote({
    opportunity_id,
    text,
    user_id,
    user_name,
}: {
    opportunity_id: string;
    text: string;
    user_id: string | null;
    user_name: string;
}): Promise<OpportunityNote> {
    const { data, error } = await supabase
        .from('opportunity_notes')
        .insert({ opportunity_id, text, user_id, user_name })
        .select()
        .single();
    if (error) throw error;
    return data as OpportunityNote;
}

export async function createOpportunity(opportunity: Partial<DecisionMaker>) {
    // 1. Extract handle for matching and storage as requested
    const handle = extractLinkedInHandle(opportunity.linkedin_profile || null);
    
    if (handle) {
        // Search for records that contain the same handle
        const { data: existing } = await supabase
            .from('decision_makers')
            .select('id, full_name')
            .ilike('linkedin_profile', `%${handle}%`)
            .maybeSingle();

        if (existing) {
            throw new Error(`Esta oportunidad ya existe (Lead: ${existing.full_name})`);
        }
    }

    const { data, error } = await supabase
        .from('decision_makers')
        .insert({
            ...opportunity,
            linkedin_profile: handle || opportunity.linkedin_profile, // Save only the handle
            state: 'nuevo',
            created_at: new Date().toISOString()
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating opportunity:', error);
        throw error;
    }

    return data;
}
