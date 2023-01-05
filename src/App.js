import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllAnime from './components/AllAnime'
import OneAnime from './components/OneAnime'
import Home from './components/Home'
import PageNavbar from './components/PageNavbar'
import { useState } from 'react'
import News from './components/one_anime_components/News'

export default function App() {

  const [search, setSearch] = useState('')
  const [allAnime, setAllAnime] = useState([])
  const [oneAnime, setOneAnime] = useState([])
  const [filteredResults, setFilteredResults] = useState([])

  console.log('Filtered array', filteredResults)
  return (
    <div className='site-wrapper'>
      <BrowserRouter>
      <PageNavbar onSearch={setSearch} search={search} onAllAnime={setAllAnime} allAnime={allAnime} onFilteredResults={setFilteredResults} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/anime' element={<AllAnime search={search} onAllAnime={setAllAnime} filteredResults={filteredResults} />} />
          <Route path='/anime/:id' element={<OneAnime settingOneAnime={setOneAnime}/>}/>
          <Route path='/anime/:id/full/news' element={<News oneAnime={oneAnime}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

