import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { MdSearch } from 'react-icons/md';
import styled from 'styled-components';

const Container = styled(InputGroup)`
  margin-bottom: 30px;
`;

interface SearchFormProps {
  query: string;
  onChange: (value: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ query, onChange }) => {
  const [value, setValue] = React.useState(query);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };
  return (
    <Container>
      <InputGroup.Prepend>
        <InputGroup.Text>
          <MdSearch />
        </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl value={value} onChange={handleChange} placeholder="Enter city name, ex: Ho Chi Minh City" />
    </Container>
  );
};

export default SearchForm;
