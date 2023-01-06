import { useEffect, useState } from "react"
import axios from 'axios'
import { useParams } from "react-router-dom"
import MiniNavbar from "../helpers/MiniNavbar"
import SideInfo from "./SideInfo"

export default function Recommendations(props) {
  const [rec, setRec] = useState([])
  const {id} = useParams()

  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const {data} = await axios.get(`https://api.jikan.moe/v4/anime/${id}/recommendations`)
        setRec(data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getRecommendations()
  }, [])
  
  console.log('One anime data', rec)

  return (
    <div>
            <MiniNavbar 
        id={id}
        title={props.oneAnime.title_english}
      />
    <div className='individual-anime' style={{display: 'flex', justifyContent: 'space-between'}}>
    <div className='side-info-statistics-part' style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
    <SideInfo 
      id={id}
      {...props.oneAnime}
      />
    <div style={{display: 'flex', flexDirection: 'column'}}>
    <p style={{ fontWeight: 'bold' }}>Recommendations</p>
    
    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',height: '450px', overflow: 'scroll', borderTop: '1px solid'}}>
    

      {(typeof rec !== 'undefined' || rec.length === 0) && rec.length > 0 ? rec.map(item => {
        if (item.votes > 1) {
          return <div key={item.entry.mal_id} style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', marginInline: '5px', marginBlock: '25px', height: '220px', width: '160px'}}>
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
    </div>
    </div>
    </div>
    </div>

  )
}