
import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './components/header';
import CharacterContainer from './components/character_container';
import Navigation from './components/navigation';
import { DisneyCharacter } from './disney_character';
import axios from 'axios';

// Create Context
export const FavouritesContext = React.createContext<number[]>([]);
export const DisplayFavContext = React.createContext<boolean>(true);

// Create Context setCharacterFavourites => 
//  React.Dispatch (so can use value in Provider call)  
//  React.SetStateAction (so can link setCharacterFavourites call to be change with array of numbers + initialised to null) 
export const UpdateFavouritesContext = React.createContext<null | React.Dispatch<React.SetStateAction<Array<number>>>>(null);
export const UpdateDisplayFavContext = React.createContext<null | React.Dispatch<React.SetStateAction<boolean>>>(null);

const App : React.FC = () => {

  const [displayFav, setDisplayFav] = useState<boolean>(true);
  const [characterFavourites, setCharacterFavourites] = useState<Array<number>>([1]);
	const [currentPage, setCurrentPage] = useState<number>(1);
  const [characters, setCharacters] = useState<Array<DisneyCharacter>>([]);

  useEffect(() => {
    getCharacters(1);
  }, []);

  useEffect(() => {
    getCharacters(currentPage);
  }, [currentPage])

  const getCharacters = async (pageNumber: number) => {
    const apiResponse = await axios.get(`https://api.disneyapi.dev/characters?page=${pageNumber}`);
    setCharacters(apiResponse.data.data);
  };

  return (
    // Provide Context of useState characterFavourites
    <FavouritesContext.Provider value={characterFavourites}>
      <UpdateFavouritesContext.Provider value={setCharacterFavourites}>
        <DisplayFavContext.Provider value={displayFav}>
          <UpdateDisplayFavContext.Provider value={setDisplayFav}>
            <div className="page">
              <Header currentPage={currentPage} />
              <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
              <CharacterContainer characters={characters} />
            </div>
          </UpdateDisplayFavContext.Provider>
        </DisplayFavContext.Provider>
      </UpdateFavouritesContext.Provider>
    </FavouritesContext.Provider>
  );
}

export default App;
