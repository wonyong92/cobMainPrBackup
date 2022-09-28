import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import Mypage from './pages/MyPage/Mypage';
import MyActivity from './pages/MyActivity/MyActivity';
import PostDetail from './pages/Post/PostDetail';
import PostEdit from './pages/Post/PostEdit';
import PostList from './pages/Post/PostList';
import PostWrite from './pages/Post/PostWrite';
import Signup from './pages/Register/Signup';
import Login from './pages/Register/Login';
import FindId from './pages/Register/FindId';
import FindPw from './pages/Register/FindPassword';
import SetNewPassword from './pages/Register/SetNewPassword';
import NewPwGuide from './pages/Guide/NewPwGuide';
import FindIdGuide from './pages/Guide/FindIdGuide';
import { useEffect, useState } from 'react';
import { IUserData } from './types';
import { UserContext } from './context/context';

const App = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<IUserData>({
        memberId: '',
    });
    const pathCondition = [
        '/login',
        '/signup',
        '/findid',
        '/findpw',
        '/newpassword',
        '/newpwguide',
        '/findidguide',
    ].includes(location.pathname);
    // 로그인유지
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        setUser({ ...user, memberId: userInfo } || null);
        setIsLoading(false);
    }, []);
    if (isLoading) return <p>loading</p>;

    return (
        <div className="App">
            {pathCondition ? undefined : <Header />}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/postlist" element={<PostList />} />
                <Route path="/postedit" element={<PostEdit />} />
                <Route path="/postdetail" element={<PostDetail />} />
                <Route path="/postwrite" element={<PostWrite />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/myactivity" element={<MyActivity />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/findid" element={<FindId />} />
                <Route path="/findpw" element={<FindPw />} />
                <Route path="/newpassword" element={<SetNewPassword />} />
                <Route path="/newpwguide" element={<NewPwGuide />} />
                <Route path="/findidguide" element={<FindIdGuide />} />
            </Routes>
            {pathCondition ? undefined : <Footer />}
        </div>
    );
};

export default App;
