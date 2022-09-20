import React from "react"
import { Link } from "react-router-dom"

import { Item } from "../services/news"
//@ts-ignore
import { DateLabel } from "./DateLabel.tsx"
//@ts-ignore
import styles from "./NewsFeedItem.module.css"

interface Props {
  item: Item
}

export function NewsFeedItem({ item }: Props): JSX.Element {
  return (
    <div className={styles.NewsFeedCard}>
      <div className={styles.Author}>{item.by}</div>
      <div className={styles.Title}>
        <Link to={`/news/${item.id}`}>{item.title}</Link>
      </div>
      <div className={styles.Footer}>
        <DateLabel className={styles.Time} date={item.time} />
        <div className={styles.Score}>rating: {item.score}</div>
      </div>
    </div>
  )
}
