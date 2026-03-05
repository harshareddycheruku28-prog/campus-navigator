import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, BarChart3, Shield, ArrowRight, Sparkles, BookOpen, Users, Calendar, Hexagon } from "lucide-react";
import { Button } from "@/components/ui/button";

const portals = [
  {
    title: "Student Portal",
    description: "Access your academic dashboard, track attendance, explore career roadmaps, and stay updated with events.",
    icon: GraduationCap,
    link: "/student/login",
    color: "student" as const,
    features: ["Academic Profile", "Attendance Tracking", "Career Roadmap", "Events"],
  },
  {
    title: "Branch Predictor",
    description: "Predict your best-fit branch based on your rank and category. Get a complete 4-year roadmap.",
    icon: BarChart3,
    link: "/predictor",
    color: "predictor" as const,
    features: ["Branch Prediction", "Cutoff Analysis", "4-Year Roadmap", "Career Guide"],
  },
  {
    title: "Admin Portal",
    description: "Manage branch events, post announcements, and coordinate activities for your department.",
    icon: Shield,
    link: "/admin/login",
    color: "admin" as const,
    features: ["Event Management", "Announcements", "Branch Control", "Analytics"],
  },
];

const stats = [
  { label: "Active Students", value: "2,500+", icon: Users },
  { label: "Branches", value: "11", icon: BookOpen },
  { label: "Events/Year", value: "120+", icon: Calendar },
  { label: "Placement Rate", value: "95%", icon: Sparkles },
];

const colorMap = {
  student: {
    bg: "bg-student-light/80",
    border: "border-student/30",
    iconBg: "bg-student/20",
    iconColor: "text-student",
    hoverShadow: "hover:shadow-glow-primary",
    buttonBg: "bg-student",
    buttonText: "text-primary-foreground",
  },
  predictor: {
    bg: "bg-predictor-light/80",
    border: "border-predictor/30",
    iconBg: "bg-predictor/20",
    iconColor: "text-predictor",
    hoverShadow: "hover:shadow-glow-secondary",
    buttonBg: "bg-secondary",
    buttonText: "text-secondary-foreground",
  },
  admin: {
    bg: "bg-admin-light/80",
    border: "border-accent/30",
    iconBg: "bg-accent/20",
    iconColor: "text-accent",
    hoverShadow: "hover:shadow-glow-accent",
    buttonBg: "bg-accent",
    buttonText: "text-accent-foreground",
  },
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32">
        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 glass-panel mb-10 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-sm font-semibold tracking-wide text-foreground/90 uppercase">The Next-Gen Academic Ecosystem</span>
            </motion.div>

            <div className="flex flex-col items-center justify-center mb-10 relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-40 h-40 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-full blur-2xl opacity-50 -z-10"
              />
              <motion.img
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
                src="/logo.png"
                alt="Campus Navigator Logo"
                className="w-28 h-28 md:w-36 md:h-36 object-contain mb-8 filter drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
              />
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-display text-gradient-hero leading-[1.1] tracking-tight mb-6">
                Campus <br className="md:hidden" />Navigator
              </h1>
            </div>

            <p className="text-lg md:text-2xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              A unified digital platform for comprehensive academic management, intelligent branch prediction, and structured career roadmaps.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5"
            >
              <Link to="/student/login">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 h-14 text-lg rounded-full shadow-glow-primary transition-all duration-300 hover:scale-105">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/predictor">
                <Button size="lg" variant="outline" className="glass-panel hover:bg-white/10 border-white/20 text-foreground font-semibold px-10 h-14 text-lg rounded-full transition-all duration-300 hover:scale-105">
                  Predict Your Branch
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Section with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-32 max-w-5xl mx-auto"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-panel p-6 rounded-2xl text-center border-t border-white/10"
              >
                <div className="w-12 h-12 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                  <stat.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-foreground font-display mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-foreground/60 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portals Section */}
      <section className="py-32 relative z-10">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black font-display text-foreground mb-6">
              Three Powerful Portals
            </h2>
            <p className="text-foreground/60 text-xl max-w-2xl mx-auto font-medium">
              Everything you need for your B.Tech journey, seamlessly integrated into a single pane of glass.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {portals.map((portal, index) => {
              const colors = colorMap[portal.color];
              return (
                <motion.div
                  key={portal.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                >
                  <Link to={portal.link} className="block h-full group">
                    <div className={`relative p-8 rounded-3xl glass-panel glass-panel-hover border-t ${colors.border} h-full overflow-hidden flex flex-col`}>
                      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500">
                        <Hexagon className="w-32 h-32" />
                      </div>

                      <div className={`w-16 h-16 rounded-2xl ${colors.iconBg} border border-white/10 flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <portal.icon className={`w-8 h-8 ${colors.iconColor}`} />
                      </div>

                      <h3 className="text-2xl font-black font-display text-foreground mb-4">{portal.title}</h3>
                      <p className="text-foreground/70 mb-8 leading-relaxed text-base flex-grow font-medium">{portal.description}</p>

                      <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                        {portal.features.map((f) => (
                          <span key={f} className={`text-xs px-3 py-1.5 rounded-md ${colors.bg} ${colors.iconColor} font-bold tracking-wide uppercase shadow-sm border border-white/5`}>
                            {f}
                          </span>
                        ))}
                      </div>

                      <div className={`flex items-center gap-2 font-bold text-sm ${colors.iconColor} group-hover:gap-4 transition-all uppercase tracking-wider`}>
                        Enter Portal <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 glass-panel mt-20 relative z-10">
        <div className="container text-center flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-6 h-6 opacity-50 grayscale" />
            <span className="font-display font-bold text-foreground/50 tracking-wider uppercase text-sm">Campus Navigator</span>
          </div>
          <p className="text-sm font-medium text-foreground/40">© {new Date().getFullYear()} Campus Navigator. Built for students, by students.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
