import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabaseUrl = process.env.VITE_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function seed() {
  console.log('🚀 Starting database seeding...')

  const users = [
    { email: 'admin@torrescycling.com', password: 'Torres2024!', name: 'Edwin Torres', role: 'admin' },
    { email: 'athlete1@test.com', password: 'Test2024!', name: 'Carlos Mejía', role: 'athlete' },
    { email: 'athlete2@test.com', password: 'Test2024!', name: 'Valentina Ríos', role: 'athlete' },
    { email: 'athlete3@test.com', password: 'Test2024!', name: 'Sebastián López', role: 'athlete' },
    { email: 'athlete4@test.com', password: 'Test2024!', name: 'Mariana Castro', role: 'athlete' },
    { email: 'athlete5@test.com', password: 'Test2024!', name: 'Diego Herrera', role: 'athlete' },
  ]

  for (const user of users) {
    console.log(`Creating user: ${user.email}...`)
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true
    })

    if (authError) {
      console.error(`Error creating auth user ${user.email}:`, authError)
      continue
    }

    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: authUser.user?.id,
        full_name: user.name,
        role: user.role,
        city: 'Cali'
      })

    if (profileError) {
      console.error(`Error creating profile for ${user.email}:`, profileError)
    }
  }

  console.log('✅ Seeding complete!')
}

seed().catch(console.error)
