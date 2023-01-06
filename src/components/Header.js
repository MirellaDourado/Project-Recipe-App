import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TbArrowNarrowLeft } from 'react-icons/tb';
import iconProfile from '../images/profileIcon.svg';
import RecipesAppContext from '../context/RecipesAppContext';

function Header({ profileUser, children, goBack }) {
  const { setLoading } = useContext(RecipesAppContext);
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
    setLoading(true);
  };
  return (
    <div className="header">
      {goBack && <TbArrowNarrowLeft
        className="arrow-left"
        onClick={ handleClick }
      />}
      <h2 data-testid="page-title">{children}</h2>
      {profileUser && (
        <Link to="/profile">
          <img alt="iconProfile" src={ iconProfile } data-testid="profile-top-btn" />
        </Link>
      )}
    </div>
  );
}

Header.propTypes = {}.isRequired;

export default Header;
