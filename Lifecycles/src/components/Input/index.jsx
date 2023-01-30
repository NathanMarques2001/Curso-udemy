import './styles.css';
import P from 'prop-types';

export const TextInput = ({ searchValue, handleChange }) => (
  <input
    className="text-input"
    type="search"
    onChange={handleChange}
    value={searchValue}
    placeholder="Digite aqui..."
  />
);

TextInput.propTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired,
};
