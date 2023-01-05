import { useEffect, useState } from "react"
import axios from 'axios'

export default function Reviews(props) {

  const [data, setData] = useState()

  useEffect(() => {
    const getData = async () => {
      const {data} = await axios.get(`https://api.jikan.moe/v4/anime/${props.id}/reviews`)
      console.log('REVIEW DATA', data)
    }
    getData()
  }, [])


  
  return (
    <div>

    </div>
  )
}