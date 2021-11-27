import styled from 'styled-components'
import Editor from "@monaco-editor/react";
import ReactMarkdown from 'react-markdown';
export const Header = styled.input`
  background: #282c34;
  color:white;
  font-weight: 700;
  border: none;
  font-size: 1.2rem;
  padding: 0.8rem;
  text-transform: uppercase;
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
