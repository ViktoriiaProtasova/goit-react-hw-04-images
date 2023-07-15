import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    setSearchQuery(value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      toast.error('Oops! Enter a search query.');
      return;
    }

    onSubmit(searchQuery);
    reset();
  };

  const reset = () => {
    setSearchQuery('');
  };

  return (
    <div className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm} id="search-form">
        <input
          type="search"
          name="searchQuery"
          autoComplete="off"
          placeholder="Search images..."
          className={css.SearchFormInput}
          onChange={handleChange}
          value={searchQuery}
        />
        <button type="submit" className={css.SearchFormButton}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  );
};

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;
