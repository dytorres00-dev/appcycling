export type UserRole = 'athlete' | 'admin';

export interface Profile {
  id: string;
  full_name: string;
  username?: string;
  avatar_url?: string;
  bio?: string;
  weight_kg?: number;
  height_cm?: number;
  birth_date?: string;
  city?: string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}

export interface Class {
  id: string;
  title: string;
  scheduled_at: string;
  duration_minutes: number;
  location: string;
  qr_code: string;
  max_capacity: number;
  created_by: string;
  created_at?: string;
}

export interface Attendance {
  id: string;
  user_id: string;
  class_id: string;
  checked_in_at: string;
  calories_burned?: number;
  effort_level: number;
  mood: number;
  notes?: string;
}

export interface Goal {
  id: string;
  user_id: string;
  type: 'attendance' | 'body' | 'performance' | 'habit';
  title: string;
  description?: string;
  target_value: number;
  current_value: number;
  unit: string;
  deadline?: string;
  status: 'active' | 'completed' | 'paused';
  created_at?: string;
}

export interface Badge {
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon: string;
  condition_type: string;
  condition_value: number;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
}

export interface CommunityPost {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  post_type: 'general' | 'achievement' | 'milestone' | 'coach_message';
  likes_count: number;
  created_at: string;
}

export interface WellnessCheckin {
  id: string;
  user_id: string;
  date: string;
  energy_level: number;
  sleep_hours: number;
  water_liters: number;
  steps: number;
  notes?: string;
}

export interface Streak {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_class_date?: string;
  updated_at?: string;
}
