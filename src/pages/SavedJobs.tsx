import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bookmark, MapPin, DollarSign, Building2, ChevronRight, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { dataService } from '@/services/dataService';
import { Job } from '@/services/mockData';

export default function SavedJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      const data = await dataService.getSavedJobs();
      setJobs(data);
      setLoading(false);
    };
    fetchSaved();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 md:pb-0">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Saved Jobs</h1>
        <p className="text-slate-500">Keep track of opportunities you're interested in</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-3xl" />
          ))
        ) : jobs.length > 0 ? (
          jobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/jobs/${job.id}`}>
                <Card className="group border-none shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 rounded-3xl overflow-hidden border border-slate-100">
                  <CardContent className="p-6 flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors flex-shrink-0">
                      <Building2 className="w-8 h-8" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                        <Bookmark className="w-5 h-5 text-indigo-600 fill-indigo-600" />
                      </div>
                      <p className="text-slate-500 font-medium text-sm mb-3">{job.companyName}</p>
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center text-slate-500 text-xs font-medium bg-slate-50 px-2.5 py-1 rounded-lg">
                          <MapPin className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-slate-500 text-xs font-medium bg-slate-50 px-2.5 py-1 rounded-lg">
                          <DollarSign className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
                          {job.salary}
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
              <Bookmark className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">No saved jobs yet</h3>
              <p className="text-slate-500 max-w-xs mx-auto">Start exploring and save jobs that catch your eye!</p>
            </div>
            <Link to="/">
              <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-8 mt-4">
                Explore Jobs
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
