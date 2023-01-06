import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import StatisticsPart from './one_anime_components/StatisticsPart'
import SideInfo from './one_anime_components/SideInfo'
import Characters from './one_anime_components/Characters'
import Description from './one_anime_components/Description'
import Episodes from './one_anime_components/Episodes'
import Recommendations from './one_anime_components/Recommendations'
import News from './one_anime_components/News'
import Reviews from './one_anime_components/Reviews'
import WatcherStats from './one_anime_components/WatcherStats'
import MiniNavbar from './helpers/MiniNavbar'

export default function OneAnime(props) {
  
  const { id } = useParams()

  const [oneAnime, setOneAnime] = useState(0)
  const [characters, setCharacters] = useState(0)
  const [error, setError] = useState(false)
  const [toggle, setToggle] = useState(true)



  useEffect(() => {
    const getAnimeData = async () => {
      try {
        const [ data1, data2 ] = await Promise.all([
          axios.get(`https://api.jikan.moe/v4/anime/${id}/full`), 
          axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`)])
        setOneAnime(data1.data.data)
        props.settingOneAnime(data1.data.data)
        if (data2.data.data === undefined) {
          setCharacters(0)
        } else {
          setCharacters(data2.data.data)
        }
      } catch (err) {
        console.log('THIS IS THE ERROR!!!!!!!', err)
        setError(err.message)
      }
    }
    getAnimeData()
  }, [id])


  const animeCharacters = characters === 0 ? 'No character data available' : characters.map(item => {
    const arr = [item]
    return arr.map(character => {
      return <Characters 
      key={character.character.mal_id}
      name={character.character.name}
      image={character.character.images.jpg.image_url}
      favorites={character.favorites}
      id={character.character.mal_id}
      />
    })
  })


  function handleClick() {
    setToggle(!toggle)
    document.querySelector('.character-div').scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  return (
    <div key={id}>
      {oneAnime === 0 ? 
      <p style={{textAlign: 'center', fontSize: '26px'}}>Loading</p>
      :
      <>
      <div style={{backgroundColor: '#b6caf9'}}>
      <h2 style={{textAlign: 'center', paddingTop: '10px', margin: '0', color: 'white',}}>{oneAnime.title}</h2>
      </div>
      <MiniNavbar 
        id={id}
      />
      <div className='individual-anime'>
      <div className='side-info-statistics-part' style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <SideInfo 
        id={id}
        {...oneAnime}
        />
      <div style={{display: 'flex', flexDirection: 'column'}}>
      <StatisticsPart
        {...oneAnime}
        />
      <div className='description-container'>
        <Description 
          {...oneAnime}
        />
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <p style={{fontWeight: 'bold', marginBottom: '5px'}} className='description'>Characters</p>             
      <p className='episode-button' onClick={handleClick}>{toggle ? 'Show all characters' : 'Minimize all characters'}</p>
      </div>
      <div className='character-div' style={{borderTop: '1px solid black', overflow: toggle ? 'hidden' : 'scroll'}}>
        {animeCharacters}
      </div>                  
      <div >
      </div>
      </div>
      </div>
      </div>
      </div>
      </>
      }
    </div>
  )
}