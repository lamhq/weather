import React from 'react';
import { cleanup, render } from '@testing-library/react';
import AsyncContent from './AsyncContent';

describe('AsyncContent component', () => {
  afterEach(cleanup);

  it('should renders loading indicator', () => {
    const renderContent = jest.fn(() => <p>Data</p>);
    const { getByRole } = render(<AsyncContent isLoading>{renderContent}</AsyncContent>);
    const element = getByRole(/alert/i);
    expect(element).toBeInTheDocument();
  });

  it('should renders no data text', () => {
    const renderContent = jest.fn(() => <p>Data</p>);
    const { getByText } = render(
      <AsyncContent isLoading={false} hasData={false}>
        {renderContent}
      </AsyncContent>,
    );
    const element = getByText(/no data to display/i);
    expect(element).toBeInTheDocument();
  });

  it('should renders error alert', () => {
    const renderContent = jest.fn(() => <p>Data</p>);
    const error = { name: 'sample', message: 'sample error message', retry: jest.fn() };
    const { getByText } = render(
      <AsyncContent isLoading={false} error={error}>
        {renderContent}
      </AsyncContent>,
    );
    const msgElement = getByText(/sample error message/i);
    expect(msgElement).toBeInTheDocument();
    const btnElement = getByText(/Retry/i);
    expect(btnElement).toBeInTheDocument();
  });

  it('should renders content passed in render props', () => {
    const { getByText } = render(
      <AsyncContent isLoading={false} hasData>
        {() => <p>loaded data</p>}
      </AsyncContent>,
    );
    const element = getByText(/loaded data/i);
    expect(element).toBeInTheDocument();
  });
});
