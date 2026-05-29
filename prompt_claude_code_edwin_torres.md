# Prompt para Claude Code — MVP App Edwin Torres Indoor Cycling

---

## CONTEXTO DEL PROYECTO

Construye una aplicación web móvil-first llamada **TORRES CYCLING** para Edwin Torres,
coach de indoor cycling en Cali, Colombia. El objetivo principal es fidelización de
alumnos: que se sientan parte de una comunidad, vean su progreso y mantengan adherencia
al entrenamiento a largo plazo.

---

## STACK TECNOLÓGICO

- **Frontend:** React + Vite + TypeScript
- **Estilos:** Tailwind CSS v3
- **Animaciones:** Framer Motion
- **Base de datos y auth:** Supabase (auth + PostgreSQL + realtime)
- **Routing:** React Router v6
- **Estado global:** Zustand
- **Gráficas y métricas:** Recharts
- **Íconos:** Lucide React
- **Fechas:** date-fns
- **QR scanner:** html5-qrcode (para escanear QR en clase)
- **Confetti/celebraciones:** canvas-confetti
- **Bicicleta animada SVG:** implementada a mano con CSS animations o Lottie

---

## PALETA DE COLORES Y DISEÑO

```css
--bg-primary: #0a0a0a;        /* Negro profundo — fondo principal */
--bg-secondary: #111111;      /* Negro suave — cards y paneles */
--bg-tertiary: #1a1a1a;       /* Negro medio — inputs y elementos */
--text-primary: #ffffff;       /* Blanco puro — títulos */
--text-secondary: #a3a3a3;    /* Gris claro — subtítulos */
--text-muted: #525252;        /* Gris oscuro — placeholder */
--green-neon: #84cc16;        /* Verde limón — CTA, highlights, progreso */
--green-dark: #166534;        /* Verde oscuro — badges, fondos de éxito */
--green-mid: #4ade80;         /* Verde medio — iconos activos */
--border: #262626;            /* Borde sutil */
--danger: #ef4444;            /* Rojo — alertas */
```

**Tipografía:**
- Display/títulos: `Bebas Neue` (Google Fonts) — energía, fuerza
- Cuerpo: `DM Sans` (Google Fonts) — limpio, moderno, legible
- Monospace/números: `JetBrains Mono` — métricas y estadísticas

**Estética:** Dark luxury fitness. Fondo negro con detalles verde neón y limón.
Sin gradientes pastel, sin bordes redondeados excesivos. Sharp, premium, atlético.

---

## ESTRUCTURA DE LA BASE DE DATOS (Supabase)

Crea las siguientes tablas con Row Level Security habilitado:

```sql
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
```

**Inserta badges predefinidos:**
```sql
INSERT INTO badges (slug, name, description, icon, condition_type, condition_value) VALUES
('first_class', 'Primera Clase', 'Completaste tu primera clase', '🚴', 'total_classes', 1),
('ten_classes', '10 Clases', 'Diez clases completadas', '🔥', 'total_classes', 10),
('twenty_five_classes', '25 Clases', 'Veinticinco clases completadas', '⚡', 'total_classes', 25),
('fifty_classes', '50 Clases', 'Cincuenta clases — leyenda', '👑', 'total_classes', 50),
('streak_week', 'Racha Semanal', '7 días consecutivos de actividad', '📅', 'streak_days', 7),
('streak_month', 'Racha Mensual', '30 días consecutivos', '🏆', 'streak_days', 30),
('early_bird', 'Madrugador', 'Asististe a 5 clases antes de las 7am', '🌅', 'early_classes', 5),
('community_star', 'Estrella Comunidad', 'Publicaste 10 veces en el feed', '⭐', 'posts_count', 10);
```

**Inserta clases de ejemplo para las próximas 2 semanas:**
```sql
-- Genera 14 clases con horarios variados (6am, 7am, 12pm, 6pm, 7pm)
-- En distintos gymnasios de Cali: Smart Fit, BodyTech, Spinning Center
```

---

## USUARIO ADMIN POR DEFECTO

