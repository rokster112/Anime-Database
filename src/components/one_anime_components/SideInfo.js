import React from 'react'
import WatcherStats from './WatcherStats'


export default function SideInfo(props) {

  return (
    <div style={{paddingTop: '20px'}} key={props.mal_id}> 
      <div className='side-information' style={{border: '1px solid #e5e5e5', backgroundColor: '#f8f8f8'}}>
      <div className='image-title-container'>
      <a href={props.url} target='_blank' rel='noreferrer'>
      <img src={props.images ? props.images.webp.image_url : ''} alt={props.title} />
      </a>
      <p style={{maxWidth: '200px', borderBottom: '1px solid #e5e5e5'}}><span className='span'>Alternative names</span><br/>{props.title_japanese}<br/>{props.title}</p>
      </div>
      <div className='details-container'>
      <h5>Details</h5>
      <p className='individual-details'>Aired from {props.aired ? props.aired.string : 'Not Available'}</p>
      <p className='individual-details'>{props.duration}</p>
      <p className='individual-details'>Episodes: {props.episodes}</p>
      <p className='individual-details'><span className='span'>Genres</span></p>
      {props.genres ? props.genres.map(item => <p className='individual-details' key={item.name}>{item.name}</p>) : 'Loading'}
      <p className='individual-details'>{props.rating}</p>
      <p className='individual-details'><span className='span'>Licensors</span></p>
      {props.licensors ? props.licensors.map(item => <p className='individual-details' key={item.name}>{item.name}</p>) : 'Loading'}
      <p className='individual-details'><span className='span'>Producers</span></p>
      {props.producers ? props.producers.map(item => <p className='individual-details' key={item.name}>{item.name}</p>) : 'Loading'}
      <p className='individual-details'>{props.type}</p>
      <p className='individual-details'>{props.season}</p>
      <p className='individual-details'><span className='span'>Release year</span><br/>{props.year === null ? 'Currently not available' : props.year}</p>
      <p style={{borderBottom: '1px solid #e5e5e5'}} className='individual-details'>{props.status}</p>
      </div>
      <WatcherStats 
        id={props.id}
        />
      </div>
    </div>
  )
}