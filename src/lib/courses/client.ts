import { supabase } from '@/lib/supabase';
import { Course } from './types';

export async function getCourses(): Promise<Course[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }

  return data as Course[];
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching course with slug ${slug}:`, error);
    return null;
  }

  return data as Course;
}

