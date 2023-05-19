import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nszfndqwdknnhnqgfkjc.supabase.co';
const supabaseKey = process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zemZuZHF3ZGtubmhucWdma2pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0ODE1NjcsImV4cCI6MjAwMDA1NzU2N30.jIVvTTgfaeyyEDbtkomozPPelDSn4xY3Ig8su-kjGJc;
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

