import type React from 'react';
import { useNoteStore } from '../../modules/notes/notes.state';
import NoteItem from './NoteItem';
import { noteRepository } from '../../modules/notes/note.repository';
import type { Note } from '../../modules/notes/note.entity';

// layerとparentIdを受け取れるようにした
interface Props {
  layer?: number;
  parentId?: number;
}

export default function NoteList({ layer = 0, parentId }: Props) {
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

  // 子ノート作成処理
  const fetchChildren = async (e: React.MouseEvent, note: Note) => {
    e.preventDefault();
    const children = await noteRepository.find({ parentId: note.id });
    if (children == null) return;
    console.log(children);
    noteStore.set(children);
  };

  return (
    <>
      {/* ノート一覧をmapで一件ずつ表示。 */}
      {notes
        .filter((note) => note.parentId == parentId)
        .map((note) => (
          <div key={note.id}>
            <NoteItem
              note={note}
              // 各NoteItemにノートのidを親IDとして渡す関数を設定
              onCreate={(e) => createChild(e, note.id)}
              // 各NoteItemにどの子ノート取得するか渡す
              onExpand={(e) => fetchChildren(e, note)}
              // NoteItemに今の階層番号を渡す
              layer={layer}
            />
            {/* 親IDを持つノートだけ表示 */}
            <NoteList layer={layer + 1} parentId={note.id} />
          </div>
        ))}
    </>
  );
}
