import { useContext } from "react";
import { FavouritesContext, UpdateFavouritesContext } from "../App";
import { DisneyCharacter } from "../disney_character"

interface CharacterProps {
  character : DisneyCharacter
}

// for our props we can reuse the DisneyCharacter interface
// - defining an anonymous type that just has one property - a DisneyCharacter
const Character : React.FC<CharacterProps> = ( { character}) => 
  {
    // Consume
    const characterFavourites = useContext(FavouritesContext);
    const updateFavourites = useContext(UpdateFavouritesContext)

    // default image
    let imageSrc = "https://picsum.photos/300/200/?blur";
    if (character.imageUrl) {
      // strip of API for further images
      imageSrc = ((character.imageUrl.indexOf('/revision') > -1) ? character.imageUrl.substring(0,character.imageUrl.indexOf('/revision')):character.imageUrl);
    };

    function toggleFavouriteForCharacters(characterId : number) {
      if (updateFavourites !== null) {
        if (!characterFavourites.includes(characterId)) {
          // array spread syntax, add CharacterId to CharacterFavourites
          updateFavourites([...characterFavourites,characterId]);
        }
        else {
          // remove CharacterId from CharacterFavourites
          const updateFavs = characterFavourites.filter(item => item !== characterId );
          updateFavourites(updateFavs);
        };
    };
    };

    return (
    <article className="character-item">

      <h2>{character.name}</h2>

      <div className="character-item__actions" onClick={() => toggleFavouriteForCharacters(character._id)}>
        {
        (!characterFavourites.includes(character._id)  ? "Add to Favourites": "Favourited")
        }
      </div>

      <img className="character-item__img" src={imageSrc} alt={character.name} />

    </article>)
  };

export default Character;