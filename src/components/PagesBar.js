
export default function PagesBar(props) {

  const totalPages = Math.ceil(props.total_anime / props.per_page)



  return (
    <div className='page-nav-container'>
      <button onClick={() => props.changePage(props.currentPage - 1)} disabled={props.currentPage === 1}>Back</button>
      <div className='page-number'>{props.currentPage}</div>
      <button onClick={() => props.changePage(props.currentPage + 1)} disabled={props.currentPage === totalPages || props.currentPage == props.lastPage}>Next</button>
    </div>
  )
}