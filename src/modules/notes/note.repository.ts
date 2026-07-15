import api from '../../lib/api';
import { Note } from './note.entity';

export const noteRepository = {
  // ノート一覧取得APIを呼び出す
  async find(options?: {
    parentId: number;
    keyword?: string;
  }): Promise<Note[]> {
    // サーバーからノート一覧を取得し、返ってきたresult.data.notesを1件ずつnew Note(data)に変換
    const result = await api.get('/notes', {
      params: {
        parentId: options?.parentId,
        keyword: options?.keyword,
      },
    });
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

  // ノート1件だけを取得するメソッド。取得したいノートのIDを受け取る
  async findOne(id: number): Promise<Note> {
    // notes/${id}にGETリクエストを送ってる
    const result = await api.get(`/notes/${id}`);
    // APIから返ってきたデータをnew Note(..)でNoteインスタンスに変換して返してる
    return new Note(result.data);
  },
  async update(
    id: number,
    note: { title?: string; content?: string },
  ): Promise<Note> {
    const result = await api.patch(`/notes/${id}`, note);
    return new Note(result.data);
  },
  //ノートの削除処理
  async delete(id: number): Promise<boolean> {
    // 削除APIの呼び出し
    await api.delete(`/notes/${id}`);
    // 呼び出し元に削除成功を伝える
    return true;
  },
};