Crea un script `seed.ts` que al ejecutarse genere:

```
Email: admin@torrescycling.com
Password: Torres2024!
Nombre: Edwin Torres
Role: admin
```

Y 5 usuarios atletas de prueba:
```
athlete1@test.com / Test2024! — Carlos Mejía
athlete2@test.com / Test2024! — Valentina Ríos  
athlete3@test.com / Test2024! — Sebastián López
athlete4@test.com / Test2024! — Mariana Castro
athlete5@test.com / Test2024! — Diego Herrera
```

Con historial de asistencias, metas activas y rachas variadas para demostrar
todos los estados del sistema (estrella, constante, en pausa, en riesgo).

---

## PANTALLAS DEL PANEL DE USUARIO (MVP)

### 1. AUTH — Login / Registro
- Pantalla full-screen con logo animado TORRES CYCLING
- Bicicleta SVG animada al centro que pedalea en loop (CSS keyframes)
- Campos de email y contraseña con diseño dark premium
- Botón verde neón con hover effect
- Link a registro con campos: nombre, email, contraseña

### 2. HOME / DASHBOARD
**Elemento hero:**
- Saludo personalizado: "Bienvenido de vuelta, Carlos 🔥"
- Card principal con **bicicleta animada** que acelera según la racha actual del usuario
- Velocidad de pedaleo de la bicicleta = proporcional a la racha (0 semanas = lento, 4+ semanas = rápido)

**Cards de estadísticas rápidas (grid 2x2):**
- Total de clases (con número grande en Bebas Neue + verde neón)
- Racha actual en semanas
- Meta más cercana con barra de progreso circular
- Posición en ranking mensual

**Sección "Próxima clase":**
- Tarjeta con la siguiente clase programada por Edwin
- Countdown timer animado (días, horas, minutos)
- Nombre del gimnasio y horario

**Sección "Mi semana":**
- Mini calendario de 7 días con puntos verdes en días con clase
- Días restantes para cumplir meta semanal

### 3. MI PROGRESO
**Tabs:** Asistencia | Metas | Cuerpo | Bienestar

**Tab Asistencia:**
- Gráfico de barras (Recharts) — clases por mes, últimos 6 meses
- Número total de clases en grande (animado con counter-up al cargar)
- Historial de últimas 10 clases con fecha, gimnasio, esfuerzo (1-5 estrellas) y ánimo

**Tab Metas:**
- Tarjetas de metas activas con:
  - Barra de progreso animada (Framer Motion)
  - Porcentaje completado
  - Días restantes
  - Botón "Actualizar progreso" para metas corporales
- Botón "Nueva meta" con modal para crear objetivo
- Metas completadas con confetti al alcanzarlas (canvas-confetti)

**Tab Cuerpo:**
- Formulario de registro semanal: peso, medidas, % grasa (opcional)
- Gráfico de línea (Recharts) con evolución en el tiempo
- Nota: "Estos datos son solo visibles para ti"

**Tab Bienestar:**
- Check-in diario: energía (1-5), horas de sueño, vasos de agua, pasos
- Tarjetas con iconos animados para cada métrica
- Resumen de la semana en gráfico radar (Recharts)

### 4. COMUNIDAD
- Feed vertical tipo Instagram/Twitter con posts de la comunidad
- Card especial con borde verde para mensajes del coach Edwin
- Botón "+" para crear post con texto o foto
- Likes con animación de corazón
- Sección "Logros recientes" — últimas insignias ganadas por cualquier miembro
- Ranking semanal top 5 con podio visual (1°, 2°, 3°)

### 5. MIS LOGROS
- Grid de insignias ganadas (iluminadas en verde neón) y bloqueadas (grises, con candado)
- Al tocar una insignia bloqueada: modal que explica cómo desbloquearla
- Al ganar una nueva: animación de desbloqueo con partículas y confetti
- Número de clases hasta la próxima insignia con barra de progreso
- Racha actual con visualización de llama (🔥) que crece según días consecutivos

