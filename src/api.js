import axios from "axios";

export const getPhotos = () =>
  axios.get(`https://photo-feed-be.herokuapp.com/`);

export const getPhotosByTag = (tags) =>
  axios.get(`https://photo-feed-be.herokuapp.com/${tags}`);
