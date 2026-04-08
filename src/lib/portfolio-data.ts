export interface Profile {
  name: string;
  photo: string;
  email: string;
  phone: string;
  about: string;
  linkedin: string;
  github: string;
  course: string;
  college: string;
  resume: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Certificate {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  image: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
}

const DEFAULT_PROFILE: Profile = {
  name: "Priyanka P",
  photo: "",
  email: "priyanka564636@gmail.com",
  phone: "9986343058",
  about: "Passionate BCA student with a strong interest in web development, software engineering, and emerging technologies. Currently pursuing my degree at Christ Academy Institute for Advanced Studies, I am dedicated to building innovative solutions and continuously learning new skills.",
  linkedin: "https://www.linkedin.com/in/priyanka-p-3a3631299/",
  github: "https://github.com/copilot",
  course: "BCA",
  college: "CHRIST ACADEMY INSTITUTE FOR ADVANCED STUDIES",
  resume: "",
};

const DEFAULT_PROJECTS: Project[] = [
  { id: "1", title: "E-Commerce Website", description: "A full-stack e-commerce platform built with React and Node.js featuring cart management, payment integration, and responsive design.", image: "" },
  { id: "2", title: "Weather Dashboard", description: "Real-time weather application with location-based forecasts, interactive maps, and beautiful visualizations.", image: "" },
  { id: "3", title: "Task Manager App", description: "A productivity application with drag-and-drop task boards, team collaboration, and deadline tracking features.", image: "" },
];

const DEFAULT_CERTIFICATES: Certificate[] = [
  { id: "1", title: "Web Development Fundamentals", description: "Completed comprehensive web development course covering HTML, CSS, JavaScript, and React.", image: "" },
  { id: "2", title: "Python Programming", description: "Certified in Python programming with focus on data structures and algorithms.", image: "" },
];

const DEFAULT_INTERNSHIPS: Internship[] = [
  { id: "1", company: "Tech Solutions Pvt Ltd", role: "Web Developer Intern", duration: "3 Months", description: "Developed responsive web applications and collaborated with senior developers on client projects.", image: "" },
];

const DEFAULT_SKILLS: Skill[] = [
  { id: "1", name: "HTML/CSS", level: 90 },
  { id: "2", name: "JavaScript", level: 85 },
  { id: "3", name: "React", level: 80 },
  { id: "4", name: "Python", level: 75 },
  { id: "5", name: "Java", level: 70 },
  { id: "6", name: "SQL", level: 80 },
  { id: "7", name: "Git", level: 75 },
  { id: "8", name: "TypeScript", level: 70 },
];

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

export const getProfile = (): Profile => load("portfolio_profile", DEFAULT_PROFILE);
export const saveProfile = (p: Profile) => save("portfolio_profile", p);

export const getProjects = (): Project[] => load("portfolio_projects", DEFAULT_PROJECTS);
export const saveProjects = (p: Project[]) => save("portfolio_projects", p);

export const getCertificates = (): Certificate[] => load("portfolio_certificates", DEFAULT_CERTIFICATES);
export const saveCertificates = (c: Certificate[]) => save("portfolio_certificates", c);

export const getInternships = (): Internship[] => load("portfolio_internships", DEFAULT_INTERNSHIPS);
export const saveInternships = (i: Internship[]) => save("portfolio_internships", i);

export const getSkills = (): Skill[] => load("portfolio_skills", DEFAULT_SKILLS);
export const saveSkills = (s: Skill[]) => save("portfolio_skills", s);

export const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

// Admin auth
const ADMIN_CREDENTIALS = { username: "admin", password: "admin123" };

export const adminLogin = (username: string, password: string): boolean => {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    sessionStorage.setItem("admin_logged_in", "true");
    return true;
  }
  return false;
};

export const isAdminLoggedIn = (): boolean => sessionStorage.getItem("admin_logged_in") === "true";
export const adminLogout = () => sessionStorage.removeItem("admin_logged_in");

// File to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
