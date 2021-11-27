import styled from 'styled-components'
export const Header = styled.input`
  background: #282c34;
  color:white;
  font-weight: 700;
  border: none;
  font-size: 1.2rem;
  padding: 0.8rem;
  text-transform: uppercase;
`
export const Result = styled.div`
  padding: 0.8rem;
  `
export const TextDrop = styled.div`
  background: #282c34;
  height: 100vh;

`
export const Page = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto auto;
  ${Header}{
    grid-column-start: 1;
    grid-column-end: 3;
  }
  ${Result}{
    grid-column: 2;
    grid-row: 2;
  }
  ${TextDrop}{
    grid-column: 1;
    grid-row: 2;
  }

`
