import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getReadableDate, getReadingTime } from "@/utils";

interface PostCardProps {
  title: string;
  content: string;
  createdAt: string;
}


function PostCard({ title, content, createdAt }: PostCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="font-serif text-xl leading-snug">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="font-serif text-sm leading-7 text-muted-foreground">{content}</p>

        <div className="flex items-center gap-2 font-sans text-xs text-muted-foreground">
          <span>{getReadableDate(createdAt)}</span>

          <span>•</span>

          <span>{getReadingTime(content)}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default PostCard;
