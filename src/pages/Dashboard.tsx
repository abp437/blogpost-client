import { useApolloClient, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_MY_POSTS } from "@/graphql/queries/postQueries";
import PostCard from "@/components/blog/PostCard";
import CreatePostForm from "@/components/blog/CreatePostForm";
import { Button } from "@/components/ui/button";
import { ACCESS_TOKEN_STORAGE_KEY } from "@/constants/authClient";

function Dashboard() {
  const { data, loading, error } = useQuery(GET_MY_POSTS);

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
        Loading your posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Failed to load your posts.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <p className="text-muted-foreground">
            Create and manage your blog posts
          </p>
        </div>

        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <CreatePostForm />

      {data?.myPosts?.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.myPosts.map((post: any) => (
            <PostCard
              key={post.id}
              title={post.title}
              content={post.content}
              createdAt={post.createdAt}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h2 className="text-lg font-semibold">No posts yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your first blog post using the form above.
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
