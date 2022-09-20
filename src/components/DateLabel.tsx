import dayjs from "dayjs"
import React from "react"

interface Props {
  date: number
}

export function DateLabel({ date, ...props }: Props): JSX.Element {
  const diff = dayjs().diff(dayjs.unix(date))
  const prettyDiffSeconds = dayjs.duration(diff, "ms").asMinutes().toFixed()

  return <div {...props}>{prettyDiffSeconds}m</div>
}
