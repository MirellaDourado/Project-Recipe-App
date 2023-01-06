import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import '../styles/Recipe.css';

function Recipes({ type }) {
  return (
    <div className="recipes">
      {type === 'meals' ? <Meals /> : <Drinks /> }
      <footer
        className="position-fixed fixed-bottom"
        data-testid="footer"
      >
        <Footer />
      </footer>
    </div>
  );
}

Recipes.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Recipes;
