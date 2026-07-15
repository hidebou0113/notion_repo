import { atom, useAtom } from 'jotai';
import { Note } from './note.entity';

// ノート一覧用のグローバルステートを作成
const notesAtom = atom<Note[]>([]);

export const useNoteStore = () => {
  // notesAtomから現在のノート一覧notesと更新用のsetNotesを取り出している
  const [notes, setNotes] = useAtom(notesAtom);
  // 今入っているノート一覧を返す関数
  const getAll = () => notes;
  // ノート一覧の中からidが一致する1件を探して返す
  const getOne = (id: number) => notes.find((note) => note.id === id);
  // 新しいノート一覧を追加・更新するための関数。引数のnewNotesがAPiから返ってきたノートや新しいノートの配列
  const set = (newNotes: Note[]) => {
    // 今までのノート一覧oldNotesをもとに新しい一覧を作り直す。
    setNotes((oldNotes) => {
      // 今までのノート一覧oldNotesを元に新しい一覧を作り直してる
      const combineNotes = [...oldNotes, ...newNotes];
      // 重複を取り除くためのオブジェクト。キーにnote.idを使い、同じIDのノートは1つにまとめられる
      const uniqueNotes: { [key: number]: Note } = {};

      // 合体したノートを1つずつ見て、uniqueNotesに入れている。
      for (const note of combineNotes) {
        uniqueNotes[note.id] = note;
      }

      // uniqueNotesは配列なので、Object.valuesで配列に戻す
      return Object.values(uniqueNotes);
    });
  };
  // グローバルステート上のノート一端から指定したノートを削除する関数
  const deleteNote = (id: number) => {
    //削除対象はノートに子ノートがある場合、その子ノートたちのIDも探す関数
    const findChildrenIds = (parentId: number): number[] => {
      //parentIdが一致するノートを探して、そのIDファ毛を取り出す。
      const childrenIds = notes
        .filter((note) => note.parentId === parentId)
        .map((child) => child.id);
      // 直接の子ノートだけでなく、孫ノート、さらにその下のノートも探してる
      return childrenIds.concat(
        ...childrenIds.map((childrenIds) => findChildrenIds(childrenIds)),
      );
    };

    const childrenIds = findChildrenIds(id);
    // 現在のノート一覧から削除対象のIDに含まれないノートだけを残す。
    setNotes((oldNotes) =>
      oldNotes.filter((note) => ![...childrenIds, id].includes(note.id)),
    );
  };
  return { getAll, getOne, set, delete: deleteNote };
};
