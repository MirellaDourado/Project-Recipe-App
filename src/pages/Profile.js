import React from 'react';
import { useHistory } from 'react-router-dom';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { MdLogout, MdOutlineDownloadDone } from 'react-icons/md';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import '../styles/Profile.css';

function Profile() {
  const history = useHistory();

  const redirectPageDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const redirectPageFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const redirectPageLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  const mail = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="profile-area">
      <Header profileUser goBack>Profile</Header>
      { localStorage.getItem('user') !== null ? (
        <p data-testid="profile-email" className="profile-email">
          { mail.email }
        </p>)
        : null}
      <div className="profile-options">
        <button
          type="button"
          onClick={ redirectPageDoneRecipes }
          data-testid="profile-done-btn"
        >
          <MdOutlineDownloadDone fontSize="40px" color="#fe4900" />
          Done Recipes
        </button>
        <button
          type="button"
          onClick={ redirectPageFavoriteRecipes }
          data-testid="profile-favorite-btn"
        >
          <BsFillSuitHeartFill fontSize="30px" color="#fe4900" />
          Favorite Recipes
        </button>
        <button
          type="button"
          onClick={ redirectPageLogout }
          data-testid="profile-logout-btn"
        >
          <MdLogout fontSize="35px" color="#fe4900" />
          Logout
        </button>
      </div>
      <footer
        className="position-absolute fixed-bottom"
        data-testid="footer"
      >
        <Footer />
      </footer>
    </div>
  );
}

export default Profile;
