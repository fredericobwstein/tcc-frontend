import React from 'react'

export const AddToList = ({addToWishlist, userId, animeContent, showErrorModal}) => {
  return (
    <>
      <button className="mylist" onClick={() => addToWishlist(userId, animeContent, showErrorModal)}>
        <p>Adicionar à lista</p>
      </button>
    </>
  )
}
