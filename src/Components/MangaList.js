import React from 'react';

export const MangaList = ({ mangalist, setMangaInfo, animeComponent, handleList, openModal }) => {
  const AddToList = animeComponent;
  return (
    <>
      {
        mangalist ? (
            mangalist.map((anime, index) => {
            return (
              <div className="card" key={index} onClick={() => {
                  setMangaInfo(anime);
                  openModal(anime); 
                }}
              >
                <img src={anime.images.jpg.large_image_url} alt="animeImage" />
                <div className="anime-info">
                  <h4>{anime.title}</h4>
                  <div className="overlay" onClick={(e) => {
                    e.stopPropagation(); 
                    handleList(anime);
                  }}>
                    <AddToList />
                  </div>
                </div>
              </div>
            );
          })
        ) : "Not Found Mangas"
      }
    </>
  );
};
