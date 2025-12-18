
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
    size?: 'small' | 'medium' | 'large' | 'tall' | 'wide'; // Helper for bento layout
}

export const blogPosts: BlogPost[] = [
    {
        slug: "minimalist-design",
        title: "The Future of Minimalist Design in a Digital World",
        excerpt: "Curated insights on design, technology, and modern living served in bite-sized pieces.",
        content: "Full content would go here...",
        tags: ["Design", "Minimalism"],
        date: "Dec 18, 2024",
        author: {
            name: "Sarah Jenks",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCi9hjxKhVeQCtY2ou3m0ngc9_nkoMQsX1zZQM5Sb_l2PdTyjYkM1K5s_R2pqWuGWdwWmCM6wdS95I5MfbuRTepQ4jGWLVhFRY1r1lqlUjC04H3TfMuk-me-wOHgxlUGhInyTCZEgRKvp29M41btwMLFqzV-02SNdKAxFd9I0d_uwJMapE-VyDJANOyVOS_5ns5BsIe0tA-wlMQeHsIkx4ExGO0YmNd9qdCw7_jC7j25EgOjWAFKPP--Gs2QFwMeg_Us5cbDIr-b2M"
        },
        readTime: "5 min",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDh2_qMjRptRUdsThpVBfg68jPGIL-pnK5XUCYqv0Gvu1HpOBYprxsqNMzc0a8LOlG4PN9kqhZ-Tlp0whSTWIJPdoWN0o1RUxOiU1K-o0JtzwOjuZa8kPaygi9DI3H5iz0r1XP4bQT8Ab788TSBQte7DcFGXVi8umMqZ_S1sftBonkOuYrPWjw2b08r9LciM3LoMxVGwDBzH0y24p58Z--VEZK1qMWPhoFwJpkuyGZPUnSUGOuz8_vl5QojYSPmz9XzUuxkwKYbcZA",
        featured: true,
        size: 'large'
    },
    {
        slug: "audio-synthesis",
        title: "Understanding Audio Synthesis",
        excerpt: "Dive deep into oscillators, filters, and envelopes. How to create the sounds of the future using vintage concepts.",
        content: "Full content...",
        tags: ["Tech", "Music"],
        date: "Oct 24, 2023",
        author: {
            name: "Alex Morgan",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuALrUThOUimnwZ1AtWByin5l1VFKW_wNZ_hef6e-U61ETqogPmWpolMeTGPNrUz3s1W57e2KKWmtwMc86M3T_p0mUSjO4znVZUWozCakf4zk3kcyjlCNlaEYkDsh4NTmt47vaenNfmgsbJwgKMOiY0fJykOArq_yreWnS3pG9PaO2SDmsFBQUnhBvz1QotITh9ekzBpzpxsaJ8qNmn68lDWZ-Qzz35Cg0fMvtyxxk99D8hmbWQGbdzH3q262rRzNzNaqJ6rGEwCT7k"
        },
        readTime: "8 min",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjmdk9PbgBwlrfQh_VcEY8m3J1mwtxmocOHStscCo6NDQaXvNGJpheDIphfvZTQWE8rgIq_qHI9ijemaKHRf7b2d5Mv48jgsEuzN1M_rv4FffQxEQI382pWNVI96tiMXMq5n3KHz8TqRJm8Qh1MK-2JXsubiFoRHVL2mQLHdeirZ2xUnSZprRqSK-WLCaFsUpDgH3vHUxMwYm-6VwOlAlSC8L6KDklTwDwkLNwWt02osaZ6lfzLmZrdgdwF4l3zdegFZShLG6tIsA",
        size: 'tall'
    },
    {
        slug: "color-theory",
        title: "Color Theory 101",
        excerpt: "Mastering the color wheel for UI.",
        content: "Full content...",
        tags: ["Design", "Colors"],
        date: "Nov 01, 2023",
        author: {
            name: "Alex Morgan",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuALrUThOUimnwZ1AtWByin5l1VFKW_wNZ_hef6e-U61ETqogPmWpolMeTGPNrUz3s1W57e2KKWmtwMc86M3T_p0mUSjO4znVZUWozCakf4zk3kcyjlCNlaEYkDsh4NTmt47vaenNfmgsbJwgKMOiY0fJykOArq_yreWnS3pG9PaO2SDmsFBQUnhBvz1QotITh9ekzBpzpxsaJ8qNmn68lDWZ-Qzz35Cg0fMvtyxxk99D8hmbWQGbdzH3q262rRzNzNaqJ6rGEwCT7k"
        },
        readTime: "3 min",
        imageUrl: "",
        size: 'small'
    },
    {
        slug: "coding-tips",
        title: "10 Coding Tips",
        excerpt: "Boost your productivity with these 10 simple tips.",
        content: "Full content...",
        tags: ["Code", "Productivity"],
        date: "Sep 15, 2023",
        author: {
            name: "Dev Guru",
            avatar: ""
        },
        readTime: "4 min",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-ChU14Jzj_4QEnTDw418MJJ4yMqL1qKDtxz1cSrBARKtpxJsNLJzHuYB35_xrXbifpuQcKChtuJblv3tRjNG-SJCAmxN_OTFiNDYIYm-GW8aMkxcjl3cqdu2QNJhxC2cSPEKUvKLtTMyDAxSt3mz8W-mqfrKe7Hf8QxxCEF_wbSBdOblpZswkLfBxHcFjXjIK0LWQJJSkK9x2Wj9K0xKHX7zvb1fZz38Zu6PXwxszp20_9g_oDpHpf9XMjxAqOrz4GH8oypqKCj4",
        size: 'small'
    },
    {
        slug: "design-trek-japan",
        title: "Design Trek: Japan",
        excerpt: "Exploring the neon aesthetics of Tokyo.",
        content: "Full content...",
        tags: ["Travel", "Design"],
        date: "Aug 20, 2023",
        author: {
            name: "Traveler",
            avatar: ""
        },
        readTime: "6 min",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCyXAdH3L2N82IqvxdTLJAHcWlP8F53WDXXIpFWXKkGMI6zifuzK3oEj1xnxQUciBf0sW5RRAx8JLm-3zBdnOWWxMmu8yl5aquF0mT61kDtr_MBD0i9TZf1A59l1qZ9RzwCgKtPzahVsUPCEDwtGKtYFkF3J70b5xLECJ1s-CD6uepe1zmS2YSO9Yq-fcpi9dTXyAAOeCs-7UiVzglt8wEL4TTF2TnPL0n73OwcuDeGyoK2eOsGQlYm-oeoYhQU__cxJzKHVtEEuU",
        size: 'medium'
    }
];
