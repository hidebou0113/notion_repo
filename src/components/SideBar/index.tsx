import Item from './Item';
import NoteList from '../NoteList';
import UserItem from './UserItem';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { useNoteStore } from '../../modules/notes/notes.state';
import { noteRepository } from '../../modules/notes/note.repository';

export default function SideBar() {
  // ノート一覧を操作するためのnoteStoreを取得
  const noteStore = useNoteStore();
  // ノート作成を押したときに実行される関数
  const createNote = async () => {
    try {
      // ノート作成APIを呼んでいる。{}を藁しているので、タイトルなし、親ノートなしの新規ノートを作る
      const newNote = await noteRepository.create({});
      // 作成されたノートをグローバルステートのノート一覧に追加。
      noteStore.set([newNote]);
    } catch (error) {
      console.error(error);
      alert('ノートの作成に失敗しました');
    }
  };
  return (
    <>
      <aside className="sidebar">
        <div>
          <div>
            <UserItem />
            <Item label="検索" icon={FiSearch} onClick={() => {}} />
          </div>
          <div className="sidebar-spacer">
            <NoteList />
            <Item label="ノートを作成" icon={FiPlus} onClick={createNote} />
          </div>
        </div>
      </aside>
      <div className="sidebar-placeholder"></div>
    </>
  );
}
