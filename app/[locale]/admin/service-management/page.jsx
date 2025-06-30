import React from 'react'
import ServiceManagementComponent from '@/components/service-management-component'
const ServiceManagementPage = async({params}) => {
  const param = await params
  return (
    <>
      <ServiceManagementComponent params={param} activePage={"service-management"}/>
    </>
  )
}

export default ServiceManagementPage