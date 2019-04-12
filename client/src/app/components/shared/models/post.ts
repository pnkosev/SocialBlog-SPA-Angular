export interface Post {
    _id: string;
    title: string;
    content: string;
    imageUrl: string;
    creator: { _id: string, username: string };
    likes: [{ _id: string, username: string }];
    hates: [{ _id: string, username: string }];
    comments: [{ _id: string, content: string, status: string, creator: { _id: string, username: string } }];
    status: string;
}
