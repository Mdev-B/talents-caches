import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fycpextqshozbsrrwanz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5Y3BleHRxc2hvemJzcnJ3YW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2MDc2OTcsImV4cCI6MjA4OTE4MzY5N30.sg_KSAm--OqJQwwp-_IZMmQG87niJcYS1mrJy5O_ZWk'

export const supabase = createClient(supabaseUrl, supabaseKey)