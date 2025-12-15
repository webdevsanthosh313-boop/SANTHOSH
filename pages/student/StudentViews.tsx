import React, { useEffect, useState } from 'react';
import { Note, AttendanceRecord } from '../../types';
import { dataService } from '../../services/mockService';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { BookOpen, Calendar, Clock, Download, Upload, Filter, Search } from 'lucide-react';

// --- Student Dashboard ---
export const StudentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Welcome back, Alex! 👋</h1>
        <p className="text-slate-500">Here's what's happening with your academics today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-blue-100 text-sm font-medium">Overall Attendance</p>
              <p className="text-3xl font-bold">87%</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">Available Notes</p>
              <p className="text-2xl font-bold text-slate-900">142</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">Classes Today</p>
              <p className="text-2xl font-bold text-slate-900">4</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Attendance Overview">
           <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'DS', percent: 92 },
                  { name: 'Algo', percent: 85 },
                  { name: 'DBMS', percent: 78 },
                  { name: 'OS', percent: 88 },
                  { name: 'Networks', percent: 90 },
                ]}>
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} />
                  <Bar dataKey="percent" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </Card>
        
        <Card title="Recent Notes">
          <div className="space-y-4 mt-2">
            {[1, 2, 3].map(i => (
               <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600 font-bold text-xs">PDF</div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Lecture {i}: Advanced Topics</p>
                      <p className="text-xs text-slate-500">Prof. Wilson • Data Structures</p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-blue-600">
                    <Download size={18} />
                  </button>
               </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// --- Student Notes ---
export const StudentNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  useEffect(() => {
    dataService.getNotes().then(setNotes);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Study Materials</h1>
           <p className="text-slate-500">Access and share notes with your peers.</p>
        </div>
        <Button onClick={() => setIsUploadOpen(true)}>
          <Upload size={18} className="mr-2" />
          Upload Notes
        </Button>
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search notes..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm"><Filter size={16} className="mr-2"/> Filter</Button>
          </div>
        </div>
        
        <div className="divide-y divide-slate-100">
          {notes.map(note => (
            <div key={note.id} className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-slate-900">{note.title}</h3>
                  <p className="text-sm text-slate-500">{note.subject} • {note.uploaderName}</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                    note.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                    note.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {note.status}
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm">Download</Button>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Upload Modal Mockup */}
      {isUploadOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md relative" title="Upload Notes">
            <button onClick={() => setIsUploadOpen(false)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <XAxis size={20} /> 
            </button>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-slate-400" />
                <p className="mt-2 text-sm text-slate-600">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-400">PDF, PNG, JPG up to 10MB</p>
              </div>
              <div className="space-y-2">
                <input placeholder="Title" className="w-full px-3 py-2 border rounded-lg" />
                <select className="w-full px-3 py-2 border rounded-lg bg-white">
                   <option>Select Subject</option>
                   <option>Data Structures</option>
                   <option>Algorithms</option>
                </select>
                <textarea placeholder="Description" className="w-full px-3 py-2 border rounded-lg h-24"></textarea>
              </div>
              <div className="flex gap-3 mt-4">
                <Button className="flex-1" onClick={() => setIsUploadOpen(false)}>Submit</Button>
                <Button variant="secondary" className="flex-1" onClick={() => setIsUploadOpen(false)}>Cancel</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

// --- Student Attendance ---
export const StudentAttendance: React.FC = () => {
  const data = [
    { name: 'Present', value: 87, color: '#10b981' },
    { name: 'Absent', value: 13, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Attendance Tracker</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Overall Summary">
          <div className="h-64 flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={data}
                   innerRadius={60}
                   outerRadius={80}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {data.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <Tooltip />
               </PieChart>
             </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-slate-600">Present (87%)</span>
            </div>
             <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-slate-600">Absent (13%)</span>
            </div>
          </div>
        </Card>

        <Card title="Subject Details">
          <div className="space-y-4">
            {[
              { sub: 'Data Structures', percent: 92, status: 'Good' },
              { sub: 'Algorithms', percent: 85, status: 'Average' },
              { sub: 'Database Systems', percent: 78, status: 'Warning' },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                   <p className="font-medium text-slate-900">{s.sub}</p>
                   <div className="w-48 h-2 bg-slate-100 rounded-full mt-1 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${s.percent > 90 ? 'bg-green-500' : s.percent > 80 ? 'bg-blue-500' : 'bg-yellow-500'}`} 
                        style={{ width: `${s.percent}%` }}
                      ></div>
                   </div>
                </div>
                <div className="text-right">
                   <p className="font-bold text-slate-900">{s.percent}%</p>
                   <p className="text-xs text-slate-500">{s.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};