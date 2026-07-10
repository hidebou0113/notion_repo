export class User {
  id: string;
  email: string;
  name: string;

  // auth.repository.tsでインスタンス作られたらこっちが起動する。ここでthisにコピーされ、Userの実物が完成する。
  constructor(data: User) {
    Object.assign(this, data);
  }
}
