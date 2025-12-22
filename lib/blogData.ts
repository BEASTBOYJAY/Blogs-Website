
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
