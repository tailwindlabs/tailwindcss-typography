import Head from 'next/head'

export default function Index() {
  return (
    <div className="antialiased text-gray-900 py-12 pl-32 space-y-12">
      <Head>
        <title>Tailwind CSS Typography</title>
      </Head>
      <div className="relative">
        <div className="relative prose prose-lg prose-code:text-sky-500">
          <h3>reaching all code</h3>
          <pre>
            <code>
              <span className="block">console.log('test 1')</span>
              <span className="block">console.log('test 2')</span>
              <span className="block">console.log('test 3')</span>
            </code>
          </pre>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet deleniti quis veniam{' '}
            <code>console.log('test inline')</code> repudiandae optio in at quibusdam autem vero
            excepturi.
          </p>
        </div>
      </div>
      <div className="relative">
        <div className="relative prose prose-lg prose-inline-code:text-rose-500">
          <h3>reaching inline code only</h3>
          <pre>
            <code>
              <span className="block">console.log('test 1')</span>
              <span className="block">console.log('test 2')</span>
              <span className="block">console.log('test 3')</span>
            </code>
          </pre>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet deleniti quis veniam
            debitis vel, hic sunt, nulla deserunt animi iure aliquid et,{' '}
            <code>console.log('test inline')</code> repudiandae optio in at quibusdam autem vero
            excepturi.
          </p>
        </div>
      </div>
    </div>
  )
}

export const config = {
  unstable_runtimeJS: false,
}
