import styled from 'styled-components'
import Editor from "@monaco-editor/react";
import ReactMarkdown from 'react-markdown';
export const Online = styled.span`
  background: #45fc03;
`
export const Offline = styled.span`
  background: #fc0303;
`
export const Header = styled.header`
  background: #282c34;
  color:white;
  font-weight: 700;
  border: none;
  font-size: 1.2rem;
  padding: 0.8rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
  >section{
    position: relative;
    display: flex;
    align-items: center;
    padding-right: 1.8rem;
    ${Online},${Offline}{
      height: 1.6rem;
      width: 1.6rem;
      border-radius: 50%;
      content: '';
      position: absolute;
      right:0;
    }
  }
`
export const MarkdownPreview = styled(ReactMarkdown)`
  padding: 0.8rem;
  `
export const TextEditor = styled(Editor)`
  height: 100%;
  `
export const Page = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto auto;
  ${Header}{
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row: 1 ;
  }
  ${MarkdownPreview}{
    grid-column: 2;
    grid-row: 2;
  }
  ${TextEditor}{
    grid-column: 1;
    grid-row: 2;
  }

`
