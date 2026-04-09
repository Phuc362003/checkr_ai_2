import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Building2, 
  ArrowLeft, 
  Bookmark, 
  Send,
  CheckCircle2,
  Clock,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';
import { dataService } from '@/services/dataService';
import { Job } from '@/services/mockData';
import { useAuth } from '@/contexts/AuthContext';

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      const data = await dataService.getJobById(id);
      if (data) {
        setJob(data);
        const saved = await dataService.isSaved(id);
        setIsSaved(saved);
        const applied = await dataService.hasApplied(id);
        setHasApplied(applied);
      }
      setLoading(false);
    };
    fetchJob();
  }, [id]);

  const handleSave = async () => {
    if (!user) {
      toast.error('Please login to save jobs');
      navigate('/login');
      return;
    }
    if (!id) return;
    await dataService.toggleSaveJob(id);
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Job removed from saved' : 'Job saved successfully!');
  };

  const handleApply = async () => {
    if (!user) {
      toast.error('Please login to apply');
      navigate('/login');
      return;
    }
    if (!id) return;
    setApplying(true);
    try {
      await dataService.applyToJob(id);
      setHasApplied(true);
      toast.success('Application submitted successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  if (!job) return <div className="text-center py-20">Job not found</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 pb-20 md:pb-0">
      <Button variant="ghost" className="mb-2 md:mb-4 px-0 hover:bg-transparent text-slate-500" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 w-4 h-4" /> Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <Card className="border-none shadow-xl shadow-indigo-100/50 overflow-hidden rounded-3xl">
            <CardHeader className="p-6 md:p-8 pb-0">
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 flex-shrink-0">
                    <Building2 className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 truncate">{job.title}</h1>
                    <p className="text-base md:text-lg font-medium text-indigo-600 truncate">{job.companyName}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 self-end md:self-auto">
                  <Button variant="outline" size="icon" className="rounded-xl w-10 h-10" onClick={handleSave}>
                    <Bookmark className={cn("w-5 h-5", isSaved && "fill-indigo-600 text-indigo-600")} />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-xl w-10 h-10">
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 md:gap-4 mt-6 md:mt-8">
                <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-1.5 md:px-4 md:py-2 rounded-xl">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs md:text-sm font-medium">{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-1.5 md:px-4 md:py-2 rounded-xl">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs md:text-sm font-medium">{job.type}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-1.5 md:px-4 md:py-2 rounded-xl">
                  <DollarSign className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs md:text-sm font-medium">{job.salary}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 md:p-8 space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-lg md:text-xl font-bold text-slate-900">Job Description</h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {job.description}
                </p>
              </div>

              <Separator />

              <div className="space-y-3 md:space-y-4">
                <h3 className="text-lg md:text-xl font-bold text-slate-900">Requirements</h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {job.requirements}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-none shadow-xl shadow-indigo-100/50 rounded-3xl">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Posted
                  </span>
                  <span className="font-medium text-slate-900">2 days ago</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Applicants
                  </span>
                  <span className="font-medium text-slate-900">45 people</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Deadline
                  </span>
                  <span className="font-medium text-slate-900">Oct 24, 2026</span>
                </div>
              </div>

              <Button 
                className={cn(
                  "w-full h-12 rounded-xl font-bold text-lg shadow-lg transition-all",
                  hasApplied 
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white" 
                    : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-indigo-200"
                )}
                onClick={handleApply}
                disabled={hasApplied || applying}
              >
                {applying ? 'Submitting...' : hasApplied ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Applied
                  </span>
                ) : 'Apply Now'}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-indigo-100/50 rounded-3xl overflow-hidden">
            <div className="h-20 bg-slate-100 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-slate-300" />
            </div>
            <CardContent className="p-6 text-center space-y-4">
              <h3 className="font-bold text-slate-900">{job.companyName}</h3>
              <p className="text-xs text-slate-500 line-clamp-3">
                TechFlow Systems is a leading provider of cloud infrastructure and DevOps solutions, helping companies scale their digital presence.
              </p>
              <Button variant="outline" className="w-full rounded-xl text-indigo-600 border-indigo-200">
                View Company
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

function Users({ className }: { className?: string }) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}
