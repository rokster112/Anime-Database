import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import MiniNavbar from '../helpers/MiniNavbar'
import SideInfo from './SideInfo'
import PagesBar from '../PagesBar'

export default function Reviews(props) {

  const {id} = useParams()

  const [reviews, setReviews] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageData, setPageData] = useState()

  useEffect(() => {
    const getData = async () => {
      try {
        const {data} = await axios.get(`https://api.jikan.moe/v4/anime/${id}/reviews`, {
          params: {
            page: currentPage
          }
        })
        setReviews(data.data.map(item => {
          return {...item, toggle: false}
        }))
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

  function toggler(id) {
    setReviews(reviews.map(review => {
      if (review.mal_id === id) {
        return {...review, toggle: !review.toggle}
      }
      return review
    }))
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
    <div key={item.mal_id}  style={{display: 'flex', justifyContent: 'space-between', margin: '15px 10px 0px 0px', overflow: item.toggle ? 'visible' : 'hidden', height: item.toggle ? '' : '300px'}}>
    <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{display: 'flex', justifyContent: 'centre', flexDirection: 'row'}}> 
        <div>
        <img style={{width: '120px', marginInline: '10px'}} src={item.user.images.jpg.image_url}/>
        </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <p style={{fontWeight: 'bold', color: '#1c439b'}}>{item.user.username}</p>
        <p style={{marginRight: '10px'}}>{item.date.split('T')[0]}</p>
        </div>
      <p style={{fontWeight: 'bold'}}>Rating: {item.score}/10</p>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        {rating}
        </div>
      <p style={{fontSize: '14px'}}>{item.review}</p>
        </div>
      </div>
    </div>
    </div>
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
    <button className='reviews-button' id={item.mal_id} name={item.mal_id} onClick={() => toggler(item.mal_id)}>{item.toggle ? 'Hide ∧' : 'Show ∨'}</button>
    </div>
    </>
  })
  : ''

  // const lastPage = pageData.map(item => item.last_visible_page)

  console.log('REVIEW DATA', reviews)
  console.log('REVIEW DATA', pageData)

  
  return (
    <div>
      {reviews !== undefined ? 
      <div>
      <MiniNavbar 
      id={id}
      title={props.oneAnime.title_english}
      />
      <div style={{display: 'flex', flexDirection: 'row', marginInline: '20px'}}>
        <SideInfo 
          id={id}
          {...props.oneAnime}
        />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{borderBottom: '1px solid', paddingBottom: '15px'}}>
          <p style={{margin: '0', fontWeight: 'bold'}}>Reviews</p>
          </div>
      {mappedReviews.length > 0 ? 
      <>
        {mappedReviews}
        <div style={{ display: 'flex', alignItem: 'center', justifyContent: 'center' }}>
          <PagesBar
            changePage={changePage}
            currentPage={currentPage}
            lastPage={pageData.last_visible_page} />
        </div></> : 'No reviews are available for this anime'}
          </div>  
      </div>

      </div>
    
      : 'Reviews unavailable'}
    </div>
  )
}