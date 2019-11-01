import Highlight from 'react-highlight'

export default ({ children, className }) => (
  <div className="rounded-lg p-6 bg-gray-800 overflow-x-auto text-gray-400 text-sm">
    <Highlight className={`language-${className.replace(/language-/, '')}`}>{children}</Highlight>
  </div>
)
