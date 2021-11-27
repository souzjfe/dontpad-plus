import React, { useEffect, useState,useMemo,useCallback } from 'react'
import Router from 'next/router'
import { Header, Page, MarkdownPreview, TextEditor } from '../styles/pages/dropText';
import { GetServerSideProps } from 'next';
import { io } from "socket.io-client";


// preview imports
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const DropText: React.FC<IArticle> = props => {
  const [connected, setConnected] = useState<boolean>(false);
  const [content,setContent]=useState(props.content)
  const onChange = useCallback(async (value:string) => {    
      try {
        const body = {title: props.title, content: value}
        await fetch(`http://localhost:3000/api/article/${props.title}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      } catch (error) {
        console.error(error)
      }
    
  },[])
  // connect to socket server
  const socket = useMemo(() => io('http://localhost:3000', {
    path: "/api/socketio",
  }),[])
  useEffect(()=> {
    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });
    // update chat on new message dispatched
    socket.on(props.title, (articleData: IArticle) => {
      setContent(articleData.content);
    });
    // socket disconnet onUnmount if exists
    socket.on("disconnect", () => {
      console.log("SOCKET DISCONNECTED!", socket.id); 
      setConnected(false);
    });
  }, []);
  return (
    <Page>
      <Header defaultValue={`${props.title} its ${connected? 'online':"offline"}`} />
        
        <TextEditor
          defaultLanguage="markdown"
          value={content}
          theme="vs-dark"
          loading={"d"}
          onChange={onChange}
        />
        
        
          <MarkdownPreview
            children={content}
            components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={docco}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
        />
          
        
      </Page>
      
  )
}
interface IArticle{
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export const getServerSideProps: GetServerSideProps = async context => {
  let { title } = context.params
  if (typeof title !== "string" ){
    title = title[0]
  }
  
  try {
    
    const res = await fetch(`http://localhost:3000/api/article/${title}`)
    const article = await res.json()
    const createdAt = new Date(article.createdAt)
    const updatedAt = new Date(article.updatedAt)
    return {
      props: {...article},
    }
  } catch (error) {
      const article = {title, content:''}
    await fetch(`http://localhost:3000/api/article`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      })
    
    return {
      props: article,
    }
  }
    
  
}
export default DropText;
