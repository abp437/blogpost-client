import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Pencil, Trash2, X, Check } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { GET_MY_POSTS } from "@/graphql/queries/postQueries";
import { UPDATE_POST, DELETE_POST } from "@/graphql/mutations/postMutations";

import PostCard from "@/components/blog/PostCard";
import CreatePostForm from "@/components/blog/CreatePostForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function Dashboard() {
  const { data, loading, error } = useQuery(GET_MY_POSTS);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [editData, setEditData] = useState({
    title: "",
    description: "",
    content: "",
  });

  const [updatePost, { loading: updating }] = useMutation(UPDATE_POST, {
    refetchQueries: ["GetMyPosts"],
  });

  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: ["GetMyPosts"],
  });

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading your posts...</div>;
  }

  if (error) {
    return <div className="flex min-h-screen items-center justify-center">Failed to load your posts.</div>;
  }

  function startEditing(post: any) {
    setEditingId(post.id);

    setEditData({
      title: post.title,
      description: post.description,
      content: post.content,
    });
  }

  async function saveEdit(id: string) {
    await updatePost({
      variables: {
        input: {
          id,
          title: editData.title,
          description: editData.description,
          content: editData.content,
        },
      },
    });

    setEditingId(null);
  }

  async function handleDelete(id: string) {
    await deletePost({
      variables: {
        id,
      },
    });
  }

  return (
    <div className="space-y-6">
      <CreatePostForm />
      <h1 className="font-heading text-3xl font-bold tracking-tight">My Posts</h1>
      {data?.myPosts?.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.myPosts.map((post: any) => (
            <div key={post.id} className="relative">
              {editingId === post.id ? (
                <div className="space-y-3 rounded-lg border p-4">
                  <Input
                    value={editData.title}
                    placeholder="Title"
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        title: e.target.value,
                      })
                    }
                  />

                  <Input
                    value={editData.description}
                    placeholder="Tagline"
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        description: e.target.value,
                      })
                    }
                  />

                  <Textarea
                    value={editData.content}
                    placeholder="Content"
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        content: e.target.value,
                      })
                    }
                  />

                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => saveEdit(post.id)} disabled={updating}>
                      <Check className="mr-1 h-4 w-4" />
                      Save
                    </Button>

                    <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                      <X className="mr-1 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute right-3 top-3 z-10 flex gap-1">
                    <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => startEditing(post)}>
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button size="icon" variant="destructive" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this post?</AlertDialogTitle>

                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your blog post.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>

                          <AlertDialogAction onClick={() => handleDelete(post.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  <div className="[&>div]:pr-24">
                    <PostCard
                      title={post.title}
                      description={post.description}
                      content={post.content}
                      createdAt={post.createdAt}
                      author={post.author}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h2 className="text-lg font-semibold">No posts yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">Create your first blog post using the form above.</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
