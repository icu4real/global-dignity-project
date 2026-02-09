import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import prideLogo from "@/assets/pride-logo.jpeg";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate("/members");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-campaign">
          <div className="max-w-sm mx-auto">
            <div className="text-center mb-10">
              <img src={prideLogo} alt="Pride" className="h-12 w-auto mx-auto mb-4 rounded-sm" />
              <h1 className="headline-section text-foreground mb-2">
                {mode === "signin" ? "Welcome Back" : "Join Pride"}
              </h1>
              <p className="text-muted-foreground text-sm">
                {mode === "signin"
                  ? "Sign in to your impact dashboard"
                  : "Create an account to share stories and track impact"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Display Name</label>
                  <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" required />
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
              </div>

              <Button type="submit" disabled={isLoading} className="btn-primary w-full">
                {isLoading ? "..." : mode === "signin" ? "Sign In" : "Create Account"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {mode === "signin" ? (
                <>Don't have an account?{" "}<button onClick={() => setMode("signup")} className="text-primary hover:underline font-medium">Sign up</button></>
              ) : (
                <>Already a member?{" "}<button onClick={() => setMode("signin")} className="text-primary hover:underline font-medium">Sign in</button></>
              )}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
