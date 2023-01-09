
import axios from 'axios'
import { useEffect, useState } from 'react'
import UpcomingAnime from './helpers/UpcomingAnime'
import SeasonNow from './helpers/SeasonNow'



export default function Home() {

  const [upcoming, setUpcoming] = useState([])
  const [pageDataUpcoming, setPageDataUpcoming] = useState([])
  const [now, setNow] = useState([])
  const [pageDataNow, setPageDataNow] = useState([])
  const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)


  useEffect(() => {
    const getSeasonData = async () => {
      try {
        const [data1, data2] = await Promise.all([axios.get(
          `https://api.jikan.moe/v4/seasons/upcoming`, {
            params: {
              page: currentPageUpcoming
            }
          }),
          axios.get(`https://api.jikan.moe/v4/seasons/now`, {
            params: {
              page: currentPage
            }
          })])
          setUpcoming(data1.data.data)
          setPageDataUpcoming(data1.data.pagination)
          setNow(data2.data.data)
          setPageDataNow(data2.data.pagination)
      } catch (error) {
        console.log(error)
      }
    }
    getSeasonData()
  }, [currentPage, currentPageUpcoming])

  function changePage(page) {
    setCurrentPage(page)
  }
  function changePageUpcoming(page) {
    setCurrentPageUpcoming(page)
  }
  
    console.log(pageDataNow, pageDataUpcoming)


    // console.log('Upcoming season', upcomingSeason)

  return (
  <div>
      <div style={{backgroundColor: 'rgb(100 146 255)', paddingBlock: '5px', borderBlock: '1px solid black'}}>
        <h2 style={{textAlign: 'center', paddingBlock: '10px', margin: '0', color: 'white'}}>Welcome to Anime Database!</h2>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '30px', alignItems: 'center'}}>
        <p style={{textAlign: 'center', fontWeight: 'bold'}}>Upcoming Anime</p>
      <UpcomingAnime 
      pageData={pageDataUpcoming}
      upcoming={upcoming}
      currentPage={currentPageUpcoming}
      changePage={changePageUpcoming}
      lastPage={pageDataUpcoming.last_visible_page}
      />
      </div>

      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '30px', alignItems: 'center'}}>
        <p style={{textAlign: 'center', fontWeight: 'bold'}}>Current Anime</p>

      <SeasonNow
      pageData={pageDataNow}
      now={now}
      currentPage={currentPage}
      changePage={changePage}
      lastPage={pageDataNow.last_visible_page}
      />
      </div>
    </div>
  )
}