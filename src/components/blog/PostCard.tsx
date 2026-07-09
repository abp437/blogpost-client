import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PostCardProps {
  title: string;
  content: string;
  createdAt: string;
}

function PostCard({ title, content, createdAt }: PostCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="font-serif text-xl leading-snug">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="font-serif text-sm leading-7 text-muted-foreground">
          {content}
        </p>

        <p className="font-sans text-xs text-muted-foreground">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}

export default PostCard;
