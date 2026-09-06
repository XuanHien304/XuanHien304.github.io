-- Idempotent seed: DSA as the first subject, with its 12 original categories.
-- Safe to re-run.

insert into subjects (slug, name, sort_order) values
  ('dsa', 'Data Structures & Algorithms', 0)
on conflict (slug) do nothing;

insert into categories (subject_id, name, sort_order)
select s.id, c.name, c.sort_order
from subjects s
cross join (values
  ('Two Pointers', 0),
  ('Sliding Window', 1),
  ('Binary Search', 2),
  ('Stack / Monotonic Stack', 3),
  ('Linked List', 4),
  ('Trees (BFS/DFS)', 5),
  ('Heaps / Top-K', 6),
  ('Backtracking', 7),
  ('Graphs', 8),
  ('Advanced Graphs', 9),
  ('1-D Dynamic Programming', 10),
  ('2-D Dynamic Programming', 11)
) as c(name, sort_order)
where s.slug = 'dsa'
on conflict (subject_id, name) do nothing;
