class Certificate {
    id: string;
    title: string;
    issuer: string;
    dateIssued: Date;
    description?: string;
    url?: string;
  
    constructor(id: string, title: string, issuer: string, dateIssued: Date, description?: string, url?: string) {
      this.id = id;
      this.title = title;
      this.issuer = issuer;
      this.dateIssued = dateIssued;
      this.description = description;
      this.url = url;
    }
  }

export default Certificate;