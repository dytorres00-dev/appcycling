# 🚴 TORRES CYCLING - MVP

Aplicación de fidelización para alumnos de indoor cycling de Edwin Torres.

## 🛠️ Setup Local

1. **Clonar el repositorio** e instalar dependencias:
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**:
   Crea un archivo `.env` en la raíz con:
   ```env
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_ANON_KEY=tu_clave_anonima
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

## 🗄️ Configuración de Base de Datos (Supabase)

Para que la aplicación funcione, debes ejecutar el esquema SQL en tu proyecto de Supabase:

1. Ve al **SQL Editor** en el dashboard de Supabase.
2. Copia y pega el contenido del archivo `supabase/schema.sql`.
3. Ejecuta la consulta para crear todas las tablas, restricciones e insignias predefinidas.

### Seed de Datos
Para poblar la base de datos con usuarios de prueba y datos iniciales:
1. Asegúrate de tener la `VITE_SUPABASE_SERVICE_ROLE_KEY` en tu `.env` (esta clave es necesaria para crear usuarios en Auth).
2. Ejecuta:
   ```bash
   npm run seed
   ```

**Credenciales de Prueba:**
- **Admin:** `admin@torrescycling.com` / `Torres2024!`
- **Atletas:** `athlete1@test.com` hasta `athlete5@test.com` / `Test2024!`

## 🚀 Despliegue

Se recomienda desplegar en **Vercel** o **Netlify**:

1. Conecta tu repositorio de GitHub.
2. Configura las variables de entorno (`VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`) en el panel de control del hosting.
3. Comando de build: `npm run build`
4. Directorio de salida: `dist`

## 🎨 Diseño y Estética
- **Colores:** Fondo Negro Profundo (`#0a0a0a`), Acentos Verde Neón (`#84cc16`).
- **Tipografías:** Bebas Neue (Títulos), DM Sans (Cuerpo).
- **Enfoque:** Mobile-first, diseño premium, atlético y minimalista.
