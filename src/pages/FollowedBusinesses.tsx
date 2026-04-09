import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, MapPin, Users, ChevronRight, Globe, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { dataService } from '@/services/dataService';
import { Business } from '@/services/mockData';

export default function FollowedBusinesses() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowed = async () => {
      const data = await dataService.getFollowedBusinesses();
      setBusinesses(data);
      setLoading(false);
    };
    fetchFollowed();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 md:pb-0">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Followed Businesses</h1>
        <p className="text-slate-500">Stay updated with companies you're interested in</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-3xl" />
          ))
        ) : businesses.length > 0 ? (
          businesses.map((business, i) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="group border-none shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 rounded-3xl overflow-hidden border border-slate-100">
                <CardContent className="p-6 flex items-center gap-6">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors flex-shrink-0 overflow-hidden">
                    <img src={business.logoUrl} alt={business.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{business.name}</h3>
                      <Button variant="outline" size="sm" className="rounded-xl text-xs font-bold border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                        Following
                      </Button>
                    </div>
                    <p className="text-slate-500 font-medium text-sm mb-3 line-clamp-1">{business.description}</p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center text-slate-400 text-xs font-medium">
                        <Building2 className="w-3.5 h-3.5 mr-1.5" />
                        {business.industry}
                      </div>
                      <div className="flex items-center text-slate-400 text-xs font-medium">
                        <Users className="w-3.5 h-3.5 mr-1.5" />
                        {business.employeeCount} employees
                      </div>
                      <div className="flex items-center text-indigo-600 text-xs font-bold hover:underline cursor-pointer">
                        <Globe className="w-3.5 h-3.5 mr-1.5" />
                        {business.website}
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-indigo-600 transition-colors hidden md:block" />
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 space-y-4 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <Building2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">No followed businesses</h3>
              <p className="text-slate-500 max-w-xs mx-auto">Follow companies to get notified about their latest job openings and news.</p>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-8 mt-4">
              Discover Companies
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
