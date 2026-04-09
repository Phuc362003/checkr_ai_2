import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Briefcase, ShieldCheck, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Briefcase,
      title: "Smart Job Matching",
      description: "AI-powered recommendations based on your skills and preferences.",
      color: "bg-blue-500"
    },
    {
      icon: ShieldCheck,
      title: "eKYC Verified",
      description: "Secure identity verification to build trust with top employers.",
      color: "bg-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Track your applications and get insights to improve your success rate.",
      color: "bg-indigo-500"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-100/50 rounded-full blur-3xl -ml-64 -mb-64"></div>

      <div className="max-w-md w-full space-y-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[2rem] text-white shadow-2xl shadow-indigo-200 mb-6">
            <Briefcase className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            Welcome to <span className="text-indigo-600">CheckR</span>
          </h1>
          <p className="text-slate-500 text-lg">
            The next generation of job searching and professional verification.
          </p>
        </motion.div>

        <div className="space-y-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100"
            >
              <div className={`${feature.color} p-3 rounded-xl text-white shadow-lg shadow-slate-200`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{feature.title}</h3>
                <p className="text-sm text-slate-500">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <Button 
            onClick={() => navigate('/register')}
            className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-indigo-200 transition-all active:scale-[0.98]"
          >
            Get Started
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/login')}
            className="w-full h-14 text-slate-600 font-bold text-lg rounded-2xl"
          >
            I already have an account
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-2 text-slate-400 text-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>Trusted by 50,000+ professionals</span>
        </motion.div>
      </div>
    </div>
  );
}
