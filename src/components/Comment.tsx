import React, { useState } from "react"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import rehypeRaw from "rehype-raw"

//@ts-ignore
import { Item } from "../services/news.tsx"
//@ts-ignore
import styles from "./Comment.module.css"

interface Props {
  comment: Item
  children: JSX.Element
}

export function Comment({ comment, children }: Props) {
  const [showSubthread, setShowShowSubthread] = useState(false)
  const toggleSubthread = () => setShowShowSubthread(!showSubthread)

  return (
    <div>
      <div className={styles.Comment}>
        <div>{comment.by}</div>
        <div>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {comment.text}
          </ReactMarkdown>
        </div>
      </div>
      {comment.kids && (
        <button onClick={toggleSubthread}>
          {showSubthread ? "Скрыть ответы" : "Показать ответы"}
        </button>
      )}
      {showSubthread && children}
    </div>
  )
}
