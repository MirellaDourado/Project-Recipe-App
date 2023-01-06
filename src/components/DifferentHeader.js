import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { TbArrowNarrowLeft } from 'react-icons/tb';
import { PropTypes } from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import RecipesAppContext from '../context/RecipesAppContext';

function DifferentHeader({ shareClick, favoriteClick, favorited }) {
  const [changeAppearance, setChangeAppearance] = useState(false);
  const history = useHistory();
  const { setLoading } = useContext(RecipesAppContext);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const limite = 410;
      window
        .addEventListener('scroll', () => setChangeAppearance(window
          .scrollY >= limite));
    }
  }, []);

  const handleClick = () => {
    history.goBack();
    setLoading(true);
  };

  return (
    <div
      className={
        `header-dif ${changeAppearance ? 'different-header' : 'commun-header'}`
      }
    >
      <TbArrowNarrowLeft
        className="arrow-left"
        onClick={ handleClick }
      />
      { changeAppearance && (
        <div className="buttons-area">
          <button
            className="fav-btn-header"
            type="button"
            onClick={ favoriteClick }
          >
            <img
              src={ favorited ? blackHeartIcon : whiteHeartIcon }
              alt="Favorite Icon"
            />
          </button>
          <button
            className="share-btn-header"
            type="button"
            onClick={ shareClick }
          >
            <img
              src={ shareIcon }
              alt="Share Icon"
            />
          </button>
        </div>
      )}
    </div>
  );
}

DifferentHeader.propTypes = {
  shareClick: PropTypes.func.isRequired,
  favoriteClick: PropTypes.func.isRequired,
  favorited: PropTypes.bool.isRequired,
};

export default DifferentHeader;
