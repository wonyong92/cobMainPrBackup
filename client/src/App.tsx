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
import FindId from './pages/FindUserInfo/FindId';
import FindPassword from './pages/FindUserInfo/FindPassword';
import FindUserInfoGuide from './pages/Guide/FindUserInfoGuide';
import { useEffect, useState } from 'react';
import { IUserData } from './types';
import { UserContext } from './context/context';
import NotFound from './components/NotFound/NotFound';

const App = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUserData>({
    memberId: 0,
    loginId: '',
    email: '',
    name: '',
    nickname: '',
    createdAt: '',
    profileImageId: 0,
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
  const getUserFromLocalStorage = (): IUserData | null => {
    const result = localStorage.getItem('userInfo');
    const userInfo = result ? JSON.parse(result) : null;
    return userInfo;
  };
  useEffect(() => {
    const userInfo = getUserFromLocalStorage();
    setUser({ ...user, ...userInfo });
    setIsLoading(false);
  }, []);

  if (isLoading) return <p>loading...</p>;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        {pathCondition ? undefined : <Header />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/postlist" element={<PostList />} />
          <Route path="/postedit/:id" element={<PostEdit />} />
          <Route path="/postdetail/:id" element={<PostDetail />} />
          <Route path="/postwrite" element={<PostWrite />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/myactivity" element={<MyActivity />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/findid" element={<FindId />} />
          <Route path="/findpw" element={<FindPassword />} />
          <Route path="/findguide" element={<FindUserInfoGuide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {pathCondition ? undefined : <Footer />}
      </div>
    </UserContext.Provider>
  );
};

export default App;