import { useContext, useState } from 'react';
import { UserContext } from '../../context/context';
import { Container, Info, CheckBox, BtnWrapper } from './deleteaccount-style';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const DeleteIdAccount = () => {
    const { user, setUser } = useContext(UserContext);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const deleteAccount = async () => {
        try {
            const res = await axios.delete(
                `http://3.39.180.45:56178/member/delete?memberId=${user.memberId}`,
            );
            if (res.status === 200) {
                localStorage.clear();
                setUser({ ...user, memberId: null });
                alert('회원탈퇴가 정상적으로 완료되었습니다 :)');
                navigate('/');
            }
        } catch {
            alert('잘못된 요청입니다');
        }
    };
    return (
        <Container>
            <div className="title">계정삭제</div>
            <Info>
                <p className="descript">
                    계정을 삭제하면 게시글, 관심 등 모든 활동 정보가 삭제됩니다.
                </p>
            </Info>
            <CheckBox>
                <input
                    type="checkbox"
                    onClick={() => {
                        setIsChecked(!isChecked);
                    }}
                ></input>
                <p className="descript">계정 삭제에 관한 정책을 읽고 이에 동의합니다.</p>
            </CheckBox>
            <BtnWrapper>
                <button
                    className={isChecked ? 'active' : ''}
                    disabled={isChecked ? false : true}
                    onClick={deleteAccount}
                >
                    회원탈퇴
                </button>
            </BtnWrapper>
        </Container>
    );
};
export default DeleteIdAccount;
