import { useState } from 'react'
import Layout from '../components/Layout'
import MarkdownSample from '../components/MarkdownSample.mdx'

export default () => {
  const [size, setSize] = useState('default')

  return (
    <Layout meta={{ title: 'Tailwind CSS Typography' }}>
      <div className="fixed top-0 left-0 flex flex-col ml-3">
        {['sm', 'default', 'lg', 'xl', '2xl'].map((s) => (
          <button
            key={s}
            type="button"
            className={`border mt-3 px-4 focus:outline-none ${size === s ? 'border-black' : ''}`}
            onClick={() => setSize(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <div className={`prose prose-${size} mx-auto`}>
        <MarkdownSample />
      </div>
    </Layout>
  )
}
