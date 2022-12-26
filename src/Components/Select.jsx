import React from 'react'

export default function Select({cambioLetra, cambioColor, cambioTamaño}) {
  return (
    <section className='contenedor-select'>

            <p className="nombre-select">Tipo de letra</p>        
            <select onChange={cambioLetra} className='letra' >
                <option value={'Arial'}>Arial</option>
                <option value={'Georgia'}>Georgia</option>
                <option value={'Verdana'}>Verdana</option>
                <option value={'Times'}>Times</option>
                <option value={'Baskerville'}>Baskerville</option>
            </select>

            <p className="nombre-select">Tamaño de letra</p>        
            <select onChange={cambioTamaño} className='tamaño' >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
                <option value={50}>60</option>
                <option value={50}>70</option>
            </select>

            <p className="nombre-select">Color de letra</p>        
            <input onChange={cambioColor} className='color' type="color"></input>
        </section>
  )
}
