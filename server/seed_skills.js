const mongoose = require('mongoose');
const Skill = require('./models/Skill');
require('dotenv').config();

const skills = [
    {
        name: "Docker",
        level: "Intermediate",
        category: "DevOps",
        timeWeeks: 2,
        hoursPerWeek: 3,
        courses: [
            { title: "Docker & Kubernetes — freeCodeCamp", url: "https://www.freecodecamp.org/news/docker-simplified/", platform: "freeCodeCamp", free: true, hours: 18 },
            { title: "Docker for Beginners — KodeKloud", url: "https://kodekloud.com/courses/docker-for-the-absolute-beginner/", platform: "KodeKloud", free: false, hours: 10 },
        ],
        companies: ["Xebia", "Freshworks", "Thoughtworks"],
        color: "#00e5ff"
    },
    {
        name: "Kubernetes",
        level: "Intermediate",
        category: "DevOps",
        timeWeeks: 3,
        hoursPerWeek: 4,
        courses: [
            { title: "Kubernetes Crash Course — TechWorld", url: "https://www.youtube.com/watch?v=s_o8dwzRlu4", platform: "YouTube", free: true, hours: 3 },
            { title: "CKA Certification — A Cloud Guru", url: "https://acloudguru.com/course/certified-kubernetes-administrator-cka", platform: "ACG", free: false, hours: 30 },
        ],
        companies: ["Google", "Infosys", "HCL"],
        color: "#fb923c"
    },
    {
        name: "React Hooks",
        level: "Advanced",
        category: "Frontend",
        timeWeeks: 1,
        hoursPerWeek: 2,
        courses: [
            { title: "React Hooks in 100 Seconds — Fireship", url: "https://www.youtube.com/watch?v=TNhaISOUy6Q", platform: "YouTube", free: true, hours: 0.1 },
            { title: "React — The Complete Guide", url: "https://www.udemy.com/course/react-the-complete-guide/", platform: "Udemy", free: false, hours: 48 },
        ],
        companies: ["Zoho", "PayPal", "Flipkart"],
        color: "#a78bfa"
    },
    {
        name: "AWS Lambda",
        level: "Intermediate",
        category: "Cloud",
        timeWeeks: 2,
        hoursPerWeek: 3,
        courses: [
            { title: "AWS Lambda Tutorial — freeCodeCamp", url: "https://www.youtube.com/watch?v=eOBqlydpcfY", platform: "YouTube", free: true, hours: 2 },
            { title: "AWS Serverless — Udemy", url: "https://www.udemy.com/course/aws-lambda-serverless-architecture/", platform: "Udemy", free: false, hours: 15 },
        ],
        companies: ["Amazon", "Capital One", "Netflix"],
        color: "#fbbf24"
    }
    // ... more skills would be added here in a production scenario
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Skill.deleteMany({});
        await Skill.insertMany(skills);
        console.log('Database Seeded!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
