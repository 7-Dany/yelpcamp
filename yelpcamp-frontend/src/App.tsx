import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import HomePage from './pages/HomePage'
import CampgroundDetails from './features/Campgrounds/layout/CampgroundDetails'
import CampgroundsPage, { loader as campgroundsLoader } from './pages/CampgroundsPage'
import {
  loader as campgroundDetailLoader,
  action as campgroundActions
} from './features/Campgrounds'
import CampgroundForm from './features/Campgrounds/components/CampgroundForm'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={'/'}>
      <Route index element={<HomePage />} />
      <Route path={'/campgrounds'}>
        <Route index element={<CampgroundsPage />} loader={campgroundsLoader} />
        <Route
          path={':id'}
          element={<CampgroundDetails />}
          loader={campgroundDetailLoader}
          action={campgroundActions}
        />
        <Route path={':id/update'} element={<CampgroundForm />} loader={campgroundDetailLoader} />
        <Route path={'new'} element={<CampgroundForm />} action={campgroundActions} />
      </Route>
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
