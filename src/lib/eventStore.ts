// Event data types and localStorage helpers

export interface Speaker {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  topic: string;
  bio: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  affiliation: string;
}

export interface ImportantDate {
  id: string;
  label: string;
  date: string;
  highlight?: boolean;
}

export interface FlyerHighlight {
  id: string;
  icon: string;
  text: string;
}

export interface EventData {
  id: string;
  name: string;
  date: string;
  duration: string;
  venue: string;
  postcode: string;
  phone: string;
  tagline: string;
  audience: string;
  isCurrent: boolean;
  status: "upcoming" | "past";

  speakers: Speaker[];
  schedule: ScheduleItem[];
  committee: CommitteeMember[];

  topics: string[];
  submissionGuidelines: string[];
  importantDates: ImportantDate[];

  flyerHighlights: FlyerHighlight[];
  fundedBy: string;
}

const STORAGE_KEY = "rec_events";

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function getEvents(): EventData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  // Seed with default data on first load
  const seed = [createSeedEvent()];
  saveEvents(seed);
  return seed;
}

export function saveEvents(events: EventData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export function getEvent(id: string): EventData | undefined {
  return getEvents().find((e) => e.id === id);
}

export function getCurrentEvent(): EventData | undefined {
  return getEvents().find((e) => e.isCurrent);
}

export function saveEvent(event: EventData) {
  const events = getEvents();
  const idx = events.findIndex((e) => e.id === event.id);
  if (idx >= 0) events[idx] = event;
  else events.push(event);
  saveEvents(events);
}

export function deleteEvent(id: string) {
  saveEvents(getEvents().filter((e) => e.id !== id));
}

export function setCurrentEvent(id: string) {
  const events = getEvents().map((e) => ({ ...e, isCurrent: e.id === id }));
  saveEvents(events);
}

export function createBlankEvent(): EventData {
  return {
    id: uid(),
    name: "",
    date: "",
    duration: "3 hours",
    venue: "City Campus, University of Wolverhampton",
    postcode: "WV1 1LY",
    phone: "+44 (0)7438 023912",
    tagline: "",
    audience: "UG, PG & Graduates",
    isCurrent: false,
    status: "upcoming",
    speakers: [],
    schedule: [],
    committee: [],
    topics: [],
    submissionGuidelines: [],
    importantDates: [],
    flyerHighlights: [],
    fundedBy: "Funded by the Department of Computing, University of Wolverhampton",
  };
}

function createSeedEvent(): EventData {
  return {
    id: "rec2026",
    name: "REC 2026",
    date: "2026-04-21",
    duration: "3 hours",
    venue: "City Campus, University of Wolverhampton",
    postcode: "WV1 1LY",
    phone: "+44 (0)7438 023912",
    tagline: "Research-Driven. Industry-Ready. Career-Focused.",
    audience: "UG, PG & Graduates",
    isCurrent: true,
    status: "upcoming",
    speakers: [
      { id: "s1", name: "Dr. Sarah Mitchell", role: "Keynote Speaker", affiliation: "University of Wolverhampton", topic: "AI and Machine Learning in Healthcare", bio: "Senior Lecturer in Computer Science with over 15 years of experience in artificial intelligence research." },
      { id: "s2", name: "Prof. James Okonkwo", role: "Keynote Speaker", affiliation: "University of Birmingham", topic: "Cybersecurity in the Age of IoT", bio: "Professor of Cybersecurity and a leading researcher in Internet of Things security protocols." },
      { id: "s3", name: "Dr. Priya Sharma", role: "Invited Speaker", affiliation: "Capgemini UK", topic: "Bridging Academia and Industry in Software Engineering", bio: "Industry researcher and alumna specialising in agile development methodologies." },
      { id: "s4", name: "Mr. David Chen", role: "Panel Moderator", affiliation: "University of Wolverhampton", topic: "Student Research Journeys", bio: "Postgraduate researcher in data science and an advocate for student-led research initiatives." },
    ],
    schedule: [
      { id: "t1", time: "14:00 – 14:10", title: "Welcome Address", description: "Overview of the session and introduction of speakers." },
      { id: "t2", time: "14:10 – 14:30", title: "Keynote Talk", description: "Invited guest shares insights on a topical research area (15–20 mins)." },
      { id: "t3", time: "14:30 – 15:30", title: "Student & Graduate Presentations", description: "2–3 presentations (20 mins each), each followed by a 5-minute Q&A." },
      { id: "t4", time: "15:30 – 16:00", title: "Panel Discussion", description: "Open conversation on challenges and opportunities in student research." },
      { id: "t5", time: "16:00 – 16:30", title: "Networking & Refreshments", description: "Informal discussion, idea exchange, and mentorship opportunities." },
    ],
    committee: [
      { id: "c1", name: "Julius Odede", role: "Chair", affiliation: "Department of Computing & Mathematical Sciences" },
      { id: "c2", name: "Consolée Mbarushimana", role: "Co-Chair", affiliation: "Department of Computing & Mathematical Sciences" },
      { id: "c3", name: "Dr. Helen Price", role: "Programme Committee", affiliation: "Department of Computer Science" },
      { id: "c4", name: "Dr. Rajesh Patel", role: "Programme Committee", affiliation: "Department of Mathematics" },
      { id: "c5", name: "Ms. Laura Benson", role: "Organising Committee", affiliation: "Postgraduate Research Office" },
      { id: "c6", name: "Mr. Kwame Asante", role: "Student Representative", affiliation: "PhD Candidate, Computer Science" },
    ],
    topics: [
      "Artificial Intelligence & Machine Learning",
      "Cybersecurity & Network Security",
      "Software Engineering & DevOps",
      "Data Science & Big Data Analytics",
      "Internet of Things (IoT)",
      "Human-Computer Interaction",
      "Mathematical Modelling & Optimisation",
      "Cloud Computing & Distributed Systems",
    ],
    submissionGuidelines: [
      "Abstract Length: 250–500 words",
      "Presentation Duration: 15 minutes + 5 minutes Q&A",
      "Format: PDF or Word document",
    ],
    importantDates: [
      { id: "d1", label: "Abstract Submission Deadline", date: "TBA", highlight: true },
      { id: "d2", label: "Notification of Acceptance", date: "TBA" },
      { id: "d3", label: "Presentation Date", date: "TBA" },
    ],
    flyerHighlights: [
      { id: "f1", icon: "🔬", text: "Present Your Research" },
      { id: "f2", icon: "🤝", text: "Network & Collaborate" },
      { id: "f3", icon: "📈", text: "Connect With Industry" },
    ],
    fundedBy: "Funded by the Department of Computing, University of Wolverhampton",
  };
}

export const ADMIN_PASSWORD = "rec2026admin";
