import { useState, useEffect } from 'react'
import axios from 'axios'
import AnimeCard from './AnimeCard'
import PagesBar from './PagesBar'

export default function AllAnime(props) {

  const [errors, setErrors] = useState(false)
  const [anime, setAnime] = useState([])
  const [pageData, setPageData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  
  useEffect(() => {
    const getAnimeData = async () => {
      try {
        const { data } = await axios.get('https://api.jikan.moe/v4/anime', {
          params: {
            page: currentPage
          }
        })
        setAnime(data.data)
        props.onAllAnime(data.data)
        setPageData([data.pagination])
      } catch (err) {
        console.log(err)
        setErrors(err)
      }
    }

    getAnimeData()
    // eslint-disable-next-line
  }, [currentPage])

  function changePage(page) {
    setCurrentPage(page)
  }

  const animeComp = props.filteredResults.length > 0 ? props.filteredResults.map(oneAnime => {
    return <AnimeCard 
    key={oneAnime.mal_id}
    id={oneAnime.mal_id}
    english_title={oneAnime.title_english}
    japanese_title={oneAnime.title_japanese}
    alternative_title={oneAnime.title}  
    image={oneAnime.images.jpg.image_url}
    score={oneAnime.score}  
    />
  }) : anime.map(oneAnime => {
    return <AnimeCard 
    key={oneAnime.mal_id}
    id={oneAnime.mal_id}
    english_title={oneAnime.title_english}
    japanese_title={oneAnime.title_japanese}
    alternative_title={oneAnime.title}  
    image={oneAnime.images.jpg.image_url} 
    score={oneAnime.score}   
    />
  })
  
  const pages = pageData.map((item, index) => {
    return <PagesBar 
      key={index}
      current_page={item.current_page}
      has_next_page={item.has_next_page}
      last_page={item.last_visible_page}
      per_page={item.items.per_page}
      total_anime={item.items.total}
      currentPage={currentPage}
      changePage={changePage}
    />
  })


  return (
    <div className='anime-page'>
    <div className='anime-div'>
    {animeComp.length > 0 ? animeComp : 'Loading'}    
    </div>
    {pages.length > 0 ? pages : errors} 
    </div>
  )
}