"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Loader2, Zap, ArrowRight, Mail, Lock, User, UserCircle, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
    const [step, setStep] = useState(1); // 1: Invite Code, 2: Full Form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [alias, setAlias] = useState("");
    const [inviteCode, setInviteCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const router = useRouter();

    const validateCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data: codeData, error: codeError } = await supabase
                .from('invitation_codes')
                .select('*')
                .eq('code', inviteCode.trim())
                .eq('is_used', false)
                .single();

            if (codeError || !codeData) {
                throw new Error("Código de invitación inválido o ya utilizado.");
            }

            setIsValidated(true);
            setStep(2);
            toast.success("Código validado. Completa tus datos.");
        } catch (err: any) {
            toast.error(err.message || "Error al validar código");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValidated) return;
        setLoading(true);

        try {
            // Re-verify invitation code just in case
            const { data: codeData, error: codeError } = await supabase
                .from('invitation_codes')
                .select('*')
                .eq('code', inviteCode.trim())
                .eq('is_used', false)
                .single();

            if (codeError || !codeData) {
                throw new Error("El código expiró o fue usado por otro usuario.");
            }

            // 2. Register user
            const { data, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        alias: alias,
                    },
                },
            });

            if (authError) throw authError;

            // 3. Mark code as used
            await supabase
                .from('invitation_codes')
                .update({ is_used: true, used_at: new Date().toISOString() })
                .eq('id', codeData.id);

            toast.success("¡Cuenta creada con éxito! Ya puedes entrar.");
            router.push("/login");
        } catch (err: any) {
            toast.error(err.message || "Error al registrarse");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD] relative overflow-hidden py-12">
            {/* Background Decor */}
            <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />

            <div className="w-full max-w-xl p-8 relative z-10">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-14 h-14 bg-primary rounded-[20px] flex items-center justify-center shadow-lg shadow-primary/20 mb-4">
                        <Zap className="w-7 h-7 text-white fill-white" />
                    </div>
                    <h1 className="text-2xl font-black text-foreground tracking-tighter">
                        {step === 1 ? 'Acceso Privado' : 'Únete al Equipo'}
                    </h1>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">
                        {step === 1 ? 'Ingresa tu código secreto' : 'Completa tu perfil estratégico'}
                    </p>
                </div>

                <div className="bg-white rounded-[40px] border border-border/50 p-10 shadow-2xl shadow-slate-200/40">
                    {step === 1 ? (
                        <form onSubmit={validateCode} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-4">Código de Un Solo Uso</label>
                                <div className="relative group">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Escribe tu código aquí..."
                                        className="w-full pl-12 pr-4 py-6 rounded-[22px] bg-emerald-500/5 border border-primary/20 focus:bg-white focus:border-primary/50 transition-all text-sm font-black uppercase tracking-widest text-primary text-center outline-none"
                                        value={inviteCode}
                                        onChange={(e) => setInviteCode(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <Button
                                disabled={loading}
                                className="w-full py-7 rounded-[22px] font-black text-xs uppercase tracking-widest gap-2 shadow-xl shadow-primary/20 transition-all outline-none"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Validar Acceso <ArrowRight className="w-4 h-4" /></>}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in duration-500">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 ml-4">Nombre Real</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Ej: Mauro Pérez"
                                        className="w-full pl-12 pr-4 py-3.5 rounded-[18px] bg-muted/20 border border-transparent focus:bg-white focus:border-border/50 transition-all text-sm font-medium outline-none"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Alias */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 ml-4">Alias (Asignaciones)</label>
                                <div className="relative group">
                                    <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Ej: Mauro"
                                        className="w-full pl-12 pr-4 py-3.5 rounded-[18px] bg-muted/20 border border-transparent focus:bg-white focus:border-border/50 transition-all text-sm font-medium outline-none"
                                        value={alias}
                                        onChange={(e) => setAlias(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 ml-4">Email Corporativo</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="email"
                                        placeholder="name@godream.ai"
                                        className="w-full pl-12 pr-4 py-3.5 rounded-[18px] bg-muted/20 border border-transparent focus:bg-white focus:border-border/50 transition-all text-sm font-medium outline-none"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 ml-4">Contraseña</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="password"
                                        placeholder="Mínimo 8 caracteres"
                                        className="w-full pl-12 pr-4 py-3.5 rounded-[18px] bg-muted/20 border border-transparent focus:bg-white focus:border-border/50 transition-all text-sm font-medium outline-none"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2 pt-4">
                                <div className="flex items-center gap-2 p-3 rounded-2xl bg-primary/5 border border-primary/10 mb-4">
                                    <ShieldCheck className="w-4 h-4 text-primary" />
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Código verificado: {inviteCode}</span>
                                </div>
                            </div>

                            <Button
                                disabled={loading}
                                className="md:col-span-2 w-full py-7 rounded-[22px] font-black text-xs uppercase tracking-widest gap-2 shadow-xl shadow-primary/20 transition-all outline-none"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Finalizar Registro <ArrowRight className="w-4 h-4" /></>}
                            </Button>
                        </form>
                    )}

                    <div className="mt-8 text-center border-t border-border/50 pt-6">
                        <button
                            onClick={() => router.push("/login")}
                            className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest hover:text-primary transition-colors"
                        >
                            ¿Ya tienes cuenta? Inicia Sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
