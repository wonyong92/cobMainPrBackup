import { ChangeEvent } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import CustomEditor from '../../components/CustomEditor';
import TextInput from '../../components/TextInput';

const PostEdit = () => {
    return (
        <>
            <h4>빌려주기 작성가이드</h4>
            <Button text={'글저장'} onClick={function (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
          throw new Error('Function not implemented.');
        } }/>
        
            <GuideWrapper>
              <li>사진을 올려주세요</li>
              <li>거래지역을 명시해주세요</li>
              <li>제품의 사용기간, 상태를 작성해주세요</li>
              <li>글 작성과 이미지 업로드시, 타인의 지식재산권을 침해하지 않더록 유의해주세요</li>
              <li>사진 크기에 따른 업로드 제한</li>
            </GuideWrapper>
            <WriteWrapper>
            <h4>필수 정보 입력</h4>
            <span>글제목</span>
            <TextInput type={'text'} value={''} input={''} onChange={function (e: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
          } }/>
            <span>지역</span>
            <TextInput type={'text'} value={''} input={''} onChange={function (e: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
          } }/>
            <span>카테고리</span>
            <TextInput type={'text'} value={''} input={''} onChange={function (e: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
          } }/>
            <span>가격</span>
            <TextInput type={'text'} value={''} input={''} onChange={function (e: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
          } }/>
          <span></span>
            <Button text={''} onClick={function (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
                    throw new Error('Function not implemented.');
                } }/>
            </WriteWrapper>
            <h4>제품설명</h4>
            <CustomEditor value={''} isError={false}  editorRef={undefined} onChange={function (): void {
                throw new Error('Function not implemented.')} }  /> 
          </>
    );
};


const GuideWrapper = styled.ul`
list-style:none;
padding-left:10px;
padding-bottom:10px;
`;

const WriteWrapper = styled.div`
display: flex;
flex-direction:column;
`;



export default PostEdit;