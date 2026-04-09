import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Search, 
  Bookmark, 
  Briefcase, 
  User, 
  LogOut, 
  Menu,
  Bell,
  Building2,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

export default function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/onboarding');
  };

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Saved', path: '/saved-jobs', icon: Bookmark },
    { label: 'Applied', path: '/applied-jobs', icon: Briefcase },
    { label: 'Following', path: '/followed-businesses', icon: Building2 },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Desktop Header - Sticky, Mobile Header - Static */}
      <header className="md:sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
              C
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              CheckR
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </Button>
                <Avatar className="w-9 h-9 border-2 border-primary/10">
                  <AvatarImage src={user.avatarUrl || ''} />
                  <AvatarFallback className="bg-primary/5 text-primary font-medium">
                    {user.fullName?.[0] || user.email?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="hidden md:flex">
                  <LogOut className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md">
                  Sign In
                </Button>
              </Link>
            )}

            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="w-6 h-6" />
                  </Button>
                }
              />
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-4 px-4 py-3 rounded-xl transition-colors",
                        location.pathname === item.path 
                          ? "bg-primary/10 text-primary font-semibold" 
                          : "hover:bg-muted text-muted-foreground"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  ))}
                  <Separator className="my-2" />
                  <Link
                    to="/contact"
                    className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground transition-colors"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Contact Support
                  </Link>
                  {user && (
                    <Button 
                      variant="ghost" 
                      className="justify-start gap-4 px-4 py-3 h-auto font-normal text-muted-foreground hover:text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 pb-24 md:pb-8">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
        <nav className="bg-white/90 backdrop-blur-xl border border-white/20 px-6 h-16 flex items-center justify-between rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center justify-center w-12 h-12"
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    y: isActive ? -4 : 0,
                  }}
                  className={cn(
                    "transition-colors duration-300",
                    isActive ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <item.icon className={cn("w-6 h-6", isActive && "stroke-[2.5px]")} />
                </motion.div>
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute -bottom-1 w-1.5 h-1.5 bg-indigo-600 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.6)]"
                    />
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
