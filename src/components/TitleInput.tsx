import { useState } from 'react';
import type { Note } from '../modules/notes/note.entity';

//ノート1件分のデータを受け取る
interface Props {
  initialData: Note;
  onTitleChange: (value: string) => void;
}

// 親コンポーネントのNoteDetailから渡されたinitialData,onTitleChangeを受け取る
export default function TitleInput({ initialData, onTitleChange }: Props) {
  const [value, setValue] = useState(initialData.title ?? '無題');

  // タイトル入力欄が変更されたときによぶ関数
  const handleInputChange = (value: string) => {
    // 入力欄の表示を更新
    setValue(value);
    // 親コンポーネントへタイトルが変わったことを通知
    onTitleChange(value);
  };
  return (
    <div className="title-input-container">
      {/* ノートのタイトルが入力欄に表示されるようにした */}
      <textarea
        className="title-input"
        value={value}
        // textareaに入力するたびに文字をhandleInputChangeに渡してる
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
}
