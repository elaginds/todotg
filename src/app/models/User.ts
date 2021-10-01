export class User {
  userid: number | null;
  username: string | null;
  tgid: string | null;

  constructor(user) {
    this.userid = user.userid || null;
    this.username = user.username || null;
    this.tgid = user.tgid || null;
  }
}
