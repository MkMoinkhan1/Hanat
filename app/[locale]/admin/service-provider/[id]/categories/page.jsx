import ServiceManagementComponent from '@/components/service-management-component'
import ServiceProviderLayout from '@/components/service-provider-layout'

import React from 'react'

export default async function page({params}) {
    const param = await params
          return (
       <ServiceProviderLayout activeTab="resources" providerId={param}>
          <ServiceManagementComponent params={param} activePage="service-provider"/>
        </ServiceProviderLayout>

  )
}
