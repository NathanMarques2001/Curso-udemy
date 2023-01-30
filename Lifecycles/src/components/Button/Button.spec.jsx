import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '.';

describe('<Button />', () => {
  it('should render the button with the text "Carregar mais posts..."', () => {
    const fn = jest.fn();
    render(<Button text="Carregar mais posts..." disabled={false} onClick={fn} />);

    expect.assertions(1);

    expect(screen.getByRole('button', { name: /carregar mais posts.../i })).toBeInTheDocument();
  });

  it('should call function on button click', () => {
    const fn = jest.fn();
    render(<Button text="Carregar mais posts..." onClick={fn} />);

    userEvent.click(screen.getByRole('button', { name: /carregar mais posts.../i }));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled is true', () => {
    const fn = jest.fn();
    render(<Button text="Carregar mais posts..." disabled={true} onClick={fn} />);

    expect(screen.getByRole('button', { name: /carregar mais posts.../i })).toBeDisabled();
  });

  it('should be enabled when disabled is false', () => {
    const fn = jest.fn();
    render(<Button text="Carregar mais posts..." disabled={false} onClick={fn} />);

    expect(screen.getByRole('button', { name: /carregar mais posts.../i })).not.toBeDisabled();
  });

  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<Button text="Carregar mais posts..." disabled={false} onClick={fn} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
