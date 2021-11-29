import React, { Component } from 'react'
import { Offline, Online } from './styles'

interface IHeaderProps{
  socketConnected: boolean
}
const Header: React.FC<IHeaderProps> = ({socketConnected , children}) => {
  
  return(
    <Component>
      <section>
        {children}
      </section>
      <section>
        collaboration status: {socketConnected? <Online title="Available"/>: <Offline title ="Unavailable"/>}
      </section>
    </Component>
  )
}

export default Header
