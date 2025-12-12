import { AvatarRoot, AvatarFallback, AvatarImage } from "./Avatar";
import parse from "html-react-parser";
import { formatDistance, subDays } from "date-fns";
import { cn } from "../../lib/utils";

type Props = {
  user: string;
  image: string;
  content: string;
  createdAt: string;
  children?: React.ReactNode;
  className?: string;
};

export const Comment = ({
  user,
  image,
  content,
  createdAt,
  children,
  className,
}: Props) => {
  return (
    <div className={cn("flex gap-4 p-2 max-w-1/2", className)}>
      <div className="p-2 basis-1/4">
        <AvatarRoot>
          <AvatarImage src={image} alt={user} />
          <AvatarFallback>{user.charAt(0)}</AvatarFallback>
        </AvatarRoot>
        <p className="text-sm font-semibold text-primary">{user}</p>
        <p className="text-xs text-primary/70">
          {formatDistance(subDays(new Date(createdAt), 3), new Date(), {
            addSuffix: true,
          })}
        </p>
      </div>
      <div className="flex items-center basis-3/4">
        <div className="text-sm text-text text-left">{parse(content)}</div>
      </div>
      {children}
    </div>
  );
};
