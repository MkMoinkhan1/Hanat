'use client'
import { ServiceManagementFilterDialog } from "./service-management-filter-dialog"
import { ServiceProviderFilterDialog } from "./service-provider-filter"
import { UsersFilterDialog } from "./uses-filter-dialog"



export function ConditionalFilterDialog({
  filterType,
  data = [], // Add default empty array
  onFilterChange,
  children,
}) {
  // Add safety check
  const safeData = data || []

  switch (filterType) {
    case "users":
      return (
        <UsersFilterDialog data={safeData} onFilterChange={onFilterChange}>
          {children}
        </UsersFilterDialog>
      )
    case "service-management":
      return (
        <ServiceManagementFilterDialog data={safeData} onFilterChange={onFilterChange}>
          {children}
        </ServiceManagementFilterDialog>
      )
    case "service-provider":
      return (
        <ServiceProviderFilterDialog data={safeData} onFilterChange={onFilterChange}>
          {children}
        </ServiceProviderFilterDialog>
      )
    default:
      return (
        <UsersFilterDialog data={safeData} onFilterChange={onFilterChange}>
          {children}
        </UsersFilterDialog>
      )
  }
}
