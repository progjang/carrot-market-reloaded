import Link from "next/link";
import db from "../lib/db";
import TweetList from "../components/tweet-list";

async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    select:{
      tweet: true,
      updated_at: true,
      id: true,
    },
    take: 1,
    orderBy:{
      updated_at: "desc",
    }
  });

  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<
  typeof getInitialTweets
>;

export default async function Tweets() {
  const initialTweets = await getInitialTweets();
  return (
    <div className="p-5 flex flex-col gap-5">
      <TweetList initialTweets={initialTweets} />
    </div>
  );
}