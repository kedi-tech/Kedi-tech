export const projects = [
    {
        id: "proj_1",
        name: "E-commerce Redesign",
        status: "In Progress",
        progress: 65,
        dueDate: "2023-12-15",
        client: "TechStart Inc.",
        budget: "$15,000",
        milestones: [
            { id: "m1", title: "Design Phase", status: "Completed", date: "2023-10-01" },
            { id: "m2", title: "Frontend Development", status: "In Progress", date: "2023-11-15" },
            { id: "m3", title: "Backend Integration", status: "Pending", date: "2023-12-01" },
        ],
    },
    {
        id: "proj_2",
        name: "Mobile App MVP",
        status: "Completed",
        progress: 100,
        dueDate: "2023-09-30",
        client: "InnovateCorp",
        budget: "$25,000",
        milestones: [
            { id: "m1", title: "Prototype", status: "Completed", date: "2023-08-01" },
            { id: "m2", title: "Development", status: "Completed", date: "2023-09-15" },
            { id: "m3", title: "Testing & Launch", status: "Completed", date: "2023-09-30" },
        ],
    },
    {
        id: "proj_3",
        name: "Corporate Website",
        status: "Pending",
        progress: 0,
        dueDate: "2024-01-20",
        client: "Global Solutions",
        budget: "$8,000",
        milestones: [
            { id: "m1", title: "Kickoff", status: "Pending", date: "2023-11-01" },
        ],
    },
];
