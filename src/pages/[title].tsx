import React from 'react'
import 'codemirror/theme/dracula.css'
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'

// editor imports
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";



const Article: React.FC = props => {
  

  return (
    <CodeMirror
    options={{theme:'dracula'}}
    />
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const res = await fetch(`http://localhost:3000/api/article/${context.params.id}`)
//   const data = await res.json()
//   return { props: { ...data } }
// }

export default Article
