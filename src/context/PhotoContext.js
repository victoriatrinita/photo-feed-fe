import React, { useState, createContext, useContext } from "react";

const photoState = {
    photo: {
        "title": "",
        "description": "",
        "year": null,
        "duration": null,
        "genre": "",
        "rating": null,
        "review": "",
        "image_url": ""
    },
    photos: [],
    rating: null,
    year: null,
    genre: null,
}

export const PhotoContext = createContext(photoState);

export const PhotoProvider = ({ children }) => {
  const photo = useState(photoState);
  return (
    <PhotoContext.Provider value={photo}>{children}</PhotoContext.Provider>
  );
};

export const usePhotoContext = () => useContext(PhotoContext);
