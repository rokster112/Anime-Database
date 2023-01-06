import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllAnime from './components/AllAnime'
import OneAnime from './components/OneAnime'
import Home from './components/Home'
import PageNavbar from './components/PageNavbar'
import { useEffect, useState } from 'react'
import News from './components/one_anime_components/News'
import Episodes from './components/one_anime_components/Episodes'
import Recommendations from './components/one_anime_components/Recommendations'
import Reviews from './components/one_anime_components/Reviews'


export default function App() {

  const [search, setSearch] = useState('')
  const [allAnime, setAllAnime] = useState([])
  const [oneAnime, setOneAnime] = useState([])
  const [filteredResults, setFilteredResults] = useState([])


  return (
    <div className='site-wrapper'>
      <BrowserRouter>
      <PageNavbar onSearch={setSearch} search={search} onAllAnime={setAllAnime} allAnime={allAnime} onFilteredResults={setFilteredResults} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/anime' element={<AllAnime search={search} onAllAnime={setAllAnime} filteredResults={filteredResults} />} />
          <Route path='/anime/:id' element={<OneAnime settingOneAnime={setOneAnime}/>}/>
          <Route path='/anime/:id/full/news' element={<News oneAnime={oneAnime}/>} />
          <Route path='/anime/:id/full/reviews' element={<Reviews oneAnime={oneAnime}/>} />
          <Route path='/anime/:id/full/videos/episodes' element={<Episodes oneAnime={oneAnime}/>} />
          <Route path='/anime/:id/full/recommendations' element={<Recommendations oneAnime={oneAnime}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

