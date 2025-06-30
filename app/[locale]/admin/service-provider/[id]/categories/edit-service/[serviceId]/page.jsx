import ServiceProviderLayout from '@/components/service-provider-layout';
import ServiceEditComponent from '@/components/service-edit-component';
import React from 'react'

export default async function ServiceEditPage({params}) {
  const param = await params;
  return (
       <ServiceProviderLayout activeTab="resources" providerId={param}>
                <ServiceEditComponent params={param} activePage="service-provider"/>
              </ServiceProviderLayout>
  )
}
