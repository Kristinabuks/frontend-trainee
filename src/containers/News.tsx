import React, { useEffect } from "react"
import { useParams } from "react-router-dom"

import { Alert } from "../components/Alert.tsx"
import { Comment } from "../components/Comment.tsx"
import { Loader } from "../components/Loader.tsx"
import { News } from "../components/News.tsx"
import { POLL_INTERVAL_MS } from "../config.ts"
import { Item, useGetItemListQuery, useGetItemQuery } from "../services/news.ts"
import styles from "./NewsFeed.module.css"
import { RTKQueryResult } from "./types"

function NewsCommentThreadContainer({
  commentIds,
  level = 0
}: {
  commentIds: number[]
  level?: number
}) {
  const SUBTHREAD_MARGING_STRIDE = 50
  const subthreadMargin = SUBTHREAD_MARGING_STRIDE * level

  let {
    data: comments,
    error,
    isLoading,
    refetch
  }: RTKQueryResult<Item[]> = useGetItemListQuery(commentIds)

  comments = comments?.filter((c) => !c?.dead) || []

  useEffect(() => {
    const timerId = setInterval(() => {
      refetch()
    }, POLL_INTERVAL_MS)

    return () => {
      clearInterval(timerId)
    }
  }, [refetch])

  if (error) {
    return <Alert>Ошибка загрузки треда.</Alert>
  }

  return (
    <>
      <button
        onClick={() => {
          refetch()
        }}
      >
        Обновить тред
      </button>
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ marginLeft: subthreadMargin }}>
          {comments?.length && <>Комментариев в треде:{comments?.length}</>}
          {comments.map((c) => (
            <Comment key={c.id} comment={c}>
              <NewsCommentThreadContainer
                commentIds={c.kids}
                level={level + 1}
              />
            </Comment>
          ))}
        </div>
      )}
    </>
  )
}

export function NewsContainer() {
  const { newsId } = useParams()
  const { data, error, isLoading }: RTKQueryResult<Item> =
    useGetItemQuery(newsId)

  return (
    <div className={styles.Container}>
      {error ? (
        <Alert>Ошибка загрузки новости. Обновите страницу.</Alert>
      ) : isLoading ? (
        <Loader />
      ) : data ? (
        <>
          <News news={data} />
          {data?.kids && <NewsCommentThreadContainer commentIds={data.kids} />}
        </>
      ) : null}
    </div>
  )
}
