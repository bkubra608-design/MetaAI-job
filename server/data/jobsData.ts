import { Job } from '../../src/types.js';

export const LINKEDIN_JOBS_DATASET: Job[] = [
  {
    id: 'job-001',
    title: 'Full Stack Developer',
    company: 'TechVision Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&auto=format&fit=crop&q=80',
    location: 'Lahore',
    jobType: 'Full Time',
    experienceLevel: 'Mid Level',
    minExperienceYears: 2,
    salary: '$1,800 - $2,500 / month',
    careerField: 'Web Development',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'TypeScript', 'Git'],
    description: 'TechVision is looking for an experienced Full Stack Developer to build scalable SaaS products. You will work closely with product designers and backend engineers to craft responsive interfaces and high-throughput RESTful services.',
    responsibilities: [
      'Architect and build full-stack web applications using React, Node.js, and TypeScript',
      'Design and optimize MongoDB database schemas and indexing structures',
      'Collaborate with UI/UX designers to translate Figma mockups into pixel-perfect components',
      'Write clean, maintainable, and thoroughly tested code with CI/CD integration'
    ],
    requirements: [
      '2+ years of professional full-stack development experience',
      'Strong proficiency in JavaScript (ES6+), TypeScript, React, and Node.js',
      'Hands-on experience with MongoDB or PostgreSQL databases',
      'Familiarity with REST APIs, state management, and Git version control'
    ],
    preferredQualifications: [
      'Experience with Docker, AWS/GCP cloud deployments',
      'Knowledge of Next.js or GraphQL'
    ],
    benefits: [
      'Competitive salary with biannual reviews',
      'Health insurance for employee and immediate family',
      'Annual learning stipend and certification reimbursement',
      'Flexible hybrid working model'
    ],
    educationRequirement: "Bachelor's in Computer Science, Software Engineering, or related field",
    postedDate: '2026-08-28',
    source: 'LinkedIn Job Dataset',
    department: 'Engineering',
    applicantCount: 42
  },
  {
    id: 'job-002',
    title: 'Senior Frontend Developer',
    company: 'ByteWave Interactive',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&auto=format&fit=crop&q=80',
    location: 'Remote',
    jobType: 'Remote',
    experienceLevel: 'Senior',
    minExperienceYears: 4,
    salary: '$3,200 - $4,500 / month',
    careerField: 'Software Engineering',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux', 'Performance Optimization'],
    description: 'ByteWave is looking for a Senior Frontend Developer to lead client-side web architecture for high-traffic media portals. You will drive performance optimization, accessibility standards, and state-of-the-art animations.',
    responsibilities: [
      'Lead front-end engineering for enterprise web applications with millions of monthly visitors',
      'Mentor junior and mid-level engineers and conduct comprehensive code reviews',
      'Optimize Core Web Vitals, page load times, and rendering pipelines',
      'Maintain an internal design system built on React and Tailwind CSS'
    ],
    requirements: [
      '4+ years of dedicated front-end experience with React and TypeScript',
      'In-depth knowledge of DOM rendering, web performance, and browser APIs',
      'Expertise in responsive design and modern CSS methodologies'
    ],
    preferredQualifications: [
      'Experience with WebSockets, WebGL, or Canvas animations',
      'Contributions to open-source UI libraries'
    ],
    benefits: [
      '100% remote work worldwide flexibility',
      'Home office setup allowance ($1,500)',
      'Unlimited paid time off (PTO) policy',
      'Equity options pool participation'
    ],
    educationRequirement: "Bachelor's degree or equivalent practical experience",
    postedDate: '2026-08-29',
    source: 'LinkedIn Job Dataset',
    department: 'Frontend Engineering',
    applicantCount: 78
  },
  {
    id: 'job-003',
    title: 'AI / Machine Learning Engineer',
    company: 'Apex AI Labs',
    companyLogo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=128&auto=format&fit=crop&q=80',
    location: 'Islamabad',
    jobType: 'Full Time',
    experienceLevel: 'Mid Level',
    minExperienceYears: 2,
    salary: '$2,200 - $3,500 / month',
    careerField: 'Artificial Intelligence',
    skills: ['Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'NLP', 'Docker'],
    description: 'Join Apex AI Labs to design and deploy state-of-the-art machine learning models for computer vision and large language model (LLM) workflows. You will take research prototypes into low-latency production microservices.',
    responsibilities: [
      'Train, fine-tune, and evaluate deep learning models using PyTorch and HuggingFace',
      'Implement RAG (Retrieval-Augmented Generation) pipelines and vector database indexing',
      'Containerize and deploy ML models onto Kubernetes clusters with GPU acceleration',
      'Monitor model drift, latency, and inference accuracy in live production'
    ],
    requirements: [
      '2+ years practical ML/Deep Learning engineering experience in Python',
      'Solid foundation in linear algebra, statistics, and neural network architectures',
      'Familiarity with PyTorch, TensorFlow, Scikit-learn, and Pandas'
    ],
    preferredQualifications: [
      'Experience with LLM fine-tuning, LoRA, and quantization',
      'Published research papers in CV/NLP or winning Kaggle competitions'
    ],
    benefits: [
      'Access to dedicated GPU compute clusters (H100/A100)',
      'Annual tech conference attendance sponsorship',
      'Comprehensive medical and dental coverage',
      'Performance bonus up to 20% of base salary'
    ],
    educationRequirement: "Master's or Bachelor's in Computer Science, Data Science, or AI",
    postedDate: '2026-08-30',
    source: 'LinkedIn Job Dataset',
    department: 'AI Research & Deployment',
    applicantCount: 65
  },
  {
    id: 'job-004',
    title: 'Data Scientist & Analytics Specialist',
    company: 'DataPulse Analytics',
    companyLogo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=128&auto=format&fit=crop&q=80',
    location: 'Karachi',
    jobType: 'Full Time',
    experienceLevel: 'Mid Level',
    minExperienceYears: 2,
    salary: '$1,700 - $2,600 / month',
    careerField: 'Data Science',
    skills: ['Python', 'SQL', 'Machine Learning', 'Pandas', 'Tableau', 'Statistics', 'Git'],
    description: 'DataPulse Analytics empowers enterprise banking and e-commerce clients with predictive business intelligence. We need a Data Scientist to build predictive churn models, cohort analyses, and executive data dashboards.',
    responsibilities: [
      'Extract, clean, and analyze high-volume transactional data from SQL data warehouses',
      'Develop regression, classification, and clustering algorithms to forecast consumer behavior',
      'Create interactive data visualization dashboards in Tableau and Streamlit',
      'Present findings and strategic growth recommendations to C-suite stakeholders'
    ],
    requirements: [
      '2+ years experience in applied data science and statistical modeling',
      'Advanced SQL scripting and query optimization skills',
      'Proficiency with Python data stack (NumPy, Pandas, Matplotlib, Scikit-learn)'
    ],
    preferredQualifications: [
      'Experience with Snowflake, BigQuery, or dbt data pipelines',
      'Knowledge of A/B testing statistical frameworks'
    ],
    benefits: [
      'Competitive compensation package with annual increments',
      'Subsidized cafeteria and wellness gym membership',
      'Transportation allowance or company shuttle service'
    ],
    educationRequirement: "Bachelor's in Data Science, Statistics, Mathematics, or CS",
    postedDate: '2026-08-25',
    source: 'LinkedIn Job Dataset',
    department: 'Business Intelligence',
    applicantCount: 39
  },
  {
    id: 'job-005',
    title: 'Junior Backend Engineer',
    company: 'CloudScale Systems',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&auto=format&fit=crop&q=80',
    location: 'Lahore',
    jobType: 'Full Time',
    experienceLevel: 'Junior',
    minExperienceYears: 1,
    salary: '$1,000 - $1,600 / month',
    careerField: 'Software Engineering',
    skills: ['Node.js', 'Express', 'MongoDB', 'SQL', 'JavaScript', 'Git'],
    description: 'Are you an energetic backend developer with a passion for scalable APIs? CloudScale is expanding its core infrastructure team. You will work on payment gateway integrations, microservices, and database indexing.',
    responsibilities: [
      'Develop secure RESTful API endpoints using Node.js and Express',
      'Write database migrations, queries, and schema validators for SQL and NoSQL databases',
      'Implement authentication flows (JWT, OAuth) and role-based permissions',
      'Debug backend errors and write unit tests'
    ],
    requirements: [
      '1+ years experience or strong academic/internship background in backend Node.js',
      'Sound understanding of REST architecture, HTTP methods, and asynchronous programming',
      'Familiarity with Git branching workflows and relational databases'
    ],
    preferredQualifications: [
      'Basic knowledge of Redis caching and Docker containers',
      'Experience with TypeScript'
    ],
    benefits: [
      'Structured mentorship program with senior principal engineers',
      'Fast-track career advancement path',
      'Daily catered gourmet lunch and snacks'
    ],
    educationRequirement: "Bachelor's in Computer Science or Software Engineering",
    postedDate: '2026-08-29',
    source: 'LinkedIn Job Dataset',
    department: 'Backend Platform',
    applicantCount: 94
  },
  {
    id: 'job-006',
    title: 'Cybersecurity Analyst',
    company: 'SecureNet Defense',
    companyLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=128&auto=format&fit=crop&q=80',
    location: 'Islamabad',
    jobType: 'Full Time',
    experienceLevel: 'Mid Level',
    minExperienceYears: 3,
    salary: '$2,000 - $3,000 / month',
    careerField: 'Cybersecurity',
    skills: ['Cybersecurity', 'Network Security', 'Python', 'Linux', 'SIEM', 'Penetration Testing'],
    description: 'Protect critical financial infrastructure against sophisticated cyber threats. SecureNet Defense is hiring a Security Analyst to monitor SOC alerts, perform vulnerability assessments, and conduct incident response simulations.',
    responsibilities: [
      'Monitor real-time SIEM alerts and investigate potential intrusion attempts',
      'Perform regular vulnerability scans and penetration tests on web applications and networks',
      'Draft incident response reports and recommend security hardening countermeasures',
      'Ensure compliance with ISO 27001 and SOC 2 security standards'
    ],
    requirements: [
      '3+ years in information security, network defense, or SOC operations',
      'Deep understanding of TCP/IP, firewalls, IDS/IPS, and encryption standards',
      'Hands-on experience with tools like Wireshark, Burp Suite, Nessus, and Splunk'
    ],
    preferredQualifications: [
      'Certifications: CEH, CompTIA Security+, OSCP, or CISSP',
      'Scripting ability in Python or Bash for security automation'
    ],
    benefits: [
      'Security clearance bonus and certification sponsorship',
      'Comprehensive life and health insurance',
      '25 paid vacation days per year'
    ],
    educationRequirement: "Bachelor's in Cybersecurity, Information Assurance, or CS",
    postedDate: '2026-08-26',
    source: 'LinkedIn Job Dataset',
    department: 'InfoSec & SOC',
    applicantCount: 31
  },
  {
    id: 'job-007',
    title: 'UI/UX Product Designer',
    company: 'CreativePixel Studio',
    companyLogo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=128&auto=format&fit=crop&q=80',
    location: 'Remote',
    jobType: 'Remote',
    experienceLevel: 'Mid Level',
    minExperienceYears: 2,
    salary: '$2,000 - $3,200 / month',
    careerField: 'UI/UX',
    skills: ['Figma', 'UI/UX', 'Wireframing', 'Prototyping', 'User Research', 'Design Systems'],
    description: 'Join a world-class remote design team crafting intuitive mobile and web applications for global startups. You will lead user research, wireframing, high-fidelity UI prototyping, and design system governance.',
    responsibilities: [
      'Design responsive web and mobile application interfaces from wireframes to final design specs',
      'Conduct usability tests, interviews, and user feedback sessions to refine user journeys',
      'Build and maintain scalable design systems with reusable components in Figma',
      'Collaborate closely with product managers and front-end developers during handoff'
    ],
    requirements: [
      '2+ years of professional product design (UI/UX) experience with a strong portfolio',
      'Mastery of Figma (auto-layout, components, variants, variables, interactive prototypes)',
      'Solid grasp of typography, visual hierarchy, color theory, and accessibility (WCAG)'
    ],
    preferredQualifications: [
      'Basic understanding of HTML/CSS capabilities and constraints',
      'Experience designing complex SaaS dashboard workflows'
    ],
    benefits: [
      '100% remote schedule with flexible working hours',
      'Latest M3 MacBook Pro + Figma Enterprise license provided',
      'Annual team retreat at international destinations'
    ],
    educationRequirement: "Degree in Interaction Design, Graphic Design, HCI, or equivalent portfolio",
    postedDate: '2026-08-27',
    source: 'LinkedIn Job Dataset',
    department: 'Product Design',
    applicantCount: 112
  },
  {
    id: 'job-008',
    title: 'React Native Mobile Developer',
    company: 'AppMorph Labs',
    companyLogo: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=128&auto=format&fit=crop&q=80',
    location: 'Karachi',
    jobType: 'Hybrid',
    experienceLevel: 'Mid Level',
    minExperienceYears: 2,
    salary: '$1,600 - $2,400 / month',
    careerField: 'Mobile Development',
    skills: ['React Native', 'JavaScript', 'TypeScript', 'React', 'Mobile Development', 'Git'],
    description: 'AppMorph builds cross-platform mobile apps for logistics and on-demand delivery services. We are looking for a skilled React Native developer to deliver fluid, 60fps experiences on iOS and Android.',
    responsibilities: [
      'Develop and publish high-performance iOS and Android applications with React Native',
      'Integrate native device features (GPS geolocation, push notifications, camera, biometric auth)',
      'Optimize app startup time, bundle size, and offline caching mechanisms',
      'Manage app store submission workflows (Apple App Store & Google Play)'
    ],
    requirements: [
      '2+ years building and deploying production apps in React Native',
      'Strong knowledge of JavaScript, TypeScript, and state management (Zustand/Redux)',
      'Familiarity with native bridging and mobile debugging tools'
    ],
    preferredQualifications: [
      'Experience with Expo EAS pipelines',
      'Knowledge of Swift or Kotlin native modules'
    ],
    benefits: [
      'Hybrid schedule (2 days remote, 3 days office in Karachi)',
      'Quarterly performance bonuses',
      'Device testing lab access'
    ],
    educationRequirement: "Bachelor's in Computer Science or Software Engineering",
    postedDate: '2026-08-24',
    source: 'LinkedIn Job Dataset',
    department: 'Mobile Engineering',
    applicantCount: 53
  },
  {
    id: 'job-009',
    title: 'Cloud DevOps Engineer',
    company: 'CloudScale Systems',
    companyLogo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=128&auto=format&fit=crop&q=80',
    location: 'Lahore',
    jobType: 'Full Time',
    experienceLevel: 'Senior',
    minExperienceYears: 4,
    salary: '$2,800 - $4,200 / month',
    careerField: 'Software Engineering',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Linux', 'CI/CD', 'Terraform', 'Python'],
    description: 'We are seeking a Senior DevOps Engineer to manage multi-region cloud infrastructure, automate deployment pipelines, and ensure 99.99% system reliability across our microservices architecture.',
    responsibilities: [
      'Design, provision, and maintain AWS and GCP infrastructure as code using Terraform',
      'Architect robust Kubernetes clusters, Helm charts, and service mesh networking',
      'Build automated CI/CD pipelines via GitHub Actions and GitLab CI',
      'Configure Prometheus, Grafana, and ELK stack for centralized telemetry and alerting'
    ],
    requirements: [
      '4+ years in cloud infrastructure, site reliability engineering, or DevOps roles',
      'Extensive hands-on expertise with AWS (EKS, EC2, RDS, CloudFront, IAM) or GCP',
      'Deep proficiency with Docker containerization and Kubernetes orchestration'
    ],
    preferredQualifications: [
      'AWS Certified Solutions Architect or CKA (Certified Kubernetes Administrator)',
      'Experience managing high-throughput message brokers (Kafka/RabbitMQ)'
    ],
    benefits: [
      'Top-tier compensation package with stock options',
      'Continuous cloud certification exam funding',
      'Premium health coverage including optical and dental'
    ],
    educationRequirement: "Bachelor's in Computer Science, Computer Engineering, or related field",
    postedDate: '2026-08-29',
    source: 'LinkedIn Job Dataset',
    department: 'DevOps & SRE',
    applicantCount: 47
  },
  {
    id: 'job-010',
    title: 'Digital Marketing & Growth Lead',
    company: 'GrowthGenius Media',
    companyLogo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=128&auto=format&fit=crop&q=80',
    location: 'Islamabad',
    jobType: 'Full Time',
    experienceLevel: 'Mid Level',
    minExperienceYears: 3,
    salary: '$1,500 - $2,300 / month',
    careerField: 'Marketing',
    skills: ['Marketing', 'SEO', 'Google Analytics', 'Content Strategy', 'Social Media', 'Data Analysis'],
    description: 'GrowthGenius Media is looking for an analytical Digital Marketing Specialist to lead customer acquisition, paid ad funnels, SEO strategy, and brand growth across international B2B tech markets.',
    responsibilities: [
      'Formulate and execute multi-channel digital marketing campaigns across Google, Meta, and LinkedIn',
      'Conduct keyword research and on-page/off-page SEO optimization to drive organic traffic',
      'Analyze funnel conversion rates and CAC/LTV metrics using Google Analytics 4 and HubSpot',
      'Collaborate with content creators to produce compelling case studies and whitepapers'
    ],
    requirements: [
      '3+ years experience driving digital marketing and user acquisition for tech/SaaS brands',
      'Demonstrated track record of scaling organic traffic and managing profitable ad budgets',
      'Proficiency in Google Ads, Meta Ads Manager, GA4, and SEO tools (Ahrefs/SEMrush)'
    ],
    preferredQualifications: [
      'HubSpot Inbound or Google Analytics certifications',
      'Experience with email automation and drip workflows'
    ],
    benefits: [
      'Performance-based commission on campaign ROI',
      'Flexible working hours with Friday early wrap-up',
      'Annual team holiday trip'
    ],
    educationRequirement: "Bachelor's in Marketing, Business Administration, or Communications",
    postedDate: '2026-08-23',
    source: 'LinkedIn Job Dataset',
    department: 'Growth & Marketing',
    applicantCount: 58
  },
  {
    id: 'job-011',
    title: 'Financial Analyst & Planning Associate',
    company: 'GlobalFin Advisory',
    companyLogo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=128&auto=format&fit=crop&q=80',
    location: 'Karachi',
    jobType: 'Full Time',
    experienceLevel: 'Junior',
    minExperienceYears: 1,
    salary: '$1,200 - $1,800 / month',
    careerField: 'Finance',
    skills: ['Finance', 'Excel', 'Data Analysis', 'Financial Modeling', 'SQL', 'Accounting'],
    description: 'GlobalFin provides corporate financial advisory, valuation, and capital allocation services. We are hiring a Financial Analyst to build financial models, assess investment viability, and assist in audit reviews.',
    responsibilities: [
      'Build dynamic 3-statement financial models and discounted cash flow (DCF) valuations',
      'Conduct monthly budget vs. actual variance analysis for portfolio companies',
      'Prepare investment memos and quarterly investor presentation decks',
      'Analyze industry benchmarks and macroeconomic indicators'
    ],
    requirements: [
      '1+ years of financial modeling and quantitative analysis experience',
      'Advanced proficiency in Microsoft Excel (VLOOKUP, INDEX/MATCH, macros, financial formulas)',
      'Solid understanding of IFRS accounting standards and corporate finance fundamentals'
    ],
    preferredQualifications: [
      'CFA Level 1 or ACCA qualification in progress',
      'Working knowledge of SQL or Power BI for financial dashboards'
    ],
    benefits: [
      'CFA/ACCA study leave and exam registration fee sponsorship',
      'Annual bonus based on corporate deal milestones',
      'Prime location office in Karachi financial district'
    ],
    educationRequirement: "Bachelor's in Finance, Accounting, Economics, or Commerce",
    postedDate: '2026-08-22',
    source: 'LinkedIn Job Dataset',
    department: 'Corporate Finance',
    applicantCount: 71
  },
  {
    id: 'job-012',
    title: 'Software Quality Assurance (QA) Engineer',
    company: 'TechVision Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&auto=format&fit=crop&q=80',
    location: 'Lahore',
    jobType: 'Full Time',
    experienceLevel: 'Mid Level',
    minExperienceYears: 2,
    salary: '$1,400 - $2,100 / month',
    careerField: 'Software Engineering',
    skills: ['QA Testing', 'Selenium', 'JavaScript', 'Python', 'Postman', 'Git', 'Jira'],
    description: 'Ensure rock-solid software quality for enterprise applications. You will create test automation suites, perform rigorous API validations, and partner with developers to catch regressions early.',
    responsibilities: [
      'Design, develop, and maintain automated UI and API test frameworks using Cypress or Selenium',
      'Conduct exploratory, regression, and load testing on web and mobile releases',
      'Document detailed defect reports and track resolution in Jira',
      'Collaborate with developers to establish quality gates in CI/CD build pipelines'
    ],
    requirements: [
      '2+ years in software quality assurance and automated test execution',
      'Hands-on coding skills in JavaScript or Python for test automation scripts',
      'Proficiency with API testing tools (Postman, REST-assured)'
    ],
    preferredQualifications: [
      'ISTQB Certified Tester certification',
      'Experience with performance testing tools (JMeter, k6)'
    ],
    benefits: [
      'Health insurance including hospitalization coverage',
      'Subsidized training programs',
      'Friendly, collaborative engineering culture'
    ],
    educationRequirement: "Bachelor's in Computer Science or Software Engineering",
    postedDate: '2026-08-28',
    source: 'LinkedIn Job Dataset',
    department: 'QA & Engineering',
    applicantCount: 52
  },
  {
    id: 'job-013',
    title: 'Product Manager (B2B SaaS)',
    company: 'Nexus Health Systems',
    companyLogo: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=128&auto=format&fit=crop&q=80',
    location: 'Islamabad',
    jobType: 'Full Time',
    experienceLevel: 'Senior',
    minExperienceYears: 4,
    salary: '$2,800 - $4,000 / month',
    careerField: 'Business',
    skills: ['Product Management', 'Agile', 'Jira', 'User Research', 'Data Analysis', 'Figma'],
    description: 'Nexus Health is revolutionizing clinical healthcare records. We need a seasoned Product Manager to own product roadmap execution, define user stories, and drive customer retention across hospitals and clinics.',
    responsibilities: [
      'Define product vision, strategic roadmap, and quarterly OKRs with executive leadership',
      'Gather and synthesize feedback from doctors, hospital admins, and support teams',
      'Write detailed PRDs, user stories, and acceptance criteria in Jira/Confluence',
      'Work alongside engineering squads in sprint planning, retrospectives, and release launches'
    ],
    requirements: [
      '4+ years of product management experience in B2B SaaS or HealthTech',
      'Strong technical fluency to communicate effectively with engineering architects',
      'Proven ability to analyze user metrics and translate insights into feature roadmaps'
    ],
    preferredQualifications: [
      'Experience with HIPAA or medical compliance standards',
      'Scrum Master or Product Owner (CSPO) certification'
    ],
    benefits: [
      'Equity grant package in high-growth HealthTech enterprise',
      'Executive medical health coverage for family',
      'Company car allowance'
    ],
    educationRequirement: "Bachelor's or Master's in Business, Computer Science, or Engineering",
    postedDate: '2026-08-26',
    source: 'LinkedIn Job Dataset',
    department: 'Product',
    applicantCount: 38
  },
  {
    id: 'job-014',
    title: 'Software Engineering Intern',
    company: 'ByteWave Interactive',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&auto=format&fit=crop&q=80',
    location: 'Remote',
    jobType: 'Internship',
    experienceLevel: 'Internship',
    minExperienceYears: 0,
    salary: '$500 - $800 / month',
    careerField: 'Software Engineering',
    skills: ['JavaScript', 'React', 'HTML5', 'CSS', 'Git', 'Problem Solving'],
    description: 'Kickstart your tech career with ByteWave! Our 3-month paid internship pairs you with a dedicated senior mentor to build real features for our web platform. High-performing interns will receive full-time return offers.',
    responsibilities: [
      'Implement reusable UI components in React and modern CSS',
      'Participate in daily agile standups, sprint reviews, and pair programming sessions',
      'Write bug fixes and unit tests for client-facing features',
      'Present an end-of-internship capstone project to engineering leadership'
    ],
    requirements: [
      'Current student or recent graduate in Computer Science or Software Engineering',
      'Solid programming fundamentals in JavaScript/TypeScript, HTML, and CSS',
      'Eagerness to learn and strong problem-solving mindset'
    ],
    preferredQualifications: [
      'Personal portfolio projects or GitHub contributions',
      'Familiarity with React or Node.js'
    ],
    benefits: [
      'Paid stipend with performance completion bonus',
      'Direct 1-on-1 mentorship from principal architects',
      'Fast-track offer for full-time Associate Software Engineer role'
    ],
    educationRequirement: "Pursuing or completed Bachelor's in CS / IT / Software Engineering",
    postedDate: '2026-08-30',
    source: 'LinkedIn Job Dataset',
    department: 'Early Career',
    applicantCount: 210
  },
  {
    id: 'job-015',
    title: 'Lead Software Architect',
    company: 'GlobalFin Advisory',
    companyLogo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=128&auto=format&fit=crop&q=80',
    location: 'Karachi',
    jobType: 'Full Time',
    experienceLevel: 'Lead',
    minExperienceYears: 6,
    salary: '$4,500 - $6,500 / month',
    careerField: 'Software Engineering',
    skills: ['Java', 'C++', 'Python', 'AWS', 'Docker', 'Kubernetes', 'Microservices', 'SQL'],
    description: 'Direct the technical architecture and engineering standards for enterprise financial transaction processing engines handling tens of billions in monthly volume. You will lead cross-functional squads and architect fault-tolerant distributed systems.',
    responsibilities: [
      'Architect distributed high-availability microservices for core banking transactions',
      'Define engineering standards, architectural blueprints, and security protocols',
      'Drive technology selection, tech-debt elimination, and cloud migration initiatives',
      'Coach staff engineers and align technical roadmap with business strategy'
    ],
    requirements: [
      '6+ years of software engineering leadership in high-throughput enterprise systems',
      'Deep mastery of distributed systems, concurrency, event sourcing, and database sharding',
      'Expertise in Java, C++, or Go with enterprise cloud architectures'
    ],
    preferredQualifications: [
      'Experience in FinTech, high-frequency trading, or banking transaction ledgers',
      'Proven track record scaling systems to millions of concurrent requests'
    ],
    benefits: [
      'Top-tier executive remuneration package with profit-sharing pool',
      'Company executive vehicle and chauffeur allowance',
      'Comprehensive worldwide family medical coverage'
    ],
    educationRequirement: "Master's or Bachelor's in Computer Science or Electrical Engineering",
    postedDate: '2026-08-21',
    source: 'LinkedIn Job Dataset',
    department: 'Core Architecture',
    applicantCount: 22
  },
  {
    id: 'job-016',
    title: 'Human Resources & Talent Acquisition Lead',
    company: 'Apex AI Labs',
    companyLogo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=128&auto=format&fit=crop&q=80',
    location: 'Islamabad',
    jobType: 'Full Time',
    experienceLevel: 'Mid Level',
    minExperienceYears: 3,
    salary: '$1,500 - $2,200 / month',
    careerField: 'HR',
    skills: ['HR', 'Talent Acquisition', 'Recruiting', 'Employee Relations', 'Onboarding', 'Communication'],
    description: 'Apex AI Labs is scaling its international research team. We need an enthusiastic Talent Acquisition and HR Specialist to manage candidate sourcing, technical interviews, employee engagement, and culture initiatives.',
    responsibilities: [
      'Manage full-cycle recruitment for AI researchers, software engineers, and product leaders',
      'Source top-tier candidates via LinkedIn Recruiter and tech university partnerships',
      'Facilitate seamless onboarding and employee orientation experiences',
      'Implement team wellness programs, performance reviews, and retention strategies'
    ],
    requirements: [
      '3+ years in tech recruiting and human resource management',
      'Outstanding interpersonal, negotiation, and written communication skills',
      'Familiarity with ATS software (Greenhouse, Lever) and tech candidate evaluation'
    ],
    preferredQualifications: [
      'SHRM-CP or PHR certification',
      'Experience scaling high-growth technology startups'
    ],
    benefits: [
      'Recruitment placement bonuses',
      'Comprehensive healthcare and wellness packages',
      'Collaborative, high-energy startup atmosphere'
    ],
    educationRequirement: "Bachelor's or Master's in Human Resources, Psychology, or Business",
    postedDate: '2026-08-25',
    source: 'LinkedIn Job Dataset',
    department: 'People & Culture',
    applicantCount: 44
  },
  {
    id: 'job-017',
    title: 'Enterprise B2B Sales Executive',
    company: 'CloudScale Systems',
    companyLogo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=128&auto=format&fit=crop&q=80',
    location: 'Lahore',
    jobType: 'Full Time',
    experienceLevel: 'Mid Level',
    minExperienceYears: 3,
    salary: '$1,800 - $3,000 / month + Commission',
    careerField: 'Sales',
    skills: ['Sales', 'B2B Sales', 'CRM', 'Negotiation', 'Lead Generation', 'Communication'],
    description: 'Drive enterprise cloud adoption across top corporate accounts in the region. You will identify business opportunities, run executive demos, and close multi-year software licensing contracts.',
    responsibilities: [
      'Prospect, qualify, and close high-value enterprise cloud migration deals',
      'Conduct product presentations and pitch proposals to CTOs and procurement directors',
      'Manage sales pipelines, forecasting, and deal stages inside Salesforce CRM',
      'Negotiate terms and coordinate with legal and solutions architecture teams'
    ],
    requirements: [
      '3+ years in B2B SaaS or technology enterprise sales with proven quota achievement',
      'Exceptional consultative selling, relationship building, and presentation skills',
      'Deep understanding of corporate sales cycles and procurement processes'
    ],
    preferredQualifications: [
      'Background in cloud computing or IT infrastructure sales',
      'Existing network of enterprise decision-makers in Pakistan / Middle East'
    ],
    benefits: [
      'Uncapped commission structure with high earning potential',
      'Travel and entertainment expense allowances',
      'Company vehicle or fuel allowance'
    ],
    educationRequirement: "Bachelor's in Business, Marketing, Computer Science, or related field",
    postedDate: '2026-08-27',
    source: 'LinkedIn Job Dataset',
    department: 'Enterprise Sales',
    applicantCount: 36
  },
  {
    id: 'job-018',
    title: 'Python Backend & Data Pipeline Engineer',
    company: 'DataPulse Analytics',
    companyLogo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=128&auto=format&fit=crop&q=80',
    location: 'Peshawar',
    jobType: 'Full Time',
    experienceLevel: 'Mid Level',
    minExperienceYears: 2,
    salary: '$1,500 - $2,300 / month',
    careerField: 'Data Science',
    skills: ['Python', 'SQL', 'FastAPI', 'Docker', 'PostgreSQL', 'Git', 'Data Analysis'],
    description: 'DataPulse is expanding its data engineering center in Peshawar. You will build high-throughput ETL data pipelines, asynchronous FastAPI backend microservices, and automated data validation scripts.',
    responsibilities: [
      'Develop scalable data ingestion services using Python and FastAPI',
      'Build automated ETL pipelines transforming raw JSON and SQL events into clean analytics tables',
      'Optimize database queries and indexes on PostgreSQL and Redis',
      'Implement data quality validation and pipeline health monitoring alerts'
    ],
    requirements: [
      '2+ years backend Python development experience with FastAPI, Flask, or Django',
      'Strong SQL database query construction and optimization skills',
      'Experience with Docker, async IO, and Git version control'
    ],
    preferredQualifications: [
      'Familiarity with Apache Airflow, Celery, or Kafka',
      'Knowledge of AWS S3 and serverless execution'
    ],
    benefits: [
      'Competitive compensation package in Peshawar tech corridor',
      'Biannual bonus reviews and flexible work-from-home options',
      'Family health insurance'
    ],
    educationRequirement: "Bachelor's in Computer Science, Software Engineering, or IT",
    postedDate: '2026-08-28',
    source: 'LinkedIn Job Dataset',
    department: 'Data Engineering',
    applicantCount: 41
  },
  {
    id: 'job-019',
    title: 'Junior UI/UX Designer & Graphic Artist',
    company: 'CreativePixel Studio',
    companyLogo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=128&auto=format&fit=crop&q=80',
    location: 'Quetta',
    jobType: 'Full Time',
    experienceLevel: 'Junior',
    minExperienceYears: 1,
    salary: '$900 - $1,400 / month',
    careerField: 'UI/UX',
    skills: ['Figma', 'UI/UX', 'Adobe Photoshop', 'Wireframing', 'Prototyping', 'Design Systems'],
    description: 'Looking for a passionate junior designer eager to create modern visual assets, web mockups, and mobile screen designs. You will work directly under our senior design directors in Quetta.',
    responsibilities: [
      'Assist in crafting UI mockups, icons, banners, and wireframes in Figma',
      'Maintain design asset libraries and export developer-ready specs',
      'Create engaging social media graphics and marketing landing page visuals',
      'Participate in design critiques and user feedback review sessions'
    ],
    requirements: [
      '1+ years experience or strong design portfolio showcasing UI/UX work',
      'Proficiency in Figma and Adobe Creative Cloud (Photoshop, Illustrator)',
      'Good understanding of visual balance, typography, and responsive grid layouts'
    ],
    preferredQualifications: [
      'Familiarity with mobile app UI patterns on iOS and Android',
      'Basic knowledge of HTML/CSS styling principles'
    ],
    benefits: [
      'Hands-on mentorship from veteran creative directors',
      'Full equipment and workstation provided',
      'Annual career growth progression'
    ],
    educationRequirement: "Degree or Diploma in Graphic Design, Multimedia, or Computer Arts",
    postedDate: '2026-08-26',
    source: 'LinkedIn Job Dataset',
    department: 'Creative Design',
    applicantCount: 68
  },
  {
    id: 'job-020',
    title: 'Full Stack JavaScript Engineer',
    company: 'ByteWave Interactive',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&auto=format&fit=crop&q=80',
    location: 'Remote',
    jobType: 'Remote',
    experienceLevel: 'Mid Level',
    minExperienceYears: 2,
    salary: '$2,400 - $3,600 / month',
    careerField: 'Web Development',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'Docker', 'Git'],
    description: 'ByteWave is hiring a full-time remote Full Stack Engineer to contribute across our React frontends and Node.js backend microservices. We value self-driven problem solvers who love building clean software.',
    responsibilities: [
      'Develop modern web applications using React, TypeScript, Node.js, and MongoDB',
      'Build resilient REST APIs and WebSocket channels for real-time collaborative tools',
      'Write clean, modular code with comprehensive automated tests',
      'Collaborate with distributed international team members across time zones'
    ],
    requirements: [
      '2+ years building commercial web applications in React and Node.js',
      'Strong grasp of TypeScript, modern JavaScript (async/await, ES modules), and Git',
      'Experience designing NoSQL (MongoDB) or SQL relational databases'
    ],
    preferredQualifications: [
      'Familiarity with Docker containerization and AWS/GCP deployments',
      'Experience with Tailwind CSS and state management libraries'
    ],
    benefits: [
      '100% remote flexibility with asynchronous communication',
      'Annual learning and book purchase allowance',
      'Health insurance reimbursement'
    ],
    educationRequirement: "Bachelor's in Computer Science or Software Engineering",
    postedDate: '2026-08-31',
    source: 'LinkedIn Job Dataset',
    department: 'Product Engineering',
    applicantCount: 88
  }
];
