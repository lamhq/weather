import React from 'react';
import styled from 'styled-components';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Button from 'react-bootstrap/Button';
import { RetryableError } from './types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

interface AsyncContentProps {
  isLoading: boolean;
  error?: RetryableError;
  hasData?: boolean;
  children: () => React.ReactElement;
}

const AsyncContent = ({ isLoading, error, hasData, children }: AsyncContentProps): React.ReactElement => {
  if (isLoading) {
    return (
      <Container>
        <ScaleLoader color="#e9ecef" loading={isLoading} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p>
          There was an error loading your data:&nbsp;
          {error.message}
        </p>
        {error.retry && <Button onClick={error.retry}>Retry</Button>}
      </Container>
    );
  }

  if (!hasData) {
    return <Container>There&apos;s no data to display</Container>;
  }

  return children();
};

export default AsyncContent;
