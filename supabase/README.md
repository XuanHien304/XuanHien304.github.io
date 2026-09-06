# Learning Journal — Supabase setup

One-time setup, done in your own Supabase/GitHub accounts (not automatable):

1. Create a project at supabase.com (free tier is fine).
2. In the SQL editor, run `migrations/0001_init.sql`, then
   `migrations/0002_add_area.sql`, then `seed.sql`, in that order.
3. Register a GitHub OAuth App at github.com/settings/developers.
   Authorization callback URL: `https://<project-ref>.supabase.co/auth/v1/callback`.
4. In Supabase → Authentication → Providers → GitHub, paste the OAuth
   App's Client ID and Client Secret, enable the provider.
5. In Supabase → Authentication → URL Configuration:
   - Site URL: `https://XuanHien304.github.io`
   - Redirect URLs: add `https://XuanHien304.github.io/journal/`
     (and `http://localhost:3000/journal/` for local dev).
6. Run the app locally (`npm run dev`) with `.env.local` pointing at this
   project, open `/journal/`, sign in with GitHub once.
7. In Supabase → Authentication → Users, copy your new user's `UID`.
8. Replace `00000000-0000-0000-0000-000000000000` in `is_owner()`
   (`migrations/0001_init.sql`, already applied — edit it via the SQL
   editor: `create or replace function public.is_owner() ... select
   auth.uid() = '<your-uid>'::uuid ...`) with that UID, and set it as
   `NEXT_PUBLIC_JOURNAL_OWNER_ID` in `.env.local` and in the repo's GitHub
   Actions secrets.
9. Rebuild/redeploy — `NEXT_PUBLIC_*` values are baked in at build time, so
   changing any of them requires a fresh build.

## Env vars

`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Supabase →
Project Settings → API) and `NEXT_PUBLIC_JOURNAL_OWNER_ID` (step 7 above) —
all safe to expose client-side; Row Level Security is the real security
boundary, not secrecy of these values.

## Known limitation

Free-tier Supabase projects can pause after ~1 week with no API activity.
The first request after a pause may be slow or briefly fail while it wakes
back up — the Journal UI shows a retry state for this rather than a silent
failure.
