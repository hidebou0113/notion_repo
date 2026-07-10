import { useState } from 'react';
import '../styles/pages/auth.css';
import { authRepository } from '../modules/auth/auth.repository';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = async () => {
    const { user, token } = await authRepository.signup(name, email, password);
    console.log(user, token);
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <h2 className="auth-title">Notionクローン</h2>
        <div className="auth-form-container">
          <div className="auth-card">
            <div className="auth-form">
              <div>
                <label className="auth-label" htmlFor="username">
                  ユーザー名
                </label>
                <div className="auth-input-container">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="username"
                    name="username"
                    placeholder="ユーザー名"
                    required
                    type="text"
                    className="input-auth"
                  />
                </div>
              </div>
              <div>
                <label className="auth-label" htmlFor="email">
                  メールアドレス
                </label>
                <div className="auth-input-container">
                  <input
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
                  disabled={!name || !email || !password}
                  onClick={signup}
                  className="home-button"
                  style={{ width: '100%' }}
                >
                  登録
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
