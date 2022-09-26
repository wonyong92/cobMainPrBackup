import './App.css';

import { Route, Routes, useLocation } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import Mypage from './pages/MyPage/Mypage';
import PostDetail from './pages/Post/PostDetail';
import PostEdit from './pages/Post/PostEdit';
import PostList from './pages/Post/PostList';
import PostWrite from './pages/Post/PostWrite';
import Signup from './pages/Sign/Signup';
import Login from './pages/Sign/Login';

const App = () => {
    const location = useLocation();

    return (
        <div className="App">
            {location.pathname === '/login' ? undefined : <Header />}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/postlist" element={<PostList />} />
                <Route path="/postedit" element={<PostEdit />} />
                <Route path="/postdetail" element={<PostDetail />} />
                <Route path="/postwrite" element={<PostWrite />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            {location.pathname === '/login' ? undefined : <Footer />}
        </div>
    );
};

export default App;
