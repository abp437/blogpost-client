export interface PostDetails {
  id: string;
  title: string;
  description: string;
  content?: string;
  createdAt: string;
  author: {
    name: string;
  };
}
