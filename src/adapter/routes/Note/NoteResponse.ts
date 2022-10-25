class NoteResponse {
  id: number;
  author: string;
  body: string;

  constructor(id: number, author: string, body: string) {
    this.id = id;
    this.author = author;
    this.body = body;
  }
}

export default NoteResponse;
