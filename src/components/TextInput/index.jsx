import './style.css';
import P from 'prop-types';

export const TextInput = ({ searchValue, handleChange }) => {

    return (
        <input 
            className="text-input"
            onChange={handleChange}
            value={searchValue}
            type="search" 
            placeholder="Enter your search"
        />
    );
}

TextInput.propTypes={
    searchValue: P.string.isRequired,
    handleChange: P.func.isRequired
};