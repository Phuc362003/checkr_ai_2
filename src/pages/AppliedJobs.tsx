import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Clock, CheckCircle2, ChevronRight, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { dataService } from '@/services/dataService';

export default function AppliedJobs() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      const data = await dataService.getApplications();
      setApplications(data);
      setLoading(false);
    };
    fetchApps();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'reviewed': return 'bg-blue-100 text-blue-700';
      case 'interviewing': return 'bg-indigo-100 text-indigo-700';
      case 'accepted': return 'bg-emerald-100 text-emerald-700';
      case 'rejected': return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 md:pb-0">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">My Applications</h1>
        <p className="text-slate-500">Track the status of your job applications</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-3xl" />
          ))
        ) : applications.length > 0 ? (
          applications.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/jobs/${app.jobId}`}>
                <Card className="group border-none shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 rounded-3xl overflow-hidden border border-slate-100">
                  <CardContent className="p-6 flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors flex-shrink-0">
                      <Building2 className="w-8 h-8" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{app.job?.title}</h3>
                        <Badge className={cn("capitalize rounded-full px-3 py-1 text-xs font-bold border-none", getStatusColor(app.status))}>
                          {app.status}
                        </Badge>
                      </div>
                      <p className="text-slate-500 font-medium text-sm mb-3">{app.job?.companyName}</p>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center text-slate-400 text-xs font-medium">
                          <MapPin className="w-3.5 h-3.5 mr-1.5" />
                          {app.job?.location}
                        </div>
                        <div className="flex items-center text-slate-400 text-xs font-medium">
                          <Clock className="w-3.5 h-3.5 mr-1.5" />
                          Applied {new Date(app.appliedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-indigo-600 transition-colors hidden md:block" />
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 space-y-4 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">No applications yet</h3>
              <p className="text-slate-500 max-w-xs mx-auto">Your applied jobs will appear here once you start submitting applications.</p>
            </div>
            <Link to="/">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all active:scale-95 mt-4">
                Find Jobs
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
