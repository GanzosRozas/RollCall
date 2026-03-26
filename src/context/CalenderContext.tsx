import { createContext, useState, useCallback, useContext } from "react";
import {
  uuid,
  addDays,
  type CalendarEventInput,
  type CalendarEvent,
  type ModalState,
  type CalendarContextType,
} from "../types/event.types";
// ─── CONTEXT / ESTADO GLOBAL ──────────────────────────────────────────────────
const CalendarCtx = createContext(null);

const DEMO_EVENTS = [
  {
    id: uuid(),
    title: "Stand-up diario",
    start: (() => {
      const d = new Date();
      d.setHours(9, 0, 0, 0);
      return d;
    })(),
    end: (() => {
      const d = new Date();
      d.setHours(9, 30, 0, 0);
      return d;
    })(),
    color: "blue",
    allDay: false,
    description: "Revisión rápida del equipo",
  },
  {
    id: uuid(),
    title: "Almuerzo con cliente",
    start: (() => {
      const d = new Date();
      d.setHours(13, 0, 0, 0);
      return d;
    })(),
    end: (() => {
      const d = new Date();
      d.setHours(14, 30, 0, 0);
      return d;
    })(),
    color: "green",
    allDay: false,
    description: "Restaurante El Centro",
  },
  {
    id: uuid(),
    title: "Code review",
    start: (() => {
      const d = addDays(new Date(), 1);
      d.setHours(10, 0, 0, 0);
      return d;
    })(),
    end: (() => {
      const d = addDays(new Date(), 1);
      d.setHours(11, 0, 0, 0);
      return d;
    })(),
    color: "purple",
    allDay: false,
    description: "",
  },
  {
    id: uuid(),
    title: "Sprint Planning",
    start: (() => {
      const d = addDays(new Date(), 2);
      d.setHours(9, 0, 0, 0);
      return d;
    })(),
    end: (() => {
      const d = addDays(new Date(), 2);
      d.setHours(12, 0, 0, 0);
      return d;
    })(),
    color: "amber",
    allDay: false,
    description: "Planificación del sprint 24",
  },
  {
    id: uuid(),
    title: "Vacaciones",
    start: (() => {
      const d = addDays(new Date(), -1);
      d.setHours(0, 0, 0, 0);
      return d;
    })(),
    end: (() => {
      const d = addDays(new Date(), 3);
      d.setHours(23, 59, 0, 0);
      return d;
    })(),
    color: "teal",
    allDay: true,
    description: "",
  },
];

function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<CalendarEvent[]>(DEMO_EVENTS);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("week"); // month | week | day
  const [modal, setModal] = useState<ModalState>(null); // { type, event?, date?, hour? }
  const [dragging, setDragging] = useState(null);

  const addEvent = useCallback(
    (ev: CalendarEventInput) =>
      setEvents((prev) => [...prev, { ...ev, id: uuid() }]),
    [],
  );
  const updateEvent = useCallback(
    (ev: CalendarEvent) =>
      setEvents((prev) => prev.map((e) => (e.id === ev.id ? ev : e))),
    [],
  );
  const deleteEvent = useCallback(
    (id: string) => setEvents((prev) => prev.filter((e) => e.id !== id)),
    [],
  );
  const openCreate = useCallback(
    (date: Date, hour: number) => setModal({ type: "create", date, hour }),
    [],
  );
  const openEdit = useCallback(
    (event: CalendarEvent) => setModal({ type: "edit", event }),
    [],
  );
  const closeModal = useCallback(() => setModal(null), []);
  //agregado
  const CalendarCtx = createContext<CalendarContextType | null>(null);
  return (
    <CalendarCtx.Provider
      value={{
        events,
        currentDate,
        setCurrentDate,
        view,
        setView,
        modal,
        openCreate,
        openEdit,
        closeModal,
        addEvent,
        updateEvent,
        deleteEvent,
        dragging,
        setDragging,
      }}
    >
      {children}
    </CalendarCtx.Provider>
  );
}

const useCalendar = () => useContext(CalendarCtx);

export { useCalendar, CalendarProvider };
