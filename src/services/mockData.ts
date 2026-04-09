export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  avatarUrl?: string;
  bio?: string;
  education?: string;
  experience?: string;
  skills?: string[];
  projects?: string;
  products?: string;
  cvUrl?: string;
  ekycStatus: 'none' | 'pending' | 'verified' | 'rejected';
  createdAt: any;
  role: 'user' | 'admin';
}

export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  location: string;
  salary: string;
  industry: string;
  description: string;
  requirements: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  createdAt: any;
  isFeatured?: boolean;
}

export interface Business {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  industry: string;
  website: string;
  employeeCount: string;
}

export const MOCK_BUSINESSES: Business[] = [
  {
    id: 'b1',
    name: 'TechFlow Systems',
    logoUrl: 'https://picsum.photos/seed/techflow/200',
    description: 'Leading provider of cloud infrastructure and DevOps solutions.',
    industry: 'Technology',
    website: 'techflow.io',
    employeeCount: '500-1000'
  },
  {
    id: 'b2',
    name: 'GreenHorizon',
    logoUrl: 'https://picsum.photos/seed/green/200',
    description: 'Sustainable energy solutions for a better tomorrow.',
    industry: 'Renewable Energy',
    website: 'greenhorizon.com',
    employeeCount: '200-500'
  },
  {
    id: 'b3',
    name: 'Nexus Finance',
    logoUrl: 'https://picsum.photos/seed/nexus/200',
    description: 'Modern banking and investment platform for the digital age.',
    industry: 'Fintech',
    website: 'nexusfin.com',
    employeeCount: '1000+'
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: 'j1',
    title: 'Senior Frontend Engineer',
    companyName: 'TechFlow Systems',
    companyLogo: 'https://picsum.photos/seed/techflow/200',
    location: 'San Francisco, CA',
    salary: '$140k - $180k',
    industry: 'Technology',
    type: 'Full-time',
    description: 'We are looking for an experienced Frontend Engineer to lead our core product team. You will be responsible for building high-performance web applications using React and TypeScript.',
    requirements: '• 5+ years of experience with React\n• Strong TypeScript skills\n• Experience with Tailwind CSS and shadcn/ui\n• Excellent communication skills',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    isFeatured: true
  },
  {
    id: 'j2',
    title: 'Product Designer',
    companyName: 'Nexus Finance',
    companyLogo: 'https://picsum.photos/seed/nexus/200',
    location: 'Remote',
    salary: '$110k - $150k',
    industry: 'Fintech',
    type: 'Remote',
    description: 'Join our design team to create beautiful and intuitive financial products. You will work closely with product managers and engineers to deliver world-class user experiences.',
    requirements: '• 3+ years of UX/UI design experience\n• Proficiency in Figma\n• Strong portfolio demonstrating product thinking\n• Experience with design systems',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    isFeatured: true
  },
  {
    id: 'j3',
    title: 'Sustainability Consultant',
    companyName: 'GreenHorizon',
    companyLogo: 'https://picsum.photos/seed/green/200',
    location: 'Austin, TX',
    salary: '$90k - $120k',
    industry: 'Renewable Energy',
    type: 'Full-time',
    description: 'Help our clients transition to sustainable energy practices. You will conduct environmental audits and provide strategic recommendations for carbon footprint reduction.',
    requirements: '• Degree in Environmental Science or related field\n• 2+ years of consulting experience\n• Passion for sustainability\n• Analytical mindset',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    isFeatured: false
  },
  {
    id: 'j4',
    title: 'Backend Developer (Node.js)',
    companyName: 'TechFlow Systems',
    companyLogo: 'https://picsum.photos/seed/techflow/200',
    location: 'New York, NY',
    salary: '$130k - $170k',
    industry: 'Technology',
    type: 'Contract',
    description: 'Looking for a Node.js expert to help us scale our microservices architecture. You will be working on high-traffic APIs and real-time data processing pipelines.',
    requirements: '• Expert knowledge of Node.js and Express\n• Experience with PostgreSQL and Redis\n• Understanding of Docker and Kubernetes\n• 4+ years of backend experience',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    isFeatured: false
  },
  {
    id: 'j5',
    title: 'Marketing Manager',
    companyName: 'Nexus Finance',
    companyLogo: 'https://picsum.photos/seed/nexus/200',
    location: 'London, UK',
    salary: '£60k - £85k',
    industry: 'Fintech',
    type: 'Full-time',
    description: 'Drive growth for our European market. You will be responsible for multi-channel marketing campaigns, brand positioning, and user acquisition strategies.',
    requirements: '• 5+ years of marketing experience in Fintech\n• Proven track record of successful campaigns\n• Strong analytical skills\n• Experience with SEO/SEM',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    isFeatured: false
  }
];
