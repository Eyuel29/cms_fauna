import { DateStub, QueryValueObject } from "fauna";

export interface User extends QueryValueObject{
    username: string;
    email: string;
    passwordHash: string;
}

export interface Subscriber extends QueryValueObject{
    name: string;
    email: string;
    user: User;
}

export interface Certificate extends QueryValueObject{
    title: string;
    issuer: string;
    dateIssued: DateStub;
    description: string;
    url: string;
    createdAt: DateStub;
    updatedAt: DateStub;
    user: User;
}

export interface Blog extends QueryValueObject{
    title: string;
    content: string;
    createdAt: DateStub;
    updatedAt: DateStub;
    author: User;
}

export interface Experience extends QueryValueObject{
    companyName: string;
    role: string;
    startDate: DateStub;
    endDate: DateStub;
    description: string;
    createdAt: DateStub;
    updatedAt: DateStub;
    user: User;
}

export interface Project extends QueryValueObject{
    name: string;
    description: string;
    startDate: DateStub;
    endDate: DateStub;
    technologies: string[];
    url: string;
    createdAt: DateStub;
    updatedAt: DateStub;
    user: User;
}

export interface Review extends QueryValueObject{
    reviewerName: string;
    reviewerEmail: string;
    content: string;
    createdAt: DateStub;
    updatedAt: DateStub;
    user: User;
}

export interface FaunaSession extends QueryValueObject{
    session_id: string;
    expiresAt: DateStub;
    user: User;
}