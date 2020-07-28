import React from 'react';
import styled from 'styled-components';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { RetryableError } from '../types/common';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

interface AsyncContentProps {
  isLoading: boolean;
  children: () => React.ReactElement;
  error?: RetryableError;
  hasData?: boolean;
}

const AsyncContent = ({
  isLoading,
  error,
  hasData,
  children,
}: AsyncContentProps): React.ReactElement => {
  if (isLoading) {
    return (
      <Container role="alert">
        <ScaleLoader color="#e9ecef" loading={isLoading} />
      </Container>
    );
  }

  if (error) {
    const message = `There was an error when loading your data: ${error.message}. `;
    return (
      <Container>
        <Alert variant="danger">
          {message}
          {error.retry && (
            <Button onClick={error.retry} variant="link" size="sm">
              Retry
            </Button>
          )}
        </Alert>
      </Container>
    );
  }

  if (!hasData) {
    return <Container>There&apos;s no data to display</Container>;
  }

  return children();
};

export default AsyncContent;
