export class Note {
  // 「!」は後で必ず値が入るのでここで初期化は不要。
  id!: number;
  userId: string;
  title?: string | null;
  content?: string | null;
  parentId?: number | null;
  createdAt!: Date;

  // new Note(data)されたときに自動で呼ばれる初期化処理。APIから返ってきたノートデータを受けとる想定
  constructor(data: Note) {
    //dataの中身をNoteインスタンスにまとめてコピー
    Object.assign(this, data);
    // Dataオブジェクトに変換
    this.createdAt = new Date(data.createdAt);
  }
}
