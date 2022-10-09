import styled from 'styled-components';

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-bottom: 10px;
`;
export const Title = styled.div`
  font-weight: 500;
  font-size: 16px;

  span {
    color: #464646;
    font-weight: 400;
    margin-left: 5px;
    font-size: 13px;
  }
`;
export const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 130px;
`;
export const ListBottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    min-height: 400px;
  }
`;
export const Bottom = styled.div`
  display: flex;
  justify-content: center;

  min-height: 700px;
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    min-height: 400px;
  }
`;
