import React, { useEffect, useState } from "react";
import './Components/style.css';
import { AnimeListDefault } from "./Components/AnimeListDefault";
import { AnimeListAction } from "./Components/AnimeListAction";
import { AnimeListRomance } from "./Components/AnimeListRomance";
import { AddToList } from "./Components/AddToList";
import { RemoveFromList } from "./Components/RemoveFromList";
import { AnimeModal } from "./Components/AnimeModal";
import { AnimeListColumn } from "./Components/AnimeListColumn";

function App() {
  const [search, setSearch] = useState('One Piece');
  const [animeData, setAnimeData] = useState();
  const [animeDataAction, setAnimeDataAction] = useState();
  const [animeDataRomance, setAnimeDataRomance] = useState();
  const [animeInfo, setAnimeInfo] = useState();
  const [myAnimeList, setMyAnimeList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [email, setLogin] = useState('');
  const [senha, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const addTo = (anime) => {
    const index = myAnimeList.findIndex((myanime) => {
      return myanime.mal_id === anime.mal_id;
    });
    if (index < 0) {
      const newArray = [...myAnimeList, anime];
      setMyAnimeList(newArray);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try{
    const response = await fetch('https://localhost:7281/api/Usuario/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        senha: senha,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token); 
      setUser(data); 
    } else {
      const errorData = await response.text();
      setError('Email ou senha inválidos: ');
    }
  } catch (error) {
    setError('Erro de rede: ');
  }
 }

 const handleLogout = () => {
  localStorage.removeItem('token');
  setUser(null); 
  setLogin(''); 
  setPassword(''); 
};

  const removeFrom = (anime) => {
    const newArray = myAnimeList.filter((myanime) => {  
      return myanime.mal_id !== anime.mal_id;
    });
    setMyAnimeList(newArray);
  };

  const getData = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=25`);
    const resData = await res.json();
    const filteredData = resData.data.filter(anime => 
    !anime.genres.some(genre => genre.name.toLowerCase() === 'hentai')
    ); 
    if(resData.data.length > 0) {
      setAnimeData(filteredData);
    } else{
      setAnimeData([])
    } 
  };

  const getDataAction = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?limit=25`);
    const resData = await res.json();
    const filteredData = resData.data.filter(anime =>
      anime.genres.some(genre => genre.name === "Action")
    );
    if (resData.data.length > 0) {
      setAnimeDataAction(filteredData);
    } else {
      setAnimeDataAction([]);
    }
  };

  const getDataRomance = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?limit=25`);
    const resData = await res.json();
    const filteredData = resData.data.filter(anime => 
      anime.genres.some(genre => genre.name === "Romance")
    );
    if(resData.data.length > 0) {
      setAnimeDataRomance(filteredData);
    } else {
      setAnimeDataRomance ([]);
    }
  }

useEffect(() => {
  getDataRomance();
}, []);

  useEffect(() => {
    getDataAction();
  },[]);

  useEffect(() => {
    getData();
  }, [search]);

  const openModal = (anime) => {
    setAnimeInfo(anime);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className="header">
        <h1>Animecatalog</h1>
        <div className="search-box">
          <input
            type="search"
            placeholder="Pesquisar obra"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {user ? (
        <div className="user-box">
          <h2>Olá, {user.nome}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="login-container">
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setLogin(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Entrar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </div>
      )}
      </div>

      <div className="container">
        <div className="anime-info-column">
          <h2 className="text-heading-column">Lista</h2>
            <AnimeListColumn
              animeListColumn={myAnimeList}
              setAnimeInfo={setAnimeInfo}
              animeComponent={RemoveFromList}
              handleList={(anime) => removeFrom(anime)}
              openModal={openModal} 
            />
        </div>
        <div className="anime-row">
          <h2 className="text-heading">Obras</h2>
          <div className="row">
            <AnimeListDefault
              animelist={animeData}
              setAnimeInfo={setAnimeInfo}
              animeComponent={AddToList}
              handleList={(anime) => addTo(anime)}
              openModal={openModal} 
            />
          </div>
          <h2 className="text-heading">Ação</h2>
          <div className="row">
              <AnimeListAction
              animelistAction={animeDataAction}
              setAnimeInfo={setAnimeInfo}
              animeComponent={AddToList}
              handleList={(anime) => addTo(anime)}
              openModal={openModal} 
            />
          </div>
          <h2 className="text-heading">Drama</h2>
          <div className="row">
              <AnimeListRomance
              animelistRomance={animeDataRomance}
              setAnimeInfo={setAnimeInfo}
              animeComponent={AddToList}
              handleList={(anime) => addTo(anime)}
              openModal={openModal} 
              />
          </div>
        </div>
      </div>
      
      <AnimeModal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        anime={animeInfo} 
      />

    </>
  );
}

export default App;
