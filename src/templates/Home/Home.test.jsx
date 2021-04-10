import {rest} from 'msw';
import {setupServer} from 'msw/node';
import userEvent from '@testing-library/user-event';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import Home from '.';

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', 
    async(req, res, ctx) => {
      return res(
        ctx.json([
          {
            userId: 1,
            id: 1,
            title: 'title1',
            body: 'body1 '
          },
          {
            userId: 2,
            id: 2,
            title: 'title2',
            body: 'body2'
          },
          {
            userId: 3,
            id: 3,
            title: 'title3',
            body: 'body3'
          }
        ]),
     );
  }),
  rest.get('https://jsonplaceholder.typicode.com/photos', 
    async(req, res, ctx) => {
      return res(
        ctx.json([
          {
            url: 'img1.jpg'
          },
          {
            url: 'img2.jpg'
          },
          {
            url: 'img2.jpg'
          }
        ]),
     );
  }),
];

const server = setupServer(...handlers)

describe ('<Home />', () => {
  beforeAll(()=>{
    server.listen();
  });

  afterEach(()=>{
    server.resetHandlers();
  });

  afterAll(()=>{
    server.close();
  });

  it('should render search, posts and load more ', async () => {    
    render(<Home />);
    const notFound = screen.getByText('Not Found');    

    expect.assertions(3);

    await waitForElementToBeRemoved(notFound);

    const search = screen.getByPlaceholderText('Enter your search');
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', {name: /title/i});
    expect(images).toHaveLength(2);

    const button = screen.getByRole('button', {name: /More Posts/i});
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {    
    render(<Home />);
    const notFound = screen.getByText('Not Found');    

    expect.assertions(10);

    await waitForElementToBeRemoved(notFound);

    const search = screen.getByPlaceholderText('Enter your search');
    expect(screen.getByRole('heading', {name: 'title1'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'title2'})).toBeInTheDocument();
    expect(screen.queryByRole('heading', {name: 'title3'})).not.toBeInTheDocument();

    userEvent.type(search,'title1');
    expect(screen.getByRole('heading', {name: 'title1'})).toBeInTheDocument();
    expect(screen.queryByRole('heading', {name: 'title2'})).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', {name: 'title3'})).not.toBeInTheDocument();

    expect(screen.queryByRole('heading', {name: 'Search = title1'})).toBeInTheDocument();

    userEvent.clear(search);
    expect(screen.getByRole('heading', {name: 'title1'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'title2'})).toBeInTheDocument();

    userEvent.type(search,'non-existent postt');
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });

  it('should load more posts when the button is clicked', async () => {    
    render(<Home />);
    const notFound = screen.getByText('Not Found');    

    //expect.assertions(3);

    await waitForElementToBeRemoved(notFound);

    const button = screen.getByRole('button', {name: /More Posts/i});

    userEvent.click(button);
    expect(screen.queryByRole('heading', {name: 'title3'})).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});


