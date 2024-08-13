
import Link from "next/link";
import { formatToTimeAgo } from "../lib/utils";

interface ListTweetProps {
  tweet: string;
  updated_at: Date;
  id: number;
}

export default function ListTweet({
  tweet,
  updated_at,
  id,
}: ListTweetProps) {
  console.log(tweet);
  return (
    <Link href={`/tweets/${id}`} className="flex gap-5">
      <div className="flex flex-col gap-1 *:text-gray-500">
        <span className="text-lg">{tweet}</span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(updated_at.toString())}
        </span>
      </div>
    </Link>
  );
}