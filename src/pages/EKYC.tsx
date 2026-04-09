import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  ShieldCheck, 
  Upload, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Camera,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { useAuth } from '@/contexts/AuthContext';

export default function EKYC() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [docType, setDocType] = useState('id_card');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    setLoading(true);
    // Simulate upload and verification process
    setTimeout(async () => {
      await updateProfile({ ekycStatus: 'pending' });
      setStep(3);
      setLoading(false);
      toast.success('Documents uploaded successfully!');
    }, 2000);
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20 md:pb-0">
      <Button variant="ghost" className="px-0 hover:bg-transparent text-slate-500" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 w-4 h-4" /> Back to Profile
      </Button>

      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Identity Verification</h1>
        <p className="text-slate-500">Verify your identity to build trust with employers</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300",
              step >= s ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-slate-100 text-slate-400"
            )}>
              {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
            </div>
            {s < 3 && <div className={cn("w-12 h-1 bg-slate-100 mx-2 rounded-full", step > s && "bg-indigo-600")} />}
          </div>
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {step === 1 && (
          <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8">
              <CardTitle>Select Document Type</CardTitle>
              <CardDescription>Choose the document you want to use for verification</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <RadioGroup value={docType} onValueChange={setDocType} className="grid grid-cols-1 gap-4">
                <Label
                  htmlFor="id_card"
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all",
                    docType === 'id_card' ? "border-indigo-600 bg-indigo-50/50" : "border-slate-100 hover:border-slate-200"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                      <FileText className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">National ID Card</p>
                      <p className="text-xs text-slate-500">Fastest verification method</p>
                    </div>
                  </div>
                  <RadioGroupItem value="id_card" id="id_card" className="sr-only" />
                  {docType === 'id_card' && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
                </Label>

                <Label
                  htmlFor="passport"
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all",
                    docType === 'passport' ? "border-indigo-600 bg-indigo-50/50" : "border-slate-100 hover:border-slate-200"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                      <Globe className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Passport</p>
                      <p className="text-xs text-slate-500">International verification</p>
                    </div>
                  </div>
                  <RadioGroupItem value="passport" id="passport" className="sr-only" />
                  {docType === 'passport' && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
                </Label>
              </RadioGroup>

              <div className="bg-blue-50 p-4 rounded-2xl flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <p className="text-xs text-blue-700 leading-relaxed">
                  Your data is encrypted and used only for identity verification. We never share your personal documents with employers without your consent.
                </p>
              </div>
            </CardContent>
            <CardFooter className="p-8 pt-0">
              <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold" onClick={() => setStep(2)}>
                Continue
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8">
              <CardTitle>Upload Document</CardTitle>
              <CardDescription>Please upload a clear photo of your {docType.replace('_', ' ')}</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-4 hover:border-indigo-300 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Front Side</p>
                    <p className="text-xs text-slate-500">Click to capture or upload</p>
                  </div>
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-4 hover:border-indigo-300 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Back Side</p>
                    <p className="text-xs text-slate-500">Click to capture or upload</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-900">Requirements:</p>
                <ul className="text-xs text-slate-500 space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> All four corners of the document must be visible</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Text must be clear and readable</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Avoid glare and shadows</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="p-8 pt-0 flex gap-3">
              <Button variant="outline" className="flex-1 h-12 rounded-xl font-bold" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button className="flex-[2] h-12 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold" onClick={handleUpload} disabled={loading}>
                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...</> : 'Submit for Review'}
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden text-center">
            <CardContent className="p-12 space-y-6">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-100">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Verification Pending</h2>
                <p className="text-slate-500 max-w-sm mx-auto">
                  We've received your documents. Our team will review them within 24-48 hours. You'll receive a notification once verified.
                </p>
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-12 h-12 font-bold" onClick={() => navigate('/profile')}>
                Back to Profile
              </Button>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

function Globe({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}
