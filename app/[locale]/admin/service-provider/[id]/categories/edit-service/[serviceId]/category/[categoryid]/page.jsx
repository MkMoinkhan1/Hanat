import ServiceProviderLayout from '@/components/service-provider-layout'
import ServiceCategoryComponent from '@/components/service-category-component'
import React from 'react'

export default async function page({params}) {
  const param = await params;
  return (
       <ServiceProviderLayout activeTab="resources" providerId={param}>
                    <ServiceCategoryComponent params={param} activePage="service-provider" />
                  </ServiceProviderLayout>
  )
}
