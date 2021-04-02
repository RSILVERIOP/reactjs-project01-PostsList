import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button }  from '.';

describe('<Button />', ()=>{

    it('should render the button with the text "More Posts" ',()=>{
        render(<Button text="More Posts"/>);
        expect.assertions(1);        
        expect(screen.getByRole('button', {name:"More Posts"})).toBeInTheDocument();
    });
    
    it('should call function on button click',()=>{
        const fn = jest.fn();        
        render(<Button text="More Posts" onClick={fn}/>);        
        userEvent.click(screen.getByRole('button', {name:"More Posts"}));

        expect(fn).toHaveBeenCalled();        
    });

    it('should be disabled when disabled is true', ()=>{
        render(<Button text="More Posts" disabled={true}/>);
        expect(screen.getByRole('button', {name:"More Posts"})).toBeDisabled();
    });

    it('should be enabled when disabled is false', ()=>{
        render(<Button text="More Posts" disabled={false}/>);
        expect(screen.getByRole('button', {name:"More Posts"})).toBeEnabled();
    });
});