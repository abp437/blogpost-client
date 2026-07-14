import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

import { GET_POSTS } from "@/graphql/queries/postQueries";
import PostCard, { PostCardProps } from "@/components/blog/PostCard";

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
        <p className="font-serif text-lg text-muted-foreground">Explore posts shared by the community.</p>
      </header>

      {data?.posts?.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.posts?.map((post: PostCardProps) => (
            <div key={post.id} className="relative">
              <Link to={`/posts/${post.id}`}>
                <PostCard
                  id={post.id}
                  title={post.title}
                  description={post.description}
                  createdAt={post.createdAt}
                  author={post.author}
                />
              </Link>

              <a
                href={`/posts/${post.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                title="Open in new tab"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
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
