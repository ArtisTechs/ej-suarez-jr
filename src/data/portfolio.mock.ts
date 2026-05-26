import type { PortfolioData } from "../types/portfolio.types";
import smartFarmingImage from "../assets/projects/smart-farming.svg";
import notiMedImage from "../assets/projects/notimed.svg";
import riceDispenserImage from "../assets/projects/rice-dispenser.svg";
import trashSegregationImage from "../assets/projects/trash-segregation.svg";
import pawnerInCareImage from "../assets/projects/pawner-in-care.svg";

export const portfolioMock: PortfolioData = {
  profile: {
    name: "EJ Suarez",
    headline:
      "Full-Stack Developer | Mobile & IoT Builder | Frontend Developer | Backend Developer",
    intro:
      "I build clean, reliable full-stack, mobile, and IoT solutions that turn real-world ideas into practical digital products.",
    about:
      "I am a full-stack developer with hands-on experience shipping production-ready web and mobile apps, plus IoT prototypes that bridge software and hardware. My approach combines practical architecture decisions, maintainable implementation, and close attention to user experience. I am especially driven by projects where technology solves real operational problems and delivers measurable impact.",
    email: "suarezestanislaojose@gmail.com",
    mobile: "+63 951 168 2096",
    location: "Philippines",
    availability: "Open for freelance and full-time opportunities",
    focusAreas: [
      "Full-Stack Development",
      "Web Development",
      "Mobile Development",
      "Backend Development",
      "IoT / Arduino / ESP32 Projects",
      "System Development",
    ],
  },
  socialLinks: [
    { label: "GitHub", href: "https://github.com/ArtisTechs" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ej-suarez-jr-015818258/",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/estanislao.suarez.Jr/",
    },
  ],
  skills: [
    {
      category: "Frontend",
      items: ["React", "TypeScript", "Vite", "CSS Modules", "HTML5"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "REST API", "Java", "Railway"],
    },
    {
      category: "Mobile",
      items: ["React Native", "Expo", "Android Studio", "Google Playstore"],
    },
    { category: "Database", items: ["PostgreSQL", "MySQL", "Firebase"] },
    {
      category: "IoT / Hardware",
      items: ["Arduino", "ESP32", "Sensor Integration", "MQTT"],
    },
    { category: "Tools", items: ["Git", "GitHub", "Postman", "Figma"] },
  ],
  experience: [
    {
      role: "Software Engineer",
      organization: "Eclectus Technologies Inc.",
      dateRange: "2023 - Present",
      description:
        "Developed and maintained web and mobile applications using Angular and Ionic Angular, focusing on responsive frontend implementation, API integration, testing, and system enhancements. Worked within Agile and Scrum environments, participating in sprint planning, QA processes, issue resolution, and collaborative software delivery.",
    },
    {
      role: "Capstone Lead Developer",
      organization: "STI College San Fernando",
      dateRange: "2022 - 2023",
      description:
        "Led the development of a firefighter robot project using Arduino and ESP32 technologies. Served as the lead developer, primary software engineer, and hardware specialist, handling embedded systems programming, hardware integration, sensor implementation, and overall system architecture.",
    },
    {
      role: "Freelance Developer",
      organization: "Independent Clients",
      dateRange: "2024 - Present",
      description:
        "Developed full-stack web and mobile applications tailored to client requirements, including frontend and backend implementation, API integration, deployment to production environments, and system maintenance. Delivered projects within target deadlines while aligning solutions with client business and functional requirements.",
    },
  ],
  projects: [
    {
      title: "Capataz",
      description:
        "Frontend implementation for an enterprise workforce platform covering attendance, scheduling, approvals, requests, and facility-aware operations.",
      techStack: [
        "Angular",
        "Ionic Angular",
        "TypeScript",
        "REST API Integration",
      ],
      category: "Frontend",
      imageUrl:
        "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779782386/Snipaste_2026-05-26_15-51-15_wos3yq.png",
      screenshots: [
        {
          src: "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779782386/Snipaste_2026-05-26_15-51-15_wos3yq.png",
          mode: "web",
        },
        {
          src: "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779782385/Snipaste_2026-05-26_15-55-00_g4li8f.png",
          mode: "web",
        },
        {
          src: "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779782475/701755496_1731254004695676_1213971797490303168_n_pgu5w8.jpg",
          mode: "mobile",
        },
        {
          src: "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779782474/703293351_2065048277753395_610022509049616306_n_eugrrv.jpg",
          mode: "mobile",
        },
        {
          src: "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779782474/701419879_1657628965520687_6151953287149652971_n_gse0ot.jpg",
          mode: "mobile",
        },
      ],
      viewModes: ["web", "mobile"],
      githubUrl: "",
      demoUrl: "",
    },
    {
      title: "Smart Farming Web",
      description:
        "A monitoring dashboard for crop environment data, device controls, and analytics.",
      techStack: ["Angular", "TypeScript", "Thingboard"],
      category: "Web",
      imageUrl:
        "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779783558/Snipaste_2026-05-26_16-13-45_wcobts.png",
      screenshots: [
        {
          src: "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779783557/Snipaste_2026-05-26_16-14-13_ymd4tc.png",
          mode: "web",
        },
        {
          src: "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779783558/Snipaste_2026-05-26_16-14-22_gucxjf.png",
          mode: "web",
        },
        {
          src: "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779783558/Snipaste_2026-05-26_16-14-32_eskffd.png",
          mode: "web",
        },
        {
          src: "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779783558/Snipaste_2026-05-26_16-13-45_wcobts.png",
          mode: "web",
        },
      ],
      viewModes: ["web", "tablet", "mobile"],
      githubUrl: "#",
      demoUrl: "#",
    },
    {
      title: "Pawner In Care",
      description:
        "Full-stack pet care management application for pet services, customer interactions, and operational workflows.",
      techStack: ["React Native", "Expo", "Node.js", "Express", "Firebase"],
      category: "Fullstack",
      imageUrl: pawnerInCareImage,
      screenshots: [
        { src: pawnerInCareImage, mode: "mobile" },
        { src: pawnerInCareImage, mode: "tablet" },
        { src: pawnerInCareImage, mode: "web" },
      ],
      viewModes: ["web", "tablet", "mobile"],
      demoUrl: "https://artistechs.github.io/pawtner-in-care-web",
    },
    {
      title: "Pampanga Flower Shop",
      description:
        "Frontend flower shop concept for product showcases, bouquet customization, and modern online ordering flows.",
      techStack: ["React", "TypeScript", "Vite", "CSS", "GitHub Pages"],
      category: "Frontend",
      imageUrl:
        "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779785355/Snipaste_2026-05-26_16-47-21_ajthwu.png",
      screenshots: [
        {
          src: "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779785355/Snipaste_2026-05-26_16-47-21_ajthwu.png",
          mode: "web",
        },
        {
          src: "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779785357/Snipaste_2026-05-26_16-47-37_zf7wtk.png",
          mode: "web",
        },
        {
          src: "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779785357/Snipaste_2026-05-26_16-47-51_scn9qb.png",
          mode: "web",
        },
        {
          src: "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779785357/Snipaste_2026-05-26_16-47-31_dbjnqi.png",
          mode: "web",
        },
        {
          src: "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779785357/Snipaste_2026-05-26_16-47-37_zf7wtk.png",
          mode: "web",
        },
        {
          src: "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779785356/Snipaste_2026-05-26_16-48-11_evmvzp.png",
          mode: "web",
        },
        {
          src: "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779785356/Snipaste_2026-05-26_16-47-58_rry5vh.png",
          mode: "web",
        },
        {
          src: "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779785356/Snipaste_2026-05-26_16-48-05_zfbz6v.png",
          mode: "web",
        },
        {
          src: "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779785356/Snipaste_2026-05-26_16-48-33_iwyiti.png",
          mode: "web",
        },
        {
          src: "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779785356/Snipaste_2026-05-26_16-48-45_jczm8e.png",
          mode: "web",
        },
        {
          src: "https://res.cloudinary.com/dn2ss9vr7/image/upload/v1779785355/Snipaste_2026-05-26_16-48-56_bceema.png",
          mode: "web",
        },
      ],
      viewModes: ["web", "tablet", "mobile"],
      demoUrl: "https://artistechs.github.io/pampanga-flower-shop/",
    },
    {
      title: "Mindful Mentor",
      description:
        "Full-stack mental wellness platform with React web and Expo mobile apps for accessible cross-device wellness tools.",
      techStack: ["React", "React Native", "Expo", "TypeScript", "JavaScript"],
      category: "Fullstack",
      imageUrl: notiMedImage,
      screenshots: [
        { src: notiMedImage, mode: "web" },
        { src: notiMedImage, mode: "tablet" },
        { src: notiMedImage, mode: "mobile" },
      ],
      viewModes: ["web", "tablet", "mobile"],
    },
    {
      title: "NotiMed Reminder App",
      description:
        "Medication reminder app with schedule tracking and adherence notifications.",
      techStack: ["React Native", "Expo", "Firebase"],
      category: "Mobile",
      imageUrl: notiMedImage,
      screenshots: [
        { src: notiMedImage, mode: "mobile" },
        { src: riceDispenserImage, mode: "tablet" },
        { src: smartFarmingImage, mode: "mobile" },
      ],
      viewModes: ["tablet", "mobile"],
      githubUrl: "#",
      demoUrl: "#",
    },
    {
      title: "Smart Rice Dispenser System",
      description:
        "IoT-enabled rice dispensing system with mobile/web control and refill alerts.",
      techStack: ["ESP32", "Arduino", "MQTT"],
      category: "IoT",
      imageUrl: riceDispenserImage,
      screenshots: [],
      viewModes: ["web"],
      githubUrl: "#",
      demoUrl: "#",
    },
    {
      title: "IoT Trash Segregation Prototype",
      description:
        "Sensor-assisted waste segregation prototype with status dashboard.",
      techStack: ["ESP32", "Arduino", "React"],
      category: "IoT",
      imageUrl: trashSegregationImage,
      screenshots: [
        { src: trashSegregationImage, mode: "web" },
        { src: riceDispenserImage, mode: "tablet" },
        { src: smartFarmingImage, mode: "mobile" },
      ],
      viewModes: ["web", "tablet", "mobile"],
      githubUrl: "#",
      demoUrl: "#",
    },
  ],
  services: [
    {
      title: "Web App Development",
      description:
        "Responsive and maintainable web applications using modern frontend stacks.",
    },
    {
      title: "Mobile App Development",
      description:
        "Cross-platform mobile apps focused on usability and performance.",
    },
    {
      title: "Backend API Development",
      description:
        "Scalable APIs and service layers with clean, test-ready architecture.",
    },
    {
      title: "IoT Prototyping",
      description:
        "Rapid prototyping for Arduino/ESP32 solutions with cloud or local dashboards.",
    },
    {
      title: "Thesis / Capstone Assistance",
      description:
        "Guidance on architecture, implementation, and technical documentation.",
    },
    {
      title: "UI Implementation",
      description:
        "Pixel-conscious UI implementation from design files into production code.",
    },
  ],
  reviews: [
    {
      name: "Capstone Team Lead",
      project: "Smart Farming Web Dashboard",
      rating: 5,
      quote:
        "EJ turned our monitoring requirements into a clean dashboard that made device data easy to read and act on.",
    },
    {
      name: "Mobile App Client",
      project: "NotiMed Reminder App",
      rating: 5,
      quote:
        "The app felt simple for users while still covering schedules, reminders, and the details we needed behind the scenes.",
    },
    {
      name: "Operations Partner",
      project: "Rice Dispenser System",
      rating: 5,
      quote:
        "The prototype connected hardware controls with a practical interface, which helped us test the full workflow quickly.",
    },
    {
      name: "Academic Coordinator",
      project: "Online Enrollment System",
      rating: 5,
      quote:
        "The enrollment flow was organized, reliable, and easy for staff to understand during review and testing.",
    },
    {
      name: "Project Adviser",
      project: "Face Recognition Attendance App",
      rating: 4,
      quote:
        "A solid implementation that handled attendance records clearly and showed strong attention to the verification flow.",
    },
  ],
};
