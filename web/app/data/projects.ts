export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  coverStyle: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  role: string;
  duration: string;
};

export const projects: Project[] = [
  {
    slug: "ai-workspace",
    title: "AI Workspace",
    category: "AI · WEB APP",
    description: "A workspace for turning AI conversations into useful work.",
    stack: ["Next.js", "TypeScript", "AI"],
    coverStyle: "from-blue-950 via-blue-700 to-cyan-400",
    overview: "A focused workspace that helps people move from open ended AI conversations to organized, reusable work.",
    problem: "Useful answers and decisions often get lost across long conversations and disconnected tools.",
    solution: "The workspace groups conversations by project and gives users a clear place to save, revisit, and continue their work.",
    features: ["Organized project spaces", "Saved conversations", "Responsive workspace layout"],
    role: "Product design and full stack development",
    duration: "Ongoing",
  },
  {
    slug: "everyday-finance",
    title: "Everyday Finance",
    category: "MOBILE · PRODUCT",
    description: "A mobile experience for tracking spending and financial goals.",
    stack: ["React Native", "TypeScript", "Firebase"],
    coverStyle: "from-emerald-950 via-teal-700 to-lime-300",
    overview: "A mobile finance companion for understanding everyday spending and keeping personal goals in view.",
    problem: "People need a simple way to see their spending habits without turning budgeting into a chore.",
    solution: "A clear daily view brings transactions, category totals, and progress toward goals together.",
    features: ["Spending overview", "Category breakdowns", "Savings goal tracking"],
    role: "Product design and mobile development",
    duration: "12 weeks",
  },
  {
    slug: "studio-portfolio",
    title: "Studio Portfolio",
    category: "WEB · CREATIVE",
    description: "A modern portfolio with smooth animations and clean design.",
    stack: ["React", "GSAP", "Tailwind CSS"],
    coverStyle: "from-fuchsia-950 via-violet-800 to-pink-400",
    overview: "A visual portfolio that presents a creative studio’s work with a direct, easy to browse layout.",
    problem: "A portfolio needs to show the character of the work while keeping projects easy to find and understand.",
    solution: "A flexible project grid and restrained motion give each project room while keeping navigation familiar.",
    features: ["Project showcase", "Responsive layouts", "Scroll based motion"],
    role: "Design and frontend development",
    duration: "6 weeks",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
