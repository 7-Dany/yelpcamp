import { ICampground } from '../../../Types'
import { Link } from 'react-router-dom'

function CampgroundCard({ _id, title }: ICampground) {
  return (
    <div>
      <h1>
        <Link to={`/campgrounds/${_id}`}>{title}</Link>
      </h1>
    </div>
  )
}

export default CampgroundCard
