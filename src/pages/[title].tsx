import { useEffect, useState, useMemo, useCallback } from 'react'
import Router from 'next/router'
import {
  Header,
  Page,
  MarkdownPreview,
  TextEditor,
  Online,
  Offline
} from '../styles/pages/dropText'
import { GetServerSideProps } from 'next'
import { io } from 'socket.io-client'
import IArticle from '../interfaces/IArticle'

// preview imports
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import prisma from '../lib/prisma'
import { socket } from '../lib/socket'

const DropText: React.FC<IArticle> = props => {
  const [connected, setConnected] = useState<boolean>(false)
  const [content, setContent] = useState(props.content)
  const [oldContent, setOldContent] = useState(props.content)
  const onChange = useCallback(async (value: string, ev: any) => {
    // setContent(value)
    // socket.emit(props.title, { ...props, content: value })

    try {
      const body = { title: props.title, content: value }

      await fetch(`http://localhost:3000/api/article/${props.title}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
    } catch (error) {
      console.error(error)
    }
  }, [])
  // connect to socket server

  useEffect(() => {
    // log socket connection
    socket.on('connect', () => {
      console.log('SOCKET CONNECTED!', socket.id)
      setConnected(true)
    })
    socket.on(props.title, (articleData: IArticle) => {
      setContent(articleData.content)
    })
    // update chat on new message dispatched
    // socket disconnet onUnmount if exists
    socket.on('disconnect', () => {
      console.log('SOCKET DISCONNECTED!', socket.id)
      setConnected(false)
    })
  }, [])
  return (
    <Page>
      <Header>
        <section>{props.title}</section>
        <section>
          collaboration status:{' '}
          {connected ? (
            <Online title="Available" />
          ) : (
            <Offline title="Unavailable" />
          )}
        </section>
      </Header>
      <TextEditor
        defaultLanguage="markdown"
        value={content}
        theme="vs-dark"
        loading={'d'}
        onChange={onChange}
      />

      <MarkdownPreview
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter style={docco} language={match[1]} PreTag="div">
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      >
        {String(content)?.replace('\n', '\n\n')}
      </MarkdownPreview>
    </Page>
  )
}
export const getServerSideProps: GetServerSideProps = async context => {
  let { title } = context.params
  if (typeof title !== 'string') {
    title = title[0]
  }
  try {
    const article = await prisma.article.findUnique({
      where: {
        title
      }
    })
    return {
      props: article
    }
  } catch (error) {
    const article = await prisma.article.create({
      data: { title, content: '' }
    })
    return {
      props: article
    }
  }
}
export default DropText
