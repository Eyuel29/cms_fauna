class Experience {
    id: string;
    companyName: string;
    role: string;
    startDate: Date;
    endDate?: Date;
    description: string;
  
    constructor(id: string, companyName: string, role: string, startDate: Date, endDate?: Date, description: string) {
      this.id = id;
      this.companyName = companyName;
      this.role = role;
      this.startDate = startDate;
      this.endDate = endDate;
      this.description = description;
    }
  }

export default Experience;