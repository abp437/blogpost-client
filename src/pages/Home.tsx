import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_POSTS } from "@/graphql/queries/postQueries";
import PostCard from "@/components/blog/PostCard";

function Home() {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center font-sans">Loading blog posts...</div>;
  }

  if (error) {
    return <div className="flex min-h-screen items-center justify-center font-sans">Failed to load blog posts.</div>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      <header className="space-y-2">
        <h1 className="font-sans text-4xl font-bold tracking-tight">Blog Posts</h1>

        <p className="font-serif text-lg text-muted-foreground">Explore posts shared by the community.</p>
      </header>

      {data?.posts?.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.posts.map((post: any) => (
            <Link to={`/posts/${post.id}`}>
              <PostCard key={post.id} title={post.title} content={post.content} createdAt={post.createdAt} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h2 className="font-sans text-lg font-semibold">No posts available</h2>

          <p className="mt-2 font-serif text-sm text-muted-foreground">There are no blog posts to display yet.</p>
        </div>
      )}
    </div>
  );
}

export default Home;
