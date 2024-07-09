import React, { useEffect, useState } from "react";
import './Components/style.css';
import { AnimeListDefault } from "./Components/AnimeListDefault";
import { AnimeListAction } from "./Components/AnimeListAction";
import { AnimeListTop } from "./Components/AnimeListTop";
import { MangaList } from "./Components/MangaList";
import { AddToList } from "./Components/AddToList";
import { RegisterModal } from "./Components/RegisterModal";
import { RemoveFromList } from "./Components/RemoveFromList";
import { AnimeModal } from "./Components/AnimeModal";
import AnimeListColumn from './Components/AnimeListColumn';
import Login from './Components/Login';
import UserBox from './Components/User';
import Register from './Components/Register';
import { removeWishlist } from './Components/deleteWishlistService';
import _ from 'lodash';

function App() {
  const [search, setSearch] = useState('One Piece');
  const [animeData, setAnimeData] = useState();
  const [animeDataAction, setAnimeDataAction] = useState();
  const [animeDataTop, setAnimeDataTop] = useState();
  const [mangaData, setMangaData] = useState();
  const [animeInfo, setAnimeInfo] = useState();
  const [myAnimeList, setMyAnimeList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [email, setLogin] = useState('');
  const [senha, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [idUser, setIdUser] = useState('');
  const [error, setError] = useState('');
  const [wishlist, setWishlist] = useState([]);

  const addTo = (anime) => {
    const index = myAnimeList.findIndex((myanime) => {
      return myanime.mal_id === anime.mal_id;
    });
    if (index < 0) {
      const newArray = [...myAnimeList, anime];
      setMyAnimeList(newArray);
    }
  };

  const removeFrom = (anime) => {
    const newArray = myAnimeList.filter((myanime) => {
      return myanime.mal_id !== anime.mal_id;
    });
    setMyAnimeList(newArray);
  };

  const fetchWishlist = async (userId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_XD}/api/UserWishList/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        const malIds = data.map(item => item.mal_id);
        const wishlistData = await Promise.all(malIds.map(async (malId) => {
          const animeResponse = await fetch(`https://api.jikan.moe/v4/anime/${malId}`);
          if (animeResponse.ok) {
            const animeData = await animeResponse.json();
            return animeData.data;
          }
          return null;
        }));
        setWishlist(wishlistData.filter(item => item !== null));
      } else {
        console.error('Failed to fetch wishlist:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const handleUserRegister = (userData) => {
    setUser(userData);
    closeModal();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setLogin('');
    setPassword('');
    setWishlist([]);
    setIdUser([]);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_XD}/api/Usuario/Login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, senha: senha }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setUser(data);
        setIdUser(data.id);
        fetchWishlist(data.id);
      } else {
        const errorData = await response.text();
        setError(errorData);
      }
    } catch (error) {
      setError('Erro de rede');
    }
  };

  const getData = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=12`);
    const resData = await res.json();
    const filteredData = resData.data.filter(anime => !anime.genres.some(genre => genre.name.toLowerCase() === 'hentai'));
    if (resData.data.length > 0) {
      setAnimeData(filteredData);
    } else {
      setAnimeData([]);
    }
  };

  const getDataAction = async () => {
    const res = await fetch('https://api.jikan.moe/v4/anime?limit=20');
    const resData = await res.json();
    const filteredData = resData.data.filter(anime => anime.genres.some(genre => genre.name === "Action"));
    if (resData.data.length > 0) {
      setAnimeDataAction(filteredData);
    } else {
      setAnimeDataAction([]);
    }
  };

  const getDataTopAnimes = async () => {
    const res = await fetch('https://api.jikan.moe/v4/top/anime?limit=14');
    const resData = await res.json();
    const filteredData = resData.data.filter(anime => anime.source === 'Manga');
    if (resData.data.length > 0) {
      setAnimeDataTop(filteredData);
    } else {
      setAnimeDataTop([]);
    }
  };

  const getDataManga = async () => {
    const res = await fetch('https://api.jikan.moe/v4/manga?limit=12');
    const resData = await res.json();
    const filteredData = resData.data.filter(anime => anime.type === 'Manga');
    if (resData.data.length > 0) {
      setMangaData(filteredData);
    } else {
      setMangaData([]);
    }
  };

  useEffect(() => {
    const debouncedGet = _.debounce(() => {
      getDataAction();
    }, 200);
    debouncedGet();
    return () => {
      debouncedGet.cancel();
    };
  }, []);

  useEffect(() => {
    const debouncedGet = _.debounce(() => {
      getData();
    }, 2000);
    debouncedGet();
    return () => {
      debouncedGet.cancel();
    };
  }, [search]);

  useEffect(() => {
    const debouncedGet = _.debounce(() => {
    getDataManga();
  }, 200);
  debouncedGet();
  return () => {
    debouncedGet.cancel();
  };
}, []);

  useEffect(() => {
    const debouncedGet = _.debounce(() => {
    getDataTopAnimes();
  }, 200);
  debouncedGet();
  return () => {
    debouncedGet.cancel();
  };
}, []);

  const openModal = (anime) => {
    setAnimeInfo(anime);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };

  return (
    <>
      <div className="header">
        <h1 className="title">Animecatalog</h1>
        <div className="search-box">
          <input
            type="search"
            placeholder="Search anime"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Register openRegisterModal={openRegisterModal} />
        {user ? (
          <UserBox user={user} handleLogout={handleLogout} />
        ) : (
          <Login
            handleLogin={handleLogin}
            email={email}
            setLogin={setLogin}
            senha={senha}
            setPassword={setPassword}
            error={error}
          />
        )}
      </div>

      <div className="container">
        <div className="anime-info-column">
          <h2 className="text-heading-column">List</h2>
          <AnimeListColumn
            animeListColumn={wishlist}
            animeComponent={RemoveFromList}
            handleList={(anime) => removeFrom(anime)}
            openModal={openModal}
            userId={idUser}
            removeWishlist={removeWishlist}
          />
        </div>
        <div className="anime-row">
          <h2 className="text-heading">Your search</h2>
          <div className="row">
            <AnimeListDefault
              animelist={animeData}
              setAnimeInfo={setAnimeInfo}
              animeComponent={AddToList}
              handleList={(anime) => addTo(anime)}
              openModal={openModal}
              userId={idUser}
            />
          </div>
          <h2 className="text-heading">Action</h2>
          <div className="row">
            <AnimeListAction
              animelistAction={animeDataAction}
              setAnimeInfo={setAnimeInfo}
              animeComponent={AddToList}
              handleList={(anime) => addTo(anime)}
              openModal={openModal}
              userId={idUser}
            />
          </div>
          <h2 className="text-heading">On the rise</h2>
          <div className="row">
            <AnimeListTop
              animelistTop={animeDataTop}
              setAnimeInfo={setAnimeInfo}
              animeComponent={AddToList}
              handleList={(anime) => addTo(anime)}
              openModal={openModal}
              userId={idUser}
            />
          </div>
          <h2 className="text-heading">Mangas</h2>
          <div className="row">
            <MangaList
              mangalist={mangaData}
              setMangaInfo={setAnimeInfo}
              animeComponent={AddToList}
              handleList={(anime) => addTo(anime)}
              openModal={openModal}
              userId={idUser}
            />
          </div>
        </div>
      </div>

      <AnimeModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        anime={animeInfo}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onRequestClose={closeRegisterModal}
        onRegister={handleUserRegister}
      />
    </>
  );
}

export default App;