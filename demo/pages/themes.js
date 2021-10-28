import Head from 'next/head'
import MarkdownSampleShort from '../components/MarkdownSampleShort.mdx'

export default function Index() {
  return (
    <div className="antialiased text-gray-900">
      <Head>
        <title>Tailwind CSS Typography</title>
      </Head>
      <div className="grid grid-cols-2">
        <div className="bg-white dark:bg-slate-900">
          <article className="py-12 px-4 prose prose-slate prose-red dark:prose-invert mx-auto prose-headings:text-green-400">
            <h1>Slate</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-slate-900">
          <article className="py-12 px-4 prose prose-slate prose-invert mx-auto">
            <h1>Slate</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-gray-50">
          <article className="py-12 px-4 prose prose-gray mx-auto">
            <h1>Gray</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-gray-900">
          <article className="py-12 px-4 prose prose-gray prose-invert mx-auto">
            <h1>Gray</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-zinc-50">
          <article className="py-12 px-4 prose prose-zinc mx-auto">
            <h1>Zinc</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-zinc-900">
          <article className="py-12 px-4 prose prose-zinc prose-invert mx-auto">
            <h1>Zinc</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-neutral-50">
          <article className="py-12 px-4 prose prose-neutral mx-auto">
            <h1>Neutral</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-neutral-900">
          <article className="py-12 px-4 prose prose-neutral prose-invert mx-auto">
            <h1>Neutral</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-stone-50">
          <article className="py-12 px-4 prose prose-stone mx-auto">
            <h1>Stone</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-stone-900">
          <article className="py-12 px-4 prose prose-stone prose-invert mx-auto">
            <h1>Stone</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-white">
          <article className="py-12 px-4 prose prose-red mx-auto">
            <h1>Red Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-gray-900">
          <article className="py-12 px-4 prose prose-red prose-invert mx-auto">
            <h1>Red Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-white">
          <article className="py-12 px-4 prose prose-orange mx-auto">
            <h1>Orange Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-gray-900">
          <article className="py-12 px-4 prose prose-orange prose-invert mx-auto">
            <h1>Orange Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-white">
          <article className="py-12 px-4 prose prose-amber mx-auto">
            <h1>Amber Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-gray-900">
          <article className="py-12 px-4 prose prose-amber prose-invert mx-auto">
            <h1>Amber Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-white">
          <article className="py-12 px-4 prose prose-yellow mx-auto">
            <h1>Yellow Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-gray-900">
          <article className="py-12 px-4 prose prose-yellow prose-invert mx-auto">
            <h1>Yellow Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-white">
          <article className="py-12 px-4 prose prose-lime mx-auto">
            <h1>Lime Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-gray-900">
          <article className="py-12 px-4 prose prose-lime prose-invert mx-auto">
            <h1>Lime Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-white">
          <article className="py-12 px-4 prose prose-green mx-auto">
            <h1>Green Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-gray-900">
          <article className="py-12 px-4 prose prose-green prose-invert mx-auto">
            <h1>Green Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-white">
          <article className="py-12 px-4 prose prose-emerald mx-auto">
            <h1>Emerald Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-gray-900">
          <article className="py-12 px-4 prose prose-emerald prose-invert mx-auto">
            <h1>Emerald Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-white">
          <article className="py-12 px-4 prose prose-teal mx-auto">
            <h1>Teal Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-gray-900">
          <article className="py-12 px-4 prose prose-teal prose-invert mx-auto">
            <h1>Teal Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-white">
          <article className="py-12 px-4 prose prose-cyan mx-auto">
            <h1>Cyan Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-gray-900">
          <article className="py-12 px-4 prose prose-cyan prose-invert mx-auto">
            <h1>Cyan Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-white">
          <article className="py-12 px-4 prose prose-sky mx-auto">
            <h1>Sky Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-gray-900">
          <article className="py-12 px-4 prose prose-sky prose-invert mx-auto">
            <h1>Sky Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-white">
          <article className="py-12 px-4 prose prose-blue mx-auto">
            <h1>Blue Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-gray-900">
          <article className="py-12 px-4 prose prose-blue prose-invert mx-auto">
            <h1>Blue Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-white">
          <article className="py-12 px-4 prose prose-indigo mx-auto">
            <h1>Indigo Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-gray-900">
          <article className="py-12 px-4 prose prose-indigo prose-invert mx-auto">
            <h1>Indigo Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-white">
          <article className="py-12 px-4 prose prose-violet mx-auto">
            <h1>Violet Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-gray-900">
          <article className="py-12 px-4 prose prose-violet prose-invert mx-auto">
            <h1>Violet Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-white">
          <article className="py-12 px-4 prose prose-purple mx-auto">
            <h1>Purple Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-gray-900">
          <article className="py-12 px-4 prose prose-purple prose-invert mx-auto">
            <h1>Purple Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-white">
          <article className="py-12 px-4 prose prose-fuchsia mx-auto">
            <h1>Fuchsia Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-gray-900">
          <article className="py-12 px-4 prose prose-fuchsia prose-invert mx-auto">
            <h1>Fuchsia Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-white">
          <article className="py-12 px-4 prose prose-pink mx-auto">
            <h1>Pink Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-gray-900">
          <article className="py-12 px-4 prose prose-pink prose-invert mx-auto">
            <h1>Pink Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-white">
          <article className="py-12 px-4 prose prose-rose mx-auto">
            <h1>Rose Links</h1>
            <MarkdownSampleShort />
          </article>
        </div>
        <div className="bg-gray-900">
          <article className="py-12 px-4 prose prose-rose prose-invert mx-auto">
            <h1>Rose Links</h1>
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
