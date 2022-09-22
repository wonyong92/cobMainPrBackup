import './App.css';

import { Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Main from './pages/Main/Main';
import Mypage from './pages/MyPage/Mypage';
import PostDetail from './pages/Post/PostDetail';
import PostEdit from './pages/Post/PostEdit';
import PostList from './pages/Post/PostList';
import PostWrite from './pages/Post/PostWrite';
import Signup from './pages/Sign/Signup';

const App = () => {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/postlist" element={<PostList />} />
                <Route path="/postedit/" element={<PostEdit />} />
                <Route path="/postdetail/:id" element={<PostDetail />} />
                <Route path="/postwrite" element={<PostWrite />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
