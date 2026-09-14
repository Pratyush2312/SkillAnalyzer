import mongoose from "mongoose";
import dotenv from "dotenv";
import Roadmap from "../src/models/RoadMap.js";

dotenv.config();

const roadmapData = [
    {
        career: "Software Developer",
        skill: "programming",
        order: 1,
        title: "Programming Fundamentals",
        description:
            "Build a strong foundation in programming concepts and problem-solving.",
        topics: [
            "Variables and data types",
            "Conditional statements",
            "Loops",
            "Functions",
            "Arrays and strings",
            "Basic problem solving",
        ],
        estimatedTime: "2–3 weeks",
        resources: {
            videos: [
                {
                    title: "Programming Fundamentals",
                    platform: "YouTube",
                    url: "https://www.youtube.com/results?search_query=programming+fundamentals+for+beginners",
                },
            ],
            documentation: [
                {
                    title: "Programming Concepts",
                    platform: "Programiz",
                    url: "https://www.programiz.com/programming",
                },
            ],
            courses: [
                {
                    title: "Learn Programming",
                    platform: "freeCodeCamp",
                    url: "https://www.freecodecamp.org/learn/",
                },
            ],
            hands_on_projects: [
                {
                    title: "Build a Command-Line Calculator",
                    description:
                        "Create a calculator using variables, conditions, loops, and functions.",
                    difficulty: "Beginner",
                },
            ],
        },
    },

    {
        career: "Software Developer",
        skill: "data structures",
        order: 2,
        title: "Data Structures",
        description:
            "Learn how to organize, store, and manage data efficiently.",
        topics: [
            "Arrays",
            "Strings",
            "Linked lists",
            "Stacks",
            "Queues",
            "Hash tables",
            "Trees",
        ],
        estimatedTime: "3–4 weeks",
        resources: {
            videos: [
                {
                    title: "Data Structures Playlist",
                    platform: "YouTube",
                    url: "https://www.youtube.com/results?search_query=data+structures+full+course",
                },
            ],
            documentation: [
                {
                    title: "Data Structures",
                    platform: "GeeksforGeeks",
                    url: "https://www.geeksforgeeks.org/data-structures/",
                },
            ],
            courses: [
                {
                    title: "Data Structures Course",
                    platform: "freeCodeCamp",
                    url: "https://www.freecodecamp.org/learn/",
                },
            ],
            hands_on_projects: [
                {
                    title: "Build a Stack and Queue",
                    description:
                        "Implement stack and queue operations using arrays or linked lists.",
                    difficulty: "Beginner",
                },
            ],
        },
    },

    {
        career: "Software Developer",
        skill: "algorithms",
        order: 3,
        title: "Algorithms",
        description:
            "Develop efficient techniques for solving computational problems.",
        topics: [
            "Searching",
            "Sorting",
            "Recursion",
            "Time complexity",
            "Space complexity",
            "Greedy algorithms",
            "Basic dynamic programming",
        ],
        estimatedTime: "3–4 weeks",
        resources: {
            videos: [
                {
                    title: "Algorithms Course",
                    platform: "YouTube",
                    url: "https://www.youtube.com/results?search_query=algorithms+for+beginners+full+course",
                },
            ],
            documentation: [
                {
                    title: "Fundamentals of Algorithms",
                    platform: "GeeksforGeeks",
                    url: "https://www.geeksforgeeks.org/fundamentals-of-algorithms/",
                },
            ],
            courses: [
                {
                    title: "Algorithms and Data Structures",
                    platform: "freeCodeCamp",
                    url: "https://www.freecodecamp.org/learn/",
                },
            ],
            hands_on_projects: [
                {
                    title: "Build a Sorting Visualizer",
                    description:
                        "Create a visualizer for Bubble Sort, Selection Sort, and Merge Sort.",
                    difficulty: "Intermediate",
                },
            ],
        },
    },

    {
        career: "Software Developer",
        skill: "object-oriented programming",
        order: 4,
        title: "Object-Oriented Programming",
        description:
            "Learn how to design reusable and maintainable software.",
        topics: [
            "Classes and objects",
            "Constructors",
            "Encapsulation",
            "Inheritance",
            "Polymorphism",
            "Abstraction",
            "Interfaces",
        ],
        estimatedTime: "2–3 weeks",
        resources: {
            videos: [
                {
                    title: "Object-Oriented Programming",
                    platform: "YouTube",
                    url: "https://www.youtube.com/results?search_query=object+oriented+programming+for+beginners",
                },
            ],
            documentation: [
                {
                    title: "Object-Oriented Programming Concepts",
                    platform: "freeCodeCamp",
                    url: "https://www.freecodecamp.org/news/object-oriented-programming-concepts-21bb035f7260/",
                },
            ],
            courses: [
                {
                    title: "Object-Oriented Programming Course",
                    platform: "Programiz",
                    url: "https://www.programiz.com/cpp-programming/object-oriented-programming",
                },
            ],
            hands_on_projects: [
                {
                    title: "Build a Library Management System",
                    description:
                        "Create a small application using classes, objects, inheritance, and encapsulation.",
                    difficulty: "Intermediate",
                },
            ],
        },
    },
];

const seedRoadmap = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Roadmap.deleteMany({
            career: "Software Developer",
        });

        await Roadmap.insertMany(roadmapData);

        console.log("Roadmap data inserted successfully");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding roadmap:", error);
        process.exit(1);
    }
};

seedRoadmap();