import React from 'react'

export default function DisplayMeme({meme, onClick}) {
  return (
    <img className='meme' 
    onClick={onClick} 
    style = {{ width: 300, boxShadow: `1px 1px 5px grey`}}
    alt={meme.name}
    key={meme.id}
    src={meme.url} />
  )
}
