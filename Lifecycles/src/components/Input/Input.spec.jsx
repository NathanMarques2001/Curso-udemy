import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '.';

describe('<TextInput />', () => {
  it('should have a value of searchValue', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue="teste" />);

    expect(screen.getByPlaceholderText(/digite aqui.../i).value).toBe('teste');
  });

  it('should call hancleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue="o valor" />);

    userEvent.type(screen.getByPlaceholderText(/digite aqui.../i), 'o valor');

    expect(screen.getByPlaceholderText(/digite aqui.../i).value).toBe('o valor');
    expect(fn).toHaveBeenCalledTimes('o valor'.length);
  });

  it('should match snapshot', () => {
    const fn = jest.fn();
    const { containter } = render(<TextInput handleChange={fn} searchValue="o valor" />);
    expect(containter).toMatchSnapshot();
  });
});
