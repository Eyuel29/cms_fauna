import { DateStub, QueryValueObject } from "fauna";

export interface User extends QueryValueObject{
  id: string;
  username: string;
  email: string;
  passwordHash: string;
};

export interface Subscriber extends QueryValueObject{
  id: string;
  name: string; 
  email: string;
};

export interface Certificate  extends QueryValueObject{
  id: string;
  title: string;
  issuer: string;
  dateIssued: DateStub;
  description: string | null;
  url: string | null;
  createdAt: DateStub;
  updatedAt: DateStub;
};

export interface Blog  extends QueryValueObject{
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorId: string;
  createdAt: DateStub;
  updatedAt: DateStub;
};

export interface Experience  extends QueryValueObject{
  id: string;
  companyName: string;
  role: string;
  startDate: DateStub;
  endDate: DateStub | null;
  description: string;
  createdAt: DateStub;
  updatedAt: DateStub;
};

export interface Project  extends QueryValueObject{
  id: string;
  name: string;
  description: string;
  startDate: DateStub;
  endDate: DateStub | null;
  technologies: string[];
  url: string | null;
  createdAt: DateStub;
  updatedAt: DateStub;
};

export interface Review  extends QueryValueObject{
  id: string;
  reviewerName: string;
  reviewerEmail: string;
  rating: number;
  content: string;
  createdAt: DateStub;
  updatedAt: DateStub;
};
