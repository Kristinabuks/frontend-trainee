import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

//@ts-ignore
import { HACKERNEWS_BASE_URL } from "../config.ts"

export interface Item {
  by: string
  descendants?: number
  id: number
  kids: number[]
  parent?: number
  text?: string
  score?: number
  time: number
  title?: string
  type: string
  url?: string
  dead?: boolean
}

async function getItemListQuery(
  kids: number[],
  _queryApi,
  _extraOptions,
  fetchWithBQ: Function
) {
  const promises = kids.map((itemId) => fetchWithBQ(`item/${itemId}.json`))

  let result
  try {
    result = await Promise.all(promises)
  } catch (error) {
    return { error }
  }

  const data = result
    .filter((r) => r.meta.response.status === 200)
    .map((r) => r.data)
  const errors = result
    .filter((r) => r.meta.response.status !== 200)
    .map((e) => e.error.data.error)

  if (errors.length) {
    return {
      error: errors.join(";")
    }
  }

  return { data }
}

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: HACKERNEWS_BASE_URL
  }),
  endpoints: (builder) => ({
    getItem: builder.query<Item, number>({
      query: (itemId) => `item/${itemId}.json`
    }),
    getItemList: builder.query<Item[], number[]>({
      queryFn: getItemListQuery
    }),
    listNewStories: builder.query<number[], void>({
      query: () => `newstories.json`
    })
  })
})

export const { useGetItemQuery, useGetItemListQuery, useListNewStoriesQuery } =
  newsApi
