import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Briefcase, BookOpen, TrendingUp, GraduationCap, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRANCHES, CASTE_CATEGORIES, CUTOFF_DATA, BRANCH_ROADMAPS, CAREER_OPPORTUNITIES } from "@/data/mockData";

const PredictorResult = () => {
  const [searchParams] = useSearchParams();
  const rank = searchParams.get("rank") || "0";
  const caste = searchParams.get("caste") || "oc";
  const branchId = searchParams.get("branch") || "cse";

  const branch = BRANCHES.find((b) => b.id === branchId);
  const category = CASTE_CATEGORIES.find((c) => c.id === caste);
  const cutoff = CUTOFF_DATA[branchId]?.[caste] || 0;
  const roadmap = BRANCH_ROADMAPS[branchId] || [];
  const careers = CAREER_OPPORTUNITIES[branchId] || [];

  const probability = Math.max(10, Math.min(98, Math.round(((cutoff - parseInt(rank)) / cutoff) * 100)));

  // All eligible branches
  const allEligible = BRANCHES.filter((b) => {
    const c = CUTOFF_DATA[b.id]?.[caste];
    return c && parseInt(rank) <= c;
  }).sort((a, b) => (CUTOFF_DATA[a.id]?.[caste] || 0) - (CUTOFF_DATA[b.id]?.[caste] || 0));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-hero-gradient py-16 relative overflow-hidden">
        <motion.div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 6, repeat: Infinity }} />
        <div className="container relative z-10">
          <Link to="/predictor" className="inline-flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Predictor
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 mb-4">
              <CheckCircle className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Prediction Complete</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display text-gradient-hero mb-3">{branch?.name}</h1>
            <p className="text-primary-foreground/70 text-lg">Based on Rank #{rank} • {category?.name}</p>
          </motion.div>
        </div>
      </div>

      <div className="container py-10">
        {/* Probability & Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10 -mt-16 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-6 shadow-lg">
            <p className="text-sm text-muted-foreground mb-1">Admission Probability</p>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold font-display text-success">{probability}%</span>
              <TrendingUp className="w-5 h-5 text-success mb-1.5" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Cutoff: {cutoff} | Your Rank: {rank}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-xl p-6 shadow-lg">
            <p className="text-sm text-muted-foreground mb-1">Eligible Branches</p>
            <span className="text-4xl font-bold font-display text-foreground">{allEligible.length}</span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {allEligible.map(b => <span key={b.id} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{b.code}</span>)}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card border border-border rounded-xl p-6 shadow-lg">
            <p className="text-sm text-muted-foreground mb-1">Career Paths</p>
            <span className="text-4xl font-bold font-display text-foreground">{careers.length}+</span>
            <p className="text-xs text-muted-foreground mt-2">Job roles available after {branch?.code}</p>
          </motion.div>
        </div>

        {/* Career Opportunities */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card border border-border rounded-xl p-6 mb-10">
          <h2 className="text-xl font-bold font-display text-foreground mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5 text-accent" /> Career Opportunities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {careers.map((career) => (
              <div key={career} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Star className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">{career}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 4-Year Roadmap */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-xl font-bold font-display text-foreground mb-6 flex items-center gap-2"><GraduationCap className="w-5 h-5 text-student" /> Complete 4-Year Roadmap</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
            {roadmap.map((item, i) => (
              <motion.div key={item.semester} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="relative pl-16 pb-6">
                <div className="absolute left-4 w-5 h-5 rounded-full border-2 bg-card border-secondary" />
                <div className="bg-card border border-border rounded-xl p-5">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">Year {item.year} • Semester {item.semester}</span>
                  <h4 className="font-bold font-display text-foreground mt-2 mb-3">{item.title}</h4>
                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-1.5 font-medium uppercase tracking-wide">Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.skills.map(s => <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-student-light text-student font-medium">{s}</span>)}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1.5 font-medium uppercase tracking-wide">Activities</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.activities.map(a => <span key={a} className="text-xs px-2.5 py-1 rounded-full bg-predictor-light text-predictor font-medium">{a}</span>)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/predictor">
            <Button variant="outline" size="lg" className="font-semibold">
              <ArrowLeft className="w-4 h-4 mr-2" /> Try Another Prediction
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PredictorResult;
