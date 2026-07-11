import SideBar from './components/SideBar';
import SearchModal from './components/SearchModal';
import './styles/layout.css';
import { Navigate, Outlet } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from './modules/auth/current-user.state';

export default function Layout() {
  // ログイン中のユーザー情報を読み取る
  const currentUser = useAtomValue(currentUserAtom);

  //ログインユーザーがいなければ、メイン画面を表示せず/signinに移動。
  if (!currentUser) return <Navigate to="/signin" replace />;

  return (
    <div className="layout-container">
      <SideBar />
      <main className="layout-main">
        <Outlet />
      </main>
      <SearchModal />
    </div>
  );
}
