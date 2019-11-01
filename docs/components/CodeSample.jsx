import dedent from 'dedent'
import Highlight from 'react-highlight'

export default (props) => {
  const formattedCode = dedent`${props.code}`

  const preview = () => {
    if (props.children) {
      return (
        <div>
          {props.children}
        </div>
      )
    } else {
      return (
        <div dangerouslySetInnerHTML={{ __html: formattedCode }}/>
      )
    }
  }

  return (
    <div className="relative overflow-hidden mb-8">
      <div className="bg-white rounded-t-lg overflow-hidden border-t border-l border-r border-gray-400 p-4">
        <div className="max-w-sm mx-auto">{preview()}</div>
      </div>
      <div className="rounded-b-lg p-4 bg-gray-800">
        <Highlight className="language-html">{formattedCode}</Highlight>
      </div>
    </div>
  )
}
