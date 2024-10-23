class Project {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  technologies: string[];
  url?: string;

  constructor(id: string, name: string, description: string, startDate: Date, technologies: string[], endDate?: Date, url?: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.technologies = technologies;
    this.url = url;
  }
}

export default Project;