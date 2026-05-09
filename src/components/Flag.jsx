// Renders a country flag image via flagcdn.com
// code: ISO 3166-1 alpha-2 or sub-national (e.g. 'gb-eng', 'gb-sct')
export default function Flag({ code, name, className = 'w-6 h-auto rounded-sm' }) {
  if (!code) return <span className="w-6 h-4 bg-gray-700 rounded-sm inline-block" />
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
      alt={name || code}
      className={className}
      loading="lazy"
    />
  )
}
