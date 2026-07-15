import type React from 'react';
import { useNoteStore } from '../../modules/notes/notes.state';
import NoteItem from './NoteItem';
import { noteRepository } from '../../modules/notes/note.repository';
import type { Note } from '../../modules/notes/note.entity';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// layerとparentIdを受け取れるようにした
interface Props {
  layer?: number;
  parentId?: number;
}

export default function NoteList({ layer = 0, parentId }: Props) {
  // noteStoreを取得し、getAll()で現在のノート一覧を取り出している。
  const noteStore = useNoteStore();
  const notes = noteStore.getAll();
  // どのノートが開いているか管理する
  const [expanded, setExpanded] = useState<Map<number, boolean>>(new Map());
  // 別ページへ移動できる
  const navigate = useNavigate();

  // 子ノート作成関数クリックイベントと親ノートのIDを受け取る
  const createChild = async (e: React.MouseEvent, parentId: number) => {
    e.preventDefault();
    // parentIdを渡して、ノート作成APIをよんでる。
    const newNote = await noteRepository.create({ parentId });
    // 作成された子ノートをノート一覧のグローバルステートに追加
    noteStore.set([newNote]);

    setExpanded((prev) => {
      const newExpanded = new Map(prev);
      // 子ノートを作ったら親のノートの下に子ノートが見えるようにする
      newExpanded.set(parentId, true);
      return newExpanded;
    });
  };

  // 子ノート作成処理
  const fetchChildren = async (e: React.MouseEvent, note: Note) => {
    e.preventDefault();
    const children = await noteRepository.find({ parentId: note.id });
    if (children == null) return;
    noteStore.set(children);
    setExpanded((prev) => {
      const newExpanded = new Map(prev);
      newExpanded.set(note.id, !prev.get(note.id));
      return newExpanded;
    });
    moveToDetail(note.id);
  };

  // ノート削除用関数
  const deleteNote = async (e: React.MouseEvent, noteId: number) => {
    try {
      // 余計なクリック処理が走らないように
      e.preventDefault();
      // 削除APIの呼び出し
      await noteRepository.delete(noteId);
      // API削除成功後にフロント側のグローバルステートからもノート削除
      noteStore.delete(noteId);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('ノートの削除に失敗しました');
    }
  };

  // 指定したノートIDの詳細ページへ移動する関数
  const moveToDetail = (noteId: number) => {
    navigate(`/notes/${noteId}`);
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
              expanded={expanded.get(note.id)}
              // 各NoteItemにクリック時の処理を渡してる
              onClick={() => moveToDetail(note.id)}
              // NoteItemに削除処理を渡す
              onDelete={(e) => deleteNote(e, note.id)}
            />
            {/* NoteItemにこのノートは開いているか渡している */}
            {expanded.get(note.id) && (
              // 親IDを持つノートだけ表示
              <NoteList layer={layer + 1} parentId={note.id} />
            )}
          </div>
        ))}
    </>
  );
}
