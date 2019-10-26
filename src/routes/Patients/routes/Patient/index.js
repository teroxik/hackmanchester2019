import { Loadable } from 'utils/components'

export default {
  path: ':patientId',
  component: Loadable({
    loader: () =>
      import(/* webpackChunkName: 'Patient' */ './components/PatientPage')
  })
}
