import { FiChevronsLeft, FiLogOut } from 'react-icons/fi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Item from './Item';
import { useAtom } from 'jotai';
import { currentUserAtom } from '../../modules/auth/current-user.state';

export default function UserItem() {
  //ログイン中のユーザー情報を取り出す
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  //ログアウト処理
  const signOut = async () => {
    // グローバルステート上のログインユーザーを空に;
    setCurrentUser(undefined);
    // ブラウザに保存していたアクセストークンを削除
    localStorage.removeItem('token');
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="user-item-trigger" role="button">
          <div className="user-item-info">
            {/* ログイン中ユーザーの名前を表示。!はcurrentUserは必ず存在する前提という意味 */}
            <span className="user-item-name">{currentUser!.name}</span>
          </div>
          <FiChevronsLeft className="user-item-chevron" size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="user-item-dropdown"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="user-item-dropdown-content">
          <p className="user-item-email">{currentUser!.email}</p>
          <div className="user-item-info">
            <div>
              <p className="user-item-name-display">{currentUser!.name}</p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="user-item-logout">
          <Item label="ログアウト" icon={FiLogOut} onClick={signOut} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
