import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  ChevronRight, 
  Building2, 
  TrendingUp, 
  Users, 
  CheckCircle2,
  Bell,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Filter,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { dataService } from '@/services/dataService';
import { Job } from '@/services/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export default function Home() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const stats = dataService.getStats();

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await dataService.getJobs();
      setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(job => 
    job.location.toLowerCase().includes(location.toLowerCase())
  );

  const suggestedJobs = jobs.filter(j => j.isFeatured).slice(0, 5);

  return (
    <div className="space-y-8 md:space-y-12 pb-24">
      {/* Hero & Search Section */}
      <section className="relative py-10 md:py-20 overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-slate-900 text-white">
        {/* Decorative Fillers */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-transparent to-violet-600/30" />
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-indigo-500/20 blur-[80px] md:blur-[120px] rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-violet-500/20 blur-[80px] md:blur-[120px] rounded-full -ml-32 -mb-32" />
        
        <div className="relative container mx-auto px-6 text-center space-y-6 md:space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs md:text-sm font-medium text-indigo-200">
              <Sparkles className="w-4 h-4" />
              <span>Over 10,000+ new jobs posted this week</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-bold tracking-tight leading-tight">
              Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">perfect match</span> <br className="hidden md:block" />
              in the tech world.
            </h1>
            <p className="text-slate-400 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed">
              CheckR connects elite talent with industry-leading companies. <br className="hidden md:block" /> 
              Verified profiles, instant applications, real-time tracking.
            </p>
          </motion.div>

          {/* Search Box with "Filler" elements */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/5 backdrop-blur-xl p-2 md:p-3 rounded-2xl md:rounded-[2rem] border border-white/10 shadow-2xl flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center bg-white/10 rounded-xl md:rounded-2xl px-4 py-2 md:py-3 border border-white/5 focus-within:border-indigo-500/50 transition-all">
                <Search className="text-slate-400 w-5 h-5 mr-3" />
                <Input 
                  placeholder="Job title, keywords..." 
                  className="bg-transparent border-none text-white placeholder:text-slate-500 h-8 md:h-10 p-0 focus-visible:ring-0 text-sm md:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex-1 flex items-center bg-white/10 rounded-xl md:rounded-2xl px-4 py-2 md:py-3 border border-white/5 focus-within:border-indigo-500/50 transition-all">
                <MapPin className="text-slate-400 w-5 h-5 mr-3" />
                <Input 
                  placeholder="Location or Remote" 
                  className="bg-transparent border-none text-white placeholder:text-slate-500 h-8 md:h-10 p-0 focus-visible:ring-0 text-sm md:text-base"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white h-12 md:h-14 px-8 rounded-xl md:rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/30">
                Search
              </Button>
            </div>
            
            {/* Quick Filters / Filler */}
            <div className="flex flex-wrap justify-center gap-2 mt-4 md:mt-6">
              {['Remote', 'Full-time', 'Frontend', 'Backend', 'Design'].map((tag) => (
                <button 
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-medium text-slate-400 hover:bg-white/10 hover:text-white transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Suggested for You - Horizontal Scroll on Mobile */}
      <section className="container mx-auto px-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              Suggested for you
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">Based on your profile and interests</p>
          </div>
          <Button variant="ghost" size="sm" className="text-indigo-600 font-bold">
            See all
          </Button>
        </div>

        <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="min-w-[280px] h-40 bg-slate-100 animate-pulse rounded-2xl" />
            ))
          ) : suggestedJobs.map((job) => (
            <motion.div 
              key={job.id}
              whileHover={{ y: -5 }}
              className="min-w-[280px] md:min-w-0"
            >
              <Link to={`/jobs/${job.id}`}>
                <Card className="h-full border-none shadow-lg shadow-slate-200/50 rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all border border-slate-100">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <Badge className="bg-emerald-50 text-emerald-600 border-none text-[10px] uppercase tracking-wider">
                        {job.type}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 line-clamp-1">{job.title}</h3>
                      <p className="text-xs text-slate-500">{job.companyName}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                      <span className="text-xs font-bold text-indigo-600">{job.salary}</span>
                      <div className="flex items-center text-[10px] text-slate-400">
                        <MapPin className="w-3 h-3 mr-1" />
                        {job.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Notifications - Mobile Optimized */}
      {user && (
        <section className="container mx-auto px-6">
          <div className="flex overflow-x-auto pb-2 gap-3 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3">
            {user.ekycStatus !== 'verified' && (
              <div className="min-w-[260px] md:min-w-0 bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-xl text-amber-600 flex-shrink-0">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-amber-900 text-xs">Verify Identity</h4>
                  <p className="text-[10px] text-amber-700 mt-0.5 line-clamp-1">Increase your success rate by 40%.</p>
                  <Link to="/ekyc" className="inline-flex items-center text-[10px] font-bold text-amber-900 mt-1 hover:underline">
                    Verify Now <ArrowRight className="w-2.5 h-2.5 ml-1" />
                  </Link>
                </div>
              </div>
            )}
            
            <div className="min-w-[260px] md:min-w-0 bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex items-start gap-3">
              <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600 flex-shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-indigo-900 text-xs">New Match</h4>
                <p className="text-[10px] text-indigo-700 mt-0.5 line-clamp-1">Senior Frontend at TechFlow matches you.</p>
                <Link to="/jobs/j1" className="inline-flex items-center text-[10px] font-bold text-indigo-900 mt-1 hover:underline">
                  View <ArrowRight className="w-2.5 h-2.5 ml-1" />
                </Link>
              </div>
            </div>

            <div className="min-w-[260px] md:min-w-0 bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-start gap-3">
              <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600 flex-shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-emerald-900 text-xs">Profile Strength</h4>
                <p className="text-[10px] text-emerald-700 mt-0.5 line-clamp-1">Your profile is 85% complete.</p>
                <Link to="/profile" className="inline-flex items-center text-[10px] font-bold text-emerald-900 mt-1 hover:underline">
                  Update <ArrowRight className="w-2.5 h-2.5 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section - Mobile Grid */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {[
            { label: 'Jobs', value: stats.totalJobs, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Companies', value: stats.activeCompanies, icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Users', value: '50k+', icon: Users, color: 'text-violet-600', bg: 'bg-violet-50' },
            { label: 'Hired', value: stats.successfulPlacements, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 flex items-center gap-3 md:flex-col md:text-center md:gap-2">
              <div className={cn("p-2 md:p-3 rounded-xl", stat.bg, stat.color)}>
                <stat.icon className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <div>
                <div className="text-base md:text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-[10px] md:text-sm text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Job Openings - Optimized Layout */}
      <section className="container mx-auto px-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">Recent Job Openings</h2>
          <Button variant="link" className="text-indigo-600 font-bold p-0 h-auto text-sm">
            View all
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-24 bg-slate-100 animate-pulse rounded-2xl" />
            ))
          ) : filteredJobs.map((job) => (
            <motion.div key={job.id} whileHover={{ scale: 1.01 }}>
              <Link to={`/jobs/${job.id}`}>
                <Card className="border-none shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden border border-slate-100 bg-white group">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors flex-shrink-0 overflow-hidden border border-slate-100">
                      {job.companyLogo ? (
                        <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <Building2 className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col">
                        <h3 className="font-bold text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors text-sm md:text-base leading-tight">
                          {job.title}
                        </h3>
                        <span className="text-xs text-slate-500 font-medium mt-1 line-clamp-1">
                          {job.companyName}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3">
                        <span className="text-[10px] md:text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                          {job.salary}
                        </span>
                        <div className="flex items-center text-[10px] md:text-xs text-slate-400">
                          <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-[10px] md:text-xs text-slate-400">
                          <Clock className="w-3 h-3 mr-1 text-slate-400" />
                          {formatDuration(job.createdAt)}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors self-center" />
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

const formatDuration = (date: any) => {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

function Clock({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
