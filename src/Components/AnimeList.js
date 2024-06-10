import React from 'react';

export const AnimeList = ({ animelist, setAnimeInfo, animeComponent, handleList, openModal }) => {
  const AddToList = animeComponent;
  return (
    <>
      {
        animelist ? (
          animelist.map((anime, index) => {
            return (
              <div className="card" key={index} onClick={() => {
                  setAnimeInfo(anime);
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
        ) : "Not Found"
      }
    </>
  );
};
