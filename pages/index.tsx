import { AssessorDashboard } from '@components/features/Dashboard/Assessor'
import { PageTemplate } from '@components/shared/layouts/PageTemplate'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <PageTemplate>
      <AssessorDashboard/>
    </PageTemplate>
  )
}

export default Home
