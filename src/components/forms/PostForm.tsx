import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { postValidatonSchema } from "@/lib/validation";
import { z } from "zod";
import { Models } from "appwrite";
import { Loader2 } from "lucide-react";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import {
  useCreatePostMutation,
  useUpdatePost,
} from "@/lib/react-query/queriesAndMutations";

type PostFormProps = {
  post?: Models.Document;
  action: "create" | "update";
};

const PostForm = ({ action, post }: PostFormProps) => {
  const { user } = useUserContext();

  const navigate = useNavigate();

  const { toast } = useToast();

  const { mutateAsync: createPostMutation } = useCreatePostMutation();

  const { mutateAsync: updatePost, isPending: isUpdating } = useUpdatePost();

  const form = useForm<z.infer<typeof postValidatonSchema>>({
    resolver: zodResolver(postValidatonSchema),
    defaultValues: {
      caption: post ? post.captions : "",
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
      file: [],
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof postValidatonSchema>) => {
    if (post && action === "update") {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post.imageId,
        imageUrl: post.imageUrl,
      });

      if (!updatedPost) {
        return toast({
          title: "Something went wrong",
        });
      }

      navigate(`/post/${post.$id}`);
      return;
    }

    const newPost = await createPostMutation({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      return toast({
        title: "Something went wrong",
      });
    }

    navigate("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add Caption"
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (seperated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Art, Photography, Learning, etc."
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-x-4 items-center justify-end">
          <Button
            type="button"
            disabled={isSubmitting}
            className="shad-button_dark_4">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="shad-button_primary whitespace-nowrap h-12">
            {isSubmitting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : action === "create" ? (
              "Post"
            ) : (
              "Update Post"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
