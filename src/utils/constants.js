export const DEMO_RESULTS = {
    score: 78,
    matchedSkills: ["Python", "SQL", "Git", "REST APIs", "Agile", "AWS basics"],
    missingSkills: [
        {
            name: "Docker",
            level: "Intermediate",
            timeWeeks: 2,
            hoursPerWeek: 3,
            readyPct: 85,
            courses: [
                { title: "Docker & Kubernetes — freeCodeCamp", url: "https://www.freecodecamp.org/news/docker-simplified/", platform: "freeCodeCamp", free: true, hours: 18 },
                { title: "Docker for Beginners — KodeKloud", url: "https://kodekloud.com/courses/docker-for-the-absolute-beginner/", platform: "KodeKloud", free: false, hours: 10 },
            ],
            companies: ["Xebia", "Freshworks", "Thoughtworks"],
            color: "#00e5ff",
        },
        {
            name: "React Hooks",
            level: "Advanced",
            timeWeeks: 1,
            hoursPerWeek: 2,
            readyPct: 90,
            courses: [
                { title: "React Hooks in 100 Seconds — Fireship", url: "https://www.youtube.com/watch?v=TNhaISOUy6Q", platform: "YouTube", free: true, hours: 0.1 },
                { title: "React — The Complete Guide — Udemy", url: "https://www.udemy.com/course/react-the-complete-guide/", platform: "Udemy", free: false, hours: 48 },
            ],
            companies: ["Zoho", "PayPal", "Flipkart"],
            color: "#a78bfa",
        },
        {
            name: "Kubernetes",
            level: "Intermediate",
            timeWeeks: 3,
            hoursPerWeek: 4,
            readyPct: 80,
            courses: [
                { title: "Kubernetes Crash Course — TechWorld", url: "https://www.youtube.com/watch?v=s_o8dwzRlu4", platform: "YouTube", free: true, hours: 3 },
                { title: "CKA Certification — A Cloud Guru", url: "https://acloudguru.com/course/certified-kubernetes-administrator-cka", platform: "ACG", free: false, hours: 30 },
            ],
            companies: ["Google", "Infosys", "HCL"],
            color: "#fb923c",
        },
    ],
    topRoles: [
        { title: "Backend Engineer", match: 82, companies: ["Freshworks", "Zoho"] },
        { title: "DevOps Engineer", match: 75, companies: ["Xebia", "TCS"] },
        { title: "Full Stack Developer", match: 71, companies: ["PayPal", "CRED"] },
    ],
};

export const TESTIMONIALS = [
    {
        name: "Rahul Sharma",
        college: "VIT Vellore",
        role: "SDE Intern @ Freshworks",
        avatar: "RS",
        color: "#00e5ff",
        stars: 4,
        starsDisplay: 4.2,
        quote: "I uploaded my resume and a Freshworks JD — within seconds I could see exactly why I kept getting rejected. Docker was my blind spot. Used the 2-week roadmap, got the interview call the next month. This tool is absurdly accurate.",
        tag: "Landed internship",
        tagColor: "#34d399",
        daysAgo: 12,
    },
    {
        name: "Dhivya",
        college: "HR @ Accenture",
        role: "Human Resources @ Accenture",
        avatar: "DH",
        color: "#a78bfa",
        stars: 4,
        starsDisplay: 3.8,
        quote: "Genuinely impressed by how it maps skill gaps to real job requirements. As an HR, I'd recommend students use this before applying — it clearly shows what's missing and what to fix.",
        tag: "HR Verified",
        tagColor: "#a78bfa",
        daysAgo: 5,
    },
];

export const FREE_FEATURES = [
    { text: "3 resume scans / month", included: true },
    { text: "Match score + skill gap list", included: true },
    { text: "Basic course suggestions", included: true },
    { text: "Priority roadmaps", included: false },
    { text: "Unlimited scans", included: false },
    { text: "Companies hiring NOW", included: false },
    { text: "PDF report download", included: false },
];

export const PRO_FEATURES = [
    { text: "Unlimited resume scans", included: true },
    { text: "Match score + skill gap list", included: true },
    { text: "Priority personalized roadmaps", included: true },
    { text: "Companies hiring NOW (live)", included: true },
    { text: "PDF report download", included: true },
    { text: "WhatsApp progress reminders", included: true },
    { text: "Early access to new features", included: true },
];



export const SEED_FEEDBACK = [
    {
        name: "Aditya K.",
        category: "Skill Gap Detection",
        stars: 4,
        text: "Really useful for understanding where I stand before interviews. The skill gap breakdown is spot on.",
        time: "2 days ago",
    },
    {
        name: "Meera S.",
        category: "Roadmap Quality",
        stars: 5,
        text: "The course recommendations actually helped me prepare in 2 weeks. Way better than just Googling what to study.",
        time: "5 days ago",
    },
];

export const CATEGORIES = ["Overall", "Skill Gap Detection", "Roadmap Quality", "UI / Design", "Match Score", "Other"];
