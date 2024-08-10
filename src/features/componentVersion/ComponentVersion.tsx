import { lazy, Suspense } from "react"
import { useAppSelector } from "../../app/hooks"
import { selectComponentVersionConfig } from "./componentVersionSlice"

type ComponentVersionProps = {
  componentName: string
}

export default function ComponentVersion({
  componentName,
}: ComponentVersionProps) {
  const { version } =
    useAppSelector(selectComponentVersionConfig)[componentName] || {}

  const handleLazyLoadError = () => {
    return import("../../components/FallbackComponent")
  }
  const VersionedComponent = lazy(() => {
    let component
    switch (Number(version)) {
      case 2:
        component = import(`../../components/${componentName}/V2.tsx`).catch(
          handleLazyLoadError,
        )
        break

      // use v1 if v1 configured or no version specified
      case 1:
      default:
        component = import(`../../components/${componentName}/V1.tsx`).catch(
          handleLazyLoadError,
        )
        break
    }
    return component
  })

  return (
    <Suspense fallback="Loading...">
      <VersionedComponent></VersionedComponent>
    </Suspense>
  )
}
