import React from 'react';
import { addToWishlist } from './addToWishlist';

export const AnimeListAction = ({ animelistAction, setAnimeInfo, animeComponent, handleList, openModal, userId}) => {
  const AddToList = animeComponent;
  return (
    <div className="row">
      {
        animelistAction ? (
          animelistAction.map((anime, index) => {
            return (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
              <div className="card h-100" onClick={() => {
                setAnimeInfo(anime);
                openModal(anime); 
              }}
            >
                <img src={anime.images.jpg.large_image_url} alt="animeImage" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title" >{anime.title}</h5>
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
              </div>
            );
          })
        ) : "Not Found Action"
      }
    </div>
  );
};
