import { showErrorModal } from './errorService';

export const removeWishlist = async (userId, malId, id) => {
    try
    {
        const response = await fetch(`${process.env.REACT_APP_XD}/api/UserWishList`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, malId, id}),
        });
        if (response.ok) {
            showErrorModal('Removed from list successfully! Login again to update the list');
        } else {
            showErrorModal('It was not possible to remove the item from list. Please, try again later.');
        }
    }catch(error)
    {
      showErrorModal('Network error')
    }

};
