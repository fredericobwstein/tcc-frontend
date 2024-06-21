import React from 'react';

export const AnimeListColumn = ({ animeListColumn, setAnimeInfo, animeComponent, handleList, openModal }) => {
  const AddToList = animeComponent;
  return (
    <>
      {
        animeListColumn && animeListColumn.length > 0 ? (
          animeListColumn.map((anime, index) => {
            return (
              <div className="card-column" key={index} onClick={() => {
                  setAnimeInfo(anime);
                  openModal(anime); 
                }}
              >
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
        ) : <h4>Nenhum anime adicionado.</h4>
      }
    </>
  );
};