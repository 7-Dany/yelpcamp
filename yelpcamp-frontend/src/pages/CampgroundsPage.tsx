import { Suspense } from 'react'
import { Await, defer, useLoaderData } from 'react-router-dom'
import Campgrounds from '../features/Campgrounds'
import { CampgroundsApi } from '../api/Campgrounds.api'
import { ICampground } from '../Types'

function CampgroundsPage() {
  const loaderData = useLoaderData() as { campgrounds: ICampground[] }
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={loaderData.campgrounds}>{(data) => <Campgrounds campgrounds={data} />}</Await>
    </Suspense>
  )
}

export default CampgroundsPage

const campgroundApi = new CampgroundsApi()

export function loader() {
  return defer({ campgrounds: campgroundApi.index() })
}
