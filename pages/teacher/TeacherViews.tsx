import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { dataService } from '../../services/mockService';
import { ClassSession } from '../../types';
import { Users, Clock, CheckCircle, Calendar, ChevronRight } from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const [classes, setClasses] = useState<ClassSession[]>([]);

  useEffect(() => {
    dataService.getClasses().then(setClasses);
  }, []);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Good Morning, Prof. Wilson</h1>
        <p className="text-slate-500">You have 2 classes scheduled for today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="bg-white border-l-4 border-l-blue-600">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-slate-500 text-sm font-medium">Next Class</p>
               <h3 className="text-lg font-bold text-slate-900 mt-1">Data Structures</h3>
               <p className="text-slate-500 text-sm">Lab 3 • 10:00 AM</p>
             </div>
             <div className="p-2 bg-blue-50 rounded-lg">
               <Clock className="text-blue-600" size={24} />
             </div>
           </div>
         </Card>
         <Card>
           <div className="flex justify-between items-start">
             <div>
               <p className="text-slate-500 text-sm font-medium">Total Students</p>
               <h3 className="text-2xl font-bold text-slate-900 mt-1">145</h3>
             </div>
             <div className="p-2 bg-green-50 rounded-lg">
               <Users className="text-green-600" size={24} />
             </div>
           </div>
         </Card>
         <Card>
           <div className="flex justify-between items-start">
             <div>
               <p className="text-slate-500 text-sm font-medium">Pending Tasks</p>
               <h3 className="text-2xl font-bold text-slate-900 mt-1">3</h3>
               <p className="text-xs text-slate-400">Note approvals</p>
             </div>
             <div className="p-2 bg-yellow-50 rounded-lg">
               <Calendar className="text-yellow-600" size={24} />
             </div>
           </div>
         </Card>
      </div>

      <h2 className="text-lg font-bold text-slate-900 mt-8">Today's Schedule</h2>
      <div className="space-y-4">
        {classes.map((cls) => (
          <Card key={cls.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 font-bold">
                  {cls.subject.substring(0, 2)}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{cls.subject}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                    <span className="flex items-center gap-1"><Clock size={14}/> {cls.time}</span>
                    <span className="flex items-center gap-1"><Users size={14}/> {cls.totalStudents} Students</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button className="flex-1 sm:flex-none">Mark Attendance</Button>
                <Button variant="secondary" className="flex-1 sm:flex-none">View Details</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const TeacherClasses: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Class Management</h1>
        <Button>
           <Calendar className="mr-2" size={18}/> Schedule Extra Class
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {['Data Structures', 'Algorithms', 'Operating Systems'].map((subject, idx) => (
          <Card key={idx} title={subject} action={<button className="text-slate-400"><ChevronRight/></button>}>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                 <span className="text-slate-500">Students Enrolled</span>
                 <span className="font-medium">45</span>
              </div>
              <div className="flex justify-between text-sm">
                 <span className="text-slate-500">Avg. Attendance</span>
                 <span className="font-medium text-green-600">88%</span>
              </div>
              <div className="pt-4 border-t border-slate-50 flex gap-2">
                <Button variant="outline" size="sm" className="w-full">Reports</Button>
                <Button size="sm" className="w-full">Attendance</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};