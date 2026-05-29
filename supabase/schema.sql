-- Perfiles de usuario
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  full_name TEXT NOT NULL,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  weight_kg DECIMAL,
  height_cm DECIMAL,
  birth_date DATE,
  city TEXT DEFAULT 'Cali',
  role TEXT DEFAULT 'athlete' CHECK (role IN ('athlete', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clases disponibles
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  location TEXT,
  qr_code TEXT UNIQUE,
  max_capacity INTEGER DEFAULT 30,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Asistencia a clases
CREATE TABLE attendances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  class_id UUID REFERENCES classes(id),
  checked_in_at TIMESTAMPTZ DEFAULT NOW(),
  calories_burned INTEGER,
  effort_level INTEGER CHECK (effort_level BETWEEN 1 AND 5),
  mood INTEGER CHECK (mood BETWEEN 1 AND 5),
  notes TEXT,
  UNIQUE(user_id, class_id)
);

-- Metas personales
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  type TEXT CHECK (type IN ('attendance', 'body', 'performance', 'habit')),
  title TEXT NOT NULL,
  description TEXT,
  target_value DECIMAL NOT NULL,
  current_value DECIMAL DEFAULT 0,
  unit TEXT,
  deadline DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insignias / logros
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  condition_type TEXT,
  condition_value INTEGER
);

-- Insignias ganadas por usuarios
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  badge_id UUID REFERENCES badges(id),
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Feed de comunidad
CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  content TEXT NOT NULL,
  image_url TEXT,
  post_type TEXT DEFAULT 'general' CHECK (post_type IN ('general', 'achievement', 'milestone', 'coach_message')),
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Likes del feed
CREATE TABLE post_likes (
  user_id UUID REFERENCES profiles(id),
  post_id UUID REFERENCES community_posts(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

-- Check-in diario de bienestar
CREATE TABLE wellness_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  date DATE DEFAULT CURRENT_DATE,
  energy_level INTEGER CHECK (energy_level BETWEEN 1 AND 5),
  sleep_hours DECIMAL,
  water_liters DECIMAL,
  steps INTEGER,
  notes TEXT,
  UNIQUE(user_id, date)
);

-- Rachas de asistencia
CREATE TABLE streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) UNIQUE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_class_date DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert badges
INSERT INTO badges (slug, name, description, icon, condition_type, condition_value) VALUES
('first_class', 'Primera Clase', 'Completaste tu primera clase', '🚴', 'total_classes', 1),
('ten_classes', '10 Clases', 'Diez clases completadas', '🔥', 'total_classes', 10),
('twenty_five_classes', '25 Clases', 'Veinticinco clases completadas', '⚡', 'total_classes', 25),
('fifty_classes', '50 Clases', 'Cincuenta clases — leyenda', '👑', 'total_classes', 50),
('streak_week', 'Racha Semanal', '7 días consecutivos de actividad', '📅', 'streak_days', 7),
('streak_month', 'Racha Mensual', '30 días consecutivos', '🏆', 'streak_days', 30),
('early_bird', 'Madrugador', 'Asististe a 5 clases antes de las 7am', '🌅', 'early_classes', 5),
('community_star', 'Estrella Comunidad', 'Publicaste 10 veces en el feed', '⭐', 'posts_count', 10);
