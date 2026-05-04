"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Loader2, Zap, ArrowRight, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            toast.success("¡Bienvenido de nuevo!");
            window.location.href = "/";
        } catch (err: any) {
            toast.error(err.message || "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD] relative overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]" />

            <div className="w-full max-w-md p-8 relative z-10">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-primary rounded-[22px] flex items-center justify-center shadow-2xl shadow-primary/20 mb-6 group transition-transform hover:scale-105 duration-500">
                        <Zap className="w-8 h-8 text-white fill-white group-hover:animate-pulse" />
                    </div>
                    <h1 className="text-3xl font-black text-foreground tracking-tighter mb-2">GO DREAM AI</h1>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-[0.2em]">Dashboard Estratégico</p>
                </div>

                <div className="bg-white rounded-[40px] border border-border/50 p-10 shadow-2xl shadow-slate-200/50">
                    <div className="mb-8">
                        <h2 className="text-xl font-black text-foreground mb-1">Acceso</h2>
                        <p className="text-sm text-muted-foreground font-medium">Ingresa tus credenciales para continuar.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 ml-4">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full pl-12 pr-4 py-4 rounded-[20px] bg-muted/20 border border-transparent focus:bg-white focus:border-border/50 focus:ring-2 focus:ring-primary/5 outline-none transition-all text-sm font-medium"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 ml-4">Contraseña</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 rounded-[20px] bg-muted/20 border border-transparent focus:bg-white focus:border-border/50 focus:ring-2 focus:ring-primary/5 outline-none transition-all text-sm font-medium"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            disabled={loading}
                            className="w-full py-7 rounded-[22px] font-black text-xs uppercase tracking-widest gap-2 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all mt-4"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Iniciar Sesión
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-border/50 text-center flex flex-col gap-4">
                        <button
                            onClick={() => router.push("/ruta-secreta-registro")}
                            className="text-[10px] font-black text-primary/60 uppercase tracking-widest hover:text-primary transition-colors"
                        >
                            ¿No tienes cuenta? Registrarse
                        </button>
                        <p className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                            Go Dream AI &copy; 2026
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
