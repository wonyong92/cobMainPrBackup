import styled from 'styled-components';
interface optionList {
  name: string;
  value: string;
}
interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => any;
  optionList: optionList[];
}
const SearchFilter = ({ value, onChange, optionList }: Props) => {
  return (
    <Select value={value} onChange={onChange}>
      {optionList.map((el, idx) => (
        <Option key={idx} value={el.value}>
          {el.name}
        </Option>
      ))}
    </Select>
  );
};
export default SearchFilter;

const Select = styled.select`
  border: 0.5px solid #9a9999;
  border-radius: 3px;
  color: #464646;
  background-color: #f9f9f9;
  height: 28px;
  font-size: 14px;
  @media screen and (max-width: 500px) {
    height: 23px;
    font-size: 12px;
  }
`;
const Option = styled.option``;
