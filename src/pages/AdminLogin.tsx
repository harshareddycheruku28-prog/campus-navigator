import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Lock, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regNo.trim() || !password.trim()) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/admin/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(35 80% 40%), hsl(35 85% 50%), hsl(215 50% 25%))" }}>
        <motion.div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 6, repeat: Infinity }} />
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative z-10 text-center max-w-md">
          <Shield className="w-20 h-20 text-primary-foreground mx-auto mb-8" />
          <h2 className="text-4xl font-bold font-display text-gradient-hero mb-4">Admin Portal</h2>
          <p className="text-primary-foreground/70 text-lg">Manage events, announcements, and branch activities for your department.</p>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-accent" />
            <h2 className="text-2xl font-bold font-display text-foreground">Admin Portal</h2>
          </div>
          <h1 className="text-3xl font-bold font-display text-foreground mb-2">Admin Access</h1>
          <p className="text-muted-foreground mb-8">Sign in with your admin credentials</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="regNo">Registration Number</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="regNo" placeholder="Admin Reg. Number" value={regNo} onChange={(e) => setRegNo(e.target.value)} className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Admin Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="Enter admin password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" />
              </div>
            </div>
            <Button type="submit" className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold" disabled={loading}>
              {loading ? "Signing in..." : "Sign In as Admin"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground text-center mt-6">Demo: Enter any credentials to explore</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
