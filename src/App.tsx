import { useState, useEffect } from "react";

// ─── Status Bar ───────────────────────────────────────────────────────────────
function StatusBar({ light = false }: { light?: boolean }) {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  });

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const fg = light ? "rgba(255,255,255,0.92)" : "#111827";

  return (
    <div className="flex items-center justify-between px-5 pt-2 pb-1 shrink-0" style={{ minHeight: 28 }}>
      {/* Time */}
      <span className="text-xs font-semibold tabular-nums" style={{ color: fg, fontFamily: "Poppins, sans-serif" }}>{time}</span>

      {/* Right icons */}
      <div className="flex items-center gap-1.5">
        {/* Signal bars */}
        <svg viewBox="0 0 17 12" width="17" height="12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="0.8" fill={fg} opacity="1" />
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.8" fill={fg} opacity="1" />
          <rect x="9" y="3" width="3" height="9" rx="0.8" fill={fg} opacity="0.4" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.8" fill={fg} opacity="0.25" />
        </svg>

        {/* WiFi */}
        <svg viewBox="0 0 16 12" width="16" height="12" fill="none">
          <path d="M8 9.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill={fg} />
          <path d="M4.5 7C5.8 5.8 6.8 5.2 8 5.2s2.2.6 3.5 1.8" stroke={fg} strokeWidth="1.3" strokeLinecap="round" opacity="0.85" />
          <path d="M2 4.5C4 2.6 5.9 1.5 8 1.5s4 1.1 6 3" stroke={fg} strokeWidth="1.3" strokeLinecap="round" opacity="0.4" />
        </svg>

        {/* Battery with charging bolt */}
        <div className="flex items-center gap-0.5">
          <svg viewBox="0 0 22 12" width="22" height="12" fill="none">
            <rect x="0.5" y="0.5" width="18" height="11" rx="2.5" stroke={fg} strokeWidth="1.2" opacity="0.85" />
            <rect x="2" y="2" width="13" height="8" rx="1.5" fill={fg} opacity="0.85" />
            <path d="M19.5 4v4" stroke={fg} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            {/* bolt */}
            <path d="M10 1.5 7.5 6.2h3L8 10.5" stroke="#facc15" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
type Role = "super_admin" | "manager" | "client" | "technician";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  companyId?: string;
  avatar?: string;
}

interface Company {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  managerId?: string;
  equipmentCount: number;
  activeTasksCount: number;
  image: string;
  createdAt: string;
}

interface Equipment {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  companyId: string;
  status: "operational" | "needs_repair" | "in_repair" | "decommissioned";
  lastServiceDate: string;
  image: string;
  category: string;
  location: string;
  maintenanceFrequency: string;
  active: boolean;
}

interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  status: "available" | "busy" | "offline";
  tasksCompleted: number;
  companyId?: string;
  avatar: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  equipmentId: string;
  technicianId?: string;
  companyId: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "assigned" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
  dueDate: string;
  reportedBy: string;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────
const COMPANIES: Company[] = [
  {
    id: "c1",
    name: "Grand Brasserie Paris",
    address: "14 Rue de Rivoli, Paris",
    phone: "+33 1 42 60 55 00",
    email: "ops@grandbrasserie.fr",
    managerId: "m1",
    equipmentCount: 12,
    activeTasksCount: 3,
    image: "https://images.unsplash.com/photo-1777367088760-4226a903d1d4?w=400&h=240&fit=crop&auto=format",
    createdAt: "2024-01-15",
  },
  {
    id: "c2",
    name: "Sakura Fine Dining",
    address: "88 Harbour Rd, Hong Kong",
    phone: "+852 2868 4400",
    email: "admin@sakuradining.hk",
    managerId: "m2",
    equipmentCount: 8,
    activeTasksCount: 1,
    image: "https://images.unsplash.com/photo-1760660298735-2a9cede9a964?w=400&h=240&fit=crop&auto=format",
    createdAt: "2024-03-02",
  },
  {
    id: "c3",
    name: "The Copper Kettle",
    address: "52 King St, Melbourne",
    phone: "+61 3 9654 4811",
    email: "hello@copperkettle.com.au",
    managerId: "m1",
    equipmentCount: 15,
    activeTasksCount: 5,
    image: "https://images.unsplash.com/photo-1708915965975-2a950db0e215?w=400&h=240&fit=crop&auto=format",
    createdAt: "2024-04-20",
  },
];

const EQUIPMENT: Equipment[] = [
  {
    id: "e1",
    name: "Commercial Dishwasher",
    model: "Hobart AM-15",
    serialNumber: "HAM-2024-001",
    companyId: "c1",
    status: "in_repair",
    lastServiceDate: "2025-08-10",
    image: "https://images.unsplash.com/photo-1589109807644-924edf14ee09?w=300&h=300&fit=crop&auto=format",
    category: "Dishwashing",
    location: "Kitchen Block A",
    maintenanceFrequency: "Every 3 months",
    active: true,
  },
  {
    id: "e2",
    name: "Industrial Oven",
    model: "Rational SelfCooking 6-2/1",
    serialNumber: "RSC-2023-045",
    companyId: "c1",
    status: "operational",
    lastServiceDate: "2025-07-22",
    image: "https://images.unsplash.com/photo-1778837224432-5e8ac4fc3d76?w=300&h=300&fit=crop&auto=format",
    category: "Cooking",
    location: "Main Kitchen",
    maintenanceFrequency: "Every 6 months",
    active: true,
  },
  {
    id: "e3",
    name: "Deep Fryer",
    model: "Pitco SG14S",
    serialNumber: "PIT-2024-112",
    companyId: "c2",
    status: "needs_repair",
    lastServiceDate: "2025-06-01",
    image: "https://images.unsplash.com/photo-1575047496698-fe888afdad1e?w=300&h=300&fit=crop&auto=format",
    category: "Cooking",
    location: "Fry Station",
    maintenanceFrequency: "Monthly",
    active: false,
  },
  {
    id: "e4",
    name: "Walk-in Refrigerator",
    model: "True T-49-HC",
    serialNumber: "TRU-2023-889",
    companyId: "c3",
    status: "operational",
    lastServiceDate: "2025-09-01",
    image: "https://images.unsplash.com/photo-1643356472833-5b1f2cd4ca3c?w=300&h=300&fit=crop&auto=format",
    category: "Refrigeration",
    location: "Cold Storage Room",
    maintenanceFrequency: "Every 6 months",
    active: true,
  },
];

