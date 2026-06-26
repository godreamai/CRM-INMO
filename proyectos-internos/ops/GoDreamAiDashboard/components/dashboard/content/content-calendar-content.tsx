"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft, ChevronRight, Video, Layout, Image, FileText, Linkedin,
  Plus, Loader2, Trash2, ChevronDown, ArrowUpDown, ArrowUp, ArrowDown,
  Search, FileEdit, Upload, CheckCircle2, XCircle, Wand2, Copy, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  getContentCalendarByMonth, createContentItem, createMultipleContentItems,
  updateContentEstado, updateContentItem, deleteContentItem,
} from "@/lib/content";
import type { ContentItem, ContentTipo, ContentPilar, ContentEstado, ContentFormato } from "@/lib/types";

// ─── Config ───────────────────────────────────────────────────────────────────

const TIPO_CONFIG: Record<ContentTipo, { label: string; color: string; dot: string; icon: React.ReactNode }> = {
  reel:          { label: "Reel",         color: "bg-chart-1/15 text-chart-1",       dot: "bg-chart-1",       icon: <Video    className="w-3 h-3" /> },
  carrusel:      { label: "Carrusel",     color: "bg-chart-2/15 text-chart-2",       dot: "bg-chart-2",       icon: <Layout   className="w-3 h-3" /> },
  historia:      { label: "Historia",     color: "bg-chart-3/15 text-chart-3",       dot: "bg-chart-3",       icon: <Image    className="w-3 h-3" /> },
  post_ig:       { label: "Post IG",      color: "bg-chart-4/15 text-chart-4",       dot: "bg-chart-4",       icon: <FileText className="w-3 h-3" /> },
  post_linkedin: { label: "LinkedIn",     color: "bg-violet-500/15 text-violet-500", dot: "bg-violet-500",    icon: <Linkedin className="w-3 h-3" /> },
};

const PILAR_CONFIG: Record<ContentPilar, { label: string; color: string }> = {
  DOLOR:         { label: "Dolor",        color: "bg-rose-500/10 text-rose-500"     },
  TRANSFORMACION:{ label: "Transf.",      color: "bg-emerald-500/10 text-emerald-600" },
  AUTORIDAD:     { label: "Autoridad",    color: "bg-blue-500/10 text-blue-500"     },
  OBJECION:      { label: "Objeción",     color: "bg-amber-500/10 text-amber-600"   },
  FUNDADOR:      { label: "Fundador",     color: "bg-purple-500/10 text-purple-600" },
};

