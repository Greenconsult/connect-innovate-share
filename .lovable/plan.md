
# Admin Panel for Managing REC Events

## Overview
Add a password-protected admin area where you can create, edit, and manage events. Each event stores its own speakers, schedule, committee, flyer details, and more. You can mark one event as "current" so the public-facing pages display that event's data.

Since there's no backend database connected yet, all event data will be stored in the browser's localStorage as a first step. This keeps things simple and working immediately. Later, you can connect a database (Supabase) if you need data to persist across devices.

---

## What You'll Be Able to Manage Per Event

- **Basic details**: Event name, date, duration, venue, postcode, phone, tagline, audience
- **Speakers**: Name, role, affiliation, topic, bio
- **Schedule**: Time slots with titles and descriptions
- **Committee members**: Name, role, affiliation
- **Proceedings/topics**: Topics of interest, submission guidelines, important dates
- **Flyer text**: All the text that appears on the downloadable flyer
- **Status**: Mark an event as "current" (featured on public pages) or "past"

---

## How It Works

1. **Navigate to `/admin`** -- you'll see a password prompt
2. **Enter the admin password** (a simple gate, stored as a constant in code)
3. **Dashboard** shows a list of all events with a button to create a new one
4. **Click an event** to edit its details across tabs (Details, Speakers, Schedule, Committee, Proceedings, Flyer)
5. **Mark one event as "current"** -- the public pages will pull data from that event
6. **Public pages** (Home, Speakers, Schedule, etc.) will read from the event data store instead of hardcoded arrays

---

## Technical Details

### New Files

| File | Purpose |
|------|---------|
| `src/lib/eventStore.ts` | Event data types and localStorage read/write helpers |
| `src/pages/AdminLogin.tsx` | Simple password gate page |
| `src/pages/AdminDashboard.tsx` | List all events, create new, set current |
| `src/pages/AdminEventEdit.tsx` | Tabbed form to edit a single event's details |
| `src/components/admin/EventDetailsForm.tsx` | Form for basic event info |
| `src/components/admin/SpeakersForm.tsx` | Add/edit/remove speakers |
| `src/components/admin/ScheduleForm.tsx` | Add/edit/remove schedule items |
| `src/components/admin/CommitteeForm.tsx` | Add/edit/remove committee members |
| `src/components/admin/ProceedingsForm.tsx` | Topics, guidelines, dates |
| `src/components/admin/FlyerForm.tsx` | Flyer-specific text fields |

### Data Model (stored in localStorage)

```text
Event {
  id: string
  name: string
  date: string
  duration: string
  venue: string
  postcode: string
  phone: string
  tagline: string
  audience: string
  isCurrent: boolean
  status: "upcoming" | "past"

  speakers: Speaker[]
  schedule: ScheduleItem[]
  committee: CommitteeMember[]

  topics: string[]
  submissionGuidelines: string[]
  importantDates: { label, date, highlight? }[]

  flyerHighlights: { icon, text }[]
  fundedBy: string
}
```

### Route Changes

- `/admin` -- password gate, then redirects to dashboard
- `/admin/dashboard` -- event list
- `/admin/events/:id` -- edit event (tabbed form)

### Public Page Changes

All pages (Home, Speakers, Schedule, Committee, Proceedings, Flyer) will be updated to:
1. Read the "current" event from the store
2. Use that event's data instead of hardcoded values
3. Fall back to sensible defaults if no event is set

### Password Gate

- A constant `ADMIN_PASSWORD` in code (you can change it anytime)
- Once entered correctly, stored in `sessionStorage` so you stay logged in during your browser session
- Logout button clears the session

### Seed Data

The existing hardcoded data (current speakers, schedule, committee, etc.) will be used to create an initial "REC 2026" event in the store so nothing is lost.
