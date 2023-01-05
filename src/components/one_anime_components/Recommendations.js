import { useEffect, useState } from "react"
import axios from 'axios'

export default function Recommendations(props) {
  const [rec, setRec] = useState([])

  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const {data} = await axios.get(`https://api.jikan.moe/v4/anime/${props.id}/recommendations`)
        setRec(data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getRecommendations()
  }, [])



  return (
    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', height: '250px', overflow: 'scroll', marginTop: '10px'}}>
      {(typeof rec !== 'undefined' || rec.length === 0) && rec.length > 0 ? rec.map(item => {
        if (item.votes > 5) {
          return <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', marginInline: '5px', marginBottom: '25px', height: '220px', width: '160px'}}>
          <a href={`/anime/${item.entry.mal_id}`}>
          <div style={{height: '200px', width: '160px'}}>
          <img style={{width: '100%', height: '100%'}} src={item.entry.images.jpg.image_url} alt={item.entry.title}/>
          </div>
          </a>
          <p>Votes: {item.votes}</p>
          </div>
        } else {
          return ''
        }
      }) : 'No recommendations available'}
    </div>

  )
}