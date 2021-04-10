import { render, screen } from '@testing-library/react';
import { Posts }  from '.';
import { postPropsMock } from './mock';

const props = postPropsMock;

describe('<Posts />',()=>{
    it('should render Posts correctly',()=>{
        render(<Posts {...props}/>);

        expect(screen.getAllByRole('heading', {name: /title/i}))
         .toHaveLength(3);

         expect(screen.getAllByRole('img', {src: /png/i}))
         .toHaveLength(3); 

         expect(screen.getAllByText(/body/i))
         .toHaveLength(3);
    });    

    it('should not render Posts',()=>{
        render(<Posts />);

        expect(screen.queryByRole('heading', {name: /title/i}))
            .not.toBeInTheDocument();
         
    });  
});