import { useState } from 'react'
import Layout from '../components/Layout'
import MarkdownSample from '../components/MarkdownSample.mdx'

export default () => {
  return (
    <Layout meta={{ title: 'Tailwind CSS Typography' }}>
      <div className="prose mx-auto">
        <MarkdownSample />
      </div>
    </Layout>
  )
}

export const config = {
  unstable_runtimeJS: false
}
