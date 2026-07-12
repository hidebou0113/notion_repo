import { useParams } from 'react-router-dom';
import TitleInput from '../components/TitleInput';
import '../styles/pages/note-detail.css';
import { useNoteStore } from '../modules/notes/notes.state';
import { noteRepository } from '../modules/notes/note.repository';
import { useEffect, useState } from 'react';

export default function NoteDetail() {
  const params = useParams();
  // 必ずidがある前提です。
  const id = parseInt(params.id!);
  const [isLoading, setIsLoading] = useState(false);
  // 現在のノート一覧を使えるようにした
  const noteStore = useNoteStore();
  // 指定したidのノートをストア内から探す処理
  const note = noteStore.getOne(id);

  // idが変わった対イングでfetchOneを実行
  useEffect(() => {
    fetchOne();
  }, [id]);

  const fetchOne = async () => {
    // 読み込み中
    setIsLoading(true);
    // idを指定してノート詳細APIを呼ぶ
    const note = await noteRepository.findOne(id);
    // 取得したノートをノートストアに保存
    noteStore.set([note]);
    setIsLoading(false);
  };

  //ノート詳細取得中は画面全体は非表示
  if (isLoading) return <div />;
  //ノートが見つからない場合の文言
  if (!note) return <div>note is not existed</div>;
  return (
    <div className="note-detail-container">
      <div className="note-detail-content">
        {/* 取得済みのnoteをTitleInputに渡す */}
        <TitleInput initialData={note} />
      </div>
    </div>
  );
}
