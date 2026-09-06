-- Groups subjects by top-level "area" (Study Journal, Travel, Game, ...),
-- one journal hub serving several kinds of content. Existing subjects
-- (DSA etc.) default to 'study', which is correct for what's there today.

alter table subjects add column if not exists area text not null default 'study';

create index if not exists subjects_area_idx on subjects (area);
