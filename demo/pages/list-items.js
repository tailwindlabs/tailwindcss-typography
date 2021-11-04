import Head from 'next/head'
import MarkdownSampleShort from '../components/MarkdownSampleShort.mdx'

export default function Index() {
  return (
    <div className="antialiased text-gray-900 py-12 pl-32 space-y-12">
      <Head>
        <title>Tailwind CSS Typography</title>
      </Head>
      <div className="relative">
        <div className="absolute inset-0 flex prose prose-sm opacity-0">
          <div className="border-l border-red-200" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-200" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
        </div>
        <div className="relative prose prose-sm">
          <h3>prose-sm</h3>
          <p>It's important to cover all of these use cases for a few reasons:</p>
          <ol>
            <li>We want everything to look good out of the box.</li>
            <li>Really just the first reason, that's the whole point of the plugin.</li>
            <li>
              Here's a third pretend reason though a list with three items looks more realistic than
              a list with two items.
            </li>
            <li>We want everything to look good out of the box.</li>
            <li>Really just the first reason, that's the whole point of the plugin.</li>
          </ol>
          <p>Now we're going to try out another header style.</p>
          <ul>
            <li>So here is the first item in this list.</li>
            <li>In this example we're keeping the items short.</li>
            <li>Later, we'll use longer, more complex list items.</li>
          </ul>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex prose prose-base opacity-0">
          <div className="border-l border-red-200" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-200" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
        </div>
        <div className="relative prose prose-base">
          <h3>prose-base</h3>
          <p>It's important to cover all of these use cases for a few reasons:</p>
          <ol>
            <li>We want everything to look good out of the box.</li>
            <li>Really just the first reason, that's the whole point of the plugin.</li>
            <li>
              Here's a third pretend reason though a list with three items looks more realistic than
              a list with two items.
            </li>
            <li>We want everything to look good out of the box.</li>
            <li>Really just the first reason, that's the whole point of the plugin.</li>
          </ol>
          <p>Now we're going to try out another header style.</p>
          <ul>
            <li>So here is the first item in this list.</li>
            <li>In this example we're keeping the items short.</li>
            <li>Later, we'll use longer, more complex list items.</li>
          </ul>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex prose prose-lg opacity-0">
          <div className="border-l border-red-200" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-200" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
        </div>
        <div className="relative prose prose-lg">
          <h3>prose-lg</h3>
          <p>It's important to cover all of these use cases for a few reasons:</p>
          <ol>
            <li>We want everything to look good out of the box.</li>
            <li>Really just the first reason, that's the whole point of the plugin.</li>
            <li>
              Here's a third pretend reason though a list with three items looks more realistic than
              a list with two items.
            </li>
            <li>We want everything to look good out of the box.</li>
            <li>Really just the first reason, that's the whole point of the plugin.</li>
          </ol>
          <p>Now we're going to try out another header style.</p>
          <ul>
            <li>So here is the first item in this list.</li>
            <li>In this example we're keeping the items short.</li>
            <li>Later, we'll use longer, more complex list items.</li>
          </ul>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex prose prose-xl opacity-0">
          <div className="border-l border-red-200" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-200" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
        </div>
        <div className="relative prose prose-xl">
          <h3>prose-xl</h3>
          <p>It's important to cover all of these use cases for a few reasons:</p>
          <ol>
            <li>We want everything to look good out of the box.</li>
            <li>Really just the first reason, that's the whole point of the plugin.</li>
            <li>
              Here's a third pretend reason though a list with three items looks more realistic than
              a list with two items.
            </li>
            <li>We want everything to look good out of the box.</li>
            <li>Really just the first reason, that's the whole point of the plugin.</li>
          </ol>
          <p>Now we're going to try out another header style.</p>
          <ul>
            <li>So here is the first item in this list.</li>
            <li>In this example we're keeping the items short.</li>
            <li>Later, we'll use longer, more complex list items.</li>
          </ul>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex prose prose-2xl opacity-0">
          <div className="border-l border-red-200" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-200" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
          <div className="border-l border-red-100" style={{ width: '1em' }}></div>
        </div>
        <div className="relative prose prose-2xl">
          <h3>prose-2xl</h3>
          <p>It's important to cover all of these use cases for a few reasons:</p>
          <ol>
            <li>We want everything to look good out of the box.</li>
            <li>Really just the first reason, that's the whole point of the plugin.</li>
            <li>
              Here's a third pretend reason though a list with three items looks more realistic than
              a list with two items.
            </li>
            <li>We want everything to look good out of the box.</li>
            <li>Really just the first reason, that's the whole point of the plugin.</li>
          </ol>
          <p>Now we're going to try out another header style.</p>
          <ul>
            <li>So here is the first item in this list.</li>
            <li>In this example we're keeping the items short.</li>
            <li>Later, we'll use longer, more complex list items.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export const config = {
  unstable_runtimeJS: false,
}
