// Generates supabase/seed_young_coders.sql from the typed course content in
// src/lib/courses/program.ts so the database and the app never drift.
// Run:  node scripts/generate-seed.mjs   (Node >= 22 with TS type-stripping)
import { writeFileSync } from "node:fs";
import { COURSES } from "../src/lib/courses/program.ts";

const SLUGS = COURSES.map((c) => c.slug);

const q = (s) => `'${String(s ?? "").replace(/'/g, "''")}'`;
const textArr = (arr) =>
  `ARRAY[${(arr ?? []).map(q).join(", ")}]::text[]`;
const jsonb = (obj) =>
  obj == null ? "NULL" : `${q(JSON.stringify(obj))}::jsonb`;

const COLUMNS = [
  "slug", "title", "instructor", "thumbnail", "duration", "students", "rating",
  "tags", "description", "suitable_for", "what_you_will_learn",
  "what_you_will_get", "tutor_support", "structure", "tools", "price",
  "level", "age_group", "format", "why_this_course", "curriculum", "capstone",
  "ai_bonus", "outcomes", "ml_algorithms", "is_new",
];

const rowValues = (c) =>
  [
    q(c.slug), q(c.title), q(c.instructor), q(c.thumbnail), q(c.duration),
    c.students ?? 0, c.rating ?? 0, textArr(c.tags), q(c.description),
    textArr(c.suitable_for), textArr(c.what_you_will_learn),
    textArr(c.what_you_will_get), q(c.tutor_support), jsonb(c.structure ?? null),
    textArr(c.tools), q(c.price), q(c.level), q(c.ageGroup), q(c.format),
    textArr(c.whyThisCourse), jsonb(c.curriculum), jsonb(c.capstone),
    jsonb(c.aiBonus), textArr(c.outcomes), jsonb(c.mlAlgorithms ?? null),
    c.isNew ? "true" : "false",
  ].join(", ");

const slugList = SLUGS.map(q).join(", ");

const sql = `-- =============================================================================
-- Motion AI — Young Coders Program: schema + seed
-- GENERATED FILE — do not edit by hand. Regenerate with:
--   node scripts/generate-seed.mjs
--
-- HOW TO RUN: paste this whole file into the Supabase SQL Editor and Run.
-- It is idempotent — safe to run multiple times.
--
-- Assumptions about the existing public.courses table:
--   • id has a default (uuid gen_random_uuid()) and created_at defaults to now()
--     — so we don't insert them. If your id column is text without a default,
--     add it to the column/value lists below.
--   • tags / suitable_for / what_you_will_learn / what_you_will_get / tools are
--     text[]; structure is jsonb. (Matches the app's Course type.)
-- =============================================================================

BEGIN;

-- 1) Add the richer Young Coders columns (no-op if they already exist) --------
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS level           text;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS age_group       text;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS format          text;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS why_this_course text[];
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS curriculum      jsonb;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS capstone        jsonb;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS ai_bonus        jsonb;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS outcomes        text[];
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS ml_algorithms   jsonb;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS is_new          boolean DEFAULT false;

-- 2) Remove previous / stale courses (anything that isn't a Young Coders course)
DELETE FROM public.courses WHERE slug NOT IN (${slugList});

-- 3) Re-seed the two Young Coders courses (delete + insert = idempotent) ------
DELETE FROM public.courses WHERE slug IN (${slugList});

INSERT INTO public.courses (${COLUMNS.join(", ")}) VALUES
${COURSES.map((c) => `  (${rowValues(c)})`).join(",\n")};

COMMIT;

-- 4) OPTIONAL — clean up enrollments tied to removed courses ------------------
-- First REVIEW what would be removed:
SELECT course_slug, count(*) AS enrollments
FROM public.enrollments
WHERE course_slug NOT IN (${slugList})
GROUP BY course_slug;
--
-- Then, if those are stale/test rows you want gone, run this DELETE manually:
-- DELETE FROM public.enrollments WHERE course_slug NOT IN (${slugList});
`;

const outUrl = new URL("../supabase/seed_young_coders.sql", import.meta.url);
writeFileSync(outUrl, sql, "utf8");
console.log("Wrote", outUrl.pathname, `(${COURSES.length} courses, ${sql.length} bytes)`);
