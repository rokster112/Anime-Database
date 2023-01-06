import { useEffect, useState, useContext } from "react"
import axios from 'axios'
import PagesBar from "../PagesBar"
import { Link, useParams } from "react-router-dom"
import SideInfo from "./SideInfo"
import MiniNavbar from "../helpers/MiniNavbar"

export default function News(props) {
  const {id} = useParams()

  const [data, setData] = useState([])
  const [pageData, setPageData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const getData = async () => {
      const {data} = await axios.get(`https://api.jikan.moe/v4/anime/${id}/news`, {
        params: {
          page: currentPage
        }
      })
      setData(data.data)
      setPageData(data.pagination)
    }
    getData()
  }, [])

  function changePage(page) {
    setCurrentPage(page)
  }

  console.log('News data', data)

  const news = data.map(item => {
    return <div key={item.mal_id} style={{height: '170px', display: 'flex',flexDirection: 'row'}}>
      <a href={item.url} target='_blank' rel='noreferrer'>
        <div style={{width: '80px', height: '120px'}}>
      <img style={{width: '100%', height: '100%'}} src={item.images.jpg.image_url} alt={item.title}/>
        </div>
      </a>
      <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
      <p style={{fontSize: '14px'}}>{item.title}</p>
      <p style={{fontSize: '14px'}}>{item.excerpt}</p>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
      <p style={{fontSize: '14px'}}>Date: {item.date.split('T')[0]}</p>
      <p style={{fontSize: '14px'}}>Author Username: {item.author_username}</p>
      <p style={{fontSize: '14px'}}>Comments: {item.comments}</p>
      </div>
      </div>
    </div>
  })

  return (
    <div>
      <MiniNavbar 
        id={id}
        title={props.oneAnime.title_english}
      />
      <div className='individual-anime'>
      <div className='side-info-statistics-part' style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <SideInfo 
      id={id}
      {...props.oneAnime}
      />
      <div style={{display: 'flex', flexDirection: 'column', paddingTop: '20px'}}>
      { data.length > 0 ? news : 'Currently no news available for this anime'}
      {pageData.has_next_page ? <PagesBar 
        currentPage={currentPage}
        changePage={changePage}
        lastPage={pageData.last_visible_page}
      /> : ''}
      </div>
      </div>
      </div>
    </div>

  )
}

