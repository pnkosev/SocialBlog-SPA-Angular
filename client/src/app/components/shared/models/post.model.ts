export interface Post {
    _id: string;
    title: string;
    content: string;
    imageUrl: string;
    creator: { _id: string, username: string };
    likes: Array<{ _id: string, username: string }>;
    hates: Array<{ _id: string, username: string }>;
    comments: Array<{ _id: string, content: string, status: string, creator: { _id: string, username: string } }>;
    status: string;
}
