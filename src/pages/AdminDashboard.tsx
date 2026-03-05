import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Calendar, Plus, Edit, Trash2, LogOut, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { MOCK_EVENTS, CUTOFF_DATA, BRANCHES, CASTE_CATEGORIES } from "@/data/mockData";

interface Event {
  id: string;
  title: string;
  type: "technical" | "cultural";
  branch: string;
  date: string;
  description: string;
  venue: string;
  time: string;
}

const AdminDashboard = () => {
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [form, setForm] = useState({ title: "", type: "technical", date: "", description: "", venue: "", time: "" });

  // Cutoff state
  const [cutoffs, setCutoffs] = useState(CUTOFF_DATA);
  const [editingCutoff, setEditingCutoff] = useState<{ branch: string, category: string } | null>(null);
  const [tempCutoffValue, setTempCutoffValue] = useState<string>("");

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCutoffEdit = (branchId: string, categoryId: string, currentValue: number) => {
    setEditingCutoff({ branch: branchId, category: categoryId });
    setTempCutoffValue(currentValue.toString());
  };

  const handleCutoffSave = (branchId: string, categoryId: string) => {
    const val = parseInt(tempCutoffValue);
    if (isNaN(val) || val < 1) {
      toast({ title: "Invalid Cutoff", description: "Please enter a valid rank.", variant: "destructive" });
      return;
    }
    setCutoffs(prev => {
      const newCutoffs = {
        ...prev,
        [branchId]: {
          ...prev[branchId],
          [categoryId]: val
        }
      };
      // Mutate global mock to simulate a backend update
      if (!CUTOFF_DATA[branchId]) CUTOFF_DATA[branchId] = {};
      CUTOFF_DATA[branchId][categoryId] = val;
      return newCutoffs;
    });
    setEditingCutoff(null);
    toast({ title: "Cutoff Updated", description: "The cutoff rank has been updated." });
  };

  const resetForm = () => {
    setForm({ title: "", type: "technical", date: "", description: "", venue: "", time: "" });
    setEditingEvent(null);
  };

  const handleSave = () => {
    if (!form.title || !form.date || !form.description) {
      toast({ title: "Missing Fields", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent.id ? { ...e, ...form, type: form.type as "technical" | "cultural" } : e));
      toast({ title: "Event Updated", description: `"${form.title}" has been updated successfully.` });
    } else {
      const newEvent: Event = { id: Date.now().toString(), ...form, type: form.type as "technical" | "cultural", branch: "CSE" };
      setEvents([newEvent, ...events]);
      toast({ title: "Event Created", description: `"${form.title}" has been posted successfully.` });
    }
    resetForm();
    setDialogOpen(false);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setForm({ title: event.title, type: event.type, date: event.date, description: event.description, venue: event.venue, time: event.time });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
    toast({ title: "Event Deleted", description: "The event has been removed." });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-20">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Shield className="w-7 h-7 text-accent" />
            <span className="font-bold font-display text-foreground text-lg">Admin Portal</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">CSE Branch</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <div className="container py-8">
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="mb-8 grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="events">Event Management</TabsTrigger>
            <TabsTrigger value="cutoffs">Cutoff Management</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold font-display text-foreground mb-1">Event Management</h1>
                <p className="text-muted-foreground">Create and manage branch events</p>
              </div>
              <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
                <DialogTrigger asChild>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                    <Plus className="w-4 h-4 mr-2" /> New Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="font-display">{editingEvent ? "Edit Event" : "Create New Event"}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Event Title *</Label>
                      <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. CodeStorm 2026" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">Technical</SelectItem>
                            <SelectItem value="cultural">Cultural</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Date *</Label>
                        <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Time</Label>
                        <Input value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="e.g. 10:00 AM" />
                      </div>
                      <div className="space-y-2">
                        <Label>Venue</Label>
                        <Input value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} placeholder="e.g. Seminar Hall" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description *</Label>
                      <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Event details..." rows={3} />
                    </div>
                    <Button onClick={handleSave} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                      {editingEvent ? "Update Event" : "Create Event"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Total Events", value: events.length, color: "text-foreground" },
                { label: "Technical", value: events.filter(e => e.type === "technical").length, color: "text-student" },
                { label: "Cultural", value: events.filter(e => e.type === "cultural").length, color: "text-accent" },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-card border border-border rounded-xl p-4 text-center">
                  <p className={`text-3xl font-bold font-display ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Events List */}
            <div className="space-y-4">
              {events.map((event, i) => (
                <motion.div key={event.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold font-display text-foreground">{event.title}</h4>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${event.type === "technical" ? "bg-student-light text-student" : "bg-accent/10 text-accent"}`}>
                          {event.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {event.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.time}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.venue}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(event)} className="text-muted-foreground hover:text-foreground">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(event.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cutoffs" className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h1 className="text-3xl font-bold font-display text-foreground mb-1">Cutoff Management</h1>
                <p className="text-muted-foreground">Manage cutoff ranks for all branches and categories.</p>
              </div>

              <div className="bg-card border border-border rounded-xl mt-8 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px] min-w-[150px]">Branch</TableHead>
                      {CASTE_CATEGORIES.map(c => (
                        <TableHead key={c.id} className="text-center whitespace-nowrap px-4">{c.name}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {BRANCHES.map(branch => (
                      <TableRow key={branch.id}>
                        <TableCell className="font-medium">{branch.code}</TableCell>
                        {CASTE_CATEGORIES.map(c => {
                          const isEditing = editingCutoff?.branch === branch.id && editingCutoff?.category === c.id;
                          const currentValue = cutoffs[branch.id]?.[c.id] || 0;

                          return (
                            <TableCell key={c.id} className="text-center p-2">
                              {isEditing ? (
                                <div className="flex items-center gap-1 justify-center min-w-[100px]">
                                  <Input
                                    type="number"
                                    className="w-16 h-8 text-center px-1 text-xs"
                                    value={tempCutoffValue}
                                    onChange={(e) => setTempCutoffValue(e.target.value)}
                                    autoFocus
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') handleCutoffSave(branch.id, c.id);
                                      if (e.key === 'Escape') setEditingCutoff(null);
                                    }}
                                  />
                                  <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-100" onClick={() => handleCutoffSave(branch.id, c.id)}>
                                    ✓
                                  </Button>
                                </div>
                              ) : (
                                <div
                                  className="cursor-pointer hover:text-accent flex items-center justify-center gap-1 group min-w-[100px] h-8 rounded-md hover:bg-accent/5"
                                  onClick={() => handleCutoffEdit(branch.id, c.id, currentValue)}
                                >
                                  {currentValue > 0 ? currentValue : '-'}
                                  <Edit className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
