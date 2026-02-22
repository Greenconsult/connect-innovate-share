-- =============================================================
-- Supabase Migration: REC Conference Management
-- Run this SQL in your Supabase SQL Editor (Dashboard → SQL Editor)
-- =============================================================

-- 1. Events table
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL DEFAULT '',
  duration TEXT NOT NULL DEFAULT '3 hours',
  venue TEXT NOT NULL DEFAULT '',
  postcode TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  tagline TEXT NOT NULL DEFAULT '',
  audience TEXT NOT NULL DEFAULT '',
  is_current BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'past')),
  funded_by TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Speakers table
CREATE TABLE IF NOT EXISTS speakers (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  affiliation TEXT NOT NULL DEFAULT '',
  topic TEXT NOT NULL DEFAULT '',
  bio TEXT NOT NULL DEFAULT ''
);

-- 3. Schedule items table
CREATE TABLE IF NOT EXISTS schedule_items (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  time TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT ''
);

-- 4. Committee members table
CREATE TABLE IF NOT EXISTS committee_members (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  affiliation TEXT NOT NULL DEFAULT ''
);

-- 5. Important dates table
CREATE TABLE IF NOT EXISTS important_dates (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  label TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL DEFAULT '',
  highlight BOOLEAN NOT NULL DEFAULT false
);

-- 6. Flyer highlights table
CREATE TABLE IF NOT EXISTS flyer_highlights (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  icon TEXT NOT NULL DEFAULT '',
  text TEXT NOT NULL DEFAULT ''
);

-- 7. Topics table
CREATE TABLE IF NOT EXISTS topics (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  text TEXT NOT NULL DEFAULT ''
);

-- 8. Submission guidelines table
CREATE TABLE IF NOT EXISTS submission_guidelines (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  text TEXT NOT NULL DEFAULT ''
);


-- =============================================================
-- Row Level Security (RLS)
-- =============================================================

-- Enable RLS on all tables
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE committee_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE important_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE flyer_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE submission_guidelines ENABLE ROW LEVEL SECURITY;

-- Public READ access (anyone can view)
CREATE POLICY "Public read access" ON events FOR SELECT USING (true);
CREATE POLICY "Public read access" ON speakers FOR SELECT USING (true);
CREATE POLICY "Public read access" ON schedule_items FOR SELECT USING (true);
CREATE POLICY "Public read access" ON committee_members FOR SELECT USING (true);
CREATE POLICY "Public read access" ON important_dates FOR SELECT USING (true);
CREATE POLICY "Public read access" ON flyer_highlights FOR SELECT USING (true);
CREATE POLICY "Public read access" ON topics FOR SELECT USING (true);
CREATE POLICY "Public read access" ON submission_guidelines FOR SELECT USING (true);

-- Authenticated WRITE access (only logged-in admins can modify)
CREATE POLICY "Auth insert" ON events FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON events FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON events FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON speakers FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON speakers FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON speakers FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON schedule_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON schedule_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON schedule_items FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON committee_members FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON committee_members FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON committee_members FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON important_dates FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON important_dates FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON important_dates FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON flyer_highlights FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON flyer_highlights FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON flyer_highlights FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON topics FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON topics FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON topics FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON submission_guidelines FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON submission_guidelines FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON submission_guidelines FOR DELETE USING (auth.role() = 'authenticated');


-- =============================================================
-- Seed Data: REC 2026 default event
-- =============================================================

INSERT INTO events (id, name, date, duration, venue, postcode, phone, tagline, audience, is_current, status, funded_by)
VALUES (
  'rec2026',
  'REC 2026',
  '2026-04-21',
  '3 hours',
  'City Campus, University of Wolverhampton',
  'WV1 1LY',
  '+44 (0)7438 023912',
  'Research-Driven. Industry-Ready. Career-Focused.',
  'UG, PG & Graduates',
  true,
  'upcoming',
  'Funded by the Department of Computing, University of Wolverhampton'
);

