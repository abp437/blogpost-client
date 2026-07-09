import { useQuery, useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_POSTS } from "@/graphql/queries/postQueries";
import PostCard from "@/components/blog/PostCard";
import CreatePostForm from "@/components/blog/CreatePostForm";
import { Button } from "@/components/ui/button";
import { ACCESS_TOKEN_STORAGE_KEY } from "@/constants/authClient";

function Dashboard() {
  const { data, loading, error } = useQuery(GET_POSTS);
  const client = useApolloClient();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    client.clearStore();
    navigate("/login", { replace: true });
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Failed to load posts
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and view your blog posts
          </p>
        </div>

        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <CreatePostForm />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data?.posts?.map((post: any) => (
          <PostCard
            key={post.id}
            title={post.title}
            content={post.content}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
