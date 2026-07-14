import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { GET_POST_BY_ID } from "@/graphql/queries/postQueries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getReadableDate, getReadingTime } from "@/utils";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const canGoBack = window.history.length > 1;

  const { data, loading, error } = useQuery(GET_POST_BY_ID, {
    variables: {
      id,
    },
  });

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading post...</div>;
  }

  if (error || !data?.post) {
    return <div className="flex min-h-screen items-center justify-center">Post not found.</div>;
  }

  const post = data.post;

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-10">
      <Card className="shadow-sm">
        <CardHeader className="space-y-4 mb-10">
          <div className="relative flex items-start justify-center gap-3 mb-0">
            {canGoBack && (
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="absolute left-0 shrink-0">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}

            <CardTitle className="font-serif text-4xl leading-tight">{post.title}</CardTitle>
          </div>

          <h2 className="whitespace-pre-line text-center font-serif text-base leading-8 mb-0">{post.description}</h2>

          <div className="flex justify-center gap-2 text-sm text-muted-foreground">
            <span>By {post.author.name}</span>

            <span>•</span>

            <span>{getReadableDate(post.createdAt)}</span>

            <span>•</span>

            <span>{getReadingTime(post.content)}</span>
          </div>
        </CardHeader>

        <CardContent>
          <p className="whitespace-pre-line font-serif text-base leading-8">{post.content}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default PostDetails;
