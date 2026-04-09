import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { MessageSquare, Send, Mail, User, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const { user } = useAuth();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mocking the message submission since Firebase is removed
      console.log('Message submitted:', {
        userId: user?.uid || 'anonymous',
        email: user?.email || 'anonymous',
        subject,
        message,
        createdAt: new Date(),
      });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Message sent! We will get back to you soon.');
      setSubject('');
      setMessage('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Get in Touch</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Have questions or feedback? We're here to help you navigate your career journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <Card className="border-none shadow-lg shadow-indigo-100/50 bg-indigo-600 text-white">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Email Us</h3>
                  <p className="text-indigo-100 text-sm">support@checkr.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Live Chat</h3>
                  <p className="text-indigo-100 text-sm">Available 9am - 5pm EST</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Help Center</h3>
                  <p className="text-indigo-100 text-sm">Browse our FAQ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form */}
        <div className="md:col-span-2">
          <Card className="border-none shadow-xl shadow-indigo-100/50">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll respond as soon as possible.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input id="name" placeholder="Your name" className="pl-10" defaultValue={user?.fullName || ''} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input id="email" type="email" placeholder="your@email.com" className="pl-10" defaultValue={user?.email || ''} />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="What is this regarding?" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we help you?" 
                    className="min-h-[150px] resize-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50/50 border-t p-6">
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto ml-auto bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 px-8 h-11 shadow-lg shadow-indigo-200"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  {!loading && <Send className="ml-2 w-4 h-4" />}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
