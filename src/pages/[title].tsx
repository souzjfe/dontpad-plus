import React from 'react'
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'



const Post: React.FC = props => {
  

  return (
    <div></div>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const res = await fetch(`http://localhost:3000/api/post/${context.params.id}`)
//   const data = await res.json()
//   return { props: { ...data } }
// }

export default Post