const TECHNICIANS: Technician[] = [
  {
    id: "t1",
    name: "Marco Delgado",
    email: "marco@evergreen.com",
    phone: "+1 555 230 4411",
    specialization: "Commercial Ovens & Fryers",
    status: "busy",
    tasksCompleted: 142,
    avatar: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=80&h=80&fit=crop&auto=format",
  },
  {
    id: "t2",
    name: "Priya Sharma",
    email: "priya@evergreen.com",
    phone: "+1 555 874 3322",
    specialization: "Refrigeration Systems",
    status: "available",
    tasksCompleted: 98,
    avatar: "https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=80&h=80&fit=crop&auto=format",
  },
  {
    id: "t3",
    name: "James O'Brien",
    email: "james@evergreen.com",
    phone: "+1 555 501 7788",
    specialization: "Dishwashers & Sanitization",
    status: "available",
    tasksCompleted: 77,
    avatar: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=80&h=80&fit=crop&auto=format",
  },
];

const TASKS: Task[] = [
  {
    id: "tk1",
    title: "Dishwasher Heating Element Failure",
    description: "Unit not reaching sanitization temp. Cycles incomplete.",
    equipmentId: "e1",
    technicianId: "t3",
    companyId: "c1",
    priority: "urgent",
    status: "in_progress",
    createdAt: "2025-09-01",
    dueDate: "2025-09-05",
    reportedBy: "Chef Antoine",
  },
  {
    id: "tk2",
    title: "Stove Burner Ignition Issue",
    description: "Three burners not igniting consistently. Gas smell reported.",
    equipmentId: "e3",
    technicianId: undefined,
    companyId: "c2",
    priority: "high",
    status: "open",
    createdAt: "2025-09-02",
    dueDate: "2025-09-06",
    reportedBy: "Manager Liu",
  },
  {
    id: "tk3",
    title: "Oven Calibration & Service",
    description: "Annual calibration check and cleaning required.",
    equipmentId: "e2",
    technicianId: "t1",
    companyId: "c1",
    priority: "low",
    status: "assigned",
    createdAt: "2025-08-28",
    dueDate: "2025-09-10",
    reportedBy: "Manager Pierre",
  },
];

