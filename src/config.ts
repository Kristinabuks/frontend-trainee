import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"

dayjs.extend(duration)

export const MAX_FETCH_ITEMS = 100
export const POLL_INTERVAL_MS = dayjs.duration(1, "m").asMilliseconds()
export const HACKERNEWS_BASE_URL =
  process.env.REACT_APP_HACKERNEWS_BASE_URL ||
  "https://hacker-news.firebaseio.com/v0/"
