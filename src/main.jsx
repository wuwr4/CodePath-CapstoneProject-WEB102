import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter, Routes, Route } from "react-router"

import './index.css'
import App from './App.jsx'
import PostView from './components/PostView.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter> 

    <Routes>
      
      <Route index element={ <App /> } />
      <Route path="/posts/:id" element={ <PostView /> } />
 
    </Routes>

  </BrowserRouter>
)


/* 
Notes
- Pages
-- Home gallery page
--- Search by title
--- Filter by votes/newest
-- New post page
-- Edit post page
-- Post info page

- Components
-- Create/edit form
-- Gallery card

- Navigation
-- MovieHub logo
-- Home
-- New Post
-- About

- Database Columns
-- id
-- created_at
-- title
-- content
-- num_votes
-- author_name
-- Comments array

- Stretch Features
-- Pull from TMDB and use for post info page


*/