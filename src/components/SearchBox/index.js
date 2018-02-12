import React from 'react'
import './index.css'

function SearchBox({term, onChange}) {
  return (<input type="text" className="search" placeholder="Type to search" onChange={onChange}
                 value={term}/>)
}

export default SearchBox