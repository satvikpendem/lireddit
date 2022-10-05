import { Label } from "@radix-ui/react-label";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import {
  CreatePostDocument,
  CreatePostMutation,
  CreatePostMutationVariables,
} from "../../services/graphql/generated/graphql";
import { useIsAuthN } from "../../util/useIsAuthN";
import AnimatedToggle from "../AnimatedToggle/AnimatedToggle";
import {
  _error,
  _field,
  _label,
  _loading,
  _primaryButton,
  _spacer,
} from "../AuthenticationForm/AuthenticationForm.css";
import { _base, _body } from "./CreatePost.css";

interface Props {}

type FormValues = {
  title: string;
  body: string;
};

const CreatePost: React.FC<Props> = () => {
  useIsAuthN();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormValues>();

  const [{ fetching, data }, createPost] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(CreatePostDocument);

  const onSubmit = async (
    { title, body }: FormValues,
  ) => {
    createPost({
      input: {
        title,
        content: body,
      },
    });
  };

  return (
    <div className={_base}>
      <h1>Create Post</h1>

      <Label htmlFor="title" className={_label}>
        Title
      </Label>
      <input
        placeholder="Title"
        {...register("title", {
          required: true,
        })}
        className={_field}
      />
      <AnimatedToggle condition={errors.title?.type === "required"}>
        <span className={_error}>Title is required</span>
      </AnimatedToggle>
      <div className={_spacer} />
      <Label htmlFor="body" className={_label}>
        Body
      </Label>
      <textarea
        placeholder="(Optional) Your content here..."
        {...register("body")}
        className={_body}
      />
      <div className={_spacer} />
      <motion.button
        type="submit"
        className={_primaryButton}
        whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
        whileTap={{ y: 2, scale: 0.95 }}
        onClick={handleSubmit(onSubmit)}
      >
        <AnimatePresence>
          {(isSubmitting || fetching) &&
            <div className={_loading} />}
          {!(isSubmitting || fetching) &&
            <span>Submit</span>}
        </AnimatePresence>
      </motion.button>
      <AnimatedToggle
        condition={data?.createPost?.__typename === "MutationCreatePostSuccess"}
      >
        <p>
          Success! Your post has been created. You can view it{" "}
          <a
            href={`/post/${
              data?.createPost?.__typename === "MutationCreatePostSuccess" &&
              data.createPost.data.id
            }`}
          >
            here
          </a>
        </p>
      </AnimatedToggle>
    </div>
  );
};

export default CreatePost;
