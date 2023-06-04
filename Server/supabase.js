import supabase from './config/supabaseClient.js';
import { album_arr, songs_arr } from './controller/index.js';

export const insertAlbumsIntoTable = async () => {
  try {
    const { data, error } = await supabase.from("Albums").upsert(album_arr);
    if (error) {
      console.error("Error inserting data into table 1:", error);
    } else {
      console.log("Data inserted into table 1:", data);
    }
  } catch (error) {
    console.error("Error inserting data into table 1:", error);
  }
};

export const insertSongsIntoTable = async () => {
  try {
    const { data, error } = await supabase.from("Songs").upsert(songs_arr);
    if (error) {
      console.error("Error inserting data into table 2:", error);
    } else {
      console.log("Data inserted into table 2:", data);
    }
  } catch (error) {
    console.error("Error inserting data into table 2:", error);
  }
};