import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      <h1>Hello World</h1>
      <Link to={'/campgrounds'}>Campgrounds</Link>
    </div>
  )
}
