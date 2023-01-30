import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '.';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/*', async (req, res, ctx) => {
    console.log('ACESSEI A API!');
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
          url: 'img1.jpg',
        },
        {
          userId: 2,
          id: 2,
          title: 'title2',
          body: 'body2',
          url: 'img2.jpg',
        },
      ])
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);

    expect.assertions(3);

    await waitForElementToBeRemoved(screen.getByText('Não encontei nada! =('));

    expect(screen.getByPlaceholderText('Digite aqui...')).toBeInTheDocument();
    expect(screen.getAllByRole('img', { name: /title/i })).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'Carregar mais posts...' })).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);

    expect.assertions(9);

    await waitForElementToBeRemoved(screen.getByText('Não encontei nada! =('));

    //Testa quantos posts tem na tela com o input vazio
    expect(screen.getByPlaceholderText('Digite aqui...')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title2' })).not.toBeInTheDocument();

    //Testa quantos posts tem na tela com o valor title2 no input
    userEvent.type(screen.getByPlaceholderText('Digite aqui...'), 'title2');
    expect(screen.queryByRole('heading', { name: 'title1' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();

    //Testa quantos posts tem na tela quando limpa o input
    userEvent.clear(screen.getByPlaceholderText('Digite aqui...'));
    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title2' })).not.toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Buscar por:' })).toBeInTheDocument();

    userEvent.type(screen.getByPlaceholderText('Digite aqui...'), 'blabla');
    expect(screen.getByText('Não encontei nada! =(')).toBeInTheDocument();
  });

  it('should load more posts when button is pressed', async () => {
    render(<Home />);

    expect.assertions(3);

    await waitForElementToBeRemoved(screen.getByText('Não encontei nada! =('));

    expect(screen.getByRole('button', { name: 'Carregar mais posts...' })).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Carregar mais posts...' }));
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Carregar mais posts...' })).toBeDisabled();
  });
});
