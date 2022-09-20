import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { NotFound } from "./components/NotFound.tsx"
import { NewsContainer } from "./containers/News.tsx"
import { NewsFeedContainer } from "./containers/NewsFeed.tsx"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewsFeedContainer />} />
        <Route path="/news/:newsId" element={<NewsContainer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
