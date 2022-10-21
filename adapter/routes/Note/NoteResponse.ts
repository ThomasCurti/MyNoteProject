class NoteResponse {
  constructor(id: string, author: string, body: string) {
    this.id = id;
    this.author = author;
    this.body = body;
  }

  id: string;
  author: string;
  body: string;
}

export default NoteResponse;
