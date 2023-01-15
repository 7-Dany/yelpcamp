import { useLoaderData, Link, Form } from 'react-router-dom'
import { ICampground } from '../../../Types'

export default function CampgroundDetails() {
  const loaderData = useLoaderData() as ICampground
  return (
    <div>
      <h1>{loaderData.title}</h1>
      <p>{loaderData.location}</p>
      <p>{loaderData.description}</p>
      <p>{loaderData.price}</p>
      <button>
        <Link to={`/campgrounds/${loaderData._id}/update`}>Edit</Link>
      </button>
      <Form method={'delete'} action={`/campgrounds/${loaderData._id}`}>
        <button>Delete</button>
      </Form>
      <Link to={'/campgrounds'}>Campgrounds</Link>
    </div>
  )
}
