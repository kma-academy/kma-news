import { useAppSelector } from "@/app/hooks";
import { selectTopPost } from "../../homeSlice";
import { TopPostItem } from "./TopPostItem";

export const TopPostFeed: React.FC = () => {
  const topPosts = useAppSelector(selectTopPost);
  return (
    <div className="section">
      <div className="list-news-right">
        {topPosts.map((e, i) => (
          <TopPostItem key={i} {...e} />
        ))}
      </div>
    </div>
  );
};
