import supabase from './config/supabaseClient.js';
import { album } from './controller/albums.js';
import { songs } from './controller/songs.js';

export const insertAlbumImports = async () => { 
  try {
    let upsertAlbums;
    upsertAlbums = await supabase.from("import_album").upsert(album);
    const { data, error } = upsertAlbums;    

    if (error) {
      console.error("Error inserting data into import_album table:", error);
    } else {
      console.log("Data inserted into import_album table:");
    }
  } catch (error) {
    console.error("Error inserting data into import_album table:", error);
  }

  await insertAlbums();
  await truncateImportAlbum();
};

export const insertSongImports = async () => { 
  try {
    let upsertSongs;
    upsertSongs = await supabase.from("import_song").upsert(songs);
    const { data, error } = upsertSongs;

    if (error) {
      console.error("Error inserting data into import_song table:", error);
    } else {
      console.log("Data inserted into import_song table:");
    }
  } catch (error) {
    console.error("Error inserting data into import_song table:", error);
  }

  await insertSongs();
  await truncateImportSong();
};

export const truncateImportAlbum = async () => {
  try {
    const { data, error: truncateError } = await supabase
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

export const truncateImportSong = async () => {
  try {
    const { data: truncateResult, error: truncateError } = await supabase
    .rpc('delete', { table_name: 'import_song' });
    if (truncateError) {
      console.error("Error deleting import_song table:", truncateError);
    } else {
      console.log('import_song table truncated')
    }
  } catch (error) {
    console.error("Error deleting import_song table:", error);
  }
};

export const insertAlbums = async () => {
  try {
    // Get the data from the import table
    const { data: importData, error: importError } = await supabase
      .from('import_album')
      .select('id, name, album, cover, genre, artist, release').order('id', { ascending: true });
    
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
    /*const { data: insertResult, error: insertError } = await supabase
      .from('albums')
      .insert(importData, { returning: 'minimal' });*/
      const {data: insertResult, error: insertError } = await supabase
      .from('albums')
      .insert(newAlbums.map((row) => ({
        import_album_id: row.id,
        name: row.name,
        album: row.album,
        cover: row.cover,
        genre: row.genre,
        artist: row.artist,
        release: row.release
      })));
    
    //console.log(`import albums inserted into the albums table.`);
  } catch (error) {
    console.error('Error inserting data into albums table:', error);
  }
};

export const insertSongs = async () => {
  try {
    const { data, error: insertError } = await supabase
    .rpc('insert_songs');
    if (insertError) {
      console.error("Error inserting import songs to songs table:", insertError);
    } else {
      console.log('import songs inserted into the songs table.')
    }
  } catch (error) {
    console.error("Error inserting data into songs table:", error);
  }
};