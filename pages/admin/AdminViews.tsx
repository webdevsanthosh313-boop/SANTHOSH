import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Users, FileText, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">System Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', val: '2,543', icon: <Users className="text-blue-600"/>, color: 'bg-blue-100' },
          { label: 'Notes Uploaded', val: '1,205', icon: <FileText className="text-purple-600"/>, color: 'bg-purple-100' },
          { label: 'Pending Approvals', val: '12', icon: <AlertCircle className="text-yellow-600"/>, color: 'bg-yellow-100' },
          { label: 'Avg Attendance', val: '84%', icon: <TrendingUp className="text-green-600"/>, color: 'bg-green-100' },
        ].map((stat, i) => (
          <Card key={i}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-slate-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.val}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Pending Note Approvals" action={<Button variant="outline" size="sm">View All</Button>}>
          <div className="space-y-4">
             {[1, 2, 3].map(i => (
               <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-xs font-bold border">PDF</div>
                   <div>
                     <p className="text-sm font-medium text-slate-900">Applied Physics Ch. 4</p>
                     <p className="text-xs text-slate-500">John Doe • 1st Year</p>
                   </div>
                 </div>
                 <div className="flex gap-2">
                   <button className="p-1 hover:bg-green-100 text-green-600 rounded"><CheckCircle size={18}/></button>
                   <button className="p-1 hover:bg-red-100 text-red-600 rounded"><AlertCircle size={18}/></button>
                 </div>
               </div>
             ))}
          </div>
        </Card>
        
        <Card title="System Activity">
          <div className="space-y-4">
            {[
              { msg: 'New teacher account created', time: '2 mins ago' },
              { msg: 'Attendance report generated', time: '15 mins ago' },
              { msg: 'System backup completed', time: '1 hour ago' },
              { msg: 'New department "Robotics" added', time: '3 hours ago' },
            ].map((log, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-slate-300 mt-1.5"></div>
                <div>
                   <p className="text-slate-900">{log.msg}</p>
                   <p className="text-slate-400 text-xs">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};