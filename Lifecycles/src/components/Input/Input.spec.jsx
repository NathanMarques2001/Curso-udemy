import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '.';

describe('<TextInput />', () => {
  it('should have a value of searchValue', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue="teste" />);

    const input = screen.getByPlaceholderText(/digite aqui.../i);
    expect(input.value).toBe('teste');
  });

  it('should call hancleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue="o valor" />);

    const input = screen.getByPlaceholderText(/digite aqui.../i);
    const value = 'o valor';
    userEvent.type(input, value);

    expect(input.value).toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it('should match snapshot', () => {
    const fn = jest.fn();
    const { containter } = render(<TextInput handleChange={fn} searchValue="o valor" />);
    expect(containter).toMatchSnapshot();
  });
});
