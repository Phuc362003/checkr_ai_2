import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Upload, 
  FileText,
  Plus,
  X,
  Camera,
  LogOut,
  ChevronRight,
  ArrowLeft,
  Settings,
  Code,
  ShoppingBag,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

type Section = 'main' | 'account' | 'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'products' | 'cv';

export default function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>('main');
  const [profile, setProfile] = useState<any>(user);
  const [saving, setSaving] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [user]);

  const handleUpdate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(profile);
      toast.success('Profile updated successfully!');
      setActiveSection('main');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const addSkill = () => {
    if (!skillInput.trim()) return;
    const currentSkills = profile.skills || [];
    if (currentSkills.includes(skillInput.trim())) return;
    setProfile({ ...profile, skills: [...currentSkills, skillInput.trim()] });
    setSkillInput('');
  };

  const removeSkill = (skill: string) => {
    setProfile({ ...profile, skills: profile.skills.filter((s: string) => s !== skill) });
  };

  if (!user) return null;

  const renderHeader = (title: string) => (
    <div className="flex items-center gap-4 mb-6">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setActiveSection('main')}
        className="rounded-full hover:bg-slate-100"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
    </div>
  );

  const renderMain = () => (
    <div className="space-y-6">
      {/* Profile Summary Card */}
      <Card className="border-none shadow-xl shadow-indigo-100/50 overflow-hidden rounded-3xl">
        <div className="h-24 bg-gradient-to-r from-indigo-600 to-violet-600"></div>
        <CardContent className="relative pt-0 flex flex-col items-center text-center p-6">
          <div className="relative -mt-12 mb-4">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarImage src={profile?.avatarUrl || ''} />
              <AvatarFallback className="text-2xl font-bold bg-slate-100 text-indigo-600">
                {profile?.fullName?.[0] || profile?.email?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full w-8 h-8 shadow-md border-2 border-white">
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          <h2 className="text-xl font-bold text-slate-900">{profile?.fullName || 'User Name'}</h2>
          <p className="text-sm text-slate-500 mb-4">{profile?.email}</p>
          
          <div className="flex items-center gap-2">
            <Badge 
              variant={profile?.ekycStatus === 'verified' ? 'default' : 'secondary'}
              className={cn(
                "capitalize px-3 py-1 rounded-full",
                profile?.ekycStatus === 'verified' ? 'bg-emerald-500' : 'bg-amber-100 text-amber-700'
              )}
            >
              {profile?.ekycStatus === 'verified' ? <ShieldCheck className="w-3 h-3 mr-1" /> : null}
              {profile?.ekycStatus || 'none'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Settings List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-2">Profile Settings</h3>
        
        <div className="bg-white rounded-[2rem] shadow-xl shadow-indigo-100/30 overflow-hidden border border-slate-100">
          {[
            { id: 'account', label: 'Account Information', icon: Lock, color: 'text-blue-500', bg: 'bg-blue-50' },
            { id: 'personal', label: 'Personal Profile (eKYC)', icon: User, color: 'text-indigo-500', bg: 'bg-indigo-50' },
            { id: 'experience', label: 'Work Experience', icon: Briefcase, color: 'text-violet-500', bg: 'bg-violet-50' },
            { id: 'education', label: 'Education', icon: GraduationCap, color: 'text-purple-500', bg: 'bg-purple-50' },
            { id: 'skills', label: 'Skills', icon: Plus, color: 'text-pink-500', bg: 'bg-pink-50' },
            { id: 'projects', label: 'Personal Projects', icon: Code, color: 'text-orange-500', bg: 'bg-orange-50' },
            { id: 'products', label: 'Products', icon: ShoppingBag, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { id: 'cv', label: 'CV Management', icon: FileText, color: 'text-slate-500', bg: 'bg-slate-50' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as Section)}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group border-b border-slate-50 last:border-none"
            >
              <div className="flex items-center gap-4">
                <div className={cn("p-2.5 rounded-xl", item.bg, item.color)}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-semibold text-slate-700">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-all group-hover:translate-x-1" />
            </button>
          ))}
        </div>

        <Button 
          variant="ghost" 
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-red-50 p-4 h-auto rounded-2xl mt-4"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-4" />
          <span className="font-bold">Sign Out</span>
        </Button>
      </div>
    </div>
  );

  const renderAccount = () => (
    <Card className="border-none shadow-xl shadow-indigo-100/50 rounded-3xl">
      <CardContent className="p-6 md:p-8 space-y-6">
        {renderHeader('Account Information')}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input className="pl-10 h-11 rounded-xl bg-slate-50" value={profile?.email} disabled />
            </div>
            <p className="text-[10px] text-slate-400">Email cannot be changed for security reasons.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input 
                id="phone" 
                className="pl-10 h-11 rounded-xl" 
                value={profile?.phoneNumber || ''} 
                onChange={(e) => setProfile({...profile, phoneNumber: e.target.value})}
              />
            </div>
          </div>
          <div className="pt-4">
            <Button variant="outline" className="w-full rounded-xl border-slate-200 text-slate-600">
              Change Password
            </Button>
          </div>
        </div>
        <Button onClick={() => handleUpdate()} className="w-full h-12 bg-indigo-600 rounded-xl" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );

  const renderPersonal = () => (
    <Card className="border-none shadow-xl shadow-indigo-100/50 rounded-3xl">
      <CardContent className="p-6 md:p-8 space-y-6">
        {renderHeader('Personal Profile')}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input 
              id="fullName" 
              className="h-11 rounded-xl" 
              value={profile?.fullName || ''} 
              onChange={(e) => setProfile({...profile, fullName: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">About Me</Label>
            <Textarea 
              id="bio" 
              placeholder="Tell recruiters about yourself..." 
              className="min-h-[120px] resize-none rounded-xl"
              value={profile?.bio || ''}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
            />
          </div>
          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-sm font-bold text-indigo-900">eKYC Verification</p>
                <p className="text-xs text-indigo-700">Status: {profile?.ekycStatus}</p>
              </div>
            </div>
            {profile?.ekycStatus !== 'verified' && (
              <Link to="/ekyc">
                <Button size="sm" className="bg-indigo-600 rounded-lg">Verify</Button>
              </Link>
            )}
          </div>
        </div>
        <Button onClick={() => handleUpdate()} className="w-full h-12 bg-indigo-600 rounded-xl" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );

  const renderExperience = () => (
    <Card className="border-none shadow-xl shadow-indigo-100/50 rounded-3xl">
      <CardContent className="p-6 md:p-8 space-y-6">
        {renderHeader('Work Experience')}
        <div className="space-y-4">
          <Label>Experience Details</Label>
          <Textarea 
            placeholder="Describe your previous roles, responsibilities, and key achievements..." 
            className="min-h-[200px] resize-none rounded-xl"
            value={profile?.experience || ''}
            onChange={(e) => setProfile({...profile, experience: e.target.value})}
          />
          <p className="text-xs text-slate-400 italic">Tip: Use bullet points to make it easier for recruiters to read.</p>
        </div>
        <Button onClick={() => handleUpdate()} className="w-full h-12 bg-indigo-600 rounded-xl" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );

  const renderEducation = () => (
    <Card className="border-none shadow-xl shadow-indigo-100/50 rounded-3xl">
      <CardContent className="p-6 md:p-8 space-y-6">
        {renderHeader('Education')}
        <div className="space-y-4">
          <Label>Academic Background</Label>
          <Textarea 
            placeholder="University, Degree, Graduation Year, Certifications..." 
            className="min-h-[150px] resize-none rounded-xl"
            value={profile?.education || ''}
            onChange={(e) => setProfile({...profile, education: e.target.value})}
          />
        </div>
        <Button onClick={() => handleUpdate()} className="w-full h-12 bg-indigo-600 rounded-xl" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );

  const renderSkills = () => (
    <Card className="border-none shadow-xl shadow-indigo-100/50 rounded-3xl">
      <CardContent className="p-6 md:p-8 space-y-6">
        {renderHeader('Skills')}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input 
              placeholder="Add a skill (e.g. React)" 
              className="h-11 rounded-xl"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            />
            <Button type="button" onClick={addSkill} className="bg-indigo-600 rounded-xl px-6">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile?.skills?.map((skill: string) => (
              <Badge key={skill} className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 text-sm border-none flex items-center gap-1.5 rounded-lg">
                {skill}
                <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => removeSkill(skill)} />
              </Badge>
            ))}
          </div>
        </div>
        <Button onClick={() => handleUpdate()} className="w-full h-12 bg-indigo-600 rounded-xl mt-4" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );

  const renderProjects = () => (
    <Card className="border-none shadow-xl shadow-indigo-100/50 rounded-3xl">
      <CardContent className="p-6 md:p-8 space-y-6">
        {renderHeader('Personal Projects')}
        <div className="space-y-4">
          <Label>Project Showcase</Label>
          <Textarea 
            placeholder="Describe your side projects, open source contributions, or personal work..." 
            className="min-h-[200px] resize-none rounded-xl"
            value={profile?.projects || ''}
            onChange={(e) => setProfile({...profile, projects: e.target.value})}
          />
        </div>
        <Button onClick={() => handleUpdate()} className="w-full h-12 bg-indigo-600 rounded-xl" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );

  const renderProducts = () => (
    <Card className="border-none shadow-xl shadow-indigo-100/50 rounded-3xl">
      <CardContent className="p-6 md:p-8 space-y-6">
        {renderHeader('Products')}
        <div className="space-y-4">
          <Label>Product Portfolio</Label>
          <Textarea 
            placeholder="List any products you've launched, apps you've built, or services you provide..." 
            className="min-h-[200px] resize-none rounded-xl"
            value={profile?.products || ''}
            onChange={(e) => setProfile({...profile, products: e.target.value})}
          />
        </div>
        <Button onClick={() => handleUpdate()} className="w-full h-12 bg-indigo-600 rounded-xl" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );

  const renderCV = () => (
    <Card className="border-none shadow-xl shadow-indigo-100/50 rounded-3xl">
      <CardContent className="p-6 md:p-8 space-y-6">
        {renderHeader('CV Management')}
        <div className="space-y-6">
          {profile?.cvUrl ? (
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <div className="flex items-center gap-4 min-w-0">
                <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600 flex-shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold truncate">my_resume_2024.pdf</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">PDF • 1.2 MB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-destructive flex-shrink-0">
                <X className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Upload className="w-8 h-8 text-indigo-600" />
              </div>
              <h4 className="font-bold text-slate-900">Upload your CV</h4>
              <p className="text-xs text-slate-500 max-w-[200px] mx-auto mt-1 mb-6">Supported formats: PDF, DOCX (Max 5MB)</p>
              <Button className="bg-indigo-600 rounded-xl px-8">
                Choose File
              </Button>
            </div>
          )}
          
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Visibility Settings</h4>
            <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl">
              <div className="space-y-0.5">
                <p className="text-sm font-semibold">Allow recruiters to find me</p>
                <p className="text-[10px] text-slate-500">Your profile will be visible in search results</p>
              </div>
              <div className="w-10 h-6 bg-indigo-600 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <Button onClick={() => handleUpdate()} className="w-full h-12 bg-indigo-600 rounded-xl" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-2xl mx-auto pb-24">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeSection === 'main' && renderMain()}
          {activeSection === 'account' && renderAccount()}
          {activeSection === 'personal' && renderPersonal()}
          {activeSection === 'experience' && renderExperience()}
          {activeSection === 'education' && renderEducation()}
          {activeSection === 'skills' && renderSkills()}
          {activeSection === 'projects' && renderProjects()}
          {activeSection === 'products' && renderProducts()}
          {activeSection === 'cv' && renderCV()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
