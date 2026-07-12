import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Layout from './Layout';
import Home from './pages/Home';
import NoteDetail from './pages/NoteDetail';
import { useSetAtom } from 'jotai';
import { currentUserAtom } from './modules/auth/current-user.state';
import { authRepository } from './modules/auth/auth.repository';
import { useEffect, useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  //currentUserAtomにユーザー情報を保存するための関数。
  const setCurrentUser = useSetAtom(currentUserAtom);

  //Appが最初に表示されたタイミングでfetchCurrentUser()を実行。[]があるので、基本的に初回表示時だけ実行
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  //現在ログイン中のユーザーを取得するための関数。API通信をするのでasync
  const fetchCurrentUser = async () => {
    try {
      //getCurrentUser()を読んで、現在ログイン中のユーザーをサーバーに確認している。
      const user = await authRepository.getCurrentUser();
      //取得できたuserをcurrentUserAtomに保存。これで他のコンポーネントからログイン状態を判断できる
      setCurrentUser(user);
    } catch (error) {
      console.error(error);
    } finally {
      //成功しても失敗しても最後に読み込み中を解除する
      setIsLoading(false);
    }
  };

  //ユーザー確認中はルーティング本体を表示しない。このdivがないと確認が終わる前にLayoutがユーザーがいないと判断し、/signinに飛ばしてしまう可能性あり
  if (isLoading) return <div />;

  return (
    <>
      <BrowserRouter>
        <div className="app-container">
          <Routes>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/note/:id" element={<NoteDetail />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