INSERT INTO speakers (id, event_id, name, role, affiliation, topic, bio) VALUES
  ('s1', 'rec2026', 'Dr. Sarah Mitchell', 'Keynote Speaker', 'University of Wolverhampton', 'AI and Machine Learning in Healthcare', 'Senior Lecturer in Computer Science with over 15 years of experience in artificial intelligence research.'),
  ('s2', 'rec2026', 'Prof. James Okonkwo', 'Keynote Speaker', 'University of Birmingham', 'Cybersecurity in the Age of IoT', 'Professor of Cybersecurity and a leading researcher in Internet of Things security protocols.'),
  ('s3', 'rec2026', 'Dr. Priya Sharma', 'Invited Speaker', 'Capgemini UK', 'Bridging Academia and Industry in Software Engineering', 'Industry researcher and alumna specialising in agile development methodologies.'),
  ('s4', 'rec2026', 'Mr. David Chen', 'Panel Moderator', 'University of Wolverhampton', 'Student Research Journeys', 'Postgraduate researcher in data science and an advocate for student-led research initiatives.');

INSERT INTO schedule_items (id, event_id, time, title, description) VALUES
  ('t1', 'rec2026', '14:00 – 14:10', 'Welcome Address', 'Overview of the session and introduction of speakers.'),
  ('t2', 'rec2026', '14:10 – 14:30', 'Keynote Talk', 'Invited guest shares insights on a topical research area (15–20 mins).'),
  ('t3', 'rec2026', '14:30 – 15:30', 'Student & Graduate Presentations', '2–3 presentations (20 mins each), each followed by a 5-minute Q&A.'),
  ('t4', 'rec2026', '15:30 – 16:00', 'Panel Discussion', 'Open conversation on challenges and opportunities in student research.'),
  ('t5', 'rec2026', '16:00 – 16:30', 'Networking & Refreshments', 'Informal discussion, idea exchange, and mentorship opportunities.');

INSERT INTO committee_members (id, event_id, name, role, affiliation) VALUES
  ('c1', 'rec2026', 'Julius Odede', 'Chair', 'Department of Computing & Mathematical Sciences'),
  ('c2', 'rec2026', 'Consolée Mbarushimana', 'Co-Chair', 'Department of Computing & Mathematical Sciences'),
  ('c3', 'rec2026', 'Dr. Helen Price', 'Programme Committee', 'Department of Computer Science'),
  ('c4', 'rec2026', 'Dr. Rajesh Patel', 'Programme Committee', 'Department of Mathematics'),
  ('c5', 'rec2026', 'Ms. Laura Benson', 'Organising Committee', 'Postgraduate Research Office'),
  ('c6', 'rec2026', 'Mr. Kwame Asante', 'Student Representative', 'PhD Candidate, Computer Science');

INSERT INTO topics (id, event_id, text) VALUES
  ('top1', 'rec2026', 'Artificial Intelligence & Machine Learning'),
  ('top2', 'rec2026', 'Cybersecurity & Network Security'),
  ('top3', 'rec2026', 'Software Engineering & DevOps'),
  ('top4', 'rec2026', 'Data Science & Big Data Analytics'),
  ('top5', 'rec2026', 'Internet of Things (IoT)'),
  ('top6', 'rec2026', 'Human-Computer Interaction'),
  ('top7', 'rec2026', 'Mathematical Modelling & Optimisation'),
  ('top8', 'rec2026', 'Cloud Computing & Distributed Systems');

INSERT INTO submission_guidelines (id, event_id, text) VALUES
  ('sg1', 'rec2026', 'Abstract Length: 250–500 words'),
  ('sg2', 'rec2026', 'Presentation Duration: 15 minutes + 5 minutes Q&A'),
  ('sg3', 'rec2026', 'Format: PDF or Word document');

INSERT INTO important_dates (id, event_id, label, date, highlight) VALUES
  ('d1', 'rec2026', 'Abstract Submission Deadline', 'TBA', true),
  ('d2', 'rec2026', 'Notification of Acceptance', 'TBA', false),
  ('d3', 'rec2026', 'Presentation Date', 'TBA', false);

INSERT INTO flyer_highlights (id, event_id, icon, text) VALUES
  ('f1', 'rec2026', '🔬', 'Present Your Research'),
  ('f2', 'rec2026', '🤝', 'Network & Collaborate'),
  ('f3', 'rec2026', '📈', 'Connect With Industry');
