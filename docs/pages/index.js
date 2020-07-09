import { useState } from 'react'
import Layout from '../components/Layout'
import MarkdownSample from '../components/MarkdownSample.mdx'
import MarkdownSampleB from '../components/MarkdownSampleB.mdx'
import MarkdownSampleC from '../components/MarkdownSampleC.mdx'
import MarkdownSampleD from '../components/MarkdownSampleD.mdx'
import MarkdownSampleE from '../components/MarkdownSampleE.mdx'

export default () => {
  const [size, setSize] = useState('default')
  const [sample, setSample] = useState('A')

  const SampleComponent = {
    A: MarkdownSample,
    B: MarkdownSampleB,
    C: MarkdownSampleC,
    D: MarkdownSampleD,
    E: MarkdownSampleE,
  }[sample]

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
        {['A', 'B', 'C', 'D', 'E'].map((s) => (
          <button
            key={s}
            type="button"
            className={`border mt-3 px-4 focus:outline-none ${sample === s ? 'border-black' : ''}`}
            onClick={() => setSample(s)}
          >
            Sample {s}
          </button>
        ))}
      </div>
      <div className={`prose prose-${size} mx-auto`}>
        <SampleComponent />
      </div>
    </Layout>
  )
}
