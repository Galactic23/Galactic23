import supabase from './config/supabaseClient.js';
import { album_arr, songs_arr } from './controller/index.js';

export const insertAlbumImports = async () => {
  try {
    const { data, error } = await supabase.from("import_album").upsert(album_arr);
    if (error) {
      console.error("Error inserting data into import_album table:", error);
    } else {
      console.log("Data inserted into import_album table:");
    }
  } catch (error) {
    console.error("Error inserting data into import_album table:", error);
  }

  insertAlbums();
  truncateImportAlbum();
};

export const insertSongImports = async () => {
  try {
    const { data, error } = await supabase.from("import_song").upsert(songs_arr);
    if (error) {
      console.error("Error inserting data into import_song table:", error);
    } else {
      console.log("Data inserted into import_song table:");
    }
  } catch (error) {
    console.error("Error inserting data into import_song table:", error);
  }
};

export const truncateImportAlbum = async () => {
  try {
    const { data: truncateResult, error: truncateError } = await supabase
    .rpc('delete', { table_name: 'import_album' });
    if (truncateError) {
      console.error("Error deleting import_album table:", truncateError);
    } else {
      console.log('import_album table truncated')
    }
  } catch (error) {
    console.error("Error deleting import_album table:", error);
  }
};

export const insertAlbums = async () => {
  try {
    // Get the data from the import table
    const { data: importData, error: importError } = await supabase
      .from('import_album')
      .select('id, name, album, cover, genre, artist, release');
    
    if (importError) {
      throw importError;
    }
    
    const {data: existingAlbums, error: existingError} = await supabase
      .from('albums')
      .select('name');
    if (existingError) {
      throw existingError;
    }

    //Filter out existing albums by name
    const newAlbums = importData.filter(
      (row) => !existingAlbums.some((album) => album.name === row.name)
    );

    if (newAlbums.length === 0){
      console.log('No new albums to insert.');
      return;
    }

    // Insert data into the albums table
    const { data: insertResult, error: insertError } = await supabase
      .from('albums')
      .insert(importData, { returning: minimal });
    
    if (insertError) {
      throw insertError;
    }
    
    console.log('${insertResult.length} albums inserted into the albums table.');
  } catch (error) {
    console.error('Error inserting data into albums table:', error);
  }
};