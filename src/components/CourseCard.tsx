import React from "react";
import Link from "next/link";
import { Clock, Users, Star, GraduationCap, BarChart3, Sparkles } from "lucide-react";
import { Button } from "./ui/Button";

interface CourseCardProps {
  slug: string;
  title: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  students: number;
  rating: number;
  tags: string[];
  // Young Coders extras (optional — DB courses won't have these)
  level?: string;
  ageGroup?: string;
  isNew?: boolean;
}

export function CourseCard({
  slug,
  title,
  instructor,
  thumbnail,
  duration,
  students,
  rating,
  tags,
  level,
  ageGroup,
  isNew,
}: CourseCardProps) {
  // Honest meta for brand-new courses (no fabricated ratings / student counts).
  const showHonestMeta = Boolean(level || ageGroup);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-surface-container-lowest transition-all hover:bg-secondary-container/5 hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-surface-container">
        <img
          src={thumbnail}
          alt={title}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        {isNew && (
          <span className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-on-primary shadow-lg">
            <Sparkles className="w-3 h-3" />
            New
          </span>
        )}
        <div className="absolute top-4 right-4 flex gap-2">
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-on-surface"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 z-10">
        <div className="mb-4">
          <h3 className="font-heading font-bold text-xl text-on-surface line-clamp-2">
            {title}
          </h3>
          <p className="text-sm font-medium text-on-surface-variant mt-2">
            by {instructor}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs font-medium text-on-surface-variant mt-auto mb-6 flex-wrap">
          {showHonestMeta ? (
            <>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-tertiary" />
                <span>{duration}</span>
              </div>
              {level && (
                <div className="flex items-center gap-1">
                  <BarChart3 className="w-4 h-4 text-tertiary" />
                  <span>{level.split("·")[0].trim()}</span>
                </div>
              )}
              {ageGroup && (
                <div className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4 text-tertiary" />
                  <span>{ageGroup.split("·")[0].trim()}</span>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-tertiary" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-tertiary" />
                <span>{students.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-secondary-container fill-secondary-container" />
                <span>{rating}</span>
              </div>
            </>
          )}
        </div>

        {/* Action */}
        <Link href={`/courses/${slug}`} className="w-full">
          <Button variant="outline" className="w-full justify-center">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
