import { useState, type FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "@/graphql/mutations/postMutations";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function CreatePostForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [message, setMessage] = useState("");

  const [addPost, { loading }] = useMutation(ADD_POST, {
    refetchQueries: ["GetMyPosts"],
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    try {
      await addPost({
        variables: {
          title: formData.title,
          content: formData.content,
        },
      });

      setMessage("Post created successfully!");
      setFormData({
        title: "",
        content: "",
      });
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to create post",
      );
    }
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="font-heading text-2xl font-bold tracking-tight">
          Create Post
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>

            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Post title"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="content">Content</Label>

            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your post..."
              className="min-h-40"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Publish"}
          </Button>

          {message && (
            <p
              aria-live="polite"
              className="text-sm text-muted-foreground"
            >
              {message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

export default CreatePostForm;
