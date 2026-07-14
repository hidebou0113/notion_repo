import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { ja } from '@blocknote/core/locales';
import '@blocknote/mantine/style.css';

export function Editor() {
  // BlockNoteのエディタの本体
  const editor = useCreateBlockNote({ dictionary: ja });

  return (
    <div>
      {/* 作成したeditorを表示 */}
      <BlockNoteView editor={editor} />
    </div>
  );
}
