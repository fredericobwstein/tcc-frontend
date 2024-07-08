import React from 'react';

const AnimeListColumn = ({ animeListColumn, setAnimeInfo, animeComponent, handleList, openModal, userId, removeWishlist}) => {
    const RemoveFromList = animeComponent;

    return (
        <div className="anime-list-column">
            {animeListColumn.map((anime, index) => (
                <div key={index} className="anime-item">
                    <div className="anime-details" onClick={() => openModal(anime)}>
                        <h3>{anime.title}</h3>
                    </div>
                    <button className="minimal-button remove-button" onClick={() => {
                        removeWishlist(userId, anime.mal_id);
                        handleList(anime);
                    }}>❌</button>
                    <RemoveFromList />
                </div>
            ))}
        </div>
    );
};

export default AnimeListColumn;
