import api from '../../lib/api';
import { Note } from './note.entity';

export const noteRepository = {
  // ノート一覧取得APIを呼び出す
  async find(): Promise<Note[]> {
    // サーバーからノート一覧を取得し、返ってきたresult.data.notesを1件ずつnew Note(data)に変換
    const result = await api.get('/notes');
    return result.data.notes.map((data: Note) => new Note(data));
  },
  // note新規作成メソッド。paramsにはtitleとparentIdを渡せる。Promise<Note>はNoteを返す非同期処理
  async create(params: { title?: string; parentId?: number }): Promise<Note> {
    // /notesにpostリクエストを送っている。noteを作成して下しとサーバーに依頼。
    const result = await api.post('/notes', {
      // 送っているデータ
      title: params.title,
      parentId: params.parentId,
    });
    // APIから返ってきたノートデータをnre Note(...)でNoteインスタンスに変換して返す。ここでnote.entity.tsのconstructorが動き、createdAtもDateに変換される。
    return new Note(result.data);
  },
};