const ESTADO_CONFIG: Record<ContentEstado, { label: string; styles: string }> = {
  borrador: { label: "Borrador", styles: "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20" },
  aprobado: { label: "Aprobado", styles: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"   },
  publicado:{ label: "Publicado",styles: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" },
};

const FORMATO_LABELS: Record<ContentFormato, string> = {
  cara_camara:      "Cara a cámara",
  pantalla:         "Pantalla",
  carrusel_diseno:  "Carrusel diseño",
  solo_texto:       "Solo texto",
};

const DAY_LABELS    = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MONTH_NAMES   = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstWeekday(y: number, m: number) {
  const d = new Date(y, m, 1).getDay();
  return d === 0 ? 6 : d - 1;
}
function toDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}
function todayStr() {
  const d = new Date();
  return toDateStr(d.getFullYear(), d.getMonth(), d.getDate());
}
function truncate(s: string | null | undefined, n: number) {
  if (!s) return "-";
  return s.length <= n ? s : s.slice(0, n) + "…";
}

// ─── Empty form ───────────────────────────────────────────────────────────────

const EMPTY_FORM = {
  tipo:               "reel" as ContentTipo,
  pilar:              "DOLOR" as ContentPilar,
  fecha_publicacion:  "",
  estado:             "borrador" as ContentEstado,
  hook:               "",
  agitacion:          "",
  reencuadre:         "",
  sistema:            "",
  cta:                "",
  caption:            "",
  hashtags:           [] as string[],
  descripcion_visual: "",
  formato_produccion: null as ContentFormato | null,
  guion:              "",
  duracion_seg:       null as number | null,
  slides:             null,
  secuencia:          null,
  imagen_url:         "",
  prompt_imagen:      "",
};

// ─── Brief assembler ─────────────────────────────────────────────────────────

const BRIEF_SYSTEM_PROMPT = `# ROL
Sos un diseñador UI/UX experto en contenido visual para redes sociales con ojo crítico de art director.
Sabés cuándo una imagen está sobrecargada y cuándo comunica con claridad. Tu estándar es alto: cada pieza tiene que funcionar sola, sin explicación.
Tu tarea es crear Historias y Carruseles de Instagram que se vean reales, publicables y con intención.
El objetivo del contenido es mostrar un dolor real o educar — no vender. Las piezas tienen que resonar, no convencer.

# IMÁGENES DE REFERENCIA
Te voy a pasar imágenes de referencia. Usálas para:
1. Replicar el esquema de color y diseño exacto (fondo, texto, acentos) — no impongas tu propio palette
2. Crear mi avatar visual con mi cara, estructura facial, pelo, tono de piel, edad y contextura exactos
No mezcles estilos entre referencias. Si todas las referencias son de un color de fondo, usá ese. Si son de otro, usá ese.

# CRITERIO DE DISEÑO (UI/UX)
- Menos es más. Si una pieza puede comunicar con menos elementos, hacelo con menos.
- Jerarquía visual clara: el ojo del lector tiene que saber qué leer primero sin esfuerzo.
- No cargues la imagen con texto. Máximo 1 frase principal por pieza, corta y fuerte.
- No agregues objetos decorativos que no suman. Cada elemento tiene que justificar su presencia.
- Espaciado generoso. Respiración visual. Sin apilar elementos.
- Si la pieza se ve "llena", sacá algo — nunca agregues más.

# FORMATO
## Historias: 9:16 vertical, 1080x1920. Dejar espacio arriba (interfaz IG) y abajo (stickers/respuestas).
## Carruseles: cuadrado o vertical. Una idea clara por slide. Continuidad visual entre carillas.

# ESTILO GENERAL
Realista · Moderno · Limpio · Profesional pero cercano · Natural · Buena iluminación.
NO: publicidad barata · imagen de stock · diseño de Canva genérico · flyer corporativo · escena exagerada · texto apilado.

# TIPOGRAFÍA
Bebas Neue (títulos / frase principal) · DM Sans (cuerpo / texto secundario)
El texto no tapa la cara. Siempre con buena jerarquía y contraste legible sobre el fondo que surge de la referencia.

# TONO SEGÚN PILAR
- DOLOR: expresión preocupada, pensativa, de duda
- TRANSFORMACION: expresión de alivio, seguridad, contraste antes/después
- AUTORIDAD: mirada firme, postura profesional, datos en pantalla
- OBJECION: gesto de reconocer la objeción y dar vuelta el argumento
- FUNDADOR: cercano, natural, detrás de escena`;

function buildBrief(item: ContentItem): string {
  const tipoLabel = item.tipo === "historia" ? "Historia (9:16 vertical)" : "Carrusel";
  const pilarLabel = PILAR_CONFIG[item.pilar]?.label ?? item.pilar;

  const lines: string[] = [
    BRIEF_SYSTEM_PROMPT,
    "",
    "---",
    "",
    "# PIEZA A CREAR",
    "",
    `**Tipo:** ${tipoLabel}`,
    `**Pilar:** ${pilarLabel}`,
    `**Fecha publicación:** ${item.fecha_publicacion}`,
    `**Formato producción:** ${item.formato_produccion ? FORMATO_LABELS[item.formato_produccion] : "Sin definir"}`,
    "",
    "## Fórmula narrativa",
    "",
    `**HOOK:** ${item.hook ?? "—"}`,
  ];

  if (item.agitacion)   lines.push(`**AGITACIÓN:** ${item.agitacion}`);
  if (item.reencuadre)  lines.push(`**REENCUADRE:** ${item.reencuadre}`);
  if (item.sistema)     lines.push(`**SISTEMA:** ${item.sistema}`);
  if (item.cta)         lines.push(`**CTA:** ${item.cta}`);
  if (item.caption)     lines.push("", `**CAPTION COMPLETO:**\n${item.caption}`);

  if (item.descripcion_visual) {
    lines.push("", "## Descripción visual", "", item.descripcion_visual);
  }

  if (item.guion) {
    const label = item.tipo === "historia" ? "## Secuencia de historias" : "## Guión slide a slide";
    lines.push("", label, "", item.guion);
  }

  lines.push(
    "",
    "---",
    "",
    item.tipo === "historia"
      ? `# INSTRUCCIÓN\n\nOrganizá la secuencia completa de historias. Para CADA historia devolveme:\n\n- Objetivo de la historia\n- Posición del avatar (si aparece)\n- Expresión / sentimiento\n- Objetos visuales en pantalla\n- Texto principal\n- Texto secundario\n- Texto chico o cierre (si aplica)\n- Idea visual general\n- Prompt final para generar la imagen\n\nAntes de generar, confirmá el plan completo.`
      : `# INSTRUCCIÓN\n\nOrganizá cada slide del carrusel. Para CADA carilla devolveme:\n\n- Objetivo de la carilla\n- Texto principal\n- Texto secundario (si aplica)\n- Visual sugerido\n- Posición del avatar (si aparece)\n- Elementos gráficos\n- Prompt final para generar esa carilla\n\nAntes de generar, confirmá el plan completo.`
  );

  return lines.join("\n");
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ContentCalendarContent() {
  const now = new Date();
  const [calYear, setCalYear]   = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const [items, setItems]     = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState("");
  const [filterTipo, setFilterTipo]   = useState<ContentTipo | "">("");
  const [filterPilar, setFilterPilar] = useState<ContentPilar | "">("");
  const [filterEstado, setFilterEstado] = useState<ContentEstado | "">("");
  const [sortCol, setSortCol] = useState<"fecha_publicacion" | "tipo" | "pilar" | "estado">("fecha_publicacion");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // ── Detail / edit modal ─────────────────────────────────────────────────────
  const [viewItem,    setViewItem]    = useState<ContentItem | null>(null);
  const [isEditing,   setIsEditing]   = useState(false);
  const [isSaving,    setIsSaving]    = useState(false);
  const [editForm,    setEditForm]    = useState<Partial<ContentItem>>({});
  const [activeTab,   setActiveTab]   = useState<"contenido" | "produccion" | "brief">("contenido");
  const [copiedBrief, setCopiedBrief] = useState(false);

  const openDetail = (item: ContentItem) => {
    setViewItem(item);
    setEditForm(item);
    setIsEditing(false);
    setActiveTab("contenido");
  };

  const handleSaveEdit = async () => {
    if (!viewItem) return;
    setIsSaving(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id, created_at: _ca, ...rest } = { ...viewItem, ...editForm };
      const updated = await updateContentItem(viewItem.id, rest);
      setItems(prev => prev.map(i => i.id === updated.id ? updated : i));
      setViewItem(updated);
      setEditForm(updated);
      setIsEditing(false);
      toast.success("Pieza actualizada");
    } catch {
      toast.error("Error al guardar");
    } finally {
      setIsSaving(false);
    }
  };

  const copyBrief = () => {
    if (!viewItem) return;
    navigator.clipboard.writeText(buildBrief(viewItem));
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2000);
  };

  const saveBriefToDb = async () => {
    if (!viewItem) return;
    const brief = buildBrief(viewItem);
    try {
      const updated = await updateContentItem(viewItem.id, { prompt_imagen: brief });
      setItems(prev => prev.map(i => i.id === updated.id ? updated : i));
      setViewItem(updated);
      toast.success("Brief guardado en prompt_imagen");
    } catch {
      toast.error("Error al guardar");
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 15;

  const today = todayStr();

  // ── Data ────────────────────────────────────────────────────────────────────
  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getContentCalendarByMonth(calYear, calMonth);
      setItems(data);
      setCurrentPage(1);
    } catch {
      toast.error("Error al cargar el calendario");
    } finally {
      setLoading(false);
    }
  }, [calYear, calMonth]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  // ── Calendar grid ───────────────────────────────────────────────────────────
  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };

  const firstWeekday    = getFirstWeekday(calYear, calMonth);
  const daysInMonth     = getDaysInMonth(calYear, calMonth);
  const daysInPrevMonth = getDaysInMonth(calYear, calMonth === 0 ? 11 : calMonth - 1);

  type CalCell = { dateStr: string; day: number; isCurrentMonth: boolean };
  const cells: CalCell[] = [];

  for (let i = firstWeekday - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const m = calMonth === 0 ? 11 : calMonth - 1;
    const y = calMonth === 0 ? calYear - 1 : calYear;
    cells.push({ dateStr: toDateStr(y, m, d), day: d, isCurrentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ dateStr: toDateStr(calYear, calMonth, d), day: d, isCurrentMonth: true });
  }
  const remaining = cells.length % 7 === 0 ? 0 : 7 - (cells.length % 7);
  for (let d = 1; d <= remaining; d++) {
    const m = calMonth === 11 ? 0 : calMonth + 1;
    const y = calMonth === 11 ? calYear + 1 : calYear;
    cells.push({ dateStr: toDateStr(y, m, d), day: d, isCurrentMonth: false });
  }

  const itemsByDate = items.reduce<Record<string, ContentItem[]>>((acc, item) => {
    const key = item.fecha_publicacion?.slice(0, 10);
    if (!key) return acc;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  // ── Reset page on filter change ─────────────────────────────────────────────
  useEffect(() => { setCurrentPage(1); }, [search, filterTipo, filterPilar, filterEstado, sortCol, sortDir]);

  // ── Table filtering / sorting ───────────────────────────────────────────────
  const filtered = items
    .filter(item => {
      const q = search.toLowerCase();
      const matchSearch  = !q || item.hook?.toLowerCase().includes(q) || item.cta?.toLowerCase().includes(q) || item.caption?.toLowerCase().includes(q);
      const matchTipo    = !filterTipo   || item.tipo   === filterTipo;
      const matchPilar   = !filterPilar  || item.pilar  === filterPilar;
      const matchEstado  = !filterEstado || item.estado === filterEstado;
      return matchSearch && matchTipo && matchPilar && matchEstado;
    })
    .sort((a, b) => {
      let av = "";
      let bv = "";
      if (sortCol === "fecha_publicacion") { av = a.fecha_publicacion ?? ""; bv = b.fecha_publicacion ?? ""; }
      if (sortCol === "tipo")   { av = a.tipo  ?? ""; bv = b.tipo  ?? ""; }
      if (sortCol === "pilar")  { av = a.pilar ?? ""; bv = b.pilar ?? ""; }
      if (sortCol === "estado") { av = a.estado ?? ""; bv = b.estado ?? ""; }
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });

  const totalPages  = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated   = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const toggleSort = (col: typeof sortCol) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const SortIcon = ({ col }: { col: typeof sortCol }) => {
    if (sortCol !== col) return <ArrowUpDown className="w-3 h-3 ml-1.5 opacity-30" />;
    return sortDir === "asc"
      ? <ArrowUp className="w-3 h-3 ml-1.5 text-primary" />
      : <ArrowDown className="w-3 h-3 ml-1.5 text-primary" />;
  };

  // ── CRUD ────────────────────────────────────────────────────────────────────
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.hook || !formData.fecha_publicacion) {
      toast.error("Hook y fecha son obligatorios");
      return;
    }
    setIsSubmitting(true);
    try {
      await createContentItem({
        tipo:               formData.tipo,
        pilar:              formData.pilar,
        fecha_publicacion:  formData.fecha_publicacion,
        estado:             formData.estado,
        hook:               formData.hook,
        agitacion:          formData.agitacion     || null,
        reencuadre:         formData.reencuadre    || null,
        sistema:            formData.sistema       || null,
        cta:                formData.cta           || null,
        caption:            formData.caption       || null,
        hashtags:           formData.hashtags.length > 0 ? formData.hashtags : null,
        descripcion_visual: formData.descripcion_visual || null,
        formato_produccion: formData.formato_produccion || null,
        guion:              formData.guion         || null,
        duracion_seg:       formData.duracion_seg  || null,
        slides:             null,
        secuencia:          null,
        imagen_url:         formData.imagen_url    || null,
        prompt_imagen:      formData.prompt_imagen || null,
      });
      toast.success("Pieza creada correctamente");
      setIsCreateOpen(false);
      setFormData(EMPTY_FORM);
      fetchItems();
    } catch {
      toast.error("Error al crear la pieza");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEstadoChange = async (id: string, estado: ContentEstado) => {
    try {
      await updateContentEstado(id, estado);
      setItems(prev => prev.map(i => i.id === id ? { ...i, estado } : i));
    } catch {
      toast.error("Error al actualizar el estado");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteContentItem(id);
      setItems(prev => prev.filter(i => i.id !== id));
      toast.success("Pieza eliminada");
    } catch {
      toast.error("Error al eliminar la pieza");
    }
  };

  // ── CSV import ───────────────────────────────────────────────────────────────
  const parseCSV = (text: string): Record<string, string>[] => {
    const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim().split("\n");
    if (lines.length < 2) return [];

    const parseRow = (line: string): string[] => {
      const fields: string[] = [];
      let cur = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
          if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
          else inQuotes = !inQuotes;
        } else if (ch === "," && !inQuotes) {
          fields.push(cur.trim());
          cur = "";
        } else {
          cur += ch;
        }
      }
      fields.push(cur.trim());
      return fields;
    };

    const headers = parseRow(lines[0]).map(h => h.replace(/^"|"$/g, "").trim());
    return lines.slice(1)
      .filter(l => l.trim())
      .map(line => {
        const values = parseRow(line);
        return headers.reduce<Record<string, string>>((acc, h, i) => {
          acc[h] = (values[i] ?? "").replace(/^"|"$/g, "").trim();
          return acc;
        }, {});
      });
  };

  const VALID_TIPOS   = new Set(["reel", "carrusel", "historia", "post_ig", "post_linkedin"]);
  const VALID_PILARES = new Set(["DOLOR", "TRANSFORMACION", "AUTORIDAD", "OBJECION", "FUNDADOR"]);
  const VALID_ESTADOS = new Set(["borrador", "aprobado", "publicado"]);
  const VALID_FORMATOS = new Set(["cara_camara", "pantalla", "carrusel_diseno", "solo_texto"]);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    setIsImporting(true);
    try {
      const text = await file.text();
      const rows = parseCSV(text);

      if (rows.length === 0) {
        toast.error("CSV vacío o sin filas válidas");
        return;
      }

      const errors: string[] = [];
      const valid: Omit<ContentItem, "id" | "created_at">[] = [];

      rows.forEach((row, idx) => {
        const n = idx + 2; // row number (1=header)
        if (!row.tipo || !VALID_TIPOS.has(row.tipo))
          return errors.push(`Fila ${n}: tipo inválido "${row.tipo}"`);
        if (!row.pilar || !VALID_PILARES.has(row.pilar))
          return errors.push(`Fila ${n}: pilar inválido "${row.pilar}"`);
        if (!row.fecha_publicacion || !/^\d{4}-\d{2}-\d{2}$/.test(row.fecha_publicacion))
          return errors.push(`Fila ${n}: fecha_publicacion debe ser YYYY-MM-DD`);
        if (!row.hook)
          return errors.push(`Fila ${n}: hook es obligatorio`);

        valid.push({
          tipo:               row.tipo as ContentTipo,
          pilar:              row.pilar as ContentPilar,
          fecha_publicacion:  row.fecha_publicacion,
          estado:             (VALID_ESTADOS.has(row.estado) ? row.estado : "borrador") as ContentEstado,
          hook:               row.hook,
          agitacion:          row.agitacion          || null,
          reencuadre:         row.reencuadre         || null,
          sistema:            row.sistema            || null,
          cta:                row.cta                || null,
          caption:            row.caption            || null,
          hashtags:           row.hashtags ? row.hashtags.split("|").map(h => h.trim()).filter(Boolean) : null,
          descripcion_visual: row.descripcion_visual || null,
          formato_produccion: (row.formato_produccion && VALID_FORMATOS.has(row.formato_produccion)
                                ? row.formato_produccion as ContentFormato : null),
          guion:              row.guion              || null,
          duracion_seg:       row.duracion_seg ? parseInt(row.duracion_seg) || null : null,
          slides:             null,
          secuencia:          null,
          imagen_url:         row.imagen_url         || null,
          prompt_imagen:      row.prompt_imagen      || null,
        });
      });

      if (errors.length > 0) {
        toast.error(
          <div className="space-y-1">
            <p className="font-bold">Errores en el CSV ({errors.length})</p>
            {errors.slice(0, 5).map((e, i) => <p key={i} className="text-xs">{e}</p>)}
            {errors.length > 5 && <p className="text-xs opacity-60">…y {errors.length - 5} más</p>}
          </div>,
          { duration: 8000 }
        );
        if (valid.length === 0) return;
      }

      if (valid.length === 0) return;

      await createMultipleContentItems(valid);
      toast.success(`${valid.length} pieza${valid.length > 1 ? "s" : ""} importada${valid.length > 1 ? "s" : ""} correctamente`);
      fetchItems();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      toast.error(`Error al importar: ${msg}`);
    } finally {
      setIsImporting(false);
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <TooltipProvider>
      <div className="space-y-8 pb-10">

        {/* ── Calendar ───────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          {/* Calendar Header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={prevMonth}
                className="w-9 h-9 rounded-xl border border-border bg-card hover:bg-muted transition-colors flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <div className="min-w-[180px] text-center">
                <span className="text-xl font-bold text-foreground tracking-tight">
                  {MONTH_NAMES[calMonth]}
                </span>
                <span className="ml-2 text-xl font-light text-muted-foreground/60">
                  {calYear}
                </span>
              </div>
              <button
                onClick={nextMonth}
                className="w-9 h-9 rounded-xl border border-border bg-card hover:bg-muted transition-colors flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              {Object.entries(TIPO_CONFIG).map(([tipo, cfg]) => (
                <div key={tipo} className="flex items-center gap-1.5">
                  <div className={cn("w-2 h-2 rounded-full", cfg.dot)} />
                  <span className="text-xs font-medium text-muted-foreground">{cfg.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-card rounded-2xl border border-border/60 overflow-hidden shadow-sm">
            <div className="grid grid-cols-7 border-b border-border/60">
              {DAY_LABELS.map(label => (
                <div key={label} className="py-3 text-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground/40">
                  {label}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {cells.map((cell, idx) => {
                const isToday    = cell.dateStr === today;
                const isSelected = cell.dateStr === selectedDay;
                const dots       = itemsByDate[cell.dateStr] ?? [];
                const isLastRow  = idx >= cells.length - 7;
                const isLastCol  = (idx + 1) % 7 === 0;

                return (
                  <button
                    key={`${cell.dateStr}-${idx}`}
                    onClick={() => setSelectedDay(cell.dateStr === selectedDay ? null : cell.dateStr)}
                    className={cn(
                      "relative min-h-[90px] p-2.5 flex flex-col gap-1 text-left transition-colors",
                      "border-b border-r border-border/40",
                      isLastRow && "border-b-0",
                      isLastCol && "border-r-0",
                      !cell.isCurrentMonth && "bg-muted/20",
                      cell.isCurrentMonth && "hover:bg-muted/30",
                      isSelected && "bg-primary/5 ring-1 ring-inset ring-primary/20",
                    )}
                  >
                    <span className={cn(
                      "w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold transition-colors",
                      isToday
                        ? "bg-primary text-primary-foreground"
                        : cell.isCurrentMonth
                          ? "text-foreground/80"
                          : "text-muted-foreground/25",
                    )}>
                      {cell.day}
                    </span>

                    {dots.length > 0 && (
                      <div className="flex flex-col gap-0.5 w-full">
                        {dots.slice(0, 3).map((item, i) => {
                          const cfg = TIPO_CONFIG[item.tipo];
                          return (
                            <div key={i} className={cn(
                              "flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-semibold truncate",
                              cfg.color,
                            )}>
                              {cfg.icon}
                              <span className="truncate">{truncate(item.hook, 30)}</span>
                            </div>
                          );
                        })}
                        {dots.length > 3 && (
                          <span className="text-[9px] text-muted-foreground/50 font-medium pl-1">
                            +{dots.length - 3} más
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Table Section ──────────────────────────────────────────────────── */}
        <div className="bg-card rounded-[24px] shadow-sm border border-border/30 overflow-hidden">

          {/* Header + Filters */}
          <div className="px-8 py-5 border-b border-border/30 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-[16px] font-bold text-foreground/80 tracking-tight">
                  Piezas de Contenido
                </h2>
                <span className="text-[13px] font-medium text-muted-foreground/40">
                  {filtered.length} registros
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* CSV import */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,text/csv"
                  className="hidden"
                  onChange={handleImport}
                />
                <Button
                  variant="outline"
                  className="rounded-full h-10 px-5 gap-2 text-[13px] font-semibold border-border/60 hover:bg-muted/50"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isImporting}
                >
                  {isImporting
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <Upload className="w-4 h-4" />}
                  {isImporting ? "Importando…" : "Importar CSV"}
                </Button>

              <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-[13px] px-6 h-10 gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
                    <Plus className="w-4 h-4" />
                    Nueva Pieza
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[540px] rounded-[32px] border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl p-8">
                  <DialogHeader className="mb-6">
                    <DialogTitle className="text-2xl font-bold tracking-tight text-foreground/90">
                      Nueva Pieza
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground/60 font-medium">
                      Hook y fecha son obligatorios. El resto puede completarse después.
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleCreate} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Tipo */}
                      <div className="grid gap-2">
                        <Label className="text-[13px] font-bold text-foreground/70 ml-1">Tipo *</Label>
                        <Select
                          value={formData.tipo}
                          onValueChange={v => setFormData({ ...formData, tipo: v as ContentTipo })}
                        >
                          <SelectTrigger className="h-11 bg-muted/30 border-none rounded-2xl px-4 font-medium text-[13px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            {Object.entries(TIPO_CONFIG).map(([v, c]) => (
                              <SelectItem key={v} value={v}>{c.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Pilar */}
                      <div className="grid gap-2">
                        <Label className="text-[13px] font-bold text-foreground/70 ml-1">Pilar *</Label>
                        <Select
                          value={formData.pilar}
                          onValueChange={v => setFormData({ ...formData, pilar: v as ContentPilar })}
                        >
                          <SelectTrigger className="h-11 bg-muted/30 border-none rounded-2xl px-4 font-medium text-[13px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            {Object.entries(PILAR_CONFIG).map(([v, c]) => (
                              <SelectItem key={v} value={v}>{c.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Fecha */}
                      <div className="grid gap-2">
                        <Label className="text-[13px] font-bold text-foreground/70 ml-1">Fecha publicación *</Label>
                        <Input
                          type="date"
                          required
                          className="h-11 bg-muted/30 border-none rounded-2xl px-4 font-medium text-[13px]"
                          value={formData.fecha_publicacion}
                          onChange={e => setFormData({ ...formData, fecha_publicacion: e.target.value })}
                        />
                      </div>

                      {/* Estado */}
                      <div className="grid gap-2">
                        <Label className="text-[13px] font-bold text-foreground/70 ml-1">Estado</Label>
                        <Select
                          value={formData.estado}
                          onValueChange={v => setFormData({ ...formData, estado: v as ContentEstado })}
                        >
                          <SelectTrigger className="h-11 bg-muted/30 border-none rounded-2xl px-4 font-medium text-[13px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            {Object.entries(ESTADO_CONFIG).map(([v, c]) => (
                              <SelectItem key={v} value={v}>{c.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Hook */}
                      <div className="col-span-2 grid gap-2">
                        <Label className="text-[13px] font-bold text-foreground/70 ml-1">Hook *</Label>
                        <Textarea
                          required
                          placeholder="Primera línea que detiene el scroll…"
                          className="bg-muted/30 border-none rounded-2xl px-4 py-3 font-medium text-[13px] resize-none min-h-[72px]"
                          value={formData.hook}
                          onChange={e => setFormData({ ...formData, hook: e.target.value })}
                        />
                      </div>

                      {/* Agitación */}
                      <div className="col-span-2 grid gap-2">
                        <Label className="text-[13px] font-bold text-foreground/70 ml-1">Agitación</Label>
                        <Textarea
                          placeholder="Describe el ciclo de dolor con detalle concreto…"
                          className="bg-muted/30 border-none rounded-2xl px-4 py-3 font-medium text-[13px] resize-none min-h-[60px]"
                          value={formData.agitacion}
                          onChange={e => setFormData({ ...formData, agitacion: e.target.value })}
                        />
                      </div>

                      {/* CTA */}
                      <div className="col-span-2 grid gap-2">
                        <Label className="text-[13px] font-bold text-foreground/70 ml-1">CTA</Label>
                        <Input
                          placeholder="Ej: Agendá un diagnóstico gratuito"
                          className="h-11 bg-muted/30 border-none rounded-2xl px-4 font-medium text-[13px]"
                          value={formData.cta}
                          onChange={e => setFormData({ ...formData, cta: e.target.value })}
                        />
                      </div>

                      {/* Formato producción */}
                      <div className="grid gap-2">
                        <Label className="text-[13px] font-bold text-foreground/70 ml-1">Formato producción</Label>
                        <Select
                          value={formData.formato_produccion ?? "none"}
                          onValueChange={v => setFormData({ ...formData, formato_produccion: v === "none" ? null : v as ContentFormato })}
                        >
                          <SelectTrigger className="h-11 bg-muted/30 border-none rounded-2xl px-4 font-medium text-[13px]">
                            <SelectValue placeholder="Sin definir" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="none">Sin definir</SelectItem>
                            {Object.entries(FORMATO_LABELS).map(([v, l]) => (
                              <SelectItem key={v} value={v}>{l}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Duración (solo reels) */}
                      {formData.tipo === "reel" && (
                        <div className="grid gap-2">
                          <Label className="text-[13px] font-bold text-foreground/70 ml-1">Duración (seg)</Label>
                          <Input
                            type="number"
                            min={10}
                            max={90}
                            placeholder="Ej: 45"
                            className="h-11 bg-muted/30 border-none rounded-2xl px-4 font-medium text-[13px]"
                            value={formData.duracion_seg ?? ""}
                            onChange={e => setFormData({ ...formData, duracion_seg: e.target.value ? parseInt(e.target.value) : null })}
                          />
                        </div>
                      )}
                    </div>

                    <DialogFooter className="pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-[15px] shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Creando…
                          </div>
                        ) : "Crear Pieza"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              </div>
            </div>

            {/* Filters row */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                <Input
                  placeholder="Buscar por hook, CTA, caption…"
                  className="pl-11 bg-muted/30 border-none shadow-none rounded-2xl h-11 text-[13px]"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              <Select value={filterTipo || "all"} onValueChange={v => setFilterTipo(v === "all" ? "" : v as ContentTipo)}>
                <SelectTrigger className="w-[150px] bg-muted/10 border border-border/50 shadow-none rounded-2xl h-11 text-[13px] font-medium">
                  <SelectValue placeholder="Todos los tipos" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  {Object.entries(TIPO_CONFIG).map(([v, c]) => (
                    <SelectItem key={v} value={v}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterPilar || "all"} onValueChange={v => setFilterPilar(v === "all" ? "" : v as ContentPilar)}>
                <SelectTrigger className="w-[150px] bg-muted/10 border border-border/50 shadow-none rounded-2xl h-11 text-[13px] font-medium">
                  <SelectValue placeholder="Todos los pilares" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all">Todos los pilares</SelectItem>
                  {Object.entries(PILAR_CONFIG).map(([v, c]) => (
                    <SelectItem key={v} value={v}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterEstado || "all"} onValueChange={v => setFilterEstado(v === "all" ? "" : v as ContentEstado)}>
                <SelectTrigger className="w-[150px] bg-muted/10 border border-border/50 shadow-none rounded-2xl h-11 text-[13px] font-medium">
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all">Todos los estados</SelectItem>
                  {Object.entries(ESTADO_CONFIG).map(([v, c]) => (
                    <SelectItem key={v} value={v}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border/30">
                <TableHead
                  className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest pl-8 h-12 cursor-pointer hover:text-foreground/60 transition-colors"
                  onClick={() => toggleSort("fecha_publicacion")}
                >
                  <div className="flex items-center">Fecha <SortIcon col="fecha_publicacion" /></div>
                </TableHead>

                <TableHead
                  className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest h-12 cursor-pointer hover:text-foreground/60 transition-colors"
                  onClick={() => toggleSort("tipo")}
                >
                  <div className="flex items-center">Tipo <SortIcon col="tipo" /></div>
                </TableHead>

                <TableHead
                  className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest h-12 cursor-pointer hover:text-foreground/60 transition-colors"
                  onClick={() => toggleSort("pilar")}
                >
                  <div className="flex items-center">Pilar <SortIcon col="pilar" /></div>
                </TableHead>

                <TableHead className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest h-12">
                  Hook
                </TableHead>

                <TableHead className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest h-12">
                  CTA
                </TableHead>

                <TableHead
                  className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest h-12 text-center cursor-pointer hover:text-foreground/60 transition-colors"
                  onClick={() => toggleSort("estado")}
                >
                  <div className="flex items-center justify-center">Estado <SortIcon col="estado" /></div>
                </TableHead>

                <TableHead className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest text-right pr-8 h-12">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-48 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="w-8 h-8 animate-spin text-primary/30" />
                      <span className="text-sm font-medium text-muted-foreground/40">Cargando…</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-48 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <FileEdit className="w-8 h-8 text-muted-foreground/20" />
                      <span className="text-sm font-medium text-muted-foreground/40">
                        {items.length === 0
                          ? "Todavía no hay piezas. Creá la primera."
                          : "Sin resultados para los filtros aplicados."}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map(item => {
                  const tipoCfg   = TIPO_CONFIG[item.tipo];
                  const pilarCfg  = PILAR_CONFIG[item.pilar];
                  const estadoCfg = ESTADO_CONFIG[item.estado];

                  return (
                    <TableRow
                      key={item.id}
                      onClick={() => openDetail(item)}
                      className="group hover:bg-muted/20 border-b border-border/20 last:border-0 transition-colors cursor-pointer"
                    >
                      {/* Fecha */}
                      <TableCell className="pl-8 py-4 whitespace-nowrap">
                        <span className="text-[13px] font-semibold text-foreground/70">
                          {item.fecha_publicacion
                            ? new Date(item.fecha_publicacion + "T00:00:00").toLocaleDateString("es-AR", {
                                day: "2-digit", month: "2-digit", year: "numeric",
                              })
                            : "-"}
                        </span>
                      </TableCell>

                      {/* Tipo */}
                      <TableCell>
                        <div className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight",
                          tipoCfg.color,
                        )}>
                          {tipoCfg.icon}
                          {tipoCfg.label}
                        </div>
                      </TableCell>

                      {/* Pilar */}
                      <TableCell>
                        <div className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight",
                          pilarCfg.color,
                        )}>
                          {pilarCfg.label}
                        </div>
                      </TableCell>

                      {/* Hook */}
                      <TableCell className="max-w-[260px]">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="text-[12px] font-medium text-foreground/70 truncate cursor-help">
                              {truncate(item.hook, 65)}
                            </p>
                          </TooltipTrigger>
                          {item.hook && item.hook.length > 65 && (
                            <TooltipContent className="max-w-[320px] bg-card border border-border shadow-lg p-3 rounded-xl">
                              <p className="text-[12px] font-medium text-foreground/90 leading-relaxed">
                                {item.hook}
                              </p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TableCell>

                      {/* CTA */}
                      <TableCell className="max-w-[180px]">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-[11px] font-medium text-muted-foreground/60 cursor-help truncate block">
                              {truncate(item.cta, 40)}
                            </span>
                          </TooltipTrigger>
                          {item.cta && item.cta.length > 40 && (
                            <TooltipContent className="max-w-[280px] bg-card border border-border shadow-lg p-3 rounded-xl">
                              <p className="text-[12px] font-medium text-foreground/90">{item.cta}</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TableCell>

                      {/* Estado */}
                      <TableCell className="text-center" onClick={e => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className={cn(
                                "rounded-full h-7 px-3 gap-1.5 border-none shadow-none text-[10px] font-bold uppercase tracking-tight",
                                estadoCfg.styles,
                              )}
                            >
                              {estadoCfg.label}
                              <ChevronDown className="w-3 h-3 opacity-50" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="center" className="w-[150px] rounded-xl border-border/50 shadow-lg">
                            {Object.entries(ESTADO_CONFIG).map(([value, cfg]) => (
                              <DropdownMenuItem
                                key={value}
                                className="text-[11px] font-semibold h-9 px-4 focus:bg-primary/5 focus:text-primary cursor-pointer"
                                onClick={() => handleEstadoChange(item.id, value as ContentEstado)}
                              >
                                {cfg.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>

                      {/* Acciones */}
                      <TableCell className="text-right pr-8" onClick={e => e.stopPropagation()}>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-lg bg-muted/40 text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-[24px] border-border/50">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-[16px] font-bold">
                                ¿Eliminar pieza?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-[13px] text-muted-foreground/70">
                                Se eliminará esta pieza permanentemente. Esta acción no se puede deshacer.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="rounded-xl h-10 text-[13px] font-semibold">
                                Cancelar
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="rounded-xl h-10 text-[13px] font-semibold bg-rose-500 hover:bg-rose-600 text-white"
                                onClick={() => handleDelete(item.id)}
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>

          {/* Footer + Paginado */}
          {!loading && items.length > 0 && (
            <div className="px-8 py-4 border-t border-border/30 bg-muted/5 flex items-center justify-between flex-wrap gap-3">
              {/* Izquierda: conteo + badges de estado */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[12px] font-medium text-muted-foreground/50">
                  {filtered.length === items.length
                    ? `${items.length} piezas · ${MONTH_NAMES[calMonth]} ${calYear}`
                    : `${filtered.length} de ${items.length} piezas`}
                </span>
                {Object.entries(ESTADO_CONFIG).map(([estado, cfg]) => {
                  const count = items.filter(i => i.estado === estado).length;
                  if (!count) return null;
                  return (
                    <div key={estado} className={cn(
                      "text-[10px] font-bold px-2.5 py-1 rounded-full",
                      cfg.styles,
                    )}>
                      {cfg.label} · {count}
                    </div>
                  );
                })}
              </div>

              {/* Derecha: controles de paginado */}
              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-lg border border-border/50 bg-card flex items-center justify-center text-muted-foreground hover:bg-muted/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[12px] font-semibold text-muted-foreground/60 min-w-[80px] text-center">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 rounded-lg border border-border/50 bg-card flex items-center justify-center text-muted-foreground hover:bg-muted/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* ── Detail / Edit Modal ──────────────────────────────────────────────── */}
      <Dialog open={!!viewItem} onOpenChange={open => { if (!open) setViewItem(null); }}>
        <DialogContent className="max-w-5xl w-[90vw] rounded-[28px] border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl p-0 overflow-hidden max-h-[90vh] flex flex-col">
          <DialogTitle className="sr-only">
            {viewItem ? `${TIPO_CONFIG[viewItem.tipo].label} — ${viewItem.hook}` : "Detalle de pieza"}
          </DialogTitle>

          {viewItem && (() => {
            const tipoCfg  = TIPO_CONFIG[viewItem.tipo];
            const pilarCfg = PILAR_CONFIG[viewItem.pilar];
            const canBrief = viewItem.tipo === "carrusel" || viewItem.tipo === "historia";
            const ef       = editForm;

            const Field = ({ label, value, field, multiline = false }: {
              label: string; value: string | null | undefined;
              field: keyof ContentItem; multiline?: boolean;
            }) => isEditing ? (
              multiline
                ? <div className="grid gap-1.5">
                    <span className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-wider">{label}</span>
                    <Textarea
                      className="bg-muted/30 border-none rounded-xl px-3 py-2 text-[13px] resize-none min-h-[72px]"
                      value={(ef[field] as string) ?? ""}
                      onChange={e => setEditForm(f => ({ ...f, [field]: e.target.value }))}
                    />
                  </div>
                : <div className="grid gap-1.5">
                    <span className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-wider">{label}</span>
                    <input
                      className="bg-muted/30 border-none rounded-xl px-3 h-10 text-[13px] w-full outline-none"
                      value={(ef[field] as string) ?? ""}
                      onChange={e => setEditForm(f => ({ ...f, [field]: e.target.value }))}
                    />
                  </div>
            ) : (
              <div className="grid gap-1">
                <span className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-wider">{label}</span>
                <p className="text-[13px] text-foreground/80 leading-relaxed whitespace-pre-wrap">
                  {value ? value.replace(/\\n/g, "\n") : <span className="text-muted-foreground/30 italic">—</span>}
                </p>
              </div>
            );

            return (
              <>
                {/* Header */}
                <div className="px-8 pt-7 pb-5 border-b border-border/30 flex items-start justify-between gap-4 flex-shrink-0">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight", tipoCfg.color)}>
                        {tipoCfg.icon}{tipoCfg.label}
                      </div>
                      <div className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight", pilarCfg.color)}>
                        {pilarCfg.label}
                      </div>
                      {isEditing ? (
                        <Select value={ef.estado ?? viewItem.estado} onValueChange={v => setEditForm(f => ({ ...f, estado: v as ContentEstado }))}>
                          <SelectTrigger className="h-7 px-3 text-[10px] font-bold uppercase bg-muted/30 border-none rounded-full w-auto">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            {Object.entries(ESTADO_CONFIG).map(([v, c]) => (
                              <SelectItem key={v} value={v} className="text-[12px]">{c.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase", ESTADO_CONFIG[viewItem.estado].styles)}>
                          {ESTADO_CONFIG[viewItem.estado].label}
                        </div>
                      )}
                    </div>
                    <p className="text-[12px] text-muted-foreground/50 font-medium">
                      {new Date(viewItem.fecha_publicacion + "T00:00:00").toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {isEditing ? (
                      <>
                        <Button variant="ghost" className="h-9 px-4 text-[13px] rounded-xl" onClick={() => { setIsEditing(false); setEditForm(viewItem); }}>
                          Cancelar
                        </Button>
                        <Button className="h-9 px-5 text-[13px] rounded-xl bg-primary font-bold" onClick={handleSaveEdit} disabled={isSaving}>
                          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Guardar"}
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" className="h-9 px-4 text-[13px] rounded-xl gap-2" onClick={() => setIsEditing(true)}>
                        <FileEdit className="w-3.5 h-3.5" /> Editar
                      </Button>
                    )}
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-0 border-b border-border/30 px-8 flex-shrink-0">
                  {(["contenido", "produccion", ...(canBrief ? ["brief"] : [])] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as typeof activeTab)}
                      className={cn(
                        "px-4 py-3 text-[12px] font-bold uppercase tracking-wider border-b-2 transition-colors",
                        activeTab === tab
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground/50 hover:text-muted-foreground"
                      )}
                    >
                      {tab === "contenido" ? "Contenido" : tab === "produccion" ? "Producción" : "Brief GPT"}
                    </button>
                  ))}
                </div>

                {/* Body */}
                <div className="overflow-y-auto flex-1 px-8 py-6">

                  {activeTab === "contenido" && (
                    <div className="space-y-5">
                      <Field label="Hook" value={viewItem.hook} field="hook" multiline />
                      <Field label="Agitación" value={viewItem.agitacion} field="agitacion" multiline />
                      <Field label="Reencuadre" value={viewItem.reencuadre} field="reencuadre" multiline />
                      <Field label="Sistema" value={viewItem.sistema} field="sistema" multiline />
                      <Field label="CTA" value={viewItem.cta} field="cta" />
                      <Field label="Caption" value={viewItem.caption} field="caption" multiline />
                      {isEditing ? (
                        <div className="grid gap-1.5">
                          <span className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-wider">Hashtags (separados por coma)</span>
                          <input
                            className="bg-muted/30 border-none rounded-xl px-3 h-10 text-[13px] w-full outline-none"
                            value={(ef.hashtags ?? []).join(", ")}
                            onChange={e => setEditForm(f => ({ ...f, hashtags: e.target.value.split(",").map(h => h.trim()).filter(Boolean) }))}
                          />
                        </div>
                      ) : viewItem.hashtags && viewItem.hashtags.length > 0 && (
                        <div className="grid gap-1">
                          <span className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-wider">Hashtags</span>
                          <div className="flex flex-wrap gap-1.5">
                            {viewItem.hashtags.map(h => (
                              <span key={h} className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-muted/40 text-muted-foreground">{h}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "produccion" && (
                    <div className="space-y-5">
                      {isEditing ? (
                        <div className="grid gap-1.5">
                          <span className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-wider">Formato de producción</span>
                          <Select value={ef.formato_produccion ?? "none"} onValueChange={v => setEditForm(f => ({ ...f, formato_produccion: v === "none" ? null : v as ContentFormato }))}>
                            <SelectTrigger className="h-10 bg-muted/30 border-none rounded-xl px-3 text-[13px]"><SelectValue placeholder="Sin definir" /></SelectTrigger>
                            <SelectContent className="rounded-xl">
                              <SelectItem value="none">Sin definir</SelectItem>
                              {Object.entries(FORMATO_LABELS).map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      ) : (
                        <div className="grid gap-1">
                          <span className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-wider">Formato de producción</span>
                          <p className="text-[13px] text-foreground/80">{viewItem.formato_produccion ? FORMATO_LABELS[viewItem.formato_produccion] : <span className="text-muted-foreground/30 italic">—</span>}</p>
                        </div>
                      )}
                      {viewItem.tipo === "reel" && (
                        isEditing ? (
                          <div className="grid gap-1.5">
                            <span className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-wider">Duración (seg)</span>
                            <input type="number" min={10} max={90}
                              className="bg-muted/30 border-none rounded-xl px-3 h-10 text-[13px] w-full outline-none"
                              value={ef.duracion_seg ?? ""}
                              onChange={e => setEditForm(f => ({ ...f, duracion_seg: e.target.value ? parseInt(e.target.value) : null }))}
                            />
                          </div>
                        ) : (
                          <div className="grid gap-1">
                            <span className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-wider">Duración</span>
                            <p className="text-[13px] text-foreground/80">{viewItem.duracion_seg ? `${viewItem.duracion_seg} segundos` : <span className="text-muted-foreground/30 italic">—</span>}</p>
                          </div>
                        )
                      )}
                      <Field label="Descripción visual" value={viewItem.descripcion_visual} field="descripcion_visual" multiline />
                      <Field label="Guión / Secuencia" value={viewItem.guion} field="guion" multiline />
                      <Field label="Prompt de imagen" value={viewItem.prompt_imagen} field="prompt_imagen" multiline />
                      <Field label="URL de imagen" value={viewItem.imagen_url} field="imagen_url" />
                      {viewItem.imagen_url && !isEditing && (
                        <img src={viewItem.imagen_url} alt="preview" className="rounded-xl w-full max-h-64 object-cover mt-2" />
                      )}
                    </div>
                  )}

                  {activeTab === "brief" && canBrief && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[13px] font-bold text-foreground/80">Brief listo para GPT-4o</p>
                          <p className="text-[11px] text-muted-foreground/50 mt-0.5">Copiá el texto, abrí ChatGPT, subí tus fotos de referencia y pegalo.</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="h-9 px-4 text-[12px] rounded-xl gap-2"
                            onClick={saveBriefToDb}
                          >
                            Guardar en DB
                          </Button>
                          <Button
                            className="h-9 px-5 text-[12px] rounded-xl gap-2 bg-primary font-bold"
                            onClick={copyBrief}
                          >
                            {copiedBrief ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copiedBrief ? "¡Copiado!" : "Copiar brief"}
                          </Button>
                        </div>
                      </div>
                      <div className="bg-muted/20 rounded-2xl p-4 border border-border/30">
                        <pre className="text-[11px] text-foreground/70 leading-relaxed whitespace-pre-wrap font-mono overflow-auto max-h-[420px]">
                          {buildBrief(viewItem)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>

    </TooltipProvider>
  );
}
