import { showErrorModal } from './errorService';

export const addToWishlist = async (userId, malId) => {
 try
 {
    if (!userId || userId.length === 0) {
        showErrorModal(' Você precisa estar logado para utilizar a lista de desejos.');
        return;
    }
    const response = await fetch('https://localhost:7281/api/UserWishList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, malId }),
    });
    if (response.ok) {
        showErrorModal('Adicionado na lista com sucesso! Relogue para atualizar a lista.');
    } else {
        showErrorModal('Você já adicionou esse item na lista.');
    }
 } catch (error)
  {
    showErrorModal('Erro de rede')
  }
};
