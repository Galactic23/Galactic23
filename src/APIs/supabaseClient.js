import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const insertData = async () => {
    const { data, error } = await supabase
    .from('Albums')
    .insert(album);

    if (error) {
        console.error('Error inserting data:', error);
    }
    else {
        console.log('Data inserted successfully:', data);
    }
};

//insertData();

export default supabase;

