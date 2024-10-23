class Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, title: string, content: string, author: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static validate(data: any): boolean {
    if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') return false;
    if (!data.content || typeof data.content !== 'string' || data.content.trim() === '') return false;
    if (!data.author || typeof data.author !== 'string' || data.author.trim() === '') return false;
    
    return true;
  }
}
  
export default Blog;