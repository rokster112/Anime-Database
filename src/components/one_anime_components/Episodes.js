import { useEffect, useState } from "react"
import axios from 'axios'
import PagesBar from '../PagesBar'
import image from '../../images/broken_image.jpeg'


export default function Episodes(props) {
  const [episodes, setEpisodes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageData, setPageData] = useState([])
  const [toggle, setToggle] = useState(true)


  useEffect(() => {
    const getEpisodes = async () => {
      try {
        const {data} = await axios.get(`https://api.jikan.moe/v4/anime/${props.id}/videos/episodes`, {
          params: {
            page: currentPage
          }
        })
        setEpisodes([data.data])
        setPageData([data.pagination])
      } catch (error) {
        console.log(error)
      }
    }
    getEpisodes()
  }, [currentPage])


  function changePage(page) {
    setCurrentPage(page)
  }

  const lastPage = pageData.map(item => item.last_visible_page)

  const styles = { 
    display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', height: toggle ? '170px' : '270px', borderTop: '1px solid black',  overflow: toggle ? 'hidden' : 'scroll',
  }

  function handleClick() {
    setToggle(!toggle)
    document.getElementById('scrollable-div').scrollTo({ top: 0, behavior: 'smooth' })
  }

  
  const mappedEpisodes = episodes.map(item => {
    return item.map(some => {
      return <div key={some.mal_id} style={{width: '150px', height: '170px', marginBlock: '5px 20px'}}>
          <p style={{fontSize: '12px', marginLeft: '18px', marginBottom: '4px'}}>{some.episode}</p>
        <div style={{width: '110px', height: '110px'}}>
        <a href={some.url} target='_blank' rel='noreferrer'>
        <img style={{width: '100%', height: '100%'}} src={some.images.jpg.image_url === null ? image : some.images.jpg.image_url} alt={some.title}/>
        </a>
        </div>
        <p style={{fontSize: '12px'}}>{some.title}</p>
        </div>
        
      })
    })

    const eps = episodes.map(item => {
      return item.map(some => some.title)
    })
    
  return (
    <>
    {episodes.length > 0 ?
    <>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ fontWeight: 'bold' }} className='description'>Episodes</p>
          <p className='episode-button' onClick={handleClick}>{toggle ? 'Show all episodes' : 'Minimize all episodes '}</p>
        </div><div style={styles} id='scrollable-div'>
            {mappedEpisodes}
          </div>
          
          {eps.length > 39 ? <PagesBar
            lastPage={lastPage}
            currentPage={currentPage}
            changePage={changePage} />
            :
            ''
            }
            </>
      :
      'Episodes unavailable/loading. If problem persists, refresh the page'
    }
    </>

  )
}