import { useQuery } from "@apollo/client";
import { GET_POSTS } from "@/graphql/queries/postQueries";
import PostCard from "@/components/blog/PostCard";

function Dashboard() {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading posts...</div>;
  }

  if (error) {
    return <div className="flex min-h-screen items-center justify-center">Failed to load posts</div>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold">Blog Dashboard</h1>
        <p className="text-muted-foreground">Manage and view your blog posts</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data?.posts?.map((post: any) => (
          <PostCard key={post.id} title={post.title} content={post.content} createdAt={post.createdAt} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
