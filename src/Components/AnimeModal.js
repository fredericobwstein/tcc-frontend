import React from 'react';
import Modal from 'react-modal';

export const AnimeModal = ({ isOpen, onRequestClose, anime }) => {
  if (!anime) return null;

  const { 
    title, 
    synopsis, 
    images: { jpg: { large_image_url } }, 
    source,
    rank,
    score,
    popularity,
    members,
    status,
    rating,
    duration 
  } = anime;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Anime Info"
      className="Modal"
      overlayClassName="Overlay"
    >
      <div className="modal-content">
        <h2>{title}</h2>
        <div className="modal-body">
          <img src={large_image_url} alt={title} className="modal-image" />
          <p className="modal-synopsis">{synopsis}</p>
          <div className="info">
            <h3>#Rank: {rank}</h3>
            <h3>#Score: {score}</h3>
            <h3>#Popularity: {popularity}</h3>
            <hr />
            <br />
            <h4>Members: {members}</h4>
            <h4>Source: {source}</h4>
            <h4>Duration: {duration}</h4>
            <h4>Status: {status}</h4>
            <h4>Rating: {rating}</h4>
          </div>
        </div>
        <button onClick={onRequestClose} className="modal-close-button">Close</button>
      </div>
    </Modal>
  );
};

export default AnimeModal;
