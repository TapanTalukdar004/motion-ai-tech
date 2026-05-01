import { getCourseBySlug } from "@/lib/courses/server";

import { notFound } from "next/navigation";
import CourseDetailsClient from "./CourseDetailsClient";

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return <CourseDetailsClient course={course} />;
}
