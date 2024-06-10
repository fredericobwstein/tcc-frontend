import React, { useEffect, useState } from "react";
import './Components/style.css';
import { AnimeList } from "./Components/AnimeList";
import { AddToList } from "./Components/AddToList";
import { RemoveFromList } from "./Components/RemoveFromList";
import { AnimeModal } from "./Components/AnimeModal";
import { AnimeListColumn } from "./Components/AnimeListColumn";

function App() {
  const [search, setSearch] = useState('One Piece');
  const [animeData, setAnimeData] = useState();
  const [animeInfo, setAnimeInfo] = useState();
  const [myAnimeList, setMyAnimeList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const getData = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=20`);
    const resData = await res.json();
    setAnimeData(resData.data);
  };

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
            <AnimeList
              animelist={animeData}
              setAnimeInfo={setAnimeInfo}
              animeComponent={AddToList}
              handleList={(anime) => addTo(anime)}
              openModal={openModal} 
            />
          </div>
          <h2 className="text-heading">Populares</h2>
          <div className="row">
            <AnimeList
              animelist={animeData}
              setAnimeInfo={setAnimeInfo}
              animeComponent={AddToList}
              handleList={(anime) => addTo(anime)}
              openModal={openModal} 
            />
          </div>
          <h2 className="text-heading">Drama</h2>
          <div className="row">
            <AnimeList
              animelist={animeData}
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
