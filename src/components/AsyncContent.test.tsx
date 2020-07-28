import React from 'react';
import { cleanup, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import AsyncContent from './AsyncContent';

describe('AsyncContent component', () => {
  afterEach(cleanup);

  it('should renders loading indicator', () => {
    const { getByRole } = render(<AsyncContent isLoading>{() => <p>Data</p>}</AsyncContent>);
    const element = getByRole(/alert/i);
    expect(element).toBeInTheDocument();
  });

  it('should renders no data text', () => {
    const { getByText } = render(
      <AsyncContent isLoading={false} hasData={false}>
        {() => <p>Data</p>}
      </AsyncContent>,
    );
    const element = getByText(/no data to display/i);
    expect(element).toBeInTheDocument();
  });

  it('should renders error alert', () => {
    const error = { name: 'sample', message: 'sample error message', retry: jest.fn() };
    const { getByText } = render(
      <AsyncContent isLoading={false} error={error}>
        {() => <p>Data</p>}
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

  it('should match snapshot', () => {
    let tree = renderer.create(<AsyncContent isLoading>{() => <p>Data</p>}</AsyncContent>).toJSON();
    expect(tree).toMatchSnapshot();

    tree = renderer
      .create(
        <AsyncContent isLoading={false} hasData={false}>
          {() => <p>Data</p>}
        </AsyncContent>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();

    const error = { name: 'sample', message: 'sample error message', retry: jest.fn() };
    tree = renderer
      .create(
        <AsyncContent isLoading={false} error={error}>
          {() => <p>Data</p>}
        </AsyncContent>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();

    tree = renderer
      .create(
        <AsyncContent isLoading={false} hasData>
          {() => <p>loaded data</p>}
        </AsyncContent>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
