import { useQuery } from "@apollo/client";
import { GET_POSTS } from "@/graphql/queries/postQueries";
import PostCard from "@/components/blog/PostCard";

function Home() {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading blog posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Failed to load blog posts.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <p className="text-muted-foreground">
          Explore posts shared by the community.
        </p>
      </div>

      {data?.posts?.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.posts.map((post: any) => (
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
          <h2 className="text-lg font-semibold">No posts available</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            There are no blog posts to display yet.
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