const USERS: User[] = [
  { id: "sa1", name: "Sarah Mitchell", email: "sarah@evergreen.com", role: "super_admin", avatar: "SM" },
  { id: "m1", name: "Pierre Dubois", email: "pierre@evergreen.com", role: "manager", companyId: "c1", avatar: "PD" },
  { id: "m2", name: "Liu Wei", email: "liu@evergreen.com", role: "manager", companyId: "c2", avatar: "LW" },
  { id: "cl1", name: "Antoine Morel", email: "antoine@grandbrasserie.fr", role: "client", companyId: "c1", avatar: "AM" },
  { id: "tech1", name: "Marco Delgado", email: "marco@evergreen.com", role: "technician", avatar: "MD" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const statusColors: Record<string, string> = {
  operational: "bg-emerald-50 text-emerald-700 border-emerald-200",
  needs_repair: "bg-amber-50 text-amber-700 border-amber-200",
  in_repair: "bg-green-50 text-green-800 border-green-200",
  decommissioned: "bg-gray-100 text-gray-500 border-gray-200",
  open: "bg-rose-50 text-rose-700 border-rose-200",
  assigned: "bg-violet-50 text-violet-700 border-violet-200",
  in_progress: "bg-green-50 text-green-800 border-green-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-gray-100 text-gray-500 border-gray-200",
  available: "bg-emerald-50 text-emerald-700 border-emerald-200",
  busy: "bg-amber-50 text-amber-700 border-amber-200",
  offline: "bg-gray-100 text-gray-500 border-gray-200",
  low: "bg-gray-100 text-gray-600 border-gray-200",
  medium: "bg-sky-50 text-sky-700 border-sky-200",
  high: "bg-amber-50 text-amber-700 border-amber-200",
  urgent: "bg-rose-50 text-rose-700 border-rose-200",
};

const statusLabels: Record<string, string> = {
  operational: "Operational",
  needs_repair: "Needs Repair",
  in_repair: "In Repair",
  decommissioned: "Decommissioned",
  open: "Open",
  assigned: "Assigned",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
  available: "Available",
  busy: "Busy",
  offline: "Offline",
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

function Badge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[status] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
      {statusLabels[status] ?? status}
    </span>
  );
}

function Avatar({ name, size = "sm" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const colors = ["bg-green-500", "bg-violet-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500", "bg-cyan-500"];
  const color = colors[name.charCodeAt(0) % colors.length];
  const sz = size === "lg" ? "w-12 h-12 text-base" : size === "md" ? "w-9 h-9 text-sm" : "w-8 h-8 text-xs";
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className={`${sz} ${color} rounded-full flex items-center justify-center text-white font-semibold shrink-0`}>
      {initials}
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = {
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-5 h-5">
      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  companies: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-5 h-5">
      <path d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
    </svg>
  ),
  equipment: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-5 h-5">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  technicians: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-5 h-5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  tasks: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-5 h-5">
      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-5 h-5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  logout: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-5 h-5">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16,17 21,12 16,7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  wrench: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-5 h-5">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-5 h-5">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-4 h-4">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  ),
};

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-600">{Icon.close}</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-600 transition-all";
const selectCls = `${inputCls} appearance-none bg-white`;
const btnPrimary = "flex items-center justify-center gap-2 px-5 py-2.5 bg-green-800 hover:bg-green-900 text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98]";
const btnSecondary = "flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-all";

// ─── Splash Screen ────────────────────────────────────────────────────────────
const SPLASH_IMAGES = [
  "https://images.unsplash.com/photo-1589109807644-924edf14ee09?w=900&h=1200&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1708915965975-2a950db0e215?w=900&h=1200&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1663790776711-9283bf614ac2?w=900&h=1200&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1666479258732-5ea17469b610?w=900&h=1200&fit=crop&auto=format",
];

function SplashScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
  const [imgIndex, setImgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle background images every 900ms
    const imgTimer = setInterval(() => {
      setImgIndex((i) => (i + 1) % SPLASH_IMAGES.length);
    }, 2200);

    // Progress bar over 3s
    const start = Date.now();
    const TOTAL = 4000;
    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / TOTAL) * 100, 100));
    }, 30);

    // Fade out after 3s, call onDone after fade
    const holdTimer = setTimeout(() => {
      setPhase("out");
      setTimeout(onDone, 600);
    }, TOTAL - 600);

    return () => {
      clearInterval(imgTimer);
      clearInterval(progressTimer);
      clearTimeout(holdTimer);
    };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden"
      style={{
        opacity: phase === "out" ? 0 : 1,
        transition: phase === "out" ? "opacity 0.6s ease" : "opacity 0.4s ease",
        background: "#000",
      }}
    >
      {/* Background image crossfade */}
      <style>{`
        @keyframes kenburns {
          0%   { transform: scale(1)    translateX(0)    translateY(0); }
          50%  { transform: scale(1.06) translateX(-1%)  translateY(-1%); }
          100% { transform: scale(1.1)  translateX(1%)   translateY(0.5%); }
        }
      `}</style>
      {SPLASH_IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: i === imgIndex ? 1 : 0,
            transition: "opacity 1.4s ease",
            animation: i === imgIndex ? "kenburns 8s ease-in-out infinite alternate" : "none",
          }}
        />
      ))}

      {/* Dark shade — heavy at top, lighter in middle, dark at bottom */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.65) 100%)" }} />

      {/* Status bar */}
      <div className="relative z-10 w-full"><StatusBar light /></div>

      <div className="relative z-10 w-full" />

      {/* Center — Logo */}
      <div className="relative z-10 flex flex-col items-center gap-5">
        <div
          style={{
            opacity: phase === "in" ? 0 : 1,
            transform: phase === "in" ? "scale(0.7)" : "scale(1)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.1s",
          }}
        >
          {/* Glow ring */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-32 h-32 rounded-full bg-green-500/20 blur-2xl" />
            <div className="w-24 h-24 rounded-3xl bg-white/15 backdrop-blur-md border border-white/30 shadow-2xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} className="w-11 h-11">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
          </div>
        </div>

        <div
          style={{
            opacity: phase === "in" ? 0 : 1,
            transform: phase === "in" ? "translateY(16px)" : "translateY(0)",
            transition: "opacity 0.5s ease 0.25s, transform 0.5s ease 0.25s",
          }}
          className="text-center"
        >
          <h1 className="text-white text-5xl font-bold tracking-tight" style={{ fontFamily: "Poppins, sans-serif" }}>Ever Green</h1>
          <p className="text-green-300 text-sm mt-2 tracking-widest uppercase font-medium">Kitchen Equipment Repair</p>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: phase === "in" ? 0 : 1,
            transition: "opacity 0.5s ease 0.4s",
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
          <span className="text-white/80 text-xs font-medium">Trusted by 200+ Restaurants</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
        </div>
      </div>

      {/* Bottom — progress only */}
      <div className="relative z-10 w-full px-6 pb-14 flex flex-col items-center gap-3">
        <div className="w-40 h-0.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600 rounded-full"
            style={{ width: `${progress}%`, transition: "width 0.03s linear" }}
          />
        </div>
        <span className="text-white/40 text-[10px] tracking-widest uppercase">Loading</span>
      </div>

      {/* Trigger animations after mount */}
      <style>{`
        @keyframes splashIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
      {phase === "in" && (
        <div style={{ display: "none" }} ref={(el) => { if (el) requestAnimationFrame(() => setPhase("hold")); }} />
      )}
    </div>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginPage({ onLogin }: { onLogin: (role: Role, name: string) => void }) {
  const [selected, setSelected] = useState<Role>("super_admin");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotMobile, setForgotMobile] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const accounts: { role: Role; label: string; name: string; icon: string; color: string }[] = [
    { role: "super_admin", label: "Super Admin", name: "Sarah Mitchell", icon: "🛡️", color: "from-green-800 to-green-950" },
    { role: "manager", label: "Manager", name: "Pierre Dubois", icon: "👔", color: "from-violet-500 to-violet-700" },
    { role: "client", label: "Client", name: "Antoine Morel", icon: "🏪", color: "from-emerald-500 to-emerald-700" },
    { role: "technician", label: "Technician", name: "Marco Delgado", icon: "🔧", color: "from-amber-500 to-orange-500" },
  ];

  const current = accounts.find((a) => a.role === selected)!;

  if (showForgot) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(160deg, #14532d 0%, #166534 40%, #15803d 70%, #4ade80 100%)" }}>
        <StatusBar light />
        {/* Top decoration */}
        <div className="relative flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-6 min-h-[240px]">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/4" />
          <div className="relative text-center">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm border border-white/30">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.75} className="w-7 h-7">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <h1 className="text-white text-2xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>Ever Green</h1>
            <p className="text-green-200 text-xs mt-1">Kitchen Repair Management</p>
          </div>
        </div>

        {/* White card */}
        <div className="bg-white rounded-t-[2.5rem] px-7 pt-8 pb-10 shadow-2xl">
          <button onClick={() => { setShowForgot(false); setForgotSent(false); setForgotMobile(""); }}
            className="flex items-center gap-1.5 text-green-800 text-sm font-medium mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4"><polyline points="15,18 9,12 15,6" /></svg>
            Back to Sign In
          </button>

          {forgotSent ? (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">📱</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>OTP Sent!</h2>
              <p className="text-gray-500 text-sm">We've sent a reset OTP to<br /><span className="font-semibold text-gray-800">{forgotMobile}</span></p>
              <button onClick={() => { setShowForgot(false); setForgotSent(false); setForgotMobile(""); }}
                className={`${btnPrimary} w-full mt-8`}>Back to Sign In</button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Forgot Password?</h2>
              <p className="text-gray-500 text-sm mb-7">Enter your registered mobile number and we'll send you a reset OTP.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-700/30 focus-within:border-green-600 transition-all">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-5 h-5 text-green-500 shrink-0">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.64 3.42 2 2 0 0 1 3.62 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.88-.88a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16.92z" />
                  </svg>
                  <input value={forgotMobile} onChange={(e) => setForgotMobile(e.target.value)} type="tel" placeholder="Mobile Number" className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-400" />
                </div>
                <button onClick={() => setForgotSent(true)} disabled={!forgotMobile}
                  className={`${btnPrimary} w-full py-3.5 text-base rounded-2xl disabled:opacity-50`}>
                  Send OTP
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-black">
      {/* Full-screen equipment photo with green-teal hue shift */}
      <img
        src="https://images.unsplash.com/photo-1589109807644-924edf14ee09?w=900&h=1200&fit=crop&auto=format"
        alt="Commercial kitchen equipment"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.85) saturate(1.1)" }}
      />
      {/* Black shade at top */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.0) 55%)" }} />
      {/* Status bar — sits above overlays */}
      <div className="relative z-10 w-full"><StatusBar light /></div>

      {/* Top hero area */}
      <div className="relative flex-1 flex flex-col items-center justify-end px-6 pb-8 min-h-[300px]">

        {/* Branding */}
        <div className="relative z-10 text-center mb-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.75} className="w-8 h-8">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>
          <h1 className="text-white text-3xl font-bold tracking-tight" style={{ fontFamily: "Poppins, sans-serif" }}>Ever Green</h1>
          <p className="text-gray-300 text-sm mt-1">Kitchen Equipment Repair</p>
        </div>
      </div>

      {/* White card — slides up from bottom like reference */}
      <div className="relative bg-white rounded-t-[2.5rem] px-7 pt-8 pb-10 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Sign in to Your Account</h2>
        <p className="text-gray-400 text-sm mb-7">Enter your credentials to continue</p>

        <div className="space-y-3 mb-2">
          {/* Mobile number */}
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            type="tel"
            placeholder="Enter Mobile Number"
            className="w-full px-5 py-4 rounded-full bg-white border border-transparent text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-700/20 transition-all"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
          />

          {/* Password */}
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full px-5 py-4 rounded-full bg-white border border-transparent text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-700/20 transition-all pr-12"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
            />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
              {showPassword ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-4 h-4">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-4 h-4">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div className="flex justify-end mb-6">
          <button onClick={() => setShowForgot(true)} className="text-green-800 text-sm font-semibold hover:text-green-800 transition-colors">
            Forgot Password?
          </button>
        </div>

        <button
          onClick={() => onLogin(selected, current.name)}
          className="w-full py-4 bg-gradient-to-r from-green-800 to-green-900 hover:from-green-900 hover:to-green-950 text-white font-bold text-base rounded-2xl shadow-lg shadow-green-800/30 transition-all active:scale-[0.98]"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}


// ─── Companies View ───────────────────────────────────────────────────────────
function CompaniesView({ companies, setCompanies, role }: { companies: Company[]; setCompanies: (c: Company[]) => void; role: Role }) {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", address: "", phone: "", email: "" });

  const filtered = companies.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  function handleAdd() {
    const next: Company = {
      id: `c${Date.now()}`,
      name: form.name,
      address: form.address,
      phone: form.phone,
      email: form.email,
      equipmentCount: 0,
      activeTasksCount: 0,
      image: "https://images.unsplash.com/photo-1783429377137-3bb465a6dce4?w=400&h=240&fit=crop&auto=format",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setCompanies([...companies, next]);
    setShowModal(false);
    setForm({ name: "", address: "", phone: "", email: "" });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>Companies</h2>
          <p className="text-sm text-gray-500">{companies.length} registered companies</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{Icon.search}</span>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search companies..." className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-600 w-60" />
          </div>
          {role === "super_admin" && (
            <button onClick={() => setShowModal(true)} className={btnPrimary}>{Icon.plus} Add Company</button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((company) => (
          <div key={company.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all group cursor-pointer">
            <div className="relative h-40 bg-gray-100 overflow-hidden">
              <img src={company.image} alt={company.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="text-white font-semibold text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>{company.name}</h3>
                <p className="text-white/70 text-xs">{company.address}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-4 text-sm mb-3">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-green-600" />
                  <span>{company.equipmentCount} Equipment</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>{company.activeTasksCount} Active Tasks</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{company.email}</span>
                <span>Since {company.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal title="Add New Company" onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <Field label="Company Name">
              <input className={inputCls} placeholder="e.g. The Golden Fork" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Address">
              <input className={inputCls} placeholder="Street, City, Country" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Phone">
                <input className={inputCls} placeholder="+1 555 000 0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </Field>
              <Field label="Email">
                <input className={inputCls} placeholder="ops@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </Field>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className={`${btnSecondary} flex-1`}>Cancel</button>
              <button onClick={handleAdd} disabled={!form.name} className={`${btnPrimary} flex-1 disabled:opacity-50`}>Add Company</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Equipment View ───────────────────────────────────────────────────────────
function EquipmentView({ equipment, setEquipment, companies, role }: { equipment: Equipment[]; setEquipment: (e: Equipment[]) => void; companies: Company[]; role: Role }) {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", model: "", serialNumber: "", companyId: companies[0]?.id ?? "", category: "Cooking", location: "", maintenanceFrequency: "Every 6 months" });

  const filtered = equipment.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()) || e.model.toLowerCase().includes(search.toLowerCase())
  );

  function handleAdd() {
    const next: Equipment = {
      id: `e${Date.now()}`,
      ...form,
      status: "operational",
      lastServiceDate: new Date().toISOString().slice(0, 10),
      image: "https://images.unsplash.com/photo-1589109807644-924edf14ee09?w=300&h=300&fit=crop&auto=format",
      active: true,
    };
    setEquipment([...equipment, next]);
    setShowModal(false);
    setForm({ name: "", model: "", serialNumber: "", companyId: companies[0]?.id ?? "", category: "Cooking", location: "", maintenanceFrequency: "Every 6 months" });
  }

  const categories = ["Cooking", "Refrigeration", "Dishwashing", "Preparation", "Ventilation", "Other"];
  const freqOptions = ["Monthly", "Every 3 months", "Every 6 months", "Yearly"];

  const statusColor: Record<Equipment["status"], string> = {
    operational: "#166534",
    needs_repair: "#b45309",
    in_repair: "#0284c7",
    decommissioned: "#6b7280",
  };
  const statusLabel: Record<Equipment["status"], string> = {
    operational: "Operational",
    needs_repair: "Needs Repair",
    in_repair: "In Repair",
    decommissioned: "Decommissioned",
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search bar */}
      <div className="relative w-full">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{Icon.search}</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search equipment..."
          className="w-full pl-10 pr-4 py-3 text-sm focus:outline-none"
          style={{ borderRadius: 999, background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.10)", fontFamily: "Poppins, sans-serif" }}
        />
      </div>

      {/* Add button */}
      {(role === "super_admin" || role === "manager") && (
        <button onClick={() => setShowModal(true)} className={btnPrimary}>{Icon.plus} Add Equipment</button>
      )}

      {/* Equipment cards */}
      <div className="flex flex-col gap-4 pb-4">
        {filtered.map((eq) => (
          <div key={eq.id} className="bg-white overflow-hidden" style={{ borderRadius: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
            {/* Top: image + details */}
            <div className="flex gap-4 p-4 pb-3">
              {/* Image */}
              <div className="shrink-0 rounded-2xl overflow-hidden bg-gray-100" style={{ width: 90, height: 90 }}>
                <img src={eq.image} alt={eq.name} className="w-full h-full object-cover" />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-gray-900 text-sm leading-tight" style={{ fontFamily: "Poppins, sans-serif" }}>{eq.name}</p>
                  <span
                    className="shrink-0 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                    style={{ background: eq.active ? "#16653418" : "#6b728018", color: eq.active ? "#166534" : "#6b7280", fontFamily: "Poppins, sans-serif" }}
                  >{eq.active ? "Active" : "Inactive"}</span>
                </div>
                <div className="flex flex-col gap-1 mt-1.5">
                  <p className="text-xs text-gray-500" style={{ fontFamily: "Poppins, sans-serif" }}><span className="text-gray-400">Model: </span>{eq.model}</p>
                  <p className="text-xs text-gray-500" style={{ fontFamily: "Poppins, sans-serif" }}><span className="text-gray-400">Location: </span>{eq.location}</p>
                </div>
              </div>
            </div>

            {/* Full-width divider */}
            <div style={{ height: 1, background: "#e5e7eb", marginLeft: 0, marginRight: 0 }} />

            {/* Location + Maintenance — full width green box */}
            <div className="flex" style={{ background: "#f0fdf4", padding: "10px 16px" }}>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-green-700 font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>S.No</p>
                <p className="text-xs text-gray-700 font-semibold truncate" style={{ fontFamily: "Poppins, sans-serif" }}>{eq.serialNumber}</p>
              </div>
              <div style={{ width: 1, background: "#bbf7d0", flexShrink: 0, margin: "0 12px" }} />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-green-700 font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>Maintenance</p>
                <p className="text-xs text-gray-700 font-semibold truncate" style={{ fontFamily: "Poppins, sans-serif" }}>{eq.maintenanceFrequency}</p>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">🔧</div>
            <p className="font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>No equipment found</p>
          </div>
        )}
      </div>

      {showModal && (
        <Modal title="Add Equipment" onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <Field label="Equipment Name">
              <input className={inputCls} placeholder="e.g. Commercial Oven" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Model">
                <input className={inputCls} placeholder="Manufacturer Model" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
              </Field>
              <Field label="Serial Number">
                <input className={inputCls} placeholder="SN-XXXX" value={form.serialNumber} onChange={(e) => setForm({ ...form, serialNumber: e.target.value })} />
              </Field>
            </div>
            <Field label="Location">
              <input className={inputCls} placeholder="e.g. Main Kitchen" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </Field>
            <Field label="Maintenance Frequency">
              <select className={selectCls} value={form.maintenanceFrequency} onChange={(e) => setForm({ ...form, maintenanceFrequency: e.target.value })}>
                {freqOptions.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </Field>
            <Field label="Category">
              <select className={selectCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Company">
              <select className={selectCls} value={form.companyId} onChange={(e) => setForm({ ...form, companyId: e.target.value })}>
                {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </Field>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className={`${btnSecondary} flex-1`}>Cancel</button>
              <button onClick={handleAdd} disabled={!form.name} className={`${btnPrimary} flex-1 disabled:opacity-50`}>Add Equipment</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Technicians View ─────────────────────────────────────────────────────────
function TechniciansView({ technicians, setTechnicians, role }: { technicians: Technician[]; setTechnicians: (t: Technician[]) => void; role: Role }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", specialization: "" });

  function handleAdd() {
    const next: Technician = {
      id: `t${Date.now()}`,
      ...form,
      status: "available",
      tasksCompleted: 0,
      avatar: `https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=80&h=80&fit=crop&auto=format`,
    };
    setTechnicians([...technicians, next]);
    setShowModal(false);
    setForm({ name: "", email: "", phone: "", specialization: "" });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>Technicians</h2>
          <p className="text-sm text-gray-500">{technicians.length} technicians registered</p>
        </div>
        {(role === "super_admin" || role === "manager") && (
          <button onClick={() => setShowModal(true)} className={btnPrimary}>{Icon.plus} Add Technician</button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {technicians.map((tech) => (
          <div key={tech.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-start gap-4 mb-4">
              <Avatar name={tech.name} size="lg" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>{tech.name}</h3>
                <p className="text-xs text-gray-500 truncate">{tech.specialization}</p>
                <div className="mt-1.5"><Badge status={tech.status} /></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-50">
              <div>
                <div className="text-xs text-gray-400">Email</div>
                <div className="text-xs text-gray-700 font-medium truncate">{tech.email}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Tasks Done</div>
                <div className="text-sm font-bold text-green-800">{tech.tasksCompleted}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal title="Add Technician" onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <Field label="Full Name">
              <input className={inputCls} placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Email">
                <input className={inputCls} placeholder="john@evergreen.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </Field>
              <Field label="Phone">
                <input className={inputCls} placeholder="+1 555 000 0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </Field>
            </div>
            <Field label="Specialization">
              <input className={inputCls} placeholder="e.g. Commercial Ovens & Fryers" value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} />
            </Field>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className={`${btnSecondary} flex-1`}>Cancel</button>
              <button onClick={handleAdd} disabled={!form.name} className={`${btnPrimary} flex-1 disabled:opacity-50`}>Add Technician</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Tasks View ───────────────────────────────────────────────────────────────
function TasksView({ tasks, setTasks, equipment, technicians, companies, role }: {
  tasks: Task[]; setTasks: (t: Task[]) => void;
  equipment: Equipment[]; technicians: Technician[];
  companies: Company[]; role: Role;
}) {
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [form, setForm] = useState({
    title: "", description: "", equipmentId: equipment[0]?.id ?? "", companyId: companies[0]?.id ?? "",
    priority: "medium" as Task["priority"], dueDate: "", reportedBy: "", technicianId: "",
  });

  const filtered = tasks.filter((t) => {
    const ms = filterStatus === "all" || t.status === filterStatus;
    const mp = filterPriority === "all" || t.priority === filterPriority;
    return ms && mp;
  });

  function handleAdd() {
    const next: Task = {
      id: `tk${Date.now()}`,
      title: form.title,
      description: form.description,
      equipmentId: form.equipmentId,
      companyId: form.companyId,
      priority: form.priority,
      status: form.technicianId ? "assigned" : "open",
      createdAt: new Date().toISOString().slice(0, 10),
      dueDate: form.dueDate,
      reportedBy: form.reportedBy,
      technicianId: form.technicianId || undefined,
    };
    setTasks([...tasks, next]);
    setShowModal(false);
  }

  function updateStatus(id: string, status: Task["status"]) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
  }

  const priorityDot: Record<string, string> = { urgent: "bg-rose-500", high: "bg-amber-500", medium: "bg-sky-400", low: "bg-gray-400" };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>Tasks</h2>
          <p className="text-sm text-gray-500">{tasks.length} repair tasks</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-700/30">
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="assigned">Assigned</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-700/30">
            <option value="all">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {(role === "super_admin" || role === "manager" || role === "client") && (
            <button onClick={() => setShowModal(true)} className={btnPrimary}>{Icon.plus} New Task</button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((task) => {
          const eq = equipment.find((e) => e.id === task.equipmentId);
          const tech = technicians.find((t) => t.id === task.technicianId);
          const company = companies.find((c) => c.id === task.companyId);

          return (
            <div key={task.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <div className={`w-2.5 h-2.5 rounded-full ${priorityDot[task.priority]} mt-1.5 shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>{task.title}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{task.description}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge status={task.priority} />
                      <Badge status={task.status} />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-gray-500">
                    {eq && <span>🔧 {eq.name}</span>}
                    {company && <span>🏢 {company.name}</span>}
                    {tech ? <span className="flex items-center gap-1"><Avatar name={tech.name} size="sm" />{tech.name}</span> : <span className="text-rose-400">⚠ Unassigned</span>}
                    <span>📅 Due {task.dueDate}</span>
                  </div>
                </div>
                {(role === "technician" || role === "super_admin" || role === "manager") && (
                  <div className="shrink-0">
                    <select value={task.status} onChange={(e) => updateStatus(task.id, e.target.value as Task["status"])}
                      className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-green-700/30">
                      <option value="open">Open</option>
                      <option value="assigned">Assigned</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400 bg-white rounded-2xl border border-gray-100">
            <div className="text-4xl mb-3">✅</div>
            <p className="font-medium">No tasks found</p>
          </div>
        )}
      </div>

      {showModal && (
        <Modal title="Create Repair Task" onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <Field label="Task Title">
              <input className={inputCls} placeholder="e.g. Oven heating element failure" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </Field>
            <Field label="Description">
              <textarea className={`${inputCls} resize-none h-20`} placeholder="Describe the issue in detail..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Equipment">
                <select className={selectCls} value={form.equipmentId} onChange={(e) => setForm({ ...form, equipmentId: e.target.value })}>
                  {equipment.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
              </Field>
              <Field label="Company">
                <select className={selectCls} value={form.companyId} onChange={(e) => setForm({ ...form, companyId: e.target.value })}>
                  {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Priority">
                <select className={selectCls} value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as Task["priority"] })}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </Field>
              <Field label="Due Date">
                <input type="date" className={inputCls} value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
              </Field>
            </div>
            <Field label="Assign Technician (optional)">
              <select className={selectCls} value={form.technicianId} onChange={(e) => setForm({ ...form, technicianId: e.target.value })}>
                <option value="">Leave unassigned</option>
                {technicians.map((t) => <option key={t.id} value={t.id}>{t.name} — {t.specialization}</option>)}
              </select>
            </Field>
            <Field label="Reported By">
              <input className={inputCls} placeholder="Contact name" value={form.reportedBy} onChange={(e) => setForm({ ...form, reportedBy: e.target.value })} />
            </Field>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className={`${btnSecondary} flex-1`}>Cancel</button>
              <button onClick={handleAdd} disabled={!form.title} className={`${btnPrimary} flex-1 disabled:opacity-50`}>Create Task</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Users View ───────────────────────────────────────────────────────────────
function UsersView({ users, setUsers, companies }: { users: User[]; setUsers: (u: User[]) => void; companies: Company[] }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "manager" as Role, companyId: companies[0]?.id ?? "" });

  function handleAdd() {
    const next: User = { id: `u${Date.now()}`, ...form, avatar: form.name.split(" ").map((n) => n[0]).join("").toUpperCase() };
    setUsers([...users, next]);
    setShowModal(false);
    setForm({ name: "", email: "", role: "manager", companyId: companies[0]?.id ?? "" });
  }

  const roleColors: Record<Role, string> = {
    super_admin: "bg-green-100 text-green-800",
    manager: "bg-violet-100 text-violet-700",
    client: "bg-emerald-100 text-emerald-700",
    technician: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>Users</h2>
          <p className="text-sm text-gray-500">{users.length} system users</p>
        </div>
        <button onClick={() => setShowModal(true)} className={btnPrimary}>{Icon.plus} Add User</button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <th className="text-left px-5 py-3.5 font-semibold text-gray-600">User</th>
              <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Role</th>
              <th className="text-left px-5 py-3.5 font-semibold text-gray-600 hidden md:table-cell">Email</th>
              <th className="text-left px-5 py-3.5 font-semibold text-gray-600 hidden lg:table-cell">Company</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((u) => {
              const company = companies.find((c) => c.id === u.companyId);
              return (
                <tr key={u.id} className="hover:bg-green-50/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.name} size="md" />
                      <span className="font-semibold text-gray-900">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${roleColors[u.role]}`}>
                      {u.role.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-500 hidden md:table-cell">{u.email}</td>
                  <td className="px-5 py-4 text-gray-500 hidden lg:table-cell">{company?.name ?? "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal title="Add User" onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <Field label="Full Name">
              <input className={inputCls} placeholder="Jane Smith" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Email">
              <input className={inputCls} placeholder="jane@evergreen.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </Field>
            <Field label="Role">
              <select className={selectCls} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })}>
                <option value="manager">Manager</option>
                <option value="technician">Technician</option>
                <option value="client">Client</option>
              </select>
            </Field>
            {(form.role === "manager" || form.role === "client") && (
              <Field label="Company">
                <select className={selectCls} value={form.companyId} onChange={(e) => setForm({ ...form, companyId: e.target.value })}>
                  {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </Field>
            )}
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className={`${btnSecondary} flex-1`}>Cancel</button>
              <button onClick={handleAdd} disabled={!form.name} className={`${btnPrimary} flex-1 disabled:opacity-50`}>Add User</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Sparkline (bar chart) ────────────────────────────────────────────────────
function Sparkline({ color, trend = "up" }: { color: string; trend?: "up" | "down" }) {
  const bars = trend === "up"
    ? [3, 5, 4, 7, 6, 9, 8, 12]
    : [12, 9, 10, 7, 8, 5, 4, 3];
  const max = Math.max(...bars);
  const w = 48;
  const h = 32;
  const barW = 4;
  const gap = 2;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      {bars.map((v, i) => {
        const barH = Math.round((v / max) * (h - 4));
        const x = i * (barW + gap);
        const y = h - barH;
        const opacity = 0.25 + (i / (bars.length - 1)) * 0.75;
        return (
          <rect
            key={i}
            x={x} y={y}
            width={barW} height={barH}
            rx={2}
            fill={color}
            fillOpacity={opacity}
          />
        );
      })}
    </svg>
  );
}

// ─── Home Dashboard ───────────────────────────────────────────────────────────
function HomeDashboard({ companies = [], users = [], technicians = [], tasks = [] }: {
  companies?: Company[]; users?: User[]; technicians?: Technician[]; tasks?: Task[];
}) {
  const cards = [
    { icon: "🏢", label: "Companies",   count: companies.length,                                    color: "#166534", trend: "up"   as const },
    { icon: "👤", label: "Clients",     count: users.filter((u) => u.role === "client").length,    color: "#7c3aed", trend: "up"   as const },
    { icon: "👔", label: "Managers",    count: users.filter((u) => u.role === "manager").length,   color: "#b45309", trend: "down" as const },
    { icon: "🔧", label: "Technicians", count: technicians.length,                                  color: "#0284c7", trend: "up"   as const },
  ];

  return (
    <div className="flex flex-col">
      <div className="px-4 pb-4">
        {/* Section label */}
        <p className="text-base font-semibold text-gray-600 mb-4 mt-2" style={{ fontFamily: "Poppins, sans-serif" }}>Overview</p>

        <div className="grid grid-cols-2 gap-4" id="overview-cards">
          {cards.map((card) => (
            <div
              key={card.label}
              className="bg-white flex flex-col justify-between"
              style={{
                borderRadius: 32,
                padding: "18px 20px 16px 20px",
                minHeight: 150,
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              }}
            >
              {/* Top row: circular icon + label */}
              <div className="flex items-center gap-3">
                <div
                  style={{
                    width: 46, height: 46, borderRadius: "50%",
                    background: card.color + "15",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22, flexShrink: 0,
                  }}
                >
                  {card.icon}
                </div>
                <span
                  className="font-semibold text-gray-700 leading-snug"
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: 14 }}
                >
                  {card.label}
                </span>
              </div>

              {/* Bottom row: count left, dots right */}
              <div className="flex items-end justify-between">
                <span
                  className="font-bold text-gray-900"
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: 42, lineHeight: 1 }}
                >
                  {card.count}
                </span>
                <Sparkline color={card.color} trend={card.trend} />
              </div>
            </div>
          ))}
        </div>

        {/* Activity Chart */}
        <ActivityChart />

        {/* Task Overview */}
        <p className="text-base font-semibold text-gray-600 mb-4 mt-5" style={{ fontFamily: "Poppins, sans-serif" }}>Task Overview</p>
        <div className="grid grid-cols-2 gap-4 pb-4">
          {[
            { icon: "✅", label: "Done",        count: tasks.filter((t) => t.status === "completed").length,  color: "#166534", trend: "up"   as const },
            { icon: "⚙️", label: "In Progress", count: tasks.filter((t) => t.status === "in_progress").length, color: "#0284c7", trend: "up"   as const },
            { icon: "⏸️", label: "On Hold",     count: tasks.filter((t) => t.status === "cancelled").length,  color: "#b45309", trend: "down" as const },
            { icon: "🕐", label: "Pending",     count: tasks.filter((t) => t.status === "open" || t.status === "assigned").length, color: "#7c3aed", trend: "down" as const },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-white flex flex-col justify-between"
              style={{ borderRadius: 32, padding: "18px 20px 16px 20px", minHeight: 150, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
            >
              <div className="flex items-center gap-3">
                <div style={{ width: 46, height: 46, borderRadius: "50%", background: card.color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                  {card.icon}
                </div>
                <span className="font-semibold text-gray-700 leading-snug" style={{ fontFamily: "Poppins, sans-serif", fontSize: 14 }}>{card.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: 42, lineHeight: 1 }}>{card.count}</span>
                <Sparkline color={card.color} trend={card.trend} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Activity Chart ───────────────────────────────────────────────────────────
function ActivityChart() {
  const [period, setPeriod] = useState<"6m" | "12m">("12m");

  const data12 = [
    { month: "2025-10", value: 0 },
    { month: "2026-01", value: 0 },
    { month: "2026-04", value: 1 },
    { month: "2026-07", value: 2 },
    { month: "2026-08", value: 6 },
  ];
  const data6 = [
    { month: "2026-03", value: 1 },
    { month: "2026-05", value: 1 },
    { month: "2026-06", value: 0 },
    { month: "2026-07", value: 2 },
    { month: "2026-08", value: 6 },
  ];
  const data = period === "12m" ? data12 : data6;

  const W = 340, H = 220, PL = 22, PR = 12, PT = 28, PB = 36;
  const cW = W - PL - PR, cH = H - PT - PB;
  const maxV = 7;
  const stepX = cW / (data.length - 1);

  const px = (i: number) => PL + i * stepX;
  const py = (v: number) => PT + cH - (v / maxV) * cH;

  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"}${px(i).toFixed(1)},${py(d.value).toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${px(data.length - 1).toFixed(1)},${(PT + cH).toFixed(1)} L${px(0).toFixed(1)},${(PT + cH).toFixed(1)} Z`;

  const yTicks = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="bg-white mt-4 px-4 pt-4 pb-3" style={{ borderRadius: 28, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-gray-800" style={{ fontFamily: "Poppins, sans-serif" }}>User counts by<br />access level</p>
        <button
          onClick={() => setPeriod(period === "12m" ? "6m" : "12m")}
          className="flex items-center gap-1 text-xs font-medium text-gray-500 px-3 py-1.5 rounded-xl border border-gray-200 bg-gray-50"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Last {period === "12m" ? "12" : "6"} months
          <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth={1.8}><polyline points="2,4 6,8 10,4" /></svg>
        </button>
      </div>

      {/* SVG chart */}
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#166534" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#166534" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Grid lines + Y labels */}
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={PL} y1={py(t)} x2={W - PR} y2={py(t)} stroke="#e5e7eb" strokeWidth={0.8} strokeDasharray="3 3" />
            <text x={PL - 4} y={py(t) + 4} textAnchor="end" fontSize={8} fill="#9ca3af" fontFamily="Poppins, sans-serif">{t}</text>
          </g>
        ))}

        {/* Area fill */}
        <path d={areaPath} fill="url(#areaGrad2)" />

        {/* Line */}
        <path d={linePath} fill="none" stroke="#166534" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

        {/* Data points + value labels */}
        {data.map((d, i) => (
          <g key={i}>
            <circle cx={px(i)} cy={py(d.value)} r={3.5} fill="white" stroke="#166534" strokeWidth={2} />
            {d.value > 0 && (
              <text x={px(i)} y={py(d.value) - 7} textAnchor="middle" fontSize={8} fill="#166534" fontWeight="600" fontFamily="Poppins, sans-serif">
                {d.value.toFixed(2)}
              </text>
            )}
          </g>
        ))}

        {/* X-axis labels — upright, anchored at bottom */}
        {data.map((d, i) => (
          <text
            key={i}
            x={px(i)}
            y={H - 2}
            textAnchor="middle"
            fontSize={10}
            fill="#6b7280"
            fontFamily="Poppins, sans-serif"
          >{d.month}</text>
        ))}
      </svg>
    </div>
  );
}

// ─── Profile View ─────────────────────────────────────────────────────────────
function ProfileView({ name, role, onLogout }: { name: string; role: Role; onLogout: () => void }) {
  const roleLabel: Record<Role, string> = {
    super_admin: "Super Admin", manager: "Manager", client: "Client", technician: "Technician",
  };
  return (
    <div className="flex flex-col items-center px-6 pt-10 pb-6 h-full overflow-y-auto">
      <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3" style={{ background: "#166534" }}>
        {name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>{name}</h3>
      <span className="text-sm text-gray-400 mb-8">{roleLabel[role]}</span>
      <button
        onClick={onLogout}
        className="w-full py-3.5 rounded-2xl text-white font-semibold text-sm transition-all active:scale-[0.98]"
        style={{ background: "#166534" }}
      >
        Sign Out
      </button>
    </div>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
type View = "dashboard" | "companies" | "equipment" | "technicians" | "tasks" | "profile";

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [splash, setSplash] = useState(true);
  const [auth, setAuth] = useState<{ role: Role; name: string } | null>(null);
  const [view, setView] = useState<View>("dashboard");

  const [companies, setCompanies] = useState<Company[]>(COMPANIES);
  const [equipment, setEquipment] = useState<Equipment[]>(EQUIPMENT);
  const [technicians, setTechnicians] = useState<Technician[]>(TECHNICIANS);
  const [tasks, setTasks] = useState<Task[]>(TASKS);
  const [users, setUsers] = useState<User[]>(USERS);

  if (splash) return <SplashScreen onDone={() => setSplash(false)} />;
  if (!auth) return <LoginPage onLogin={(role, name) => { setAuth({ role, name }); setView("dashboard"); }} />;

  const viewTitles: Record<View, string> = {
    dashboard: "Home", companies: "Companies", equipment: "Equipment",
    technicians: "Technicians", tasks: "Tasks", profile: "Profile",
  };

  function renderView() {
    if (view === "dashboard") return <HomeDashboard companies={companies} users={users} technicians={technicians} tasks={tasks} />;
    if (view === "companies") return <div className="px-4 pt-2 pb-4 h-full overflow-y-auto"><CompaniesView companies={companies} setCompanies={setCompanies} role={auth!.role} /></div>;
    if (view === "equipment") return <div className="px-4 pt-2 pb-4 h-full overflow-y-auto"><EquipmentView equipment={equipment} setEquipment={setEquipment} companies={companies} role={auth!.role} /></div>;
    if (view === "technicians") return <div className="px-4 pt-2 pb-4 h-full overflow-y-auto"><TechniciansView technicians={technicians} setTechnicians={setTechnicians} role={auth!.role} /></div>;
    if (view === "tasks") return <div className="px-4 pt-2 pb-4 h-full overflow-y-auto"><TasksView tasks={tasks} setTasks={setTasks} equipment={equipment} technicians={technicians} companies={companies} role={auth!.role} /></div>;
    if (view === "profile") return <ProfileView name={auth!.name} role={auth!.role} onLogout={() => setAuth(null)} />;
    return null;
  }

  // Bottom nav items
  const bottomNav: { id: View; label: string; icon: React.ReactNode }[] = [
    {
      id: "dashboard", label: "Home",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9,22 9,12 15,12 15,22" /></svg>,
    },
    {
      id: "equipment", label: "Equipment",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
    },
    {
      id: "companies", label: "Companies",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" /></svg>,
    },
    {
      id: "tasks", label: "Tasks",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>,
    },
    {
      id: "profile", label: "Profile",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    },
  ];

  return (
    <div className="flex flex-col h-full relative overflow-hidden" style={{ background: "#f2f3f7" }}>
      {/* Decorative background circles — behind cards (z-0) */}
      <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(22,101,52,0.12)", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "absolute", top: 160, left: -70, width: 200, height: 200, borderRadius: "50%", background: "rgba(22,101,52,0.11)", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "absolute", top: 600, left: -50, width: 170, height: 170, borderRadius: "50%", background: "rgba(22,101,52,0.10)", pointerEvents: "none", zIndex: 1 }} />
      <StatusBar />

      {/* Top bar — avatar left, title center, actions right */}
      <header className="px-4 pt-8 pb-3 flex items-center justify-between shrink-0 relative z-[2]">
        {/* Hamburger menu */}
        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-all">
          <svg viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth={2.2} strokeLinecap="round" className="w-5 h-5">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>

        {/* Brand */}
        <span className="font-bold text-gray-900 text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>{viewTitles[view]}</span>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-gray-500 shadow-sm active:scale-95 transition-all">
            <svg viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <path d="M14 14h2v2h-2zM18 14h3M14 18h2M18 18h3M14 21h3v-3" />
            </svg>
          </button>
          <button className="relative w-9 h-9 bg-white rounded-full flex items-center justify-center text-gray-500 shadow-sm active:scale-95 transition-all">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white" />
          </button>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 overflow-y-auto min-h-0 relative z-[2]">
        {view === "dashboard" && (
          <div className="px-4 pb-2">
            <div className="w-full h-40 rounded-3xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1589109807644-924edf14ee09?w=800&h=320&fit=crop&auto=format"
                alt="Kitchen equipment"
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.55) saturate(0.8)" }}
              />
            </div>
          </div>
        )}
        {renderView()}
      </main>

      {/* Bottom navigation — iOS pill style */}
      <nav className="shrink-0 px-4 pb-4 pt-2 relative">
        {/* FAB — half above the bar */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-7 z-10">
          <button
            onClick={() => setView("tasks")}
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-3xl font-light transition-all active:scale-95"
            style={{ background: "#166534", boxShadow: "0 6px 20px rgba(22,101,52,0.5)" }}
          >+</button>
        </div>

        <div className="bg-white rounded-3xl flex items-center justify-around px-3 py-2" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}>
          {bottomNav.map((item, idx) => {
            const active = view === item.id;
            const isMiddle = idx === Math.floor(bottomNav.length / 2);
            if (isMiddle) return <div key="fab-spacer" className="w-12" />;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className="flex flex-col items-center gap-1 transition-all active:scale-90 px-1"
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all"
                  style={{ background: active ? "#166534" : "transparent" }}
                >
                  <div style={{ color: active ? "#fff" : "#9ca3af" }}>{item.icon}</div>
                </div>
                <span className="text-[10px] font-semibold" style={{ color: active ? "#166534" : "#9ca3af", fontFamily: "Poppins, sans-serif" }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
