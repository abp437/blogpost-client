import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


interface PostCardProps {

  title: string;

  content: string;

  createdAt: string;

}


function PostCard({
  title,
  content,
  createdAt,
}: PostCardProps) {

  return (

    <Card>

      <CardHeader>

        <CardTitle>
          {title}
        </CardTitle>

      </CardHeader>


      <CardContent>

        <p className="
          text-muted-foreground
        ">
          {content}
        </p>


        <p className="
          mt-3
          text-xs
          text-muted-foreground
        ">
          {new Date(
            createdAt,
          ).toLocaleDateString()}
        </p>

      </CardContent>

    </Card>

  );

}


export default PostCard;
