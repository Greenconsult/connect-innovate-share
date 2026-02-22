-- ============================================================
-- Site Settings table – single row holding all site-wide config
-- ============================================================

CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default' CHECK (id = 'default'),
  settings JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Everyone can read
CREATE POLICY "Anyone can read site_settings"
  ON site_settings FOR SELECT USING (true);

-- Authenticated users can insert / update
CREATE POLICY "Authenticated can insert site_settings"
  ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update site_settings"
  ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');

-- Seed with an empty row so reads always return something
INSERT INTO site_settings (id, settings) VALUES ('default', '{}')
ON CONFLICT (id) DO NOTHING;
