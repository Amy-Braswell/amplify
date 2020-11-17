import React from 'react'

import GalleriesList from '../../Components/Galleries/GalleriesList'


export default function Home() {

    return(
        <main className='App'>
            <header className='App-header'> 
                <h1>iArt</h1>
            </header>
            <div className='Gallery-List'>
                <GalleriesList/>
            </div> 
        </main>
    )   
}
