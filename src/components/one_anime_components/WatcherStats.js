import { useEffect, useState } from 'react'
import axios from 'axios'


export default function WatcherStats(props) {
  
  const [stats, setStats] = useState(0)


  useEffect(() => {
    const getStats = async () => {
      try {
        const {data} = await axios.get(`https://api.jikan.moe/v4/anime/${props.id}/statistics`)
        console.log('This is the data', data)
        setStats(data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getStats()
  }, [])

  return (
    <div>
      {stats === 0 ? 'Stats are being loaded' : <>
        <h5>User statistics</h5>
        <div>
        <p className='user-stats'>Completed: {stats.completed}</p>
        <p className='user-stats'>Dropped: {stats.dropped}</p>
        <p className='user-stats'>On hold: {stats.on_hold}</p>
        <p className='user-stats'>Plan to watch: {stats.plan_to_watch}</p>
        <p className='user-stats'>Watching: {stats.watching}</p>
        <p className='user-stats'>Total: {stats.total}</p>
      </div>
      <p style={{fontWeight: 'bold', marginBottom: '5px', fontSize: '14px'}}>Score Data</p>
      {stats.scores.map(score => {
        return <p className='user-stats'>Score: {score.score} | Votes: {score.votes} | {score.percentage}%</p>
      })}
      </>
      }
    </div>
  )
}