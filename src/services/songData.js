import axios from 'axios';

const URL = 'https://66e526da5cc7f9b6273c6a32.mockapi.io';

export const musicApi = {
  getAllSongs: async () => {
    const response = await axios.get(`${URL}/music`);
    return response.data;
  },
  
  addSong: async (songData) => {
    const response = await axios.post(`${URL}/music`, songData);
    return response.data;
  },
  
  deleteSong: async (songId) => {
    const response = await axios.delete(`${URL}/music/${songId}`);
    return response.data;
  },
  
  updateSong: async (songId, songData) => {
    const response = await axios.put(`${URL}/music/${songId}`, songData);
    return response.data;
  }
};

// Add the Google Drive song to your music database
async function addGoogleDriveSong() {
  const songData = {
    songName: 'Time of our lives',
    songArtist: 'Chawki',
    songSrc: 'https://drive.google.com/uc?export=download&id=1eW0_3J_bDfMfhG-yAwXt79V3m-TqarxB', // The direct download link
    songAvatar: 'URL_TO_IMAGE' // Add an image URL if you have one
  };

  try {
    const newSong = await musicApi.addSong(songData);
    console.log('Song added:', newSong);
  } catch (error) {
    console.error('Error adding song:', error);
  }
}

// Run the function to add the song
addGoogleDriveSong();
