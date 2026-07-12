import { useState } from 'react';
import { authRepository } from '../modules/auth/auth.repository';
import '../styles/pages/auth.css';
import { useAtom } from 'jotai';
import { currentUserAtom } from '../modules/auth/current-user.state';
import { Navigate } from 'react-router-dom';

export default function Signin() {
  // setEmailでemailを更新、初期値は空
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //グルーバルステートから現在のログインユーザーとそれを更新するsetCurrentUserを取り出す。useAtomは他のコンポーネントと共有可能
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ログインボタンを押したときに呼ばれる関数、asyncなので非同期。
  const signin = async () => {
    setIsSubmitting(true);
    try {
      // authRepositoryでログインAPIの呼び出し。画面に入力されたemailとpasswordをAPI渡す。
      // awaitはAPIの返事が来るまで待つ。const {user, token}は返ってきた結果からuserとtokenを取り出す。
      const { user, token } = await authRepository.signin(email, password);
      // ログインAPIから返ってきたuserをグローバルステートに保存。これで別の場所からもログイン中のユーザーがいるとわかるようになる。
      setCurrentUser(user);
      //ログインAPIから返ってきたtokenをブラウザのlocalstorageに保存する。'token':保存するときの名前、キー。token:実際に保存する値。APiから返ってきたアクセストークン
      localStorage.setItem('token', token);
    } catch (error) {
      console.error(error);
      alert('ログインに失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  // すでにcurrentUserがいる場合、ログインん画面を表示せず、/に移動させるログイン済みの人が/signinに来たら、ホームに戻す
  if (currentUser) return <Navigate to="/" replace />;

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <h2 className="auth-title">Notionクローン</h2>
        <div className="auth-form-container">
          <div className="auth-card">
            <div className="auth-form">
              <div>
                <label className="auth-label" htmlFor="email">
                  メールアドレス
                </label>
                <div className="auth-input-container">
                  <input
                    // アドレス入力欄の表示内容をuseStateのemail stateと繋げる
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    placeholder="メールアドレス"
                    required
                    type="email"
                    className="input-auth"
                  />
                </div>
              </div>
              <div>
                <label className="auth-label" htmlFor="password">
                  パスワード
                </label>
                <div className="auth-input-container">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    placeholder="パスワード"
                    required
                    type="password"
                    className="input-auth"
                  />
                </div>
              </div>
              <div>
                <button
                  // ログインボタンをクリックしたらsignin関数を実行する
                  onClick={signin}
                  // emailかpasswordどちらかが空ならボタンを押せないようにする
                  disabled={!email || !password || isSubmitting}
                  className="home-button"
                  style={{ width: '100%' }}
                >
                  ログイン
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
