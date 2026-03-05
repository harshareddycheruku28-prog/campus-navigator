import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, BarChart3, Calendar, MapPin, Phone, Mail, LogOut, TrendingUp, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";
import { MOCK_STUDENT, MOCK_EVENTS, BRANCH_ROADMAPS } from "@/data/mockData";

type Tab = "profile" | "attendance" | "roadmap" | "events";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const navigate = useNavigate();
  const student = MOCK_STUDENT;
  const roadmap = BRANCH_ROADMAPS["cse"] || [];

  const tabs: { id: Tab; label: string; icon: typeof GraduationCap }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "attendance", label: "Attendance", icon: BarChart3 },
    { id: "roadmap", label: "Roadmap", icon: MapPin },
    { id: "events", label: "Events", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="bg-card border-b border-border sticky top-0 z-20">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-7 h-7 text-student" />
            <span className="font-bold font-display text-foreground text-lg">Student Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{student.name}</span>
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold font-display text-foreground mb-1">Welcome, {student.name} 👋</h1>
          <p className="text-muted-foreground">{student.branchFull} • Semester {student.currentSemester} • Year {student.year}</p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Reg. Number", value: student.regNo, icon: GraduationCap, color: "text-student" },
            { label: "Branch", value: student.branch, icon: BookOpen, color: "text-secondary" },
            { label: "Attendance", value: `${student.attendance.overall}%`, icon: TrendingUp, color: "text-success" },
            { label: "Semester", value: `${student.currentSemester} of 8`, icon: Clock, color: "text-accent" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-card border border-border rounded-xl p-4">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-bold font-display text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {activeTab === "profile" && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Info */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-bold font-display text-foreground mb-4 flex items-center gap-2"><User className="w-5 h-5 text-student" /> Personal Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium text-foreground">{student.name}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Reg. No</span><span className="font-medium text-foreground">{student.regNo}</span></div>
                  <div className="flex justify-between items-center"><span className="text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" /> Email</span><span className="font-medium text-foreground">{student.email}</span></div>
                  <div className="flex justify-between items-center"><span className="text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" /> Phone</span><span className="font-medium text-foreground">{student.phone}</span></div>
                </div>
              </div>

              {/* 10th Details */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-bold font-display text-foreground mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-secondary" /> 10th Class Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">School</span><span className="font-medium text-foreground">{student.tenthDetails.school}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Board</span><span className="font-medium text-foreground">{student.tenthDetails.board}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Percentage</span><span className="font-semibold text-success">{student.tenthDetails.percentage}%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Year</span><span className="font-medium text-foreground">{student.tenthDetails.year}</span></div>
                </div>
              </div>

              {/* Intermediate Details */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-bold font-display text-foreground mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-accent" /> Intermediate Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">College</span><span className="font-medium text-foreground">{student.interDetails.college}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Board</span><span className="font-medium text-foreground">{student.interDetails.board}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Stream</span><span className="font-medium text-foreground">{student.interDetails.stream}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Percentage</span><span className="font-semibold text-success">{student.interDetails.percentage}%</span></div>
                </div>
              </div>

              {/* Current Semester */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-bold font-display text-foreground mb-4 flex items-center gap-2"><GraduationCap className="w-5 h-5 text-student" /> Current Semester</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Semester</span><span className="font-medium text-foreground">{student.currentSemester}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Year</span><span className="font-medium text-foreground">{student.year}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Branch</span><span className="font-medium text-foreground">{student.branchFull}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Overall Attendance</span><span className="font-semibold text-success">{student.attendance.overall}%</span></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold font-display text-foreground mb-6">Subject-wise Attendance</h3>
              <div className="space-y-5">
                {student.attendance.subjects.map((sub) => (
                  <div key={sub.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{sub.name}</span>
                      <span className={`text-sm font-bold ${sub.percentage >= 75 ? "text-success" : "text-destructive"}`}>
                        {sub.percentage}% ({sub.attended}/{sub.total})
                      </span>
                    </div>
                    <Progress value={sub.percentage} className="h-2.5" />
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium text-foreground">Overall Attendance: <span className="text-success font-bold">{student.attendance.overall}%</span></p>
                <p className="text-xs text-muted-foreground mt-1">Minimum 75% attendance required for exam eligibility</p>
              </div>
            </div>
          )}

          {activeTab === "roadmap" && (
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <h3 className="font-bold font-display text-foreground mb-2">Your Career Roadmap</h3>
                <p className="text-sm text-muted-foreground">Personalized learning path from Semester {student.currentSemester} to graduation</p>
              </div>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
                {roadmap.filter(r => r.semester >= student.currentSemester).map((item, i) => (
                  <motion.div key={item.semester} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="relative pl-16 pb-8">
                    <div className={`absolute left-4 w-5 h-5 rounded-full border-2 ${item.semester === student.currentSemester ? "bg-secondary border-secondary" : "bg-card border-border"}`} />
                    <div className="bg-card border border-border rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">Year {item.year} • Sem {item.semester}</span>
                        {item.semester === student.currentSemester && <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-semibold">Current</span>}
                      </div>
                      <h4 className="font-bold font-display text-foreground mb-3">{item.title}</h4>
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
            </div>
          )}

          {activeTab === "events" && (
            <div className="space-y-4">
              {MOCK_EVENTS.map((event, i) => (
                <motion.div key={event.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold font-display text-foreground">{event.title}</h4>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${event.type === "technical" ? "bg-student-light text-student" : "bg-accent/10 text-accent"}`}>
                      {event.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {event.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.venue}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
