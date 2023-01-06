
import axios from 'axios'
import { useEffect, useState } from 'react'
import SeasonUpcoming from './helpers/SeasonUpcoming'
import SeasonNow from './helpers/SeasonNow'

export default function Home() {

  const [upcoming, setUpcoming] = useState([])
  const [pageDataUpcoming, setPageDataUpcoming] = useState([])
  const [now, setNow] = useState([])
  const [pageDataNow, setPageDataNow] = useState([])


  useEffect(() => {
    const getSeasonData = async () => {
      try {
        const [data1, data2] = await Promise.all([axios.get(
          `https://api.jikan.moe/v4/seasons/upcoming`),
          axios.get(`https://api.jikan.moe/v4/seasons/now`)])
          setUpcoming(data1.data.data)
          setPageDataUpcoming(data1.data.pagination)
          setNow(data2.data.data)
          setPageDataNow(data2.data.pagination)
      } catch (error) {
        console.log(error)
      }
    }
    getSeasonData()
  }, [])


  return (
    <div>
      <div style={{backgroundColor: 'rgb(100 146 255)', paddingBlock: '5px', borderBlock: '1px solid black'}}>
        <h2 style={{textAlign: 'center', paddingBlock: '10px', margin: '0', color: 'white'}}>Welcome to Anime Database!</h2>
      </div>
      <SeasonUpcoming 
      {...upcoming}
      {...pageDataUpcoming}
      />
      <SeasonNow 
      {...now}
      {...pageDataNow}
      />
    </div>
  )
}