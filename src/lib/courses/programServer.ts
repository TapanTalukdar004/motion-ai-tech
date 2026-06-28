// -----------------------------------------------------------------------------
// Server-side, DB-first accessors for the Young Coders Program.
//
// Reads the two program courses from the Supabase `courses` table when it's
// reachable AND the row is "rich" (has curriculum). Otherwise falls back to the
// static content in program.ts — so the catalog NEVER breaks while Supabase is
// paused or before the seed script (supabase/seed_young_coders.sql) is run.
//
// The static list defines the canonical set of program slugs; the DB only
// enriches/overrides them. Enrollment records (and future Razorpay payments)
// reference these courses by `slug` in the `enrollments` table.
// -----------------------------------------------------------------------------

import { createClient } from "@/utils/supabase/server";
import { COURSES, type ProgramCourse } from "./program";

type Row = Record<string, unknown>;

const asStringArray = (v: unknown): string[] =>
  Array.isArray(v) ? v.map(String) : [];

/** A DB row is usable only if it carries the rich curriculum payload. */
function isRich(row: Row | null | undefined): row is Row {
  return !!row && Array.isArray((row as Row).curriculum) && (row.curriculum as unknown[]).length > 0;
}

function rowToProgramCourse(row: Row): ProgramCourse {
  return {
    id: String(row.id ?? row.slug),
    slug: String(row.slug),
    title: String(row.title ?? ""),
    instructor: String(row.instructor ?? "Motion AI Faculty"),
    thumbnail: String(row.thumbnail ?? ""),
    duration: String(row.duration ?? ""),
    students: Number(row.students ?? 0),
    rating: Number(row.rating ?? 0),
    tags: asStringArray(row.tags),
    description: String(row.description ?? ""),
    suitable_for: asStringArray(row.suitable_for),
    what_you_will_learn: asStringArray(row.what_you_will_learn),
    what_you_will_get: asStringArray(row.what_you_will_get),
    tutor_support: String(row.tutor_support ?? ""),
    structure: (row.structure as ProgramCourse["structure"]) ?? undefined,
    tools: asStringArray(row.tools),
    price: String(row.price ?? ""),
    // Rich Young Coders fields
    level: String(row.level ?? ""),
    ageGroup: String(row.age_group ?? ""),
    format: String(row.format ?? ""),
    whyThisCourse: asStringArray(row.why_this_course),
    curriculum: row.curriculum as ProgramCourse["curriculum"],
    capstone: row.capstone as ProgramCourse["capstone"],
    aiBonus: row.ai_bonus as ProgramCourse["aiBonus"],
    outcomes: asStringArray(row.outcomes),
    mlAlgorithms: (row.ml_algorithms as ProgramCourse["mlAlgorithms"]) ?? undefined,
    isNew: Boolean(row.is_new),
  };
}

export async function getProgramCourses(): Promise<ProgramCourse[]> {
  try {
    const supabase = await createClient();
    if (supabase) {
      const slugs = COURSES.map((c) => c.slug);
      const { data } = await supabase.from("courses").select("*").in("slug", slugs);
      if (data && data.length) {
        const bySlug = new Map<string, ProgramCourse>(
          (data as Row[]).filter(isRich).map((r) => [String(r.slug), rowToProgramCourse(r)])
        );
        // Keep the canonical order; DB row wins when rich, else static.
        return COURSES.map((c) => bySlug.get(c.slug) ?? c);
      }
    }
  } catch {
    // Supabase unreachable — fall through to static content.
  }
  return COURSES;
}

export async function getProgramCourseBySlug(
  slug: string
): Promise<ProgramCourse | undefined> {
  const fallback = COURSES.find((c) => c.slug === slug);
  if (!fallback) return undefined; // not a program course; let the DB/legacy path handle it
  try {
    const supabase = await createClient();
    if (supabase) {
      const { data } = await supabase
        .from("courses")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (isRich(data as Row)) return rowToProgramCourse(data as Row);
    }
  } catch {
    // ignore — use static fallback
  }
  return fallback;
}
