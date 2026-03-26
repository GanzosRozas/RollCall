// ─── TIPOS ────────────────────────────────────────────────────────────────────
const EVENT_COLORS = [
  { id: "blue",   bg: "#1a73e8", light: "#e8f0fe", text: "#1a73e8" },
  { id: "green",  bg: "#0f9d58", light: "#e6f4ea", text: "#0f9d58" },
  { id: "red",    bg: "#d93025", light: "#fce8e6", text: "#d93025" },
  { id: "amber",  bg: "#f9ab00", light: "#fef7e0", text: "#e37400" },
  { id: "purple", bg: "#8430ce", light: "#f3e8fd", text: "#8430ce" },
  { id: "teal",   bg: "#129eaf", light: "#e4f7fb", text: "#129eaf" },
];

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const DAYS_SHORT = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const DAYS_FULL  = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const MONTHS     = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

function uuid() { return Math.random().toString(36).slice(2, 10); }

function formatHour(h:number) {
  if (h === 0)  return "12 AM";
  if (h < 12)  return `${h} AM`;
  if (h === 12) return "12 PM";
  return `${h - 12} PM`;
}

function isSameDay(a:Date, b:Date) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth()    === b.getMonth()    &&
         a.getDate()     === b.getDate();
}

function startOfWeek(date:string) {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date:Date, n:number) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function getMonthGrid(year:number, month:number) {
  const first = new Date(year, month, 1);
  const last  = new Date(year, month + 1, 0);
  const rows  = [];
  let   week  = [];
  for (let i = 0; i < first.getDay(); i++) week.push(null);
  for (let d = 1; d <= last.getDate(); d++) {
    week.push(new Date(year, month, d));
    if (week.length === 7) { rows.push(week); week = []; }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    rows.push(week);
  }
  return rows;
}

//agregado
export interface CalendarEventInput {
  title: string;
  start: Date;
  end: Date;
  color: string;
  allDay: boolean;
  description?: string;
}
//agregado
export interface CalendarEvent extends CalendarEventInput {
  id: string;
}
//agregado
 export type ModalState =
  | { type: "create"; date: Date; hour: number }
  | { type: "edit"; event: CalendarEvent }
  | null;
//agregado
  export interface CalendarContextType {
  events: CalendarEvent[];
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  modal: ModalState;
  openCreate: (date: Date, hour: number) => void;
  openEdit: (event: CalendarEvent) => void;
  closeModal: () => void;
  addEvent: (ev: CalendarEventInput) => void;
  updateEvent: (ev: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
  dragging: any;
  setDragging: React.Dispatch<React.SetStateAction<any>>;
}
export{getMonthGrid,addDays,startOfWeek,isSameDay,formatHour,uuid,EVENT_COLORS,HOURS,DAYS_SHORT,DAYS_FULL,MONTHS}