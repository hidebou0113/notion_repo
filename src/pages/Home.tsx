import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { FiPlus } from 'react-icons/fi';
import '../styles/pages/home.css';
import { useState } from 'react';
import { noteRepository } from '../modules/notes/note.repository';
import { useNoteStore } from '../modules/notes/notes.state';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const noteStore = useNoteStore();
  const navigate = useNavigate();

  // ノート作成ボタンを押したときに実行する関数。API通信があるからasync
  const createNote = async () => {
    // 作成処理を開始したので送信中状態をtrue
    setIsSubmitting(true);
    try {
      // 入力されたtitleを使いノード作成APIを呼ぶ。
      const newNote = await noteRepository.create({ title });
      // noteRepository.create({ title }で作成されたnewNoteをグローバルステートのノート一覧に追加
      noteStore.set([newNote]);
      // 作成に成功したら入力欄を空に戻す
      setTitle('');
      navigate(`/notes/${newNote.id}`);
      console.log(newNote);
    } catch (error) {
      console.error(error);
      alert('ノートの作成に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="home-card">
      <CardHeader className="home-card-header">
        <CardTitle className="home-card-title">
          新しいノートを作成してみましょう
        </CardTitle>
      </CardHeader>
      <CardContent className="home-card-content">
        <div className="home-input-container">
          <input
            className="home-input"
            placeholder="ノートのタイトルを入力"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="home-button"
            onClick={createNote}
            disabled={isSubmitting}
          >
            <FiPlus size={16} />
            <span>ノート作成</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
