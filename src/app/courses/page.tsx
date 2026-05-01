import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { InputField } from "@/components/ui/InputField";
import { getCourses } from "@/lib/courses/server";


export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 mb-24">
          
          {/* Header */}
          <div className="space-y-4 bg-surface-container p-12 rounded-[3rem]">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-on-surface">Explore Our Courses</h1>
            <p className="text-on-surface-variant max-w-2xl text-lg">Master modern technology with our expert-led courses designed for the next generation of creators.</p>
            <div className="pt-6 max-w-md">
              <InputField placeholder="Search modules..." type="search" />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.slug} {...course} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

