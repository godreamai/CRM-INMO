"use client";

import { supabase } from "@/lib/supabase";

import { useState, useEffect, useCallback } from "react";
import {
    getOpportunities,
    updateOpportunityState,
    getOpportunityCounts,
    createOpportunity,
    getJobTitles,
    getSdrs,
    getOpportunityNotes,
    createOpportunityNote,
    type GetOpportunitiesParams
} from "@/lib/opportunities";
import { OPPORTUNITY_STATE_LABELS, type OpportunityState, type DecisionMaker, type Business, type OpportunityNote } from "@/lib/types";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
    Loader2,
    Linkedin,
    Sparkles,
    Zap,
    Calendar,
    MessageSquare,
    Video as VideoIcon,
    CheckCircle,
    Clock,
    XCircle,
    Building2,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    MapPin,
    ChevronDown,
    Mail,
    Calendar as CalendarIcon,
    Plus,
    Send,
    User
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const METRIC_STATES: OpportunityState[] = ['nuevo', 'conexion', 'mensaje', 'conversacion', 'agenda', 'r1', 'r2', 'cliente', 'seguimiento'];

export function OpportunitiesContent({ initialSearch = "" }: { initialSearch?: string }) {
    const [data, setData] = useState<DecisionMaker[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [params, setParams] = useState<GetOpportunitiesParams>({
        page: 1,
        pageSize: 15,
        search: initialSearch,
        state: "",
        sdrAssigned: [],
        jobTitles: [],
        orderBy: "created_at",
        orderDirection: "desc",
    });
    const [availableJobTitles, setAvailableJobTitles] = useState<string[]>([]);
    const [availableSdrs, setAvailableSdrs] = useState<string[]>([]);

    // Notes / chat state
    const [notesOpportunity, setNotesOpportunity] = useState<DecisionMaker | null>(null);
    const [notes, setNotes] = useState<OpportunityNote[]>([]);
    const [notesLoading, setNotesLoading] = useState(false);
    const [noteText, setNoteText] = useState("");
    const [noteSending, setNoteSending] = useState(false);
    const [currentUserName, setCurrentUserName] = useState<string>("Usuario");
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        full_name: "",
        job_title: "",
        company_domain: "",
        linkedin_profile: "",
        sdr_assigned: ""
    });

    useEffect(() => {
        if (initialSearch) {
            setParams(prev => ({ ...prev, search: initialSearch }));
        }
    }, [initialSearch]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getOpportunities(params);
            setData(result.data);
            setTotalCount(result.count);

        } catch (error) {
            console.error("Failed to fetch opportunities:", error);
        } finally {
            setLoading(false);
        }
    }, [params]);

    useEffect(() => {
        const fetchFilters = async () => {
            const [titles, sdrs] = await Promise.all([getJobTitles(), getSdrs()]);
            setAvailableJobTitles(titles);
            setAvailableSdrs(sdrs);
        };
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setCurrentUserId(user.id);
                setCurrentUserName(user.user_metadata?.full_name || user.user_metadata?.alias || user.email || "Usuario");
            }
        };
        fetchFilters();
        fetchUser();
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handlePageChange = (newPage: number) => {
        setParams(prev => ({ ...prev, page: newPage }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParams(prev => ({ ...prev, search: e.target.value, page: 1 }));
    };

    const handleStateChange = (value: string) => {
        setParams(prev => ({ ...prev, state: value === "all" ? "" : value, page: 1 }));
    };

    const handleSdrToggle = (sdr: string) => {
        setParams(prev => {
            const current = prev.sdrAssigned || [];
            const updated = current.includes(sdr)
                ? current.filter(s => s !== sdr)
                : [...current, sdr];
            return { ...prev, sdrAssigned: updated, page: 1 };
        });
    };

    const handleJobTitleToggle = (title: string) => {
        setParams(prev => {
            const current = prev.jobTitles || [];
            const updated = current.includes(title)
                ? current.filter(t => t !== title)
                : [...current, title];
            return { ...prev, jobTitles: updated, page: 1 };
        });
    };

    const handleUpdateStatus = async (id: string, newState: OpportunityState) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            await updateOpportunityState(id, newState, user?.id);
            fetchData();
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const toggleSort = (column: string) => {
        setParams(prev => {
            const isAsc = prev.orderBy === column && prev.orderDirection === "asc";
            return {
                ...prev,
                orderBy: column,
                orderDirection: isAsc ? "desc" : "asc",
                page: 1
            };
        });
    };

    const getSortIcon = (column: string) => {
        if (params.orderBy !== column) return <ArrowUpDown className="w-3 h-3 ml-2 opacity-30" />;
        return params.orderDirection === "asc"
            ? <ArrowUp className="w-3 h-3 ml-2 text-primary" />
            : <ArrowDown className="w-3 h-3 ml-2 text-primary" />;
    };

    const totalPages = Math.ceil(totalCount / (params.pageSize || 15));

    const truncateString = (str: string | null, num: number) => {
        if (!str) return "-";
        if (str.length <= num) return str;
        return str.slice(0, num) + "...";
    };

    const handleCreateOpportunity = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createOpportunity(formData);
            toast.success("Oportunidad creada correctamente");
            setIsCreateOpen(false);
            setFormData({
                full_name: "",
                job_title: "",
                company_domain: "",
                linkedin_profile: "",
                sdr_assigned: ""
            });
            fetchData();
        } catch (error: any) {
            console.error("Failed to create opportunity:", error);
            toast.error(error.message || "Error al crear la oportunidad");
        } finally {
            setIsSubmitting(false);
        }
    };

    const openNotes = async (opportunity: DecisionMaker) => {
        setNotesOpportunity(opportunity);
        setNotesLoading(true);
        try {
            const data = await getOpportunityNotes(opportunity.id);
            setNotes(data);
        } catch (e) {
            console.error(e);
        } finally {
            setNotesLoading(false);
        }
    };

    const handleSendNote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!noteText.trim() || !notesOpportunity) return;
        setNoteSending(true);
        try {
            const newNote = await createOpportunityNote({
                opportunity_id: notesOpportunity.id,
                text: noteText.trim(),
                user_id: currentUserId,
                user_name: currentUserName,
            });
            setNotes(prev => [...prev, newNote]);
            setNoteText("");
        } catch (e) {
            console.error(e);
            toast.error("Error al enviar la nota");
        } finally {
            setNoteSending(false);
        }
    };

    return (
        <div className="space-y-8 pb-10">
            <TooltipProvider>
                {/* Filter Bar */}
                <div className="bg-card rounded-[24px] p-4 shadow-sm border border-border/30 flex flex-col md:flex-row gap-3 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                        <Input
                            placeholder="Buscar por nombre, empresa, ubicación..."
                            className="pl-11 bg-muted/30 border-none shadow-none rounded-2xl h-12 text-[14px]"
                            value={params.search}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        <Select onValueChange={handleStateChange} value={params.state === "" ? "all" : (params.state as string)}>
                            <SelectTrigger className="w-full md:w-[190px] bg-muted/10 border border-border/50 shadow-none rounded-2xl h-12 text-[14px] font-medium">
                                <SelectValue placeholder="Todos los estados" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="all">Todos los estados</SelectItem>
                                {Object.entries(OPPORTUNITY_STATE_LABELS).map(([value, label]) => (
                                    <SelectItem key={value} value={value}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full md:w-[190px] bg-muted/10 border border-border/50 shadow-none rounded-2xl h-12 text-[14px] font-medium justify-between px-4"
                                >
                                    <span className="truncate">
                                        {params.sdrAssigned && params.sdrAssigned.length > 0
                                            ? `SDR (${params.sdrAssigned.length})`
                                            : "SDR: Todos"}
                                    </span>
                                    <ChevronDown className="w-4 h-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[220px] p-0 rounded-2xl" align="start">
                                <div className="p-3 border-b border-border/50">
                                    <span className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest">Filtrar por SDR</span>
                                </div>
                                <div className="p-2 space-y-1">
                                    <div
                                        className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded-xl cursor-pointer transition-colors"
                                        onClick={() => handleSdrToggle("unassigned")}
                                    >
                                        <Checkbox
                                            id="sdr-unassigned"
                                            checked={params.sdrAssigned?.includes("unassigned")}
                                        />
                                        <label htmlFor="sdr-unassigned" className="text-[13px] font-medium leading-none cursor-pointer flex-1" onClick={(e) => e.preventDefault()}>
                                            Sin asignar
                                        </label>
                                    </div>
                                    {availableSdrs.map((sdr) => (
                                        <div
                                            key={sdr}
                                            className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded-xl cursor-pointer transition-colors"
                                            onClick={() => handleSdrToggle(sdr)}
                                        >
                                            <Checkbox
                                                id={`sdr-${sdr}`}
                                                checked={params.sdrAssigned?.includes(sdr)}
                                            />
                                            <label htmlFor={`sdr-${sdr}`} className="text-[13px] font-medium leading-none cursor-pointer flex-1" onClick={(e) => e.preventDefault()}>
                                                {sdr}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {params.sdrAssigned && params.sdrAssigned.length > 0 && (
                                    <div className="p-2 border-t border-border/50">
                                        <Button
                                            variant="ghost"
                                            className="w-full h-8 text-[11px] font-bold uppercase text-primary hover:text-primary hover:bg-primary/5 rounded-lg"
                                            onClick={() => setParams(prev => ({ ...prev, sdrAssigned: [], page: 1 }))}
                                        >
                                            Limpiar filtros
                                        </Button>
                                    </div>
                                )}
                            </PopoverContent>
                        </Popover>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button 
                                    variant="outline" 
                                    className="w-full md:w-[190px] bg-muted/10 border border-border/50 shadow-none rounded-2xl h-12 text-[14px] font-medium justify-between px-4"
                                >
                                    <span className="truncate">
                                        {params.jobTitles && params.jobTitles.length > 0 
                                            ? `Cargos (${params.jobTitles.length})` 
                                            : "Todos los cargos"}
                                    </span>
                                    <ChevronDown className="w-4 h-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[250px] p-0 rounded-2xl" align="start">
                                <div className="p-3 border-b border-border/50">
                                    <span className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest">Filtrar por Cargo</span>
                                </div>
                                <ScrollArea className="h-[250px] p-2">
                                    <div className="space-y-1">
                                        {availableJobTitles.map((title) => (
                                            <div 
                                                key={title} 
                                                className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded-xl cursor-pointer transition-colors"
                                                onClick={() => handleJobTitleToggle(title)}
                                            >
                                                <Checkbox 
                                                    id={`title-${title}`}
                                                    checked={params.jobTitles?.includes(title)}
                                                />
                                                <label
                                                    htmlFor={`title-${title}`}
                                                    className="text-[13px] font-medium leading-none cursor-pointer flex-1 truncate"
                                                    onClick={(e) => e.preventDefault()} // Prevent label from triggering another click if nested in div with onClick
                                                >
                                                    {title}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                                {params.jobTitles && params.jobTitles.length > 0 && (
                                    <div className="p-2 border-t border-border/50">
                                        <Button 
                                            variant="ghost" 
                                            className="w-full h-8 text-[11px] font-bold uppercase text-primary hover:text-primary hover:bg-primary/5 rounded-lg"
                                            onClick={() => setParams(prev => ({ ...prev, jobTitles: [], page: 1 }))}
                                        >
                                            Limpiar filtros
                                        </Button>
                                    </div>
                                )}
                            </PopoverContent>
                        </Popover>

                        <div className="relative w-full md:w-[160px]">
                            <Input
                                type="text"
                                placeholder="mm/dd/aaaa"
                                className="bg-muted/10 border border-border/50 shadow-none rounded-2xl h-12 text-[13px] pr-10"
                            />
                            <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                        </div>

                        <div className="relative w-full md:w-[160px]">
                            <Input
                                type="text"
                                placeholder="mm/dd/aaaa"
                                className="bg-muted/10 border border-border/50 shadow-none rounded-2xl h-12 text-[13px] pr-10"
                            />
                            <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-card rounded-[24px] shadow-sm border border-border/30 overflow-hidden">
                    {/* Table Title Header */}
                    <div className="px-8 py-6 flex items-center justify-between border-b border-border/30">
                        <div className="flex items-center gap-4">
                            <h2 className="text-[16px] font-bold text-foreground/80 tracking-tight">Oportunidades (BOs)</h2>
                            <span className="text-[13px] font-medium text-muted-foreground/40">{totalCount} registros</span>
                        </div>

                        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                            <DialogTrigger asChild>
                                <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-[13px] px-6 h-10 gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
                                    <Plus className="w-4 h-4" />
                                    Nueva Oportunidad
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] rounded-[32px] border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl p-8">
                                <DialogHeader className="mb-6">
                                    <DialogTitle className="text-2xl font-bold tracking-tight text-foreground/90">Nueva Oportunidad</DialogTitle>
                                    <DialogDescription className="text-muted-foreground/60 font-medium">
                                        Introduce los datos básicos de la oportunidad. El estado será 'Nuevo' por defecto.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleCreateOpportunity} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="full_name" className="text-[13px] font-bold text-foreground/70 ml-1">Nombre Completo *</Label>
                                            <Input
                                                id="full_name"
                                                required
                                                placeholder="Ej: Juan Pérez"
                                                className="h-12 bg-muted/30 border-none rounded-2xl px-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[14px]"
                                                value={formData.full_name}
                                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="job_title" className="text-[13px] font-bold text-foreground/70 ml-1">Cargo *</Label>
                                            <Input
                                                id="job_title"
                                                required
                                                placeholder="Ej: CEO"
                                                className="h-12 bg-muted/30 border-none rounded-2xl px-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[14px]"
                                                value={formData.job_title}
                                                onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="company_domain" className="text-[13px] font-bold text-foreground/70 ml-1">Empresa *</Label>
                                            <Input
                                                id="company_domain"
                                                required
                                                placeholder="Ej: google.com"
                                                className="h-12 bg-muted/30 border-none rounded-2xl px-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[14px]"
                                                value={formData.company_domain}
                                                onChange={(e) => setFormData({ ...formData, company_domain: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="linkedin_profile" className="text-[13px] font-bold text-foreground/70 ml-1">LinkedIn *</Label>
                                            <Input
                                                id="linkedin_profile"
                                                required
                                                placeholder="Ej: https://linkedin.com/in/juanperez"
                                                className="h-12 bg-muted/30 border-none rounded-2xl px-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[14px]"
                                                value={formData.linkedin_profile}
                                                onChange={(e) => setFormData({ ...formData, linkedin_profile: e.target.value })}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="sdr_assigned" className="text-[13px] font-bold text-foreground/70 ml-1">Asignar a (SDR)</Label>
                                            <Select
                                                onValueChange={(value) => setFormData({ ...formData, sdr_assigned: value === "unassigned" ? "" : value })}
                                                value={formData.sdr_assigned || "unassigned"}
                                            >
                                                <SelectTrigger id="sdr_assigned" className="h-12 bg-muted/30 border-none rounded-2xl px-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[14px]">
                                                    <SelectValue placeholder="Sin asignar" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl border-border/50 shadow-lg">
                                                    <SelectItem value="unassigned">Sin asignar</SelectItem>
                                                    <SelectItem value="Nassa">Nassa</SelectItem>
                                                    <SelectItem value="Mauro">Mauro</SelectItem>
                                                    <SelectItem value="SDR 1">SDR 1</SelectItem>
                                                    <SelectItem value="SDR 2">SDR 2</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <DialogFooter className="pt-4">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-[15px] shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center gap-2">
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Creando...
                                                </div>
                                            ) : (
                                                "Crear Oportunidad"
                                            )}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-b border-border/30">
                                <TableHead
                                    className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest pl-8 h-12 cursor-pointer hover:text-foreground/60 transition-colors"
                                    onClick={() => toggleSort('full_name')}
                                >
                                    <div className="flex items-center">
                                        Nombre {getSortIcon('full_name')}
                                    </div>
                                </TableHead>
                                <TableHead className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest h-12">Cargo</TableHead>
                                <TableHead className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest h-12 text-center">Ubicación</TableHead>
                                <TableHead
                                    className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest h-12 text-center cursor-pointer hover:text-foreground/60 transition-colors"
                                    onClick={() => toggleSort('company_domain')}
                                >
                                    <div className="flex items-center justify-center">
                                        Empresa {getSortIcon('company_domain')}
                                    </div>
                                </TableHead>
                                <TableHead
                                    className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest h-12 text-center cursor-pointer hover:text-foreground/60 transition-colors"
                                    onClick={() => toggleSort('sdr_assigned')}
                                >
                                    <div className="flex items-center justify-center">
                                        Asignado {getSortIcon('sdr_assigned')}
                                    </div>
                                </TableHead>
                                <TableHead
                                    className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest h-12 text-center cursor-pointer hover:text-foreground/60 transition-colors"
                                    onClick={() => toggleSort('created_at')}
                                >
                                    <div className="flex items-center justify-center">
                                        Fecha {getSortIcon('created_at')}
                                    </div>
                                </TableHead>
                                <TableHead className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest h-12 text-center">Estado</TableHead>
                                <TableHead className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest text-right pr-8 h-12">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="h-64 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="w-10 h-10 animate-spin text-primary/30" />
                                            <span className="text-sm font-medium text-muted-foreground/40">Sincronizando...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="h-64 text-center text-muted-foreground/40 font-medium">
                                        No se encontraron registros activos.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((item) => (
                                    <TableRow key={item.id} className="group hover:bg-muted/20 border-b border-border/20 last:border-0 transition-colors">
                                        {/* Full Name */}
                                        <TableCell className="pl-8 py-4 font-bold text-[14px] text-foreground/80 whitespace-nowrap">
                                            {item.full_name || `${item.first_name || ""} ${item.last_name || ""}`.trim() || "S/N"}
                                        </TableCell>

                                        {/* Job Title with Tooltip */}
                                        <TableCell>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <span className="text-[13px] font-medium text-muted-foreground/50 cursor-help">
                                                        {truncateString(item.job_title, 20)}
                                                    </span>
                                                </TooltipTrigger>
                                                {item.job_title && (
                                                    <TooltipContent className="max-w-[250px] bg-card border border-border shadow-lg p-3 rounded-xl">
                                                        <p className="text-[12px] font-medium text-foreground/90">{item.job_title}</p>
                                                    </TooltipContent>
                                                )}
                                            </Tooltip>
                                        </TableCell>

                                        {/* Location */}
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center gap-1.5 text-[12px] font-medium text-muted-foreground/50">
                                                <MapPin className="w-3.5 h-3.5 opacity-40 shrink-0" />
                                                <span className="truncate max-w-[100px]">{item.location || "-"}</span>
                                            </div>
                                        </TableCell>

                                        {/* Company Domain */}
                                        <TableCell className="text-center">
                                            <span className="text-[13px] font-medium text-muted-foreground/70 lowercase">
                                                {item.businesses?.domain || item.company_domain || "-"}
                                            </span>
                                        </TableCell>

                                        {/* SDR Assigned */}
                                        <TableCell className="text-center">
                                            <span className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-tight">
                                                {item.sdr_assigned || "N/A"}
                                            </span>
                                        </TableCell>

                                        {/* Fecha Creation */}
                                        <TableCell className="text-center">
                                            <span className="text-[12px] font-medium text-muted-foreground/50">
                                                {new Date(item.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                            </span>
                                        </TableCell>

                                        {/* State Dropdown (Same Cell) */}
                                        <TableCell className="text-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className={cn(
                                                            "rounded-full h-8 px-4 gap-2 border-none shadow-none text-[10px] font-bold uppercase tracking-tight",
                                                            getStatusStyles(item.state as OpportunityState)
                                                        )}
                                                    >
                                                        {OPPORTUNITY_STATE_LABELS[item.state as OpportunityState] || "NUEVO"}
                                                        <ChevronDown className="w-3 h-3 opacity-50" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="center" className="w-[180px] rounded-xl border-border/50 shadow-lg">
                                                    {Object.entries(OPPORTUNITY_STATE_LABELS).map(([value, label]) => (
                                                        <DropdownMenuItem
                                                            key={value}
                                                            className="text-[11px] font-semibold h-9 px-4 focus:bg-primary/5 focus:text-primary cursor-pointer"
                                                            onClick={() => handleUpdateStatus(item.id, value as OpportunityState)}
                                                        >
                                                            {label}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="text-right pr-8">
                                            <div className="flex items-center justify-end gap-2">
                                                {item.linkedin_profile && (
                                                    <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                                                        <a
                                                            href={item.linkedin_profile.startsWith('http') ? item.linkedin_profile : `https://linkedin.com/in/${item.linkedin_profile}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Linkedin className="w-3.5 h-3.5" />
                                                        </a>
                                                    </Button>
                                                )}
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-muted/40 text-muted-foreground hover:bg-muted/60">
                                                    <Mail className="w-3.5 h-3.5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-lg bg-muted/40 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                                                    onClick={() => openNotes(item)}
                                                >
                                                    <MessageSquare className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    {/* Custom Pagination Footer */}
                    <div className="px-10 py-5 flex items-center justify-between border-t border-border/30 bg-muted/5">
                        <div className="text-[13px] font-medium text-muted-foreground/50">
                            Mostrando <span className="font-bold text-foreground/60">{Math.min((params.page || 1) * (params.pageSize || 15) - (params.pageSize || 15) + 1, totalCount)}</span> a <span className="font-bold text-foreground/60">{Math.min((params.page || 1) * (params.pageSize || 15), totalCount)}</span> de <span className="font-bold text-foreground/60">{totalCount}</span> registros
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                className="h-10 px-6 rounded-full bg-muted/50 text-muted-foreground/60 font-bold text-[13px] hover:bg-muted/80 disabled:opacity-30 border-none shadow-none"
                                disabled={params.page === 1 || loading}
                                onClick={() => handlePageChange((params.page || 1) - 1)}
                            >
                                Anterior
                            </Button>

                            <div className="flex items-center gap-2 text-[13px] font-bold text-muted-foreground/40">
                                <div className="w-8 h-8 rounded-full bg-slate-900 shadow-sm text-white flex items-center justify-center">
                                    {params.page}
                                </div>
                                <span>/</span>
                                <span>{totalPages || 1}</span>
                            </div>

                            <Button
                                variant="ghost"
                                className="h-10 px-6 rounded-full bg-muted/50 text-muted-foreground/60 font-bold text-[13px] hover:bg-muted/80 disabled:opacity-30 border-none shadow-none"
                                disabled={params.page === totalPages || totalPages === 0 || loading}
                                onClick={() => handlePageChange((params.page || 1) + 1)}
                            >
                                Siguiente
                            </Button>
                        </div>
                    </div>
                </div>
            </TooltipProvider>

            {/* Notes / Chat Sheet */}
            <Sheet open={!!notesOpportunity} onOpenChange={(open) => { if (!open) setNotesOpportunity(null); }}>
                <SheetContent className="w-full sm:max-w-[420px] flex flex-col p-0 gap-0">
                    <SheetHeader className="px-6 py-5 border-b border-border/30 shrink-0">
                        <SheetTitle className="text-[15px] font-bold text-foreground/80 truncate">
                            Notas — {notesOpportunity?.full_name || "Oportunidad"}
                        </SheetTitle>
                        <p className="text-[12px] text-muted-foreground/50 font-medium mt-0.5">
                            {notesOpportunity?.company_domain || notesOpportunity?.businesses?.domain || ""}
                        </p>
                    </SheetHeader>

                    {/* Messages area */}
                    <ScrollArea className="flex-1 px-4 py-4">
                        {notesLoading ? (
                            <div className="flex items-center justify-center h-32">
                                <Loader2 className="w-6 h-6 animate-spin text-primary/30" />
                            </div>
                        ) : notes.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-32 gap-2 text-muted-foreground/40">
                                <MessageSquare className="w-8 h-8 opacity-30" />
                                <span className="text-[13px] font-medium">Sin notas aún</span>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {notes.map((note) => {
                                    const isMe = note.user_name === currentUserName;
                                    return (
                                        <div key={note.id} className={cn("flex gap-2.5", isMe ? "flex-row-reverse" : "flex-row")}>
                                            <div className="w-7 h-7 rounded-full bg-muted/60 flex items-center justify-center shrink-0 mt-1">
                                                <User className="w-3.5 h-3.5 text-muted-foreground/50" />
                                            </div>
                                            <div className={cn("max-w-[75%] space-y-1", isMe ? "items-end" : "items-start")}>
                                                <div className={cn("flex items-center gap-2", isMe ? "flex-row-reverse" : "flex-row")}>
                                                    <span className="text-[11px] font-bold text-muted-foreground/50">{note.user_name}</span>
                                                    <span className="text-[10px] text-muted-foreground/30">
                                                        {new Date(note.created_at).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                                <div className={cn(
                                                    "px-3.5 py-2.5 rounded-2xl text-[13px] font-medium leading-relaxed",
                                                    isMe
                                                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                                                        : "bg-muted/50 text-foreground/80 rounded-tl-sm"
                                                )}>
                                                    {note.text}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </ScrollArea>

                    {/* Input area */}
                    <form onSubmit={handleSendNote} className="px-4 py-4 border-t border-border/30 flex gap-2 shrink-0">
                        <Input
                            placeholder="Escribe una nota..."
                            className="flex-1 bg-muted/30 border-none rounded-2xl h-11 text-[13px] font-medium px-4"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            disabled={noteSending}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={!noteText.trim() || noteSending}
                            className="h-11 w-11 rounded-2xl bg-primary hover:bg-primary/90 shrink-0"
                        >
                            {noteSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        </Button>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    );
}

function getStatusStyles(state: OpportunityState) {
    switch (state) {
        case 'nuevo':
            return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
        case 'conexion':
            return 'bg-orange-500/10 text-orange-600 hover:bg-orange-500/20';
        case 'mensaje':
            return 'bg-cyan-500/10 text-cyan-600 hover:bg-cyan-500/20';
        case 'conversacion':
            return 'bg-violet-500/10 text-violet-600 hover:bg-violet-500/20';
        case 'agenda':
            return 'bg-teal-500/10 text-teal-600 hover:bg-teal-500/20';
        case 'r1':
            return 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20';
        case 'r2':
            return 'bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20';
        case 'cliente':
            return 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20';
        case 'seguimiento':
            return 'bg-slate-500/10 text-slate-600 hover:bg-slate-500/20';
        case 'rechazado':
            return 'bg-rose-500/10 text-rose-600 hover:bg-rose-500/20';
        case 'descalificado':
            return 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20';
        default:
            return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
    }
}
