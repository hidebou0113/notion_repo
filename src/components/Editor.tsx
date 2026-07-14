import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { ja } from '@blocknote/core/locales';
import '@blocknote/mantine/style.css';

//Editorが親コンポーネントから受け取る値の型定義
interface Props {
  onChange: (value: string) => void;
  initialContent?: string | null;
}

// 親から渡されたonChangeとinitialContentを受け取る
export function Editor({ onChange, initialContent }: Props) {
  // BlockNoteのエディタの本体
  const editor = useCreateBlockNote({
    // エディタのメニューなどを日本語にする設定
    dictionary: ja,
    // 保存済みの本文があればそれをエディタで使える形に戻す。
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
  });

  return (
    <div>
      {/* 作成したeditorを表示 */}
      <BlockNoteView
        editor={editor}
        // 本文が変更されたときに実行される。editor.documentに現在の本文データがあるがそのままだとオブジェクトなので、APIに送るためにJSON.stringifyで文字列に変換
        onChange={() => onChange(JSON.stringify(editor.document))}
      />
    </div>
  );
}
