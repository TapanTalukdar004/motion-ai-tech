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
