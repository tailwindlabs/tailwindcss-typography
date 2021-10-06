import Head from 'next/head'
import MarkdownSampleShort from '../components/MarkdownSampleShort.mdx'

export default function Index() {
  return (
    <div className="antialiased text-gray-900">
      <Head>
        <title>Tailwind CSS Typography</title>
      </Head>
      <div className="grid">
        <div className="bg-white dark:bg-gray-900">
          <article className="py-12 px-4 prose prose-gray dark:prose-invert mx-auto">
            <h1>Are you happy now?</h1>
            <MarkdownSampleShort />
          </article>
        </div>
      </div>
    </div>
  )
}

export const config = {
  unstable_runtimeJS: false,
}
