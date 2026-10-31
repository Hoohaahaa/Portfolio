CREATE TABLE IF NOT EXISTS monument_accounts(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), username text UNIQUE NOT NULL,password_hash text NOT NULL,salt text NOT NULL,recovery_hash text NOT NULL,created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS monument_sessions(token_hash text PRIMARY KEY,owner_id uuid NOT NULL REFERENCES monument_accounts(id),expires_at timestamptz NOT NULL);
CREATE TABLE IF NOT EXISTS monument_registry(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),owner_id uuid NOT NULL REFERENCES monument_accounts(id),draft jsonb NOT NULL,published jsonb,revision integer NOT NULL DEFAULT 1,published_revision integer,published_at timestamptz,created_at timestamptz NOT NULL DEFAULT now(),updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS monument_revisions(work_id uuid NOT NULL REFERENCES monument_registry(id),revision integer NOT NULL,content jsonb NOT NULL,action text NOT NULL,created_at timestamptz NOT NULL DEFAULT now(),PRIMARY KEY(work_id,revision));
CREATE INDEX IF NOT EXISTS monument_registry_owner ON monument_registry(owner_id);
CREATE INDEX IF NOT EXISTS monument_sessions_expiry ON monument_sessions(expires_at);
