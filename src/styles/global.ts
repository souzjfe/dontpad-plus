import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *,
  *:before,
  *:after  {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration:none;
    list-style:none;
    font-family: 'Montserrat', sans-serif;
    font-family: 'Roboto', sans-serif;
  }
  
`
