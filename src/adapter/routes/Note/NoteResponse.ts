class NoteResponse {
  id: string;
  author: string;
  body: string;

  constructor(id: string, author: string, body: string) {
    this.id = id;
    this.author = author;
    this.body = body;
  }
}

export default NoteResponse;
