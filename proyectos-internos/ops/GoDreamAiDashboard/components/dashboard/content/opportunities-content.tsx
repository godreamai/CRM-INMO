"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getOpportunities,
  updateOpportunityState,
  getJobTitles,
  getSdrs,
  type GetOpportunitiesParams,
} from "@/lib/opportunities";
import { supabase } from "@/lib/supabase";
import { OPPORTUNITY_STATE_LABELS, type OpportunityState, type DecisionMaker } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Search,
  Loader2,
  Linkedin,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MapPin,
  ChevronDown,
  Mail,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { OpportunityStatusBadge } from "@/components/dashboard/opportunities/opportunity-status-badge";
import { CreateOpportunityDialog } from "@/components/dashboard/opportunities/create-opportunity-dialog";
import { OpportunityNotesSheet } from "@/components/dashboard/opportunities/opportunity-notes-sheet";

function truncate(str: string | null, max: number): string {
  if (!str) return "-";
  return str.length <= max ? str : `${str.slice(0, max)}…`;
}

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
  const [notesTarget, setNotesTarget] = useState<DecisionMaker | null>(null);

  useEffect(() => {
    if (initialSearch) setParams((prev) => ({ ...prev, search: initialSearch }));
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
    Promise.all([getJobTitles(), getSdrs()]).then(([titles, sdrs]) => {
      setAvailableJobTitles(titles);
      setAvailableSdrs(sdrs);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    setParams((prev) => ({
      ...prev,
      orderBy: column,
      orderDirection: prev.orderBy === column && prev.orderDirection === "asc" ? "desc" : "asc",
      page: 1,
    }));
  };

  const getSortIcon = (column: string) => {
    if (params.orderBy !== column) return <ArrowUpDown className="w-3 h-3 ml-2 opacity-30" aria-hidden="true" />;
    return params.orderDirection === "asc"
      ? <ArrowUp className="w-3 h-3 ml-2 text-primary" aria-hidden="true" />
      : <ArrowDown className="w-3 h-3 ml-2 text-primary" aria-hidden="true" />;
  };

  const totalPages = Math.ceil(totalCount / (params.pageSize ?? 15));
  const currentPage = params.page ?? 1;
  const pageSize = params.pageSize ?? 15;

  const handleSdrToggle = (sdr: string) => {
    setParams((prev) => {
      const current = prev.sdrAssigned ?? [];
      const updated = current.includes(sdr)
        ? current.filter((s) => s !== sdr)
        : [...current, sdr];
      return { ...prev, sdrAssigned: updated, page: 1 };
    });
  };

  const handleJobTitleToggle = (title: string) => {
    setParams((prev) => {
      const current = prev.jobTitles ?? [];
      const updated = current.includes(title)
        ? current.filter((t) => t !== title)
        : [...current, title];
      return { ...prev, jobTitles: updated, page: 1 };
    });
  };

  return (
    <div className="space-y-8 pb-10">
      <TooltipProvider>
        {/* Filter Bar */}
        <div className="bg-card rounded-[24px] p-4 shadow-sm border border-border/30 flex flex-col md:flex-row gap-3 items-start md:items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" aria-hidden="true" />
            <Input
              placeholder="Buscar por nombre, empresa, ubicación..."
              className="pl-11 bg-muted/30 border-none shadow-none rounded-2xl h-12 text-[14px]"
              value={params.search}
              onChange={(e) => setParams((prev) => ({ ...prev, search: e.target.value, page: 1 }))}
              aria-label="Buscar oportunidades"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* State filter */}
            <Select
              onValueChange={(val) =>
                setParams((prev) => ({ ...prev, state: val === "all" ? "" : val, page: 1 }))
              }
              value={params.state === "" ? "all" : (params.state as string)}
            >
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

            {/* SDR filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full md:w-[190px] bg-muted/10 border border-border/50 shadow-none rounded-2xl h-12 text-[14px] font-medium justify-between px-4"
                >
                  <span className="truncate">
                    {(params.sdrAssigned?.length ?? 0) > 0
                      ? `SDR (${params.sdrAssigned!.length})`
                      : "SDR: Todos"}
                  </span>
                  <ChevronDown className="w-4 h-4 opacity-50" aria-hidden="true" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[220px] p-0 rounded-2xl" align="start">
                <div className="p-3 border-b border-border/50">
                  <span className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest">Filtrar por SDR</span>
                </div>
                <div className="p-2 space-y-1">
                  {[{ value: "unassigned", label: "Sin asignar" }, ...availableSdrs.map((s) => ({ value: s, label: s }))].map(({ value, label }) => (
                    <div
                      key={value}
                      role="button"
                      tabIndex={0}
                      className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded-xl cursor-pointer transition-colors"
                      onClick={() => handleSdrToggle(value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSdrToggle(value)}
                    >
                      <Checkbox id={`sdr-${value}`} checked={params.sdrAssigned?.includes(value)} />
                      <label htmlFor={`sdr-${value}`} className="text-[13px] font-medium leading-none cursor-pointer flex-1">
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
                {(params.sdrAssigned?.length ?? 0) > 0 && (
                  <div className="p-2 border-t border-border/50">
                    <Button
                      variant="ghost"
                      className="w-full h-8 text-[11px] font-bold uppercase text-primary hover:text-primary hover:bg-primary/5 rounded-lg"
                      onClick={() => setParams((prev) => ({ ...prev, sdrAssigned: [], page: 1 }))}
                    >
                      Limpiar filtros
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>

            {/* Job title filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full md:w-[190px] bg-muted/10 border border-border/50 shadow-none rounded-2xl h-12 text-[14px] font-medium justify-between px-4"
                >
                  <span className="truncate">
                    {(params.jobTitles?.length ?? 0) > 0
                      ? `Cargos (${params.jobTitles!.length})`
                      : "Todos los cargos"}
                  </span>
                  <ChevronDown className="w-4 h-4 opacity-50" aria-hidden="true" />
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
                        role="button"
                        tabIndex={0}
                        className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded-xl cursor-pointer transition-colors"
                        onClick={() => handleJobTitleToggle(title)}
                        onKeyDown={(e) => e.key === "Enter" && handleJobTitleToggle(title)}
                      >
                        <Checkbox id={`title-${title}`} checked={params.jobTitles?.includes(title)} />
                        <label htmlFor={`title-${title}`} className="text-[13px] font-medium leading-none cursor-pointer flex-1 truncate">
                          {title}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                {(params.jobTitles?.length ?? 0) > 0 && (
                  <div className="p-2 border-t border-border/50">
                    <Button
                      variant="ghost"
                      className="w-full h-8 text-[11px] font-bold uppercase text-primary hover:text-primary hover:bg-primary/5 rounded-lg"
                      onClick={() => setParams((prev) => ({ ...prev, jobTitles: [], page: 1 }))}
                    >
                      Limpiar filtros
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-[24px] shadow-sm border border-border/30 overflow-hidden">
          <div className="px-8 py-6 flex items-center justify-between border-b border-border/30">
            <div className="flex items-center gap-4">
              <h2 className="text-[16px] font-bold text-foreground/80 tracking-tight">Oportunidades</h2>
              <span className="text-[13px] font-medium text-muted-foreground/40">{totalCount} registros</span>
            </div>
            <CreateOpportunityDialog availableSdrs={availableSdrs} onCreated={fetchData} />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-border/30">
                  <TableHead
                    className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest pl-8 h-12 cursor-pointer hover:text-foreground/60 transition-colors"
                    onClick={() => toggleSort("full_name")}
                  >
                    <div className="flex items-center">Nombre {getSortIcon("full_name")}</div>
                  </TableHead>
                  <TableHead className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest h-12">Cargo</TableHead>
                  <TableHead className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest h-12 text-center hidden sm:table-cell">Ubicación</TableHead>
                  <TableHead
                    className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest h-12 text-center cursor-pointer hover:text-foreground/60 transition-colors hidden md:table-cell"
                    onClick={() => toggleSort("company_domain")}
                  >
                    <div className="flex items-center justify-center">Empresa {getSortIcon("company_domain")}</div>
                  </TableHead>
                  <TableHead
                    className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest h-12 text-center cursor-pointer hover:text-foreground/60 transition-colors hidden lg:table-cell"
                    onClick={() => toggleSort("sdr_assigned")}
                  >
                    <div className="flex items-center justify-center">Asignado {getSortIcon("sdr_assigned")}</div>
                  </TableHead>
                  <TableHead
                    className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest h-12 text-center cursor-pointer hover:text-foreground/60 transition-colors hidden lg:table-cell"
                    onClick={() => toggleSort("created_at")}
                  >
                    <div className="flex items-center justify-center">Fecha {getSortIcon("created_at")}</div>
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
                        <Loader2 className="w-10 h-10 animate-spin text-primary/30" aria-label="Cargando" />
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
                    <TableRow
                      key={item.id}
                      className="group hover:bg-muted/20 border-b border-border/20 last:border-0 transition-colors"
                    >
                      <TableCell className="pl-8 py-4 font-bold text-[14px] text-foreground/80 whitespace-nowrap">
                        {item.full_name || `${item.first_name ?? ""} ${item.last_name ?? ""}`.trim() || "S/N"}
                      </TableCell>

                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-[13px] font-medium text-muted-foreground/50 cursor-help">
                              {truncate(item.job_title, 20)}
                            </span>
                          </TooltipTrigger>
                          {item.job_title && (
                            <TooltipContent className="max-w-[250px] bg-card border border-border shadow-lg p-3 rounded-xl">
                              <p className="text-[12px] font-medium text-foreground/90">{item.job_title}</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TableCell>

                      <TableCell className="text-center hidden sm:table-cell">
                        <div className="flex items-center justify-center gap-1.5 text-[12px] font-medium text-muted-foreground/50">
                          <MapPin className="w-3.5 h-3.5 opacity-40 shrink-0" aria-hidden="true" />
                          <span className="truncate max-w-[100px]">{item.location ?? "-"}</span>
                        </div>
                      </TableCell>

                      <TableCell className="text-center hidden md:table-cell">
                        <span className="text-[13px] font-medium text-muted-foreground/70 lowercase">
                          {item.businesses?.domain ?? item.company_domain ?? "-"}
                        </span>
                      </TableCell>

                      <TableCell className="text-center hidden lg:table-cell">
                        <span className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-tight">
                          {item.sdr_assigned ?? "N/A"}
                        </span>
                      </TableCell>

                      <TableCell className="text-center hidden lg:table-cell">
                        <span className="text-[12px] font-medium text-muted-foreground/50">
                          {new Date(item.created_at).toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </span>
                      </TableCell>

                      <TableCell className="text-center">
                        <OpportunityStatusBadge
                          state={(item.state ?? "nuevo") as OpportunityState}
                          onUpdate={(newState) => handleUpdateStatus(item.id, newState)}
                        />
                      </TableCell>

                      <TableCell className="text-right pr-8">
                        <div className="flex items-center justify-end gap-2">
                          {item.linkedin_profile && (
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                              className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                            >
                              <a
                                href={
                                  item.linkedin_profile.startsWith("http")
                                    ? item.linkedin_profile
                                    : `https://linkedin.com/in/${item.linkedin_profile}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Perfil de LinkedIn de ${item.full_name}`}
                              >
                                <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                              </a>
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg bg-muted/40 text-muted-foreground hover:bg-muted/60"
                            aria-label={`Enviar email a ${item.full_name}`}
                            disabled
                          >
                            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg bg-muted/40 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                            onClick={() => setNotesTarget(item)}
                            aria-label={`Notas de ${item.full_name}`}
                          >
                            <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border/30 bg-muted/5">
            <p className="text-[13px] font-medium text-muted-foreground/50">
              Mostrando{" "}
              <span className="font-bold text-foreground/60">
                {Math.min((currentPage - 1) * pageSize + 1, totalCount)}
              </span>{" "}
              a{" "}
              <span className="font-bold text-foreground/60">
                {Math.min(currentPage * pageSize, totalCount)}
              </span>{" "}
              de <span className="font-bold text-foreground/60">{totalCount}</span> registros
            </p>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="h-10 px-6 rounded-full bg-muted/50 text-muted-foreground/60 font-bold text-[13px] hover:bg-muted/80 disabled:opacity-30"
                disabled={currentPage === 1 || loading}
                onClick={() => setParams((prev) => ({ ...prev, page: (prev.page ?? 1) - 1 }))}
              >
                Anterior
              </Button>
              <div className="flex items-center gap-2 text-[13px] font-bold text-muted-foreground/40">
                <div className="w-8 h-8 rounded-full bg-foreground shadow-sm text-background flex items-center justify-center">
                  {currentPage}
                </div>
                <span>/</span>
                <span>{totalPages || 1}</span>
              </div>
              <Button
                variant="ghost"
                className="h-10 px-6 rounded-full bg-muted/50 text-muted-foreground/60 font-bold text-[13px] hover:bg-muted/80 disabled:opacity-30"
                disabled={currentPage === totalPages || totalPages === 0 || loading}
                onClick={() => setParams((prev) => ({ ...prev, page: (prev.page ?? 1) + 1 }))}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </div>
      </TooltipProvider>

      <OpportunityNotesSheet
        opportunity={notesTarget}
        onClose={() => setNotesTarget(null)}
      />
    </div>
  );
}
