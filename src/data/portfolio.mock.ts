import type { PortfolioData } from '../types/portfolio.types'
import smartFarmingImage from '../assets/projects/smart-farming.svg'
import notiMedImage from '../assets/projects/notimed.svg'
import riceDispenserImage from '../assets/projects/rice-dispenser.svg'
import faceAttendanceImage from '../assets/projects/face-attendance.svg'
import enrollmentImage from '../assets/projects/enrollment.svg'
import trashSegregationImage from '../assets/projects/trash-segregation.svg'

export const portfolioMock: PortfolioData = {
  profile: {
    name: 'EJ Suarez',
    headline: 'Full-Stack Developer | Mobile & IoT Builder | Frontend Developer | Backend Developer',
    intro:
      'I build reliable digital products across web, mobile, backend APIs, and IoT systems with a strong focus on clean architecture and practical user value.',
    email: 'suarezestanislaojose@gmail.com',
    mobile: '+63 9XX XXX XXXX',
    location: 'Philippines',
    availability: 'Open for freelance and full-time opportunities',
    focusAreas: ['Web development', 'Mobile development', 'Backend development', 'IoT / Arduino / ESP32 projects', 'System development'],
  },
  socialLinks: [
    { label: 'GitHub', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Facebook', href: '#' },
  ],
  skills: [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'CSS Modules', 'HTML5'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'REST API', 'Java'] },
    { category: 'Mobile', items: ['React Native', 'Expo', 'Android Studio'] },
    { category: 'Database', items: ['PostgreSQL', 'MySQL', 'Firebase'] },
    { category: 'IoT / Hardware', items: ['Arduino', 'ESP32', 'Sensor Integration', 'MQTT'] },
    { category: 'Tools', items: ['Git', 'GitHub', 'Postman', 'Figma'] },
  ],
  experience: [
    {
      role: 'Full-Stack Developer Intern',
      organization: 'Tech Solutions Team',
      dateRange: '2025 - 2026',
      description: 'Contributed to internal dashboards and API services with responsive frontend implementation and backend integration.',
    },
    {
      role: 'Capstone Lead Developer',
      organization: 'University Project Team',
      dateRange: '2024 - 2025',
      description: 'Led end-to-end design and implementation of IoT-enabled monitoring and control prototypes for real-world use cases.',
    },
    {
      role: 'Freelance Developer',
      organization: 'Independent Clients',
      dateRange: '2023 - Present',
      description: 'Built system modules, UI implementations, and API-connected tools tailored to business and academic requirements.',
    },
  ],
  projects: [
    { title: 'Smart Farming Web Dashboard', description: 'A monitoring dashboard for crop environment data, device controls, and analytics.', techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'], category: 'Web', imageUrl: smartFarmingImage, githubUrl: '#', demoUrl: '#' },
    { title: 'NotiMed Reminder App', description: 'Medication reminder app with schedule tracking and adherence notifications.', techStack: ['React Native', 'Expo', 'Firebase'], category: 'Mobile', imageUrl: notiMedImage, githubUrl: '#', demoUrl: '#' },
    { title: 'Rice Dispenser System', description: 'IoT-enabled rice dispensing system with mobile/web control and refill alerts.', techStack: ['ESP32', 'Arduino', 'MQTT'], category: 'IoT', imageUrl: riceDispenserImage, githubUrl: '#', demoUrl: '#' },
    { title: 'Face Recognition Attendance App', description: 'Attendance tool with face verification and exportable attendance records.', techStack: ['Python', 'OpenCV', 'Flask'], category: 'Backend', imageUrl: faceAttendanceImage, githubUrl: '#', demoUrl: '#' },
    { title: 'Online Enrollment System', description: 'End-to-end enrollment workflow with role-based access and reporting.', techStack: ['React', 'Node.js', 'MySQL'], category: 'Web', imageUrl: enrollmentImage, githubUrl: '#', demoUrl: '#' },
    { title: 'IoT Trash Segregation Prototype', description: 'Sensor-assisted waste segregation prototype with status dashboard.', techStack: ['ESP32', 'Arduino', 'React'], category: 'IoT', imageUrl: trashSegregationImage, githubUrl: '#', demoUrl: '#' },
  ],
  services: [
    { title: 'Web App Development', description: 'Responsive and maintainable web applications using modern frontend stacks.' },
    { title: 'Mobile App Development', description: 'Cross-platform mobile apps focused on usability and performance.' },
    { title: 'Backend API Development', description: 'Scalable APIs and service layers with clean, test-ready architecture.' },
    { title: 'IoT Prototyping', description: 'Rapid prototyping for Arduino/ESP32 solutions with cloud or local dashboards.' },
    { title: 'Thesis / Capstone Assistance', description: 'Guidance on architecture, implementation, and technical documentation.' },
    { title: 'UI Implementation', description: 'Pixel-conscious UI implementation from design files into production code.' },
  ],
}
