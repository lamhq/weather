import React from 'react';
import { cleanup, render } from '@testing-library/react';
import SearchForm from './SearchForm';

describe('SearchForm component', () => {
  afterEach(cleanup);

  it('should renders input', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(<SearchForm query="test" onChange={mockOnChange} />);
    const inputElement = getByPlaceholderText(/Enter city name/i);
    expect(inputElement).toBeInTheDocument();
  });
});
