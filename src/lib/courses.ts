import { supabase as browserClient } from './supabase';

export interface Course {
  id: string;
  slug: string;
  title: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  students: number;
  rating: number;
  tags: string[];
  description: string;
  suitable_for: string[];
  what_you_will_learn: string[];
  what_you_will_get: string[];
  tutor_support: string;
  structure?: {
    design: string[];
    develop: string[];
    deploy: string[];
  };
  tools?: string[];
  price: string;
}

async function getSupabaseClient() {
  if (typeof window === 'undefined') {
    const { createClient: createServerClient } = await import('@/utils/supabase/server');
    return await createServerClient();
  }
  return browserClient;
}


export async function getCourses(): Promise<Course[]> {
  const client = await getSupabaseClient();
  const { data, error } = await client
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
  const client = await getSupabaseClient();
  const { data, error } = await client
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