### 6. CHECK-IN QR
- Botón grande en la bottom nav o en home: "Registrar clase"
- Abre cámara con html5-qrcode para escanear QR que Edwin muestra al final de clase
- Tras escanear: modal de post-clase
  - ¿Cómo te sentiste? (esfuerzo 1-5 y ánimo 1-5)
  - Notas opcionales
  - Botón confirmar → actualiza asistencia, racha e insignias automáticamente
  - Animación de celebración si completa meta semanal o gana insignia

### 7. PERFIL
- Avatar con iniciales o foto
- Nombre, ciudad, bio corta
- Estadísticas: total clases, racha máxima, metas completadas
- Editar perfil
- Insignias ganadas (preview)
- Cerrar sesión

---

## NAVEGACIÓN

Bottom navigation bar con 5 íconos (Lucide):
- 🏠 Home
- 📊 Progreso  
- 👥 Comunidad
- 🏆 Logros
- 👤 Perfil

Indicador activo: punto verde neón bajo el ícono seleccionado.

---

## ELEMENTOS VISUALES Y DINÁMICOS OBLIGATORIOS

1. **Bicicleta animada SVG** en el Home — pedaleo en loop, velocidad según racha
2. **Counter-up animado** en todos los números grandes al cargar la pantalla
3. **Barras de progreso** con animación de llenado (Framer Motion spring)
4. **Confetti** al completar una meta o ganar una insignia (canvas-confetti)
5. **Shimmer skeleton loading** en todas las cards mientras carga Supabase
6. **Haptic-like feedback visual** — micro-bounce en botones al presionar
7. **Countdown timer** en la próxima clase con flip animation
8. **Gráficos interactivos** con tooltip personalizado en verde neón (Recharts)
9. **Toast notifications** dark con borde verde para éxitos
10. **Transiciones de pantalla** suaves con Framer Motion (slide + fade)

---

## ARQUITECTURA DE ARCHIVOS

```
src/
├── components/
│   ├── ui/           # Button, Card, Badge, Modal, Toast, Skeleton
│   ├── charts/       # AttendanceChart, ProgressChart, WellnessRadar
│   ├── bike/         # AnimatedBike.tsx — bicicleta SVG animada
│   └── layout/       # BottomNav, PageTransition
├── pages/
│   ├── Auth/         # Login, Register
│   ├── Home/         # Dashboard principal
│   ├── Progress/     # Progreso con tabs
│   ├── Community/    # Feed y ranking
│   ├── Achievements/ # Insignias y logros
│   ├── CheckIn/      # Scanner QR
│   └── Profile/      # Perfil de usuario
├── hooks/
│   ├── useAuth.ts
│   ├── useAttendance.ts
│   ├── useGoals.ts
│   ├── useStreak.ts
│   └── useBadges.ts
├── lib/
│   ├── supabase.ts   # Cliente Supabase
│   └── utils.ts
├── store/
│   └── useStore.ts   # Zustand store global
└── types/
    └── index.ts      # Tipos TypeScript de todas las entidades
```

---

## INSTRUCCIONES ADICIONALES

- La app debe ser **mobile-first** con max-width de 430px centrado en desktop
- Usa `env(safe-area-inset-bottom)` para el bottom nav en iOS
- Implementa **optimistic updates** en likes y check-ins para UX fluida
- El archivo `.env.example` debe tener `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`
- Incluye `README.md` con instrucciones de setup, seed de base de datos y credenciales de prueba
- Toda la UI en **español**
- Maneja estados de carga, error y vacío en cada sección

---

## ORDEN DE IMPLEMENTACIÓN SUGERIDO

1. Setup Vite + React + TS + Tailwind + Supabase
2. Schema SQL completo en Supabase + seed de datos
3. Auth (login/registro) con la bicicleta animada
4. Bottom navigation + routing
5. Home/Dashboard con bicicleta dinámica y stats
6. Mi Progreso (tabs completos)
7. Comunidad (feed + ranking)
8. Mis Logros (grid de insignias)
9. Check-in QR
10. Perfil
11. Polish: animaciones, transiciones, loading states

---

*App para Edwin Torres — @edwintorres_entrenador — Cali, Colombia*
