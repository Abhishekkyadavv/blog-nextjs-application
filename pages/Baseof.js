import Head from 'next/head';
import React from 'react'
const Baseof = (props) => {
  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <meta property="og:title" content={props.content} key={props.key} />
      </Head>
    </div>
  )
}

export default Baseof;