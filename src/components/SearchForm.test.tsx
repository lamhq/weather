import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';

describe('SearchForm component', () => {
  afterEach(cleanup);

  it('should renders', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(<SearchForm query="test" onChange={mockOnChange} />);
    const inputElement = getByPlaceholderText(/Enter city name/i);
    expect(inputElement).toBeInTheDocument();
  });

  it('should notify when data change', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(<SearchForm query="test" onChange={mockOnChange} />);
    const inputElement = getByPlaceholderText(/Enter city name/i);
    const event = { target: { value: 'London' } };
    fireEvent.change(inputElement, event);
    expect(mockOnChange).toBeCalledWith('London');
  });
});
