import React from 'react';
import { addToWishlist } from './addToWishlist';

export const AnimeListTop = ({ animelistTop, setAnimeInfo, animeComponent, handleList, openModal, userId}) => {
  const AddToList = animeComponent;
  return (
    <>
      {
        animelistTop ? (
          animelistTop.map((anime, index) => {
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
                    <AddToList
                    animeContent ={anime.mal_id}
                    userId = {userId}
                    addToWishlist = {addToWishlist}
                    />    
                    </div>
                </div>
              </div>
            );
          })
        ) : "Not Found Top Animes"
      }
    </>
  );
};
