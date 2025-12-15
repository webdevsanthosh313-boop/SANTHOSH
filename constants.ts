import { User, UserRole, Note, ClassSession, AttendanceRecord } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 's1',
    name: 'Alex Johnson',
    email: 'alex@student.edu',
    role: UserRole.STUDENT,
    department: 'Computer Science',
    year: '3rd Year',
    avatarUrl: 'https://picsum.photos/100/100'
  },
  {
    id: 't1',
    name: 'Prof. Sarah Wilson',
    email: 'sarah@teacher.edu',
    role: UserRole.TEACHER,
    department: 'Computer Science',
    avatarUrl: 'https://picsum.photos/101/101'
  },
  {
    id: 'a1',
    name: 'Admin User',
    email: 'admin@edutrack.edu',
    role: UserRole.ADMIN,
    avatarUrl: 'https://picsum.photos/102/102'
  }
];

export const MOCK_NOTES: Note[] = [
  {
    id: 'n1',
    title: 'Data Structures - Trees',
    subject: 'Data Structures',
    description: 'Lecture notes on Binary Trees and AVL Trees.',
    url: '#',
    uploaderId: 's1',
    uploaderName: 'Alex Johnson',
    uploadDate: '2023-10-25',
    status: 'APPROVED',
    department: 'Computer Science'
  },
  {
    id: 'n2',
    title: 'Database Normalization',
    subject: 'DBMS',
    description: 'Chapter 4 summary covering 1NF to BCNF.',
    url: '#',
    uploaderId: 's1',
    uploaderName: 'Alex Johnson',
    uploadDate: '2023-10-28',
    status: 'PENDING',
    department: 'Computer Science'
  }
];

export const MOCK_CLASSES: ClassSession[] = [
  {
    id: 'c1',
    subject: 'Data Structures',
    time: '10:00 AM - 11:30 AM',
    totalStudents: 45,
    room: 'Lab 3'
  },
  {
    id: 'c2',
    subject: 'Algorithms',
    time: '02:00 PM - 03:30 PM',
    totalStudents: 42,
    room: 'Hall B'
  }
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: 'a1', studentId: 's1', studentName: 'Alex Johnson', date: '2023-10-24', status: 'PRESENT', subject: 'Data Structures' },
  { id: 'a2', studentId: 's1', studentName: 'Alex Johnson', date: '2023-10-25', status: 'PRESENT', subject: 'Data Structures' },
  { id: 'a3', studentId: 's1', studentName: 'Alex Johnson', date: '2023-10-26', status: 'ABSENT', subject: 'Data Structures' },
];
