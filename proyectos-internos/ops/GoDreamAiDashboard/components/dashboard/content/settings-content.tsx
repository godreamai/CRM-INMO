"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  User,
  Bell,
  Lock,
  Palette,
  Users,
  Zap,
  ChevronRight,
  Save,
  Clock,
  AlertTriangle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getAlertSettings,
  updateAlertSetting,
  updateAlertMessage,
  deleteAlertSetting,
  createAlertSetting
} from "@/lib/opportunities";
import { OPPORTUNITY_STATE_LABELS } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";

export function SettingsContent() {
  const [settings, setSettings] = useState<any[]>([]);
  const [draftMessages, setDraftMessages] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  // Create Alert State
  const [isCreating, setIsCreating] = useState(false);
  const [newState, setNewState] = useState("");
  const [newDays, setNewDays] = useState(3);
  const [newMessage, setNewMessage] = useState("");

  const loadSettings = async () => {
    try {
      const data = await getAlertSettings();
      setSettings(data);
      const drafts: Record<string, string> = {};
      data.forEach((s: any) => drafts[s.state] = s.alert_message || "");
      setDraftMessages(drafts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleUpdateLimit = async (state: string, days: number) => {
    setSaving(state + "_limit");
    try {
      await updateAlertSetting(state, days);
      setSettings(prev => prev.map(s => s.state === state ? { ...s, days_limit: days } : s));
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(null);
    }
  };

  const handleBlur = (state: string, value: string) => {
    if (!value.trim()) {
      setErrors(prev => ({ ...prev, [state]: "El mensaje no puede estar vacío" }));
    } else {
      setErrors(prev => {
        const next = { ...prev };
        delete next[state];
        return next;
      });
    }
  };

  const handleSaveMessage = async (state: string) => {
    const message = draftMessages[state];
    if (!message || !message.trim()) {
      setErrors(prev => ({ ...prev, [state]: "El mensaje no puede estar vacío" }));
      return;
    }

    setSaving(state + "_msg");
    try {
      await updateAlertMessage(state, message);
      setSettings(prev => prev.map(s => s.state === state ? { ...s, alert_message: message } : s));
      setErrors(prev => {
        const next = { ...prev };
        delete next[state];
        return next;
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(null);
    }
  };

  const handleDelete = async (state: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar la configuración para ${state}?`)) return;
    setSaving(state + "_del");
    try {
      await deleteAlertSetting(state);
      setSettings(prev => prev.filter(s => s.state !== state));
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(null);
    }
  };

  const handleCreate = async () => {
    if (!newState || !newMessage.trim()) {
      alert("Por favor selecciona un estado y escribe un mensaje.");
      return;
    }
    setSaving("creating");
    try {
      await createAlertSetting(newState, newDays, newMessage);
      await loadSettings();
      setIsCreating(false);
      setNewState("");
      setNewMessage("");
    } catch (err) {
      console.error(err);
      alert("Error al crear la alerta. Es posible que ya exista una para ese estado.");
    } finally {
      setSaving(null);
    }
  };

  const availableStates = Object.keys(OPPORTUNITY_STATE_LABELS).filter(
    state => !settings.some(s => s.state === state)
  );

  return (
    <div className="max-w-4xl space-y-6 pb-20">
      {/* Sales Alerts Configuration */}
      <div className="bg-card rounded-[32px] border border-border p-8 shadow-xl shadow-slate-200/50">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/10 rounded-2xl">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="text-xl font-black text-foreground tracking-tight">Configuración de Alertas</h3>
              <p className="text-sm text-muted-foreground">Gestiona tus reglas de seguimiento inteligente.</p>
            </div>
          </div>
          <Button
            onClick={() => setIsCreating(true)}
            className="rounded-2xl gap-2 font-black text-xs uppercase"
            disabled={availableStates.length === 0}
          >
            <Plus className="w-4 h-4" />
            Nueva Regla
          </Button>
        </div>

        {isCreating && (
          <div className="mb-8 p-6 bg-primary/5 border border-primary/20 rounded-[28px] animate-in slide-in-from-top-4 duration-300">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-1">Estado</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-border/50 text-sm font-bold shadow-sm"
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                  >
                    <option value="">Seleccionar...</option>
                    {availableStates.map(state => (
                      <option key={state} value={state}>
                        {(OPPORTUNITY_STATE_LABELS as any)[state]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-1">Días de Límite</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-border/50 text-sm font-bold shadow-sm"
                    value={newDays}
                    onChange={(e) => setNewDays(parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-1">Mensaje Personalizado</label>
                <input
                  type="text"
                  placeholder="Ej: Este cliente necesita seguimiento urgente..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-border/50 text-sm font-medium shadow-sm"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3 mt-2">
                <Button variant="ghost" onClick={() => setIsCreating(false)} className="rounded-xl">Cancelar</Button>
                <Button onClick={handleCreate} className="rounded-xl px-8" disabled={saving === "creating"}>
                  {saving === "creating" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Crear Alerta"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary/20" />
          </div>
        ) : (
          <div className="grid gap-6">
            {settings.length === 0 && !isCreating && (
              <div className="text-center py-12 bg-muted/10 rounded-[28px] border border-dashed border-border">
                <p className="text-sm text-muted-foreground font-medium">No hay reglas configuradas. ¡Crea la primera!</p>
              </div>
            )}
            {settings.map((setting) => (
              <div
                key={setting.state}
                className="p-6 bg-muted/20 rounded-[24px] border border-transparent hover:border-border/50 transition-all space-y-4 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-border/50 flex items-center justify-center font-black text-[10px] text-primary uppercase">
                      {setting.state.slice(0, 3)}
                    </div>
                    <div>
                      <p className="font-black text-foreground text-sm uppercase tracking-wider">
                        {(OPPORTUNITY_STATE_LABELS as any)[setting.state] || setting.state}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">Días Límite</span>
                      <div className="flex items-center bg-white rounded-xl border border-border/50 overflow-hidden shadow-sm">
                        <button
                          className="px-3 py-1.5 hover:bg-muted/50 text-foreground font-bold"
                          onClick={() => handleUpdateLimit(setting.state, Math.max(1, setting.days_limit - 1))}
                        >-</button>
                        <span className="w-10 text-center font-black text-sm">{setting.days_limit}</span>
                        <button
                          className="px-3 py-1.5 hover:bg-muted/50 text-foreground font-bold"
                          onClick={() => handleUpdateLimit(setting.state, setting.days_limit + 1)}
                        >+</button>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(setting.state)}
                      className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {saving === setting.state + "_limit" && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
                    {saving === setting.state + "_del" && <Loader2 className="w-4 h-4 animate-spin text-rose-500" />}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Mensaje de Alerta</label>
                    {errors[setting.state] && (
                      <span className="text-[10px] font-bold text-rose-500 animate-pulse">{errors[setting.state]}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={draftMessages[setting.state] || ""}
                      onChange={(e) => setDraftMessages(prev => ({ ...prev, [setting.state]: e.target.value }))}
                      onBlur={(e) => handleBlur(setting.state, e.target.value)}
                      placeholder={`Ej: Lead estancado en ${setting.state}...`}
                      className={cn(
                        "flex-1 px-4 py-3 rounded-xl bg-white border text-sm font-medium focus:outline-none focus:ring-2 transition-all shadow-sm",
                        errors[setting.state] ? "border-rose-500 ring-rose-500/10" : "border-border/50 focus:ring-primary/20"
                      )}
                    />
                    <Button
                      size="sm"
                      className="rounded-xl h-auto px-4 font-black text-[11px] uppercase tracking-wider"
                      onClick={() => handleSaveMessage(setting.state)}
                      disabled={saving === setting.state + "_msg"}
                    >
                      {saving === setting.state + "_msg" ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Guardar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Integration Settings (Simplified) */}
      <div className="bg-card rounded-[32px] border border-border p-8 shadow-sm">
        <h3 className="text-lg font-black text-foreground mb-6 uppercase tracking-widest">Ajustes de Sistema</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-muted/20 border border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-bold">Email Notifications</span>
            </div>
            <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
              <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-muted/20 border border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-bold">Collaborative Mode</span>
            </div>
            <div className="w-10 h-5 bg-border rounded-full relative">
              <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
