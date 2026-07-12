import api from '../../lib/api';
import { Note } from './note.entity';

export const noteRepository = {
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
