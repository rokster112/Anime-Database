import { Link } from "react-router-dom"

export default function Description(props) {
  return (
    <>
        <p style={{fontWeight: 'bold', marginBottom: '5px'}} className='description'>Synopsis</p> 
        <p style={{borderTop: '1px solid'}}>{props.synopsis}</p>
        <p style={{fontWeight: 'bold', marginBottom: '5px'}} className='description'>Background</p> 
        <p style={{borderTop: '1px solid'}}>{props.background === null ? 'No background information has been added to this title.' : props.background}</p>
        <p style={{fontWeight: 'bold', marginBottom: '5px'}} className='description'>Related anime</p>
        <div style={{height: '80px', overflow: 'scroll', marginBottom: '5px'}}>
        <p style={{borderTop: '1px solid'}}>{props.relations ? props.relations.map(item => {
          return item.entry.map(some => <Link style={{ textDecoration: 'none' }} to={some.type === 'manga' ? '#' : `/anime/${some.mal_id}`}>
      {some.type === 'manga' ? <p style={{marginBottom: '5px', fontSize: '14px', color: 'black'}}>{item.relation}: Manga: {some.name}</p> : <p style={{marginBottom: '5px', fontSize: '14px'}}>{item.relation}: {some.name}</p>}</Link>)
  }) : 'No related anime available'}</p>
  </div>
    </>
  )
}