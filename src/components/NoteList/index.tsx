import type React from 'react';
import { useNoteStore } from '../../modules/notes/notes.state';
import NoteItem from './NoteItem';
import { noteRepository } from '../../modules/notes/note.repository';

export default function NoteList() {
  // noteStoreを取得し、getAll()で現在のノート一覧を取り出している。
  const noteStore = useNoteStore();
  const notes = noteStore.getAll();

  // 子ノート作成関数クリックイベントと親ノートのIDを受け取る
  const createChild = async (e: React.MouseEvent, parentId: number) => {
    e.preventDefault();
    // parentIdを渡して、ノート作成APIをよんでる。
    const newNote = await noteRepository.create({ parentId });
    console.log(newNote);
    // 作成された子ノートをノート一覧のグローバルステートに追加
    noteStore.set([newNote]);
  };

  return (
    <>
      {/* ノート一覧をmapで一件ずつ表示。 */}
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          // 各NoteItemにノートのidを親IDとして渡す関数を設定
          onCreate={(e) => createChild(e, note.id)}
        />
      ))}
    </>
  );
}
