import { atom } from 'jotai';
import { User } from '../users/user.entity';

//グローバルステートを作る ログイン中のユーザーを入れておく
export const currentUserAtom = atom<User>();

// currentUserAtomからcurrentUser（今ログインしてるユーザー）とsetCurrentUser（ログインユーザーを更新する関数）の重宝を取り出す
// const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
// //値だけ取り出す
// const currentUser = useAtomValue(currentUserAtom);
// //更新関数だけ取り出す
// const setCurrentUser = useSetAtom(currentUserAtom);
