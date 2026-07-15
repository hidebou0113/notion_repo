import SideBar from './components/SideBar';
import SearchModal from './components/SearchModal';
import './styles/layout.css';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from './modules/auth/current-user.state';
import { useEffect, useState } from 'react';
import { useNoteStore } from './modules/notes/notes.state';
import { noteRepository } from './modules/notes/note.repository';
import { Note } from './modules/notes/note.entity';

export default function Layout() {
  // ログイン中のユーザー情報を読み取る
  const currentUser = useAtomValue(currentUserAtom);
  // ノート一端を取得中かどうか
  const [isLoading, setIsLoading] = useState(false);
  // ノート一覧のグローバツステートを操作
  const noteStore = useNoteStore();
  // 検索モーダルを表示するかどうか
  const [isShowModal, setIsShowModal] = useState(false);
  // 検索結果のノート一覧を保存する
  const [searchResult, setSearchResult] = useState<Note[]>([]);
  const navigate = useNavigate();

  // レイアウトが表維持された最初のタイミングでfetchNotes()を1回実行
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    // 読み込み中
    setIsLoading(true);
    // /notesからノート一覧を取得
    const notes = await noteRepository.find();
    // 取得したノート一覧をグローバルステートぬ保存
    noteStore.set(notes);
    setIsLoading(false);
  };

  // 検索用の関数
  const searchNotes = async (keyword: string) => {
    // APIにキーワード付きでノート一覧取得リクエストを送ってる
    const notes = await noteRepository.find({ keyword });
    // 取得したノートをグローバルステートにも保存
    noteStore.set(notes);
    // 検索結果を保存
    setSearchResult(notes ?? []);
  };

  const moveToDetail = (noteId: number) => {
    navigate(`/notes/${noteId}`);
    setIsShowModal(false);
  };

  //ログインユーザーがいなければ、メイン画面を表示せず/signinに移動。
  if (!currentUser) return <Navigate to="/signin" replace />;

  return (
    <div className="layout-container">
      {/* ノート一覧の取得中はサイドバーを非表示 */}
      {!isLoading && (
        // SideBarにonSearchButtonClick関数を渡して実行。setIsShowModalがtrueなのでモーダルが開く
        <SideBar onSearchButtonClick={() => setIsShowModal(true)} />
      )}
      <main className="layout-main">
        <Outlet />
      </main>
      {/* SearchModalに今開いてるかと閉じる処理を渡してる。notesは検索結果のノート一覧。onKeywordChangeは検索欄の文字が変わったときに実行する関数 */}
      <SearchModal
        isOpen={isShowModal}
        onClose={() => setIsShowModal(false)}
        notes={searchResult}
        onKeywordChange={searchNotes}
        onItemSelect={moveToDetail}
      />
    </div>
  );
}
