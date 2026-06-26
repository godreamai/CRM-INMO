"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createOpportunity } from "@/lib/opportunities";
import type { DecisionMaker } from "@/lib/types";

interface CreateOpportunityDialogProps {
  availableSdrs: string[];
  onCreated: () => void;
}

const DEFAULT_FORM: Partial<DecisionMaker> = {
  full_name: "",
  job_title: "",
  company_domain: "",
  linkedin_profile: "",
  sdr_assigned: "",
};

export function CreateOpportunityDialog({ availableSdrs, onCreated }: CreateOpportunityDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<DecisionMaker>>(DEFAULT_FORM);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createOpportunity(formData);
      toast.success("Oportunidad creada correctamente");
      setOpen(false);
      setFormData(DEFAULT_FORM);
      onCreated();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error al crear la oportunidad";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleField = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const sdrOptions = availableSdrs.length > 0
    ? availableSdrs
    : ["Nassa", "Mauro", "SDR 1", "SDR 2"];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-[13px] px-6 h-10 gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
          <Plus className="w-4 h-4" aria-hidden="true" />
          Nueva Oportunidad
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[32px] border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl p-8">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold tracking-tight text-foreground/90">
            Nueva Oportunidad
          </DialogTitle>
          <DialogDescription className="text-muted-foreground/60 font-medium">
            Introduce los datos básicos de la oportunidad. El estado será &apos;Nuevo&apos; por defecto.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="full_name" className="text-[13px] font-bold text-foreground/70 ml-1">
                Nombre Completo *
              </Label>
              <Input
                id="full_name"
                required
                placeholder="Ej: Juan Pérez"
                className="h-12 bg-muted/30 border-none rounded-2xl px-4 font-medium text-[14px]"
                value={formData.full_name ?? ""}
                onChange={handleField("full_name")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="job_title" className="text-[13px] font-bold text-foreground/70 ml-1">
                Cargo *
              </Label>
              <Input
                id="job_title"
                required
                placeholder="Ej: CEO"
                className="h-12 bg-muted/30 border-none rounded-2xl px-4 font-medium text-[14px]"
                value={formData.job_title ?? ""}
                onChange={handleField("job_title")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company_domain" className="text-[13px] font-bold text-foreground/70 ml-1">
                Empresa *
              </Label>
              <Input
                id="company_domain"
                required
                placeholder="Ej: google.com"
                className="h-12 bg-muted/30 border-none rounded-2xl px-4 font-medium text-[14px]"
                value={formData.company_domain ?? ""}
                onChange={handleField("company_domain")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="linkedin_profile" className="text-[13px] font-bold text-foreground/70 ml-1">
                LinkedIn *
              </Label>
              <Input
                id="linkedin_profile"
                required
                placeholder="Ej: https://linkedin.com/in/juanperez"
                className="h-12 bg-muted/30 border-none rounded-2xl px-4 font-medium text-[14px]"
                value={formData.linkedin_profile ?? ""}
                onChange={handleField("linkedin_profile")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sdr_assigned" className="text-[13px] font-bold text-foreground/70 ml-1">
                Asignar a (SDR)
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    sdr_assigned: value === "unassigned" ? "" : value,
                  }))
                }
                value={formData.sdr_assigned || "unassigned"}
              >
                <SelectTrigger
                  id="sdr_assigned"
                  className="h-12 bg-muted/30 border-none rounded-2xl px-4 font-medium text-[14px]"
                >
                  <SelectValue placeholder="Sin asignar" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/50 shadow-lg">
                  <SelectItem value="unassigned">Sin asignar</SelectItem>
                  {sdrOptions.map((sdr) => (
                    <SelectItem key={sdr} value={sdr}>
                      {sdr}
                    </SelectItem>
                  ))}
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
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                  Creando...
                </span>
              ) : (
                "Crear Oportunidad"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
