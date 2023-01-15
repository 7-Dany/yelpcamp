import { Form, useLoaderData, useNavigation } from 'react-router-dom'
import { ICampground } from '../../../Types'

export default function CampgroundForm() {
  const { state } = useNavigation()
  const loaderData = useLoaderData() as ICampground
  let submitText = ''

  if (loaderData) {
    submitText = state === 'submitting' ? 'Submitting...' : 'Update Campground'
  } else {
    submitText = state === 'submitting' ? 'Submitting...' : 'Create Campground'
  }

  return (
    <Form
      method={loaderData ? 'put' : 'post'}
      action={loaderData ? `/campgrounds/${loaderData._id}` : '/campgrounds/new'}
    >
      <fieldset>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={loaderData ? loaderData.title : ''}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="location">Location: </label>
        <input
          type="text"
          id="location"
          name="location"
          required
          defaultValue={loaderData ? loaderData.location : ''}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          required
          defaultValue={loaderData ? loaderData.description : ''}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="price">Price: </label>
        <input
          type="text"
          id="price"
          name="price"
          required
          defaultValue={loaderData ? loaderData.price : ''}
        />
      </fieldset>
      <button disabled={state === 'submitting'}>{submitText}</button>
    </Form>
  )
}
