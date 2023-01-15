import CampgroundCard from './components/CampgroundCard'
import { ICampground } from '../../Types'
import { CampgroundsApi } from '../../api/Campgrounds.api'
import { ActionFunctionArgs, LoaderFunctionArgs, redirect, Link } from 'react-router-dom'

type TCampgroundsProps = {
  campgrounds: ICampground[]
}

export default function Campgrounds({ campgrounds }: TCampgroundsProps) {
  const cards = campgrounds.map((campground) => {
    return (
      <CampgroundCard
        key={campground._id}
        _id={campground._id}
        title={campground.title}
        description={campground.description}
        location={campground.location}
        price={campground.price}
      />
    )
  })

  return (
    <div>
      {cards}
      <button>
        <Link to={'/campgrounds/new'}>Create New Campground</Link>
      </button>
    </div>
  )
}

const campgroundApi = new CampgroundsApi()

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id as string
  return campgroundApi.showById(id)
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData()
  const id = params.id as string
  const data = {
    title: formData.get('title'),
    location: formData.get('location'),
    description: formData.get('description'),
    price: formData.get('price')
  } as unknown as ICampground

  switch (request.method) {
    case 'POST':
      await campgroundApi.create(data)
      return redirect('/campgrounds')
    case 'PUT':
      await campgroundApi.update(id, data)
      return redirect(`/campgrounds/${id}`)
    case 'DELETE':
      await campgroundApi.delete(id)
      return redirect('/campgrounds')
    default:
      return redirect('/campgrounds')
  }
}
