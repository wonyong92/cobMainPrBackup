
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/button/Button";
import {deletePost} from '../../Utils/ApiCall';
import { PostItemDetailData } from '../PostItem/PostDetailItem';

interface deleteModalProps {
    data: PostItemDetailData;
    setDeleteModal: (value: boolean) => void;
}

const DeleteModal=({ data, setDeleteModal }:deleteModalProps) => {
  const navigate = useNavigate();

  const closeModal = () => {
    setDeleteModal(false);
  };

  const deletePostHandler = () => {
    console.log(data);
    deletePost(data.rentPostId);
    navigate("/postlist");
  };

  return (
    <>
    <ModalBackdrop onClick={closeModal}>
      <Container>
        <Top>
          <Title>글 삭제</Title>
          <div>정말로 삭제하시겠습니까?</div>
        </Top>
        <Bottom>
          <Button text='취소' onClick={closeModal}/>
          <Button text='확인' onClick={deletePostHandler}/>
        </Bottom>
      </Container>
    </ModalBackdrop>
    </>
  );
  }


const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  height: 200px;
  background-color: white;
  box-shadow: 2px 2px 4px gray;
`;

const Title = styled.div`
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 20px;
  `;


const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 40px;
  margin-left: 40px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
  cursor: pointer;
    &:hover {
      transform: scale(0.95);
    }
`;

  export default DeleteModal;







