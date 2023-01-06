import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import OneAnime from "../OneAnime";


export default function MiniNavbar(props) {


  const location = useLocation()
  
  const buttons = [
    {
      path: `/anime/${props.id}`,
      name: 'Details'
    },
    {
      path: `/anime/${props.id}/full/news`,
      name: 'News'
    },
    {
      path: `/anime/${props.id}/full/videos/episodes`,
      name: 'Episodes'
    },
    {
      path: `/anime/${props.id}/full/recommendations`,
      name: 'Recommendations'
    },
    {
      path: `/anime/${props.id}/full/reviews`,
      name: 'Reviews'
    },
  ]




  return (
    <div className='mini-navbar-container'>
      <div style={{backgroundColor: 'rgb(100 146 255)', paddingBlock: '5px', borderBlock: '1px solid black'}}>
        <h2 style={{textAlign: 'center', paddingBlock: '10px', margin: '0', color: 'white'}}>{props.title}</h2>
      </div>
    <div style={{display: 'flex', justifyContent: 'flex-end', marginBlock: '20px'}}>
      {buttons.map(item => {
        return <div style={{marginInline: '5px', borderBottom: '1px solid #1c439b'}}>
          <Link to={item.path}>
          <button className='mini-navbar-buttons' style={{backgroundColor: location.pathname === item.path ? '#1c439b' : 'white', 
          color: location.pathname === item.path ? 'white' : '#1c439b', 
          border: 'none'}}>
            {item.name}
          </button>
          </Link>
        </div>
      })}
    </div>
      </div>
  )
}