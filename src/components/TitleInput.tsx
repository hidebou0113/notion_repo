import { useState } from 'react';
import type { Note } from '../modules/notes/note.entity';

//ノート1件分のデータを受け取る
interface Props {
  initialData: Note;
}

// 親コンポーネントのNoteDetailから渡されたinitialDataを受け取る
export default function TitleInput({ initialData }: Props) {
  const [value, setValue] = useState(initialData.title ?? '無題');
  return (
    <div className="title-input-container">
      {/* ノートのタイトルが入力欄に表示されるようにした */}
      <textarea className="title-input" value={value} onChange={() => {}} />
    </div>
  );
}
