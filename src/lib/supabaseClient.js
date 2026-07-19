import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jzhsmnsefgzaqqkpebni.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6aHNtbnNlZmd6YXFxa3BlYm5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0MzU0NTEsImV4cCI6MjEwMDAxMTQ1MX0.uBf6WrdD17oqtk1YyM75Z2xqFxyEMeO3jSU3e-gtu_E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
