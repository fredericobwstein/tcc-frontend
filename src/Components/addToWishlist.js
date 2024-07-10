import { showErrorModal } from './errorService';

export const addToWishlist = async (userId, malId) => {
 try
 {
    if (!userId || userId.length === 0) {
        showErrorModal('To proceed using the list, you have to login.');
        return;
    }
    const response = await fetch(`${process.env.REACT_APP_XD}/api/UserWishList`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, malId }),
    });
    if (response.ok) {
        showErrorModal('Successfully added on the list! Login again to update the list.');
    } else {
        showErrorModal('You already added this item on the list.');
    }
 } catch (error)
  {
    showErrorModal('Network error')
  }
};
