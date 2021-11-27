import React from 'react'
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'

// editor imports
import Editor from "@monaco-editor/react";



const Article: React.FC = props => {
  

  return (
    <Editor
     height="90vh"
     defaultLanguage="markdown"
     defaultValue="# vai la lek"
     
     theme="vs-dark"
     
   />
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const res = await fetch(`http://localhost:3000/api/article/${context.params.id}`)
//   const data = await res.json()
//   return { props: { ...data } }
// }

export default Article
