export type User = {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  blogs?: Blog[]; 
};

export type Subscriber = {
  id: string;
  name: string; 
  email: string;
  subscribedAt: Date;
};

export type Upvote = {
  id: string;
  userId: string; 
  entityId: string; 
  entityType: 'Blog' | 'Comment' | 'Project';
  createdAt: Date;
};

export type Downvote = {
  id: string;
  userId: string;
  entityId: string;
  entityType: 'Blog' | 'Comment' | 'Project';
  createdAt: Date;
};

export type Comment = {
  id: string;
  content: string;
  authorId: string; 
  entityId: string; 
  entityType: 'Blog' | 'Project';
  createdAt: Date;
  updatedAt?: Date;
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  dateIssued: Date;
  description?: string;
  url?: string;
};

export type Blog = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Experience = {
  id: string;
  companyName: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  description: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  technologies: string[];
  url?: string;
};

export type Review = {
  id: string;
  reviewerName: string;
  reviewerEmail: string;
  rating: number;
  content: string;
  createdAt: Date;
};
