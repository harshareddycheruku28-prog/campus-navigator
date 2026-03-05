import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, ArrowLeft, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CASTE_CATEGORIES, CUTOFF_DATA, BRANCHES } from "@/data/mockData";

const RankPredictor = () => {
  const [rank, setRank] = useState("");
  const [caste, setCaste] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank || !caste) {
      toast({ title: "Missing Information", description: "Please enter your rank and select your category", variant: "destructive" });
      return;
    }
    const rankNum = parseInt(rank);
    if (isNaN(rankNum) || rankNum < 1) {
      toast({ title: "Invalid Rank", description: "Please enter a valid rank number", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      // Find eligible branches
      const eligible = BRANCHES.filter((branch) => {
        const cutoff = CUTOFF_DATA[branch.id]?.[caste];
        return cutoff && rankNum <= cutoff;
      }).sort((a, b) => {
        const cutA = CUTOFF_DATA[a.id]?.[caste] || 0;
        const cutB = CUTOFF_DATA[b.id]?.[caste] || 0;
        return cutA - cutB; // Tighter cutoff = better branch
      });

      setLoading(false);
      if (eligible.length > 0) {
        navigate(`/predictor/result?rank=${rankNum}&caste=${caste}&branch=${eligible[0].id}`);
      } else {
        toast({ title: "No Branch Found", description: "Your rank exceeds all cutoffs for this category. Try a different category.", variant: "destructive" });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(174 60% 30%), hsl(174 55% 40%), hsl(215 50% 25%))" }}>
        <motion.div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 6, repeat: Infinity }} />
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative z-10 text-center max-w-md">
          <BarChart3 className="w-20 h-20 text-accent mx-auto mb-8" />
          <h2 className="text-4xl font-bold font-display text-gradient-hero mb-4">Branch Predictor</h2>
          <p className="text-primary-foreground/70 text-lg">Get intelligent branch predictions based on your rank, category, and previous year cutoffs.</p>
        </motion.div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="lg:hidden flex items-center gap-3 mb-6">
            <BarChart3 className="w-8 h-8 text-secondary" />
            <h2 className="text-2xl font-bold font-display text-foreground">Branch Predictor</h2>
          </div>

          <h1 className="text-3xl font-bold font-display text-foreground mb-2">Predict Your Branch</h1>
          <p className="text-muted-foreground mb-8">Enter your details to find the best branch for you</p>

          <form onSubmit={handlePredict} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="rank">Your Rank</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="rank" type="number" placeholder="Enter your rank (e.g. 5000)" value={rank} onChange={(e) => setRank(e.target.value)} className="pl-10" min="1" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Caste Category</Label>
              <Select value={caste} onValueChange={setCaste}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your category" />
                </SelectTrigger>
                <SelectContent>
                  {CASTE_CATEGORIES.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" /> Predicting...</span>
              ) : (
                <span className="flex items-center gap-2">Predict Branch <ArrowRight className="w-5 h-5" /></span>
              )}
            </Button>
          </form>

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong>Note:</strong> Predictions are based on previous year cutoff data and are for guidance purposes only. Actual results may vary.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RankPredictor;
