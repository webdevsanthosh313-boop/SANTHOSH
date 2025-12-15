import { MOCK_USERS, MOCK_NOTES, MOCK_CLASSES, MOCK_ATTENDANCE } from '../constants';
import { User, Note, ClassSession, AttendanceRecord, UserRole } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  login: async (email: string, role: UserRole): Promise<User | undefined> => {
    await delay(800);
    return MOCK_USERS.find(u => u.email === email && u.role === role);
  },
  register: async (userData: Partial<User>): Promise<User> => {
    await delay(1000);
    return { ...MOCK_USERS[0], ...userData } as User; // Mock return
  }
};

export const dataService = {
  getNotes: async (department?: string): Promise<Note[]> => {
    await delay(500);
    if (!department) return MOCK_NOTES;
    return MOCK_NOTES.filter(n => n.department === department);
  },
  
  uploadNote: async (note: Partial<Note>): Promise<Note> => {
    await delay(1000);
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      title: note.title || 'Untitled',
      subject: note.subject || 'General',
      description: note.description || '',
      url: '#',
      uploaderId: 's1',
      uploaderName: 'Current User',
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'PENDING',
      department: note.department || 'General'
    };
    return newNote;
  },

  getClasses: async (): Promise<ClassSession[]> => {
    await delay(600);
    return MOCK_CLASSES;
  },

  getAttendance: async (studentId: string): Promise<AttendanceRecord[]> => {
    await delay(400);
    return MOCK_ATTENDANCE.filter(a => a.studentId === studentId);
  },

  markAttendance: async (classId: string, records: { studentId: string, status: 'PRESENT' | 'ABSENT' }[]) => {
    await delay(800);
    console.log(`Marked attendance for class ${classId}`, records);
    return true;
  }
};