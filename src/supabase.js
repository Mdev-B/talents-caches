import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fycpextqshozbsrrwanz.supabase.co'
const supabaseKey ='sb_publishable_EPDwC-2nK1WlMQK3O-xXaw_U-paWlMS'

export const supabase = createClient(supabaseUrl, supabaseKey)