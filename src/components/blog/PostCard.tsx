import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getReadableDate, getReadingTime } from "@/utils";

export interface PostCardProps {
  id: string;
  title: string;
  description: string;
  content?: string;
  createdAt: string;
  author: {
    name: string;
  };
}

function PostCard({ id, title, description, content = "", createdAt, author }: PostCardProps) {
  return (
    <Card data-id={id} className="transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="font-serif text-xl leading-snug truncate pe-5">{title}</CardTitle>
        <p className="font-serif text-sm leading-7 text-muted-foreground truncate">{description}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        {content && <p className="font-serif text-sm leading-7 text-muted-foreground truncate">{content}</p>}
        <div className="flex flex-wrap items-center gap-2 font-sans text-xs text-muted-foreground">
          <span>By {author.name}</span>
          <span>•</span>
          <span>{getReadableDate(createdAt)}</span>
          <span>•</span>
          <span>{getReadingTime(content)}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default PostCard;
