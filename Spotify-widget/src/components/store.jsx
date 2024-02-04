import { configureStore } from '@reduxjs/toolkit'
import { produce } from 'immer'



const initialState = {
  code: '',
  accessToken: '',
  refreshToken: '',
  songName: '',
  artist: [],
  album: '',
  isPlaying: false,
  image: '',
  loggedin: false
}

const keyReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'userInfo':
        draft.accessToken = action.payload.accessToken;
        draft.refreshToken = action.payload.refreshToken;
        draft.code = action.payload.code;
        break
      case 'songName':
        draft.songName = action.payload
        break
      case 'loggedin':
        draft.loggedin = action.payload
        console.log("user logged in");
        break
      case 'songInfo':
        const artistName = action.payload.artist.map((artist) => artist.name)
        draft.songName = action.payload.name
        draft.artist = artistName
        draft.album = action.payload.album
        draft.isPlaying = action.payload.isplaying
        draft.image = action.payload.image[2].url
        break
      default:
        break
    }
  })
}

const store = configureStore({
  reducer: keyReducer,
})

export default store
