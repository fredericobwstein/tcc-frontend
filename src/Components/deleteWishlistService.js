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
            showErrorModal('Removido da lista com sucesso! Relogue para atualizar a lista');
        } else {
            showErrorModal('Não foi possível remover o item da lista. Por favor, tente novamente mais tarde.');
        }
    }catch(error)
    {
      showErrorModal('Erro de rede')
    }

};
