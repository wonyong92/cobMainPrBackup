import styled from 'styled-components';
export const Container = styled.div`
  width: 80%;
  @media screen and (max-width: 500px) {
    width: 90%;
  }
`;
export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
export const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 700px;
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`;
