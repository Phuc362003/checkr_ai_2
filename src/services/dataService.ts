import { Job, Business, UserProfile, MOCK_JOBS, MOCK_BUSINESSES } from './mockData';

class DataService {
  private users: UserProfile[] = [];
  private currentUser: UserProfile | null = null;
  private applications: any[] = [];
  private savedJobs: string[] = [];
  private followedBusinesses: string[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const storedUsers = localStorage.getItem('checkr_users');
    if (storedUsers) this.users = JSON.parse(storedUsers);

    const storedCurrentUser = localStorage.getItem('checkr_current_user');
    if (storedCurrentUser) this.currentUser = JSON.parse(storedCurrentUser);

    const storedApps = localStorage.getItem('checkr_applications');
    if (storedApps) this.applications = JSON.parse(storedApps);

    const storedSaved = localStorage.getItem('checkr_saved_jobs');
    if (storedSaved) this.savedJobs = JSON.parse(storedSaved);

    const storedFollowed = localStorage.getItem('checkr_followed_businesses');
    if (storedFollowed) this.followedBusinesses = JSON.parse(storedFollowed);
  }

  private saveToStorage() {
    localStorage.setItem('checkr_users', JSON.stringify(this.users));
    localStorage.setItem('checkr_current_user', JSON.stringify(this.currentUser));
    localStorage.setItem('checkr_applications', JSON.stringify(this.applications));
    localStorage.setItem('checkr_saved_jobs', JSON.stringify(this.savedJobs));
    localStorage.setItem('checkr_followed_businesses', JSON.stringify(this.followedBusinesses));
  }

  // Auth Methods
  async register(email: string, password: string, fullName: string): Promise<UserProfile> {
    const existing = this.users.find(u => u.email === email);
    if (existing) throw new Error('User already exists');

    const newUser: UserProfile = {
      uid: Math.random().toString(36).substr(2, 9),
      email,
      fullName,
      ekycStatus: 'none',
      createdAt: new Date(),
      role: 'user'
    };

    this.users.push(newUser);
    this.currentUser = newUser;
    this.saveToStorage();
    return newUser;
  }

  async login(email: string, password: string): Promise<UserProfile> {
    // In a real app, we'd check password. For mock, we just check email.
    const user = this.users.find(u => u.email === email);
    if (!user) throw new Error('User not found');

    this.currentUser = user;
    this.saveToStorage();
    return user;
  }

  async logout() {
    this.currentUser = null;
    this.saveToStorage();
  }

  getCurrentUser() {
    return this.currentUser;
  }

  async updateProfile(updates: Partial<UserProfile>) {
    if (!this.currentUser) return;
    this.currentUser = { ...this.currentUser, ...updates };
    this.users = this.users.map(u => u.uid === this.currentUser?.uid ? this.currentUser : u);
    this.saveToStorage();
  }

  // Job Methods
  async getJobs(): Promise<Job[]> {
    return MOCK_JOBS;
  }

  async getJobById(id: string): Promise<Job | undefined> {
    return MOCK_JOBS.find(j => j.id === id);
  }

  // Application Methods
  async applyToJob(jobId: string) {
    if (!this.currentUser) throw new Error('Must be logged in');
    const existing = this.applications.find(a => a.userId === this.currentUser?.uid && a.jobId === jobId);
    if (existing) return;

    this.applications.push({
      id: Math.random().toString(36).substr(2, 9),
      userId: this.currentUser.uid,
      jobId,
      status: 'pending',
      appliedAt: new Date()
    });
    this.saveToStorage();
  }

  async getApplications(): Promise<any[]> {
    if (!this.currentUser) return [];
    return this.applications
      .filter(a => a.userId === this.currentUser?.uid)
      .map(a => ({
        ...a,
        job: MOCK_JOBS.find(j => j.id === a.jobId)
      }));
  }

  async hasApplied(jobId: string): Promise<boolean> {
    if (!this.currentUser) return false;
    return this.applications.some(a => a.userId === this.currentUser?.uid && a.jobId === jobId);
  }

  // Saved Jobs
  async toggleSaveJob(jobId: string) {
    if (!this.currentUser) throw new Error('Must be logged in');
    if (this.savedJobs.includes(jobId)) {
      this.savedJobs = this.savedJobs.filter(id => id !== jobId);
    } else {
      this.savedJobs.push(jobId);
    }
    this.saveToStorage();
  }

  async getSavedJobs(): Promise<Job[]> {
    return MOCK_JOBS.filter(j => this.savedJobs.includes(j.id));
  }

  async isSaved(jobId: string): Promise<boolean> {
    return this.savedJobs.includes(jobId);
  }

  // Businesses
  async getBusinesses(): Promise<Business[]> {
    return MOCK_BUSINESSES;
  }

  async getBusinessById(id: string): Promise<Business | undefined> {
    return MOCK_BUSINESSES.find(b => b.id === id);
  }

  async toggleFollowBusiness(businessId: string) {
    if (!this.currentUser) throw new Error('Must be logged in');
    if (this.followedBusinesses.includes(businessId)) {
      this.followedBusinesses = this.followedBusinesses.filter(id => id !== businessId);
    } else {
      this.followedBusinesses.push(businessId);
    }
    this.saveToStorage();
  }

  async getFollowedBusinesses(): Promise<Business[]> {
    return MOCK_BUSINESSES.filter(b => this.followedBusinesses.includes(b.id));
  }

  async isFollowing(businessId: string): Promise<boolean> {
    return this.followedBusinesses.includes(businessId);
  }

  // Statistics
  getStats() {
    return {
      totalJobs: 1240,
      activeCompanies: 458,
      successfulPlacements: 892,
      averageSalary: '$95k'
    };
  }
}

export const dataService = new DataService();
