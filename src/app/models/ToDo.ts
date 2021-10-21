import {Tags} from './Tags';

export class ToDo {
  id: number | null;
  userid: number | null;
  type: number | null;
  text: string | null;
  tags: number[] | null;
  note: string | null;
  priority: number | null;
  done: boolean;
  createDate: Date | null;
  editDate: Date | null;
  removeDate: Date | null;

  constructor(todo?: any) {
    if (!todo) {
      todo = 1;
    }

    this.id = todo.id || null;
    this.userid = todo.userid || null;
    this.type = todo.type || null;
    this.text = todo.text || null;
    this.tags = todo.tags || null;
    this.note = todo.note || null;
    this.priority = parseInt(todo.priority, 10) || 1;
    this.done = todo.done || false;
    this.createDate = todo.createDate || new Date();
    this.editDate = todo.editDate || null;
    this.removeDate = todo.removeDate || null;
  }
}
