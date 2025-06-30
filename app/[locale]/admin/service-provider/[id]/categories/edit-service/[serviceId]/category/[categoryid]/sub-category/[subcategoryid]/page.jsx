import ServiceSubCategoryComponent from '@/components/service-sub-category-component'
import ServiceProviderLayout from '@/components/service-provider-layout'
export default async function ServiceSubCategoryPage({params}) {
  const param = await params;
  return (
    <ServiceProviderLayout activeTab="resources" providerId={param}>
    <ServiceSubCategoryComponent params={param} activePage="service-provider" />
    </ServiceProviderLayout>
  )
}
