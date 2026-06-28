import { notFound } from "next/navigation";
import { getProgramCourseBySlug } from "@/lib/courses/programServer";
import { getCourseBySlug } from "@/lib/courses/server";
import YoungCoderDetails from "./YoungCoderDetails";
import CourseDetailsClient from "./CourseDetailsClient";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Young Coders Program courses are the live catalog (DB-first, static fallback).
  const programCourse = await getProgramCourseBySlug(slug);
  if (programCourse) {
    return <YoungCoderDetails course={programCourse} />;
  }

  // Fall back to any legacy DB-backed course.
  const course = await getCourseBySlug(slug);
  if (!course) {
    notFound();
  }

  return <CourseDetailsClient course={course} />;
}
