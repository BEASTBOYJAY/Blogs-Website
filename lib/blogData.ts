
export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
    date: string;
    author: {
        name: string;
        avatar: string;
    };
    readTime: string;
    imageUrl: string;
    featured?: boolean;

}

export const blogPosts: BlogPost[] = [
    {
        slug: "better-now-closer",
        title: "Better Now Closer",
        excerpt: "Experience the new age of connection with our latest tools.",
        content: "Full content...",
        tags: ["Connection", "Community"],
        date: "Dec 18, 2024",
        author: {
            name: "Sarah Jenks",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCi9hjxKhVeQCtY2ou3m0ngc9_nkoMQsX1zZQM5Sb_l2PdTyjYkM1K5s_R2pqWuGWdwWmCM6wdS95I5MfbuRTepQ4jGWLVhFRY1r1lqlUjC04H3TfMuk-me-wOHgxlUGhInyTCZEgRKvp29M41btwMLFqzV-02SNdKAxFd9I0d_uwJMapE-VyDJANOyVOS_5ns5BsIe0tA-wlMQeHsIkx4ExGO0YmNd9qdCw7_jC7j25EgOjWAFKPP--Gs2QFwMeg_Us5cbDIr-b2M"
        },
        readTime: "5 min",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDh2_qMjRptRUdsThpVBfg68jPGIL-pnK5XUCYqv0Gvu1HpOBYprxsqNMzc0a8LOlG4PN9kqhZ-Tlp0whSTWIJPdoWN0o1RUxOiU1K-o0JtzwOjuZa8kPaygi9DI3H5iz0r1XP4bQT8Ab788TSBQte7DcFGXVi8umMqZ_S1sftBonkOuYrPWjw2b08r9LciM3LoMxVGwDBzH0y24p58Z--VEZK1qMWPhoFwJpkuyGZPUnSUGOuz8_vl5QojYSPmz9XzUuxkwKYbcZA",
        featured: true,

    },
    {
        slug: "handshake-deal",
        title: "The Perfect Deal",
        excerpt: "Sealing the deal with trust and transparency.",
        content: "Full content...",
        tags: ["Business", "Growth"],
        date: "Oct 24, 2023",
        author: {
            name: "Alex Morgan",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuALrUThOUimnwZ1AtWByin5l1VFKW_wNZ_hef6e-U61ETqogPmWpolMeTGPNrUz3s1W57e2KKWmtwMc86M3T_p0mUSjO4znVZUWozCakf4zk3kcyjlCNlaEYkDsh4NTmt47vaenNfmgsbJwgKMOiY0fJykOArq_yreWnS3pG9PaO2SDmsFBQUnhBvz1QotITh9ekzBpzpxsaJ8qNmn68lDWZ-Qzz35Cg0fMvtyxxk99D8hmbWQGbdzH3q262rRzNzNaqJ6rGEwCT7k"
        },
        readTime: "3 min",
        imageUrl: "",

    },
    {
        slug: "team-adaptation",
        title: "Team Adaptation",
        excerpt: "HR grooming and reshaping for the future.",
        content: "Full content...",
        tags: ["HR", "Teamwork"],
        date: "Nov 01, 2023",
        author: {
            name: "Alex Morgan",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuALrUThOUimnwZ1AtWByin5l1VFKW_wNZ_hef6e-U61ETqogPmWpolMeTGPNrUz3s1W57e2KKWmtwMc86M3T_p0mUSjO4znVZUWozCakf4zk3kcyjlCNlaEYkDsh4NTmt47vaenNfmgsbJwgKMOiY0fJykOArq_yreWnS3pG9PaO2SDmsFBQUnhBvz1QotITh9ekzBpzpxsaJ8qNmn68lDWZ-Qzz35Cg0fMvtyxxk99D8hmbWQGbdzH3q262rRzNzNaqJ6rGEwCT7k"
        },
        readTime: "3 min",
        imageUrl: "",

    },
    {
        slug: "sync-app",
        title: "Sync",
        excerpt: "Keep everything in sync effortlessly.",
        content: "Full content...",
        tags: ["Product", "Tech"],
        date: "Sep 15, 2023",
        author: {
            name: "Dev Guru",
            avatar: ""
        },
        readTime: "4 min",
        imageUrl: "",

    },
    {
        slug: "bring-people-together",
        title: "Bring People Together",
        excerpt: "Creating spaces where community thrives.",
        content: "Full content...",
        tags: ["Community", "Social"],
        date: "Aug 20, 2023",
        author: {
            name: "Traveler",
            avatar: ""
        },
        readTime: "6 min",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCyXAdH3L2N82IqvxdTLJAHcWlP8F53WDXXIpFWXKkGMI6zifuzK3oEj1xnxQUciBf0sW5RRAx8JLm-3zBdnOWWxMmu8yl5aquF0mT61kDtr_MBD0i9TZf1A59l1qZ9RzwCgKtPzahVsUPCEDwtGKtYFkF3J70b5xLECJ1s-CD6uepe1zmS2YSO9Yq-fcpi9dTXyAAOeCs-7UiVzglt8wEL4TTF2TnPL0n73OwcuDeGyoK2eOsGQlYm-oeoYhQU__cxJzKHVtEEuU",

    },
    {
        slug: "chat-updates",
        title: "Chat Updates",
        excerpt: "Hi! Where are you? ill be in touch.",
        content: "Full content...",
        tags: ["Messaging", "Updates"],
        date: "Jul 10, 2023",
        author: {
            name: "ChatBot",
            avatar: ""
        },
        readTime: "2 min",
        imageUrl: "",

    },
    {
        slug: "stay-in-touch",
        title: "Stay In Touch",
        excerpt: "Don't miss the latest updates from the team.",
        content: "Full content...",
        tags: ["Contact", "Newsletter"],
        date: "Jun 05, 2023",
        author: {
            name: "Team Lead",
            avatar: ""
        },
        readTime: "3 min",
        imageUrl: "",

    }
];
