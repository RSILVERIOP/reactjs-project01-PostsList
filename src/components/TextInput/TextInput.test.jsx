import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput }  from '.';

describe('<TextInput />', ()=>{

    it('should have a value of searchValue', ()=>{
        const fn = jest.fn();
        render(<TextInput searchValue={'testing'} handleChange={fn}/>);
        const input = screen.getByPlaceholderText('Enter your search');
        expect(input).toHaveAttribute('value','testing');
    });

    it('should call handleChange function on each key pressed', ()=>{
        const fn = jest.fn();
        render(<TextInput handleChange={fn}/>);

        const input = screen.getByPlaceholderText('Enter your search');
        const search = 'Search';
        userEvent.type(input, search);

        expect(input.value).toBe(search);
        expect(fn).toHaveBeenCalledTimes(search.length);
    });

});