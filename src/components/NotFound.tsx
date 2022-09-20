import React from "react"
import { Link } from "react-router-dom"

export function NotFound(): JSX.Element {
  return (
    <div>
      <div>NOT FOUND</div>
      <Link to="/">Home</Link>
    </div>
  )
}
