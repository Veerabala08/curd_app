
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_API_URL
// const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey = import.meta.env.VITE_API_KEY

// 1234poiuQWER!
export const supabase = createClient(supabaseUrl, supabaseKey)