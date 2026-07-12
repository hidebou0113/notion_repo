import api from '../../lib/api';
import { User } from '../users/user.entity';

export const authRepository = {
  async signup(
    name: string,
    email: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    const result = await api.post('/auth/signup', {
      name,
      email,
      password,
    });
    // apiの生データを受け取る
    const { user, token } = result.data;
    // ただのオブジェクトだった userがUserクラスのインスタンスになる
    return { user: new User(user), token };
  },
  // 非同期処理 ログインAPIの呼び出し
  async signin(
    //signinの引数 文字列
    email: string,
    password: string,
    // 返り値の型 Userの情報と文字列のトークンが返ってくる
  ): Promise<{ user: User; token: string }> {
    // ログイン用APiにPOSTリクエストを送信、awaitだからサーバーからの返事が来るまで待つ。
    const result = await api.post('/auth/signin', { email, password });
    // result.dataからuserとtokenの情報を取り出す。
    const { user, token } = result.data;
    // 呼び出し元にuserとtokenを返す。Userクラスのインスタンスにしてから返す
    return { user: new User(user), token };
  },
  async getCurrentUser(): Promise<User | undefined> {
    const result = await api.get('/auth/me');
    if (!result.data) return undefined;

    return new User(result.data);
  },
};
