export interface ResumeContactItem {
  label: string
  value: string
  href?: string
}

export interface ResumeExperienceItem {
  role: string
  organization: string
  location?: string
  dateRange: string
  bullets: string[]
}

export interface ResumeProjectItem {
  title: string
  techStack: string
  bullets: string[]
}

export interface ResumeData {
  name: string
  title: string
  contacts: ResumeContactItem[]
  summary: string
  skills: {
    category: string
    items: string[]
  }[]
  experience: ResumeExperienceItem[]
  projects: ResumeProjectItem[]
  education: {
    school: string
    degree: string
    dateRange: string
  }[]
  achievements: string[]
  additional: string[]
}

export const resumeData: ResumeData = {
  name: 'Estanislao Jose B. Suarez Jr.',
  title: 'Full-Stack Software Engineer | Mobile Developer | IoT Systems Builder',
  contacts: [
    { label: 'Email', value: 'suarezestanislaojose@gmail.com', href: 'mailto:suarezestanislaojose@gmail.com' },
    { label: 'Phone', value: '+63 951 168 2096', href: 'tel:+639511682096' },
    { label: 'Location', value: 'Philippines' },
    { label: 'GitHub', value: 'https://github.com/ArtisTechs', href: 'https://github.com/ArtisTechs' },
    { label: 'LinkedIn', value: 'https://www.linkedin.com/in/ej-suarez-jr-015818258/', href: 'https://www.linkedin.com/in/ej-suarez-jr-015818258/' },
  ],
  summary:
    'Full-stack software engineer focused on Angular, Ionic Angular, React Native, Spring Boot, REST APIs, mobile apps, IoT systems, and production-ready delivery. Builds maintainable web and mobile applications with responsive UI, backend integrations, testing support, and practical engineering decisions.',
  skills: [
    { category: 'Frontend', items: ['Angular', 'Ionic Angular', 'React', 'TypeScript', 'HTML5', 'CSS Modules', 'Responsive Design'] },
    { category: 'Backend', items: ['Spring Boot', 'Node.js', 'Express', 'REST APIs', 'WebSocket', 'API Integration', 'Java'] },
    { category: 'Mobile', items: ['React Native', 'Expo', 'Ionic Angular', 'Android Studio', 'Mobile Development', 'Google Play Store'] },
    { category: 'Database', items: ['MySQL', 'PostgreSQL', 'Firebase'] },
    { category: 'IoT/Embedded', items: ['Arduino', 'ESP32', 'MQTT', 'Sensor Integration', 'Embedded Systems', 'Device Communication'] },
    { category: 'Cloud & Deployment', items: ['Railway', 'Firebase Hosting', 'Production Deployments', 'Environment Configuration'] },
    { category: 'Tools & Methodologies', items: ['Git', 'GitHub', 'Postman', 'Figma', 'Agile', 'Scrum', 'QA Testing', 'Sprint Planning'] },
  ],
  experience: [
    {
      role: 'Software Engineer',
      organization: 'Eclectus Technologies Inc.',
      dateRange: '2023 - Present',
      bullets: [
        'Built and maintained Angular and Ionic Angular applications for web and mobile enterprise workflows.',
        'Developed responsive UI, reusable modules, validation flows, API integrations, and mobile-ready screens.',
        'Delivered bug fixes, enhancements, regression updates, QA support, and release-ready production features.',
        'Worked with QA and development teams through sprint planning, issue triage, and Agile/Scrum delivery.',
      ],
    },
  ],
  projects: [
    {
      title: 'Smart Farming Web Dashboard',
      techStack: 'Angular, TypeScript, IoT Data Visualization, Dashboard UI, Responsive Web UI',
      bullets: [
        'Led frontend development for farm monitoring dashboards covering sensor data, alerts, and field activity.',
        'Built reusable Angular widgets, monitoring views, alert components, side panels, and responsive layouts.',
        'Structured the UI for maintainability, dynamic data rendering, and future API integration.',
      ],
    },
    {
      title: 'Capataz',
      techStack: 'Angular, Ionic Angular, TypeScript, REST API Integration, WebSocket UI, Responsive Enterprise UI',
      bullets: [
        'Built frontend web and mobile modules for attendance, DTR, geofencing, kiosks, requests, approvals, and scheduling.',
        'Integrated REST API data, WebSocket/STOMP-driven UI updates, dynamic forms, reusable components, attachments, and local caching.',
        'Implemented frontend behavior for flexible shifts, overtime views, break handling, auto check-out states, and facility validation feedback.',
      ],
    },
    {
      title: 'Pawner In Care Pet Care Management App',
      techStack: 'React Native, Expo, Node.js, Express, Firebase, TypeScript, JavaScript, Android',
      bullets: [
        'Built a full-stack pet care management application for pet-related services, customer interactions, and operational workflows.',
        'Handled frontend and backend development, system architecture, responsive UI, API integration, database handling, and deployment preparation.',
        'Delivered a maintainable, scalable platform aligned with client requirements, usability expectations, and target deadlines.',
      ],
    },
  ],
  education: [
    {
      school: 'STI College San Fernando',
      degree: 'Bachelor of Science in Computer Engineering',
      dateRange: 'Graduated 2023',
    },
  ],
  achievements: [
    'Main developer for capstone and software engineering projects, covering implementation, architecture, and integration.',
    'Cum Laude graduate and consistent Dean\'s Lister.',
    'Completed Huawei certification exam.',
    'Academic honors recipient and school graphic design contest winner.',
  ],
  additional: [
    'Maintains 35 GitHub repositories and has completed 20 successful freelance projects.',
    'Open to full-time and freelance work in full-stack engineering, mobile development, APIs, IoT, and embedded systems.',
  ],
}
