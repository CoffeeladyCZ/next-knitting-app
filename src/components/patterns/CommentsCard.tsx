import { Comment } from "../component-library/Comment";
import { useGetPatternComments } from "../../api/hooks";

type Props = {
  id: number;
};

const CommentsCard = ({ id }: Props) => {
  const { data: commentsData } = useGetPatternComments(id);

  return (
    <div className="border-t-2 border-orange-dark mt-10">
      <h2 className="text-lg font-semibold text-primary my-4 text-left">
        Comments ({commentsData?.paginator?.results})
      </h2>

      <div className="flex flex-col gap-8">
        {commentsData?.comments?.map((comment) => (
          <div key={comment.id} className="flex flex-col gap-6 pb-4">
            <div className="w-full lg:shrink-0">
              <Comment
                className="bg-primary/10 p-2"
                key={comment.id}
                user={comment.user.username}
                image={comment.user.small_photo_url}
                content={comment.comment_html}
                createdAt={comment.created_at}
              />
            </div>
            {comment.replies && comment.replies.length > 0 && (
              <div className="w-full lg:flex-1 lg:min-w-0 flex flex-col space-y-4 lg:items-end">
                {comment.replies.map((nestedComment) => (
                  <Comment
                    className="bg-secondary/10"
                    key={nestedComment.id}
                    user={nestedComment.user.username}
                    image={nestedComment.user.small_photo_url}
                    content={nestedComment.comment_html}
                    createdAt={nestedComment.created_at}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsCard;
