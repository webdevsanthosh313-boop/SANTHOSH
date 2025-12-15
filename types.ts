import React from 'react';

export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department?: string; // For students/teachers
  year?: string; // For students
}

export interface Note {
  id: string;
  title: string;
  subject: string;
  description: string;
  url: string;
  uploaderId: string;
  uploaderName: string;
  uploadDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  department: string;
}

export interface ClassSession {
  id: string;
  subject: string;
  time: string;
  totalStudents: number;
  room: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: 'PRESENT' | 'ABSENT';
  subject: string;
}

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}