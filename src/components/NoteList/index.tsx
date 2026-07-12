import { useNoteStore } from '../../modules/notes/notes.state';
import NoteItem from './NoteItem';

export default function NoteList() {
  // noteStoreを取得し、getAll()で現在のノート一覧を取り出している。
  const noteStore = useNoteStore();
  const notes = noteStore.getAll();
  return (
    <>
      {/* ノート一覧をmapで一件ずつ表示。 */}
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </>
  );
}
