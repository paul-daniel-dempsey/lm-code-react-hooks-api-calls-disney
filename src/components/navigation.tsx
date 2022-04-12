
// our props have two properties - a number, and a function that takes a number and returns void

import { useContext, useEffect } from "react";
import { DisplayFavContext, UpdateDisplayFavContext } from "../App";

// we can define this as an interface, or anonymously like this:
const Navigation : React.FC<{ currentPage: number, setCurrentPage: (page: number) => void }> 
	= ({ currentPage, setCurrentPage }) => 
	{

    // Consume
    let displayFav = useContext(DisplayFavContext);
    const updateDisplayFav = useContext(UpdateDisplayFavContext)

    const nextPage = () => {
        const newPageNumber = currentPage + 1;
        setCurrentPage(newPageNumber);
    }

    const prevPage = () => {
        if (currentPage > 1) {
            const newPageNumber = currentPage - 1;
            setCurrentPage(newPageNumber);
        }
    }

    const favPage = () => {
        if (updateDisplayFav != null) {
            updateDisplayFav(!displayFav);
            if (displayFav) {setCurrentPage(1);}
        }
    }

    return (
        <div className="navigation">
            <div className="navigation__item">
                <button className="navigation__button" onClick={prevPage}>Prev Page</button>
            </div>
            <div className="navigation__item">
                <button className="navigation__button" onClick={favPage}>{(displayFav ? "Show All":"Show Favourites")}</button>
            </div>
            <div className="navigation__item">
                <button className="navigation__button" onClick={nextPage}>Next Page</button>
            </div>
        </div>

    )
}

export default Navigation;