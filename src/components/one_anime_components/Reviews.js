import { useEffect, useState } from "react"
import axios from 'axios'
import { useParams } from "react-router-dom"

export default function Reviews(props) {

  const {id} = useParams()

  const [reviews, setReviews] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageData, setPageData] = useState()
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const {data} = await axios.get(`https://api.jikan.moe/v4/anime/${id}/reviews`, {
          params: {
            page: currentPage
          }
        })
        setReviews(data.data)
        setPageData(data.pagination)
      } catch (error) {
        console.log('ERROR ON REVIEWS PAGE', error)
      }
    }
    getData()
  }, [])

  function changePage(page) {
    setCurrentPage(page)
  }

  function toggler(event, id) {
    // eslint-disable-next-line no-restricted-globals
    if (event.target.id === event.target.name) {
      setToggle(!toggle)
    }
  }

  const mappedReviews = reviews !== undefined ? reviews.map(item => {
    const rating = item.tags.map(tag => {
      if (tag === 'Recommended') {
        return <p className='reviews-p' style={{color: 'green', border: '1px solid green'}}>☆ {tag}</p>
      } else if (tag === 'Mixed Feelings') {
        return <p className='reviews-p' style={{color: 'black', border: '1px solid black'}}>☆ {tag}</p>
      } else if (tag === 'Not Recommended') {
        return <p className='reviews-p' style={{color: 'red', border: '1px solid red'}}>☆ {tag}</p>
      } else {
        return <p className='reviews-p' style={{color: '#1c439b', border: '1px solid #1c439b'}}>☆ {tag}</p>
      }
    })
    return <>
    <div key={item.mal_id}  style={{display: 'flex', justifyContent: 'space-between', margin: '20px 10px 0px 0px', overflow: 'hidden', height: '300px'}}>
    <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{display: 'flex', justifyContent: 'centre', flexDirection: 'row'}}> 
        <div>
        <img style={{width: '120px', marginInline: '10px'}} src={item.user.images.jpg.image_url}/>
        </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <p style={{fontWeight: 'bold', color: '#1c439b'}}>{item.user.username}</p>
      <p style={{fontWeight: 'bold'}}>Rating: {item.score}/10</p>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        {rating}
        </div>
      <p style={{fontSize: '14px'}}>{item.review}</p>
        </div>
      </div>
    </div>
    </div>
    <button name={item.mal_id} value={item.mal_id} id={item.mal_id} onClick={(event) => toggler(event, item.mal_id)}>{toggle ? 'Hide' : 'Show'}</button>
    </>
  })
  : ''


  console.log('REVIEW DATA', reviews)
  console.log('REVIEW DATA', pageData)

  
  return (
    <div>
      {reviews !== undefined ? 
      <div>
      {mappedReviews}
      </div>
    
      : 'Reviews unavailable'}
    </div>
  )
}