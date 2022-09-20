import React from "react"
import { useNavigate } from "react-router-dom"

import { Item } from "../services/news"
//@ts-ignore
import { DateLabel } from "./DateLabel.tsx"
//@ts-ignore
import styles from "./News.module.css"

interface Props {
  news: Item
}

export function News({ news }: Props): JSX.Element {
  let navigate = useNavigate()

  return (
    <div className={styles.NewsContainer}>
      <div>{news.title}</div>
      <div>
        <a href={news.url}>{news.url}</a>
      </div>

      <div>Рейтинг {news.score}</div>
      <div>Ник автора {news.by}</div>
      <div>Дата рубликации </div>
      <DateLabel date={news.time} />
      <button
        onClick={() => {
          navigate("/")
        }}
      >
        Назад
      </button>
    </div>
  )
}
