"use server";

import db from "../lib/db";

export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      updated_at: true,
      id: true,
    },
    skip: 1,
    take: 1,
    orderBy: {
      updated_at: "desc",
    },
  });
  return tweets;
}