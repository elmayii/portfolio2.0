-- D1 `srperera` — contract workspace/contracts/sb-01-01.md. Idempotent: safe to re-run.

-- One row per email; also used by the vault (SYSTEM Sprint 02).
CREATE TABLE IF NOT EXISTS people (
  email      TEXT PRIMARY KEY,                -- lowercased, trimmed
  source     TEXT NOT NULL CHECK (source IN ('instagram', 'tiktok', 'web')), -- first origin
  consent_at TEXT NOT NULL,                   -- ISO 8601 UTC
  substack   TEXT,                            -- null until synced with the Substack CSV
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- One row per request: which guide each person asked for, and the 3-per-day cap.
CREATE TABLE IF NOT EXISTS requests (
  email      TEXT NOT NULL,
  keyword    TEXT,                            -- null = sign-up without a guide
  source     TEXT NOT NULL CHECK (source IN ('instagram', 'tiktok', 'web')),
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS requests_email_keyword_created ON requests (email, keyword, created_at);
