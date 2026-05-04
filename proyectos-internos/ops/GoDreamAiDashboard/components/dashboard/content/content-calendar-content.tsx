"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    Calendar as CalendarIcon,
    Plus,
    Upload,
    FileText,
    Video,
    Layout,
    CheckCircle2,
    Circle,
    ExternalLink,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight,
    Filter,
    Download,
    Share2,
    AlertCircle,
    HelpCircle,
    Loader2,
    Trash2,
    BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import { ContentItem, ContentStatus, ContentType } from '@/lib/types';
import {
    getContentCalendar,
    createContentItem,
    createMultipleContentItems,
    updateContentStatus,
    deleteContentItem
} from '@/lib/content';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';

const TYPE_ICONS: Record<ContentType, React.ReactNode> = {
    video: <Video className="w-4 h-4" />,
    carousel: <Layout className="w-4 h-4" />,
    image: <FileText className="w-4 h-4" />,
    thread: <FileText className="w-4 h-4" />,
    article: <FileText className="w-4 h-4" />,
};

const STATUS_COLORS: Record<ContentStatus, string> = {
    idea: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
    draft: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    scheduled: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    published: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    cancelled: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
};

export function ContentCalendarContent() {
    const [items, setItems] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
    const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
    const [referenceDate, setReferenceDate] = useState(new Date());

    // New Item State
    const [newItem, setNewItem] = useState<Partial<ContentItem>>({
        title: '',
        type: 'article',
        status: 'draft',
        publish_date: new Date().toISOString().split('T')[0],
        author: 'Nassa',
        drive_link: '',
        tags: [],
        hook: '',
        copy: '',
        cta: '',
        notes: '',
        week: '',
        objective: ''
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getContentCalendar();
            setItems(data);
        } catch (error) {
            toast.error("Error al cargar el calendario");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const fileExt = file.name.split('.').pop()?.toLowerCase();

        if (fileExt === 'csv') {
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    processImportedData(results.data);
                },
                error: (error) => {
                    toast.error("Error al procesar el CSV: " + error.message);
                }
            });
        } else if (fileExt === 'xlsx' || fileExt === 'xls') {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                processImportedData(jsonData);
            };
            reader.readAsArrayBuffer(file);
        } else {
            toast.error("Formato de archivo no soportado. Use CSV o Excel.");
        }

        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const processImportedData = async (data: any[]) => {
        setLoading(true);
        const validItems = data.map((row) => ({
            title: row.title || row.Título || row.titulo,
            type: (row.type || row.Tipo || row.tipo || 'article').toLowerCase() as ContentType,
            status: (row.status || row.Estado || row.estado || 'scheduled').toLowerCase() as ContentStatus,
            publish_date: row.publish_date || row.Fecha || row.fecha || new Date().toISOString(),
            author: row.author || row.Autor || row.autor || 'Nassa',
            drive_link: row.drive_link || row.Link || row.link || '',
            tags: row.tags ? (typeof row.tags === 'string' ? row.tags.split(',') : row.tags) : [],
            hook: row.hook || row.Gancho || row.hook_text || null,
            copy: row.copy || row.Cuerpo || row.contenido || row.copy_text || null,
            cta: row.cta || row.Llamado || row.call_to_action || null,
            notes: row.notes || row.Notas || row.instrucciones || null,
            week: row.week || row.Semana || row.s_period || null,
            objective: row.objective || row.Objetivo || row.dolor || null
        })).filter(item => item.title);

        if (validItems.length > 0) {
            try {
                await createMultipleContentItems(validItems);
                toast.success(`¡Se han importado ${validItems.length} contenidos exitosamente!`);
                fetchData();
            } catch (error) {
                toast.error("Error al guardar los datos importados");
            }
        } else {
            toast.warning("No se encontraron registros válidos para importar.");
            setLoading(false);
        }
    };

    const handleCreateManual = async () => {
        if (!newItem.title) {
            toast.error("El título es obligatorio");
            return;
        }

        setLoading(true);
        try {
            await createContentItem(newItem as Omit<ContentItem, 'id'>);
            toast.success("Contenido creado correctamente");
            setIsNewDialogOpen(false);
            setNewItem({
                title: '',
                type: 'article',
                status: 'draft',
                publish_date: new Date().toISOString().split('T')[0],
                author: 'Nassa',
                drive_link: '',
                tags: [],
                hook: '',
                copy: '',
                cta: '',
                notes: '',
                week: '',
                objective: ''
            });
            fetchData();
        } catch (error) {
            toast.error("Error al crear el contenido");
            setLoading(false);
        }
    };

    const toggleStatus = async (id: string, currentStatus: ContentStatus) => {
        const nextStatus: ContentStatus = currentStatus === 'published' ? 'scheduled' : 'published';
        try {
            await updateContentStatus(id, nextStatus);
            setItems(prev => prev.map(item => item.id === id ? { ...item, status: nextStatus } : item));
            toast.success(`Estado actualizado a ${nextStatus}`);
        } catch (error) {
            toast.error("Error al actualizar el estado");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteContentItem(id);
            setItems(prev => prev.filter(item => item.id !== id));
            toast.success("Contenido eliminado");
        } catch (error) {
            toast.error("Error al eliminar");
        }
    };

    const getStartOfWeek = (date: Date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(d.setDate(diff));
    };

    const startOfWeek = getStartOfWeek(referenceDate);

    const navigateWeek = (weeks: number) => {
        const newDate = new Date(referenceDate);
        newDate.setDate(newDate.getDate() + weeks * 7);
        setReferenceDate(newDate);
    };

    const daysLabels = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    return (
        <div className="space-y-8 pb-10">
            <TooltipProvider>
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <CalendarIcon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Calendario de Contenidos</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md hover:bg-muted" onClick={() => navigateWeek(-1)}>
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <p className="text-sm font-bold text-primary px-1">
                                    Semana del {startOfWeek.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                                </p>
                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md hover:bg-muted" onClick={() => navigateWeek(1)}>
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-xl text-muted-foreground hover:text-primary"
                            onClick={() => setIsHelpDialogOpen(true)}
                        >
                            <HelpCircle className="w-5 h-5" />
                        </Button>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept=".csv,.xlsx,.xls"
                            className="hidden"
                        />
                        <Button
                            variant="outline"
                            className="rounded-xl gap-2 border-border/50 h-11"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={loading}
                        >
                            <Upload className="w-4 h-4" />
                            Importar
                        </Button>

                        <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20 h-11">
                                    <Plus className="w-4 h-4" />
                                    Nuevo Contenido
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px] rounded-[32px] max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle className="text-xl font-bold">Crear Contenido</DialogTitle>
                                    <DialogDescription>
                                        Añade una nueva pieza de contenido de forma manual.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title" className="font-bold">Título</Label>
                                        <Input
                                            id="title"
                                            placeholder="Ej: Las 5 mejores IAs..."
                                            className="rounded-xl"
                                            value={newItem.title}
                                            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label className="font-bold">Tipo</Label>
                                            <Select
                                                value={newItem.type}
                                                onValueChange={(val) => setNewItem({ ...newItem, type: val as ContentType })}
                                            >
                                                <SelectTrigger className="rounded-xl">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl">
                                                    <SelectItem value="video">Video</SelectItem>
                                                    <SelectItem value="carousel">Carrusel</SelectItem>
                                                    <SelectItem value="image">Imagen</SelectItem>
                                                    <SelectItem value="article">Artículo</SelectItem>
                                                    <SelectItem value="thread">Hilo/Thread</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label className="font-bold">Fecha</Label>
                                            <Input
                                                type="date"
                                                className="rounded-xl"
                                                value={newItem.publish_date}
                                                onChange={(e) => setNewItem({ ...newItem, publish_date: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="week" className="font-bold text-xs uppercase text-muted-foreground">Semana</Label>
                                            <Select
                                                value={newItem.week || ''}
                                                onValueChange={(val) => setNewItem({ ...newItem, week: val })}
                                            >
                                                <SelectTrigger className="rounded-xl">
                                                    <SelectValue placeholder="S1, S2..." />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl">
                                                    <SelectItem value="S1">Semana 1 (S1)</SelectItem>
                                                    <SelectItem value="S2">Semana 2 (S2)</SelectItem>
                                                    <SelectItem value="S3">Semana 3 (S3)</SelectItem>
                                                    <SelectItem value="S4">Semana 4 (S4)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="objective" className="font-bold text-xs uppercase text-muted-foreground">Objetivo</Label>
                                            <Select
                                                value={newItem.objective || ''}
                                                onValueChange={(val) => setNewItem({ ...newItem, objective: val })}
                                            >
                                                <SelectTrigger className="rounded-xl">
                                                    <SelectValue placeholder="Dolor, Educación..." />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl">
                                                    <SelectItem value="Dolor">Dolor / Problema</SelectItem>
                                                    <SelectItem value="Educación">Educativo / Valor</SelectItem>
                                                    <SelectItem value="Prueba Social">Prueba Social</SelectItem>
                                                    <SelectItem value="Venta">Venta Directa</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="hook" className="font-bold text-xs uppercase text-muted-foreground">Hook (Primera línea)</Label>
                                        <Input
                                            id="hook"
                                            placeholder="El gancho que detendrá el scroll..."
                                            className="rounded-xl"
                                            value={newItem.hook || ''}
                                            onChange={(e) => setNewItem({ ...newItem, hook: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="copy" className="font-bold text-xs uppercase text-muted-foreground">Cuerpo del Post (Copy)</Label>
                                        <Textarea
                                            id="copy"
                                            placeholder="Escribe el contenido completo aquí..."
                                            className="rounded-xl min-h-[120px]"
                                            value={newItem.copy || ''}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewItem({ ...newItem, copy: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="cta" className="font-bold text-xs uppercase text-muted-foreground">CTA</Label>
                                            <Input
                                                id="cta"
                                                placeholder="Link en bio, Comenta IA..."
                                                className="rounded-xl"
                                                value={newItem.cta || ''}
                                                onChange={(e) => setNewItem({ ...newItem, cta: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="link" className="font-bold text-xs uppercase text-muted-foreground">Link Drive</Label>
                                            <Input
                                                id="link"
                                                placeholder="https://drive..."
                                                className="rounded-xl"
                                                value={newItem.drive_link || ''}
                                                onChange={(e) => setNewItem({ ...newItem, drive_link: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="notes" className="font-bold text-xs uppercase text-muted-foreground">Instrucciones / Notas</Label>
                                        <Textarea
                                            id="notes"
                                            placeholder="Detalles para el diseñador o editor..."
                                            className="rounded-xl min-h-[80px]"
                                            value={newItem.notes || ''}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewItem({ ...newItem, notes: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="ghost" onClick={() => setIsNewDialogOpen(false)} className="rounded-xl font-bold">Cancelar</Button>
                                    <Button onClick={handleCreateManual} disabled={loading} className="rounded-xl font-bold shadow-lg shadow-primary/20">
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Guardar Contenido
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Weekly View - Scrollable */}
                <div className="overflow-x-auto pb-6 -mx-4 px-4 scrollbar-medium">
                    <div className="flex gap-5 min-w-max">
                        {daysLabels.map((day, idx) => {
                            const currentDayDate = new Date(startOfWeek);
                            currentDayDate.setDate(startOfWeek.getDate() + idx);
                            const dateString = currentDayDate.toISOString().split('T')[0];

                            const dayItems = items.filter(item => {
                                // Extract just the date part for comparison
                                const itemDateStr = new Date(item.publish_date).toISOString().split('T')[0];
                                return itemDateStr === dateString;
                            });

                            return (
                                <div key={day} className="flex flex-col gap-4 w-[320px]">
                                    <div className="flex items-center justify-between px-2">
                                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40">
                                            {day}
                                        </span>
                                        <span className="text-[10px] font-bold text-primary/40 italic">
                                            {currentDayDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                                        </span>
                                    </div>

                                    <div className="min-h-[300px] rounded-[32px] bg-muted/20 border border-dashed border-border/50 p-4 flex flex-col gap-4">
                                        {loading && items.length === 0 ? (
                                            <div className="flex-1 flex items-center justify-center">
                                                <Loader2 className="w-8 h-8 animate-spin text-primary/20" />
                                            </div>
                                        ) : dayItems.map(item => (
                                            <Card
                                                key={item.id}
                                                className="p-5 rounded-[24px] bg-card border-border/30 shadow-sm hover:shadow-lg transition-all group relative overflow-hidden"
                                            >
                                                <div className={cn("absolute left-0 top-0 bottom-0 w-1.5",
                                                    item.status === 'published' ? "bg-emerald-500" :
                                                        item.status === 'scheduled' ? "bg-blue-500" :
                                                            item.status === 'draft' ? "bg-amber-500" : "bg-slate-400"
                                                )} />

                                                <div className="space-y-4">
                                                    <div className="flex items-start justify-between">
                                                        <Badge variant="outline" className={cn("rounded-lg px-2 py-0 h-5 text-[10px] font-bold uppercase", STATUS_COLORS[item.status])}>
                                                            {item.status}
                                                        </Badge>
                                                        <div className="flex gap-1">
                                                            <button onClick={() => toggleStatus(item.id, item.status)} className="text-muted-foreground/30 hover:text-emerald-500 transition-colors">
                                                                {item.status === 'published' ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5" />}
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <h3 className="text-[15px] font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                                        {item.title}
                                                    </h3>

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold">
                                                                {item.author[0]}
                                                            </div>
                                                            <span className="text-[12px] font-medium text-muted-foreground">{item.author}</span>
                                                        </div>

                                                        <div className="flex items-center gap-1">
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <div className="text-muted-foreground/40">
                                                                        {TYPE_ICONS[item.type]}
                                                                    </div>
                                                                </TooltipTrigger>
                                                                <TooltipContent className="rounded-lg text-[10px] uppercase font-bold">
                                                                    {item.type}
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </div>
                                                    </div>

                                                    {item.drive_link && (
                                                        <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                                                            <a
                                                                href={item.drive_link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-[11px] flex items-center gap-1.5 font-bold text-primary hover:underline uppercase tracking-tight"
                                                            >
                                                                <ExternalLink className="w-3.5 h-3.5" />
                                                                Google Drive
                                                            </a>

                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                                        <MoreHorizontal className="w-3.5 h-3.5" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end" className="rounded-xl">
                                                                    <DropdownMenuItem className="gap-2 text-xs font-semibold focus:text-primary">
                                                                        <Share2 className="w-4 h-4" /> Compartir
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        className="gap-2 text-xs font-semibold text-destructive focus:text-destructive"
                                                                        onClick={() => handleDelete(item.id)}
                                                                    >
                                                                        <Trash2 className="w-4 h-4" /> Eliminar
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    )}
                                                </div>
                                            </Card>
                                        ))}

                                        {dayItems.length === 0 && !loading && (
                                            <div className="flex-1 flex items-center justify-center">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        setIsNewDialogOpen(true);
                                                        // Set the date to something related to the day index if possible
                                                    }}
                                                    className="h-10 w-10 rounded-full border border-dashed border-border/50 text-muted-foreground/20 hover:text-primary hover:border-primary transition-all"
                                                >
                                                    <Plus className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Info Card - Simplified */}
                <div className="bg-primary/5 rounded-[32px] p-8 border border-primary/10 flex items-start gap-6">
                    <AlertCircle className="w-8 h-8 text-primary shrink-0" />
                    <div className="space-y-2">
                        <h4 className="text-[17px] font-bold text-primary">Operativa del Calendario</h4>
                        <p className="text-sm text-foreground/70 leading-relaxed max-w-3xl">
                            Los contenidos se sincronizan en tiempo real con Supabase. Puedes marcarlos como publicados directamente desde el calendario
                            o usar el backlog para una gestión en masa. La visualización se agrupa automáticamente por día de la semana.
                        </p>
                    </div>
                </div>

                {/* Content Backlog - Real Data */}
                <div className="bg-card rounded-[32px] border border-border/30 overflow-hidden shadow-sm">
                    <div className="px-8 py-6 border-b border-border/30 flex items-center justify-between">
                        <h3 className="text-lg font-bold tracking-tight">Pipeline de Producción (Backlog)</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-muted-foreground/50 mr-2">{items.length} registros</span>
                            <Button variant="ghost" size="sm" className="rounded-xl gap-2 text-xs font-bold hover:bg-muted h-9">
                                <Filter className="w-3.5 h-3.5" />
                                Filtrar
                            </Button>
                        </div>
                    </div>
                    <div className="p-0 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted/30 border-b border-border/30">
                                    <th className="px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/40">Título</th>
                                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/40">Tipo</th>
                                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/40 text-center">Estado</th>
                                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/40 text-center">Fecha de Publicación</th>
                                    <th className="px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/40 text-right">Drive</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && items.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center">
                                            <Loader2 className="w-8 h-8 animate-spin text-primary/20 mx-auto" />
                                        </td>
                                    </tr>
                                ) : items.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center text-muted-foreground/40 italic">No hay contenidos registrados.</td>
                                    </tr>
                                ) : items.map(item => (
                                    <tr key={item.id} className="border-b border-border/20 last:border-0 hover:bg-muted/5 transition-colors group">
                                        <td className="px-8 py-5 text-[14px] font-bold text-foreground/85">{item.title}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-muted-foreground/60">
                                                {TYPE_ICONS[item.type]}
                                                <span className="text-[12px] font-semibold capitalize">{item.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <Badge variant="outline" className={cn("rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase h-6", STATUS_COLORS[item.status])}>
                                                {item.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-5 text-center text-[12px] font-bold text-muted-foreground/50">
                                            {new Date(item.publish_date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            {item.drive_link ? (
                                                <a href={item.drive_link} target="_blank" rel="noopener noreferrer" className="p-2 inline-flex rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all">
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            ) : '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Help Dialog */}
                <Dialog open={isHelpDialogOpen} onOpenChange={setIsHelpDialogOpen}>
                    <DialogContent className="sm:max-w-[550px] rounded-[32px] overflow-hidden p-0 border-none shadow-2xl">
                        <div className="bg-primary p-8 text-white">
                            <DialogTitle className="text-2xl font-bold flex items-center gap-3 mb-2">
                                <HelpCircle className="w-8 h-8 opacity-50" />
                                Guía de Importación
                            </DialogTitle>
                            <p className="text-primary-foreground/70 text-sm">
                                Configura tu archivo para una sincronización perfecta con el calendario.
                            </p>
                        </div>

                        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-thin">
                            <div className="space-y-4">
                                <h4 className="font-bold text-foreground flex items-center gap-2 text-base">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-[10px] flex items-center justify-center font-black">1</div>
                                    Columnas y Valores
                                </h4>
                                <div className="grid gap-3 pl-8">
                                    {[
                                        { col: 'title', desc: 'Título del post', ex: '"IA para Agencias"' },
                                        { col: 'hook', desc: 'Primera línea (Hook)', ex: '"Tu empresa está frenada..."' },
                                        { col: 'copy', desc: 'Contenido completo', ex: '"Cuerpo del post..."' },
                                        { col: 'cta', desc: 'Llamado a la acción', ex: '"Comenta IA"' },
                                        { col: 'type', desc: 'video, carousel, thread, article', ex: 'video' },
                                        { col: 'status', desc: 'draft, scheduled, published', ex: 'scheduled' },
                                        { col: 'publish_date', desc: 'Formato: AAAA-MM-DD', ex: '2024-03-25' },
                                        { col: 'week', desc: 'S1, S2, S3, S4', ex: 'S1' },
                                        { col: 'objective', desc: 'Dolor, Educación, Prueba...', ex: 'Dolor' },
                                    ].map((field) => (
                                        <div key={field.col} className="flex flex-col gap-1 pb-2 border-b border-border/50 last:border-none">
                                            <div className="flex items-center justify-between">
                                                <code className="text-[12px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded-md uppercase tracking-tighter">{field.col}</code>
                                                <span className="text-[10px] text-muted-foreground italic">Ej: {field.ex}</span>
                                            </div>
                                            <p className="text-[13px] text-muted-foreground/80 font-medium">{field.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-bold text-foreground flex items-center gap-2 text-base">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-[10px] flex items-center justify-center font-black">2</div>
                                    Ejemplo de CSV (Raw)
                                </h4>
                                <div className="bg-muted/50 p-4 rounded-2xl border border-border/50 font-mono text-[11px] text-muted-foreground overflow-x-auto whitespace-pre">
                                    {`title,type,status,publish_date,drive_link
"Mi Gran Post",video,scheduled,2024-03-20,https://drive...
"Estrategia IA",thread,draft,2024-03-22,https://drive...`}
                                </div>
                            </div>

                            <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10 space-y-3">
                                <h4 className="font-bold text-primary flex items-center gap-2 text-sm">
                                    <BookOpen className="w-4 h-4" />
                                    Plantilla Maestra
                                </h4>
                                <p className="text-[12px] text-muted-foreground leading-relaxed">
                                    Hemos preparado una estructura optimizada en Google Sheets para que planifiques tus Sprints de contenido.
                                </p>
                                <Button variant="outline" className="w-full rounded-xl bg-white border-primary/20 text-primary font-bold gap-2 text-xs" asChild>
                                    <a href="https://docs.google.com/spreadsheets/d/1_YOUR_TEMPLATE_ID_HERE/copy" target="_blank" rel="noopener noreferrer">
                                        <Download className="w-3.5 h-3.5" />
                                        Abrir Plantilla en Google Sheets
                                    </a>
                                </Button>
                            </div>

                            <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
                                <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
                                <p className="text-[12px] text-amber-800 font-medium leading-relaxed">
                                    <b>Nota Importante:</b> Si usas comillas en el título del contenido DENTRO del CSV, asegúrate de que el archivo esté bien delimitado para evitar errores de lectura.
                                </p>
                            </div>
                        </div>
                        <div className="p-6 bg-muted/20 border-t border-border/30">
                            <Button onClick={() => setIsHelpDialogOpen(false)} className="rounded-xl w-full font-bold h-12 shadow-lg shadow-primary/20">
                                ¡Entendido, vamos a publicar!
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

            </TooltipProvider>
        </div>
    );
}
