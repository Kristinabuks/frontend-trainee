import React, { useEffect } from "react"

import { Alert } from "../components/Alert.tsx"
import { Loader } from "../components/Loader.tsx"
import { NewsFeedItem } from "../components/NewsFeedItem.tsx"
import { MAX_FETCH_ITEMS, POLL_INTERVAL_MS } from "../config.ts"
import { Item } from "../services/news"
import { useGetItemQuery, useListNewStoriesQuery } from "../services/news.ts"
import styles from "./NewsFeed.module.css"
import { RTKQueryResult } from "./types"

function NewsFeedItemContainer({ itemId }) {
  const {
    data: item,
    error,
    isLoading
  }: RTKQueryResult<Item> = useGetItemQuery(itemId)

  return (
    <>
      {error ? (
        <Alert>Ошибка загрузки элемента ленты. Обновите страницу.</Alert>
      ) : isLoading ? (
        <Loader />
      ) : (
        item && <NewsFeedItem item={item} />
      )}
    </>
  )
}

export function NewsFeedContainer() {
  let {
    data: items,
    error,
    isLoading,
    refetch
  }: RTKQueryResult<number[]> = useListNewStoriesQuery()

  items = items?.slice(0, MAX_FETCH_ITEMS) || []

  useEffect(() => {
    const timerId = setInterval(() => {
      refetch()
    }, POLL_INTERVAL_MS)

    return () => {
      clearInterval(timerId)
    }
  }, [refetch])

  return (
    <div className={styles.Container}>
      <button
        onClick={() => {
          refetch()
        }}
      >
        Обновить ленту
      </button>
      {error ? (
        <Alert>Ошибка загрузки ленты</Alert>
      ) : isLoading ? (
        <Loader />
      ) : (
        items.map(
          (id: number): JSX.Element => (
            <NewsFeedItemContainer key={id} itemId={id} />
          )
        )
      )}
    </div>
  )
}
