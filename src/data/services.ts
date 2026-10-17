import { Smartphone, Cloud, Database, Layout, Bot, Globe } from "lucide-react";

export const services = [
    {
        id: "web-dev",
        title: "Web Development",
        description: "Custom websites and web applications built with modern technologies like Next.js, React, and Node.js.",
        icon: Globe,
        features: ["Responsive Design", "SEO Optimization", "Performance Tuning", "CMS Integration"],
    },
    {
        id: "mobile-app",
        title: "Mobile App Development",
        description: "Native and cross-platform mobile apps for iOS and Android using React Native with TypeScript and Expo.",
        icon: Smartphone,
        features: ["iOS & Android", "Cross-Platform", "App Store Submission", "Push Notifications"],
    },
    {
        id: "saas-dev",
        title: "SaaS Development",
        description: "Scalable Software as a Service solutions with secure authentication, subscription management, and multi-tenancy.",
        icon: Cloud,
        features: ["Multi-tenancy", "Subscription Billing", "API Development", "Cloud Infrastructure"],
    },
    {
        id: "ui-ux",
        title: "UI/UX Design",
        description: "User-centric design that drives engagement and conversion. We create beautiful, intuitive interfaces.",
        icon: Layout,
        features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    },
    {
        id: "api-integration",
        title: "API Integration",
        description: "Seamless integration of third-party APIs and development of custom RESTful and GraphQL APIs.",
        icon: Database,
        features: ["REST & GraphQL", "Third-party Integrations", "Secure Data Transfer", "API Documentation"],
    },
    {
        id: "ai-automation",
        title: "AI Automation",
        description: "Leverage the power of Artificial Intelligence to automate workflows and enhance decision-making.",
        icon: Bot,
        features: ["Chatbots", "Process Automation", "Data Analysis", "Machine Learning"],
    },
];
