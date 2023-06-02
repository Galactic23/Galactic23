import { createClient } from '@supabase/supabase-js'
import { REACT_APP_SUPABASE_URL } from '../env.js';
import { REACT_APP_ANON_KEY } from '../env.js';

const supabaseUrl = REACT_APP_SUPABASE_URL;
const supabaseKey = REACT_APP_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase;

