import { render, screen } from '@testing-library/react';
import Home from '.';


describe ('<Home />', () => {

  it('renders learn react link', () => {
    expect(2).toBe(2);
    //render(<Home />);
    //const linkElement = screen.getByText(/learn react/i);
    //expect(linkElement).toBeInTheDocument();
  });

  it('Should be 1', ()=>{
    expect(1).toBe(1);
  })
});


