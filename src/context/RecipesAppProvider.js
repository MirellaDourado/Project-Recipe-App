import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';

function RecipesAppProvider({ children }) {
  const [searchInput, setSearchInput] = useState('');
  const [radioInput, setRadioinput] = useState('');
  const [inProgress, setInProgress] = useState([]);
  const [isDisabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const value = useMemo(() => ({
    searchInput,
    setSearchInput,
    radioInput,
    setRadioinput,
    inProgress,
    setInProgress,
    isDisabled,
    setDisabled,
    foods,
    setFoods,
    drinks,
    setDrinks,
    loading,
    setLoading,
  }), [searchInput,
    setSearchInput,
    radioInput,
    setRadioinput, inProgress, isDisabled, foods, drinks, loading]);

  return (
    <RecipesAppContext.Provider value={ value }>
      <div>
        { children }
      </div>
    </RecipesAppContext.Provider>
  );
}
RecipesAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesAppProvider;
