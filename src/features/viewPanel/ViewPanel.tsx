import { lazy, Suspense } from "react"
import {
  __federation_method_getRemote,
  __federation_method_setRemote,
  // @ts-ignore
} from "__federation__"

import type { ViewPanelConfig } from "./viewPanelSlice"

type ViewPanelProps = {
  remoteConfig: ViewPanelConfig
}

const ViewPanel = ({ remoteConfig }: ViewPanelProps) => {
  let DynamicRemoteApp = lazy(async () => {
    let app = import("../../components/FailedRemote")
    if (remoteConfig) {
      const { url, name, module } = remoteConfig

      __federation_method_setRemote(name, {
        url: () => Promise.resolve(url),
        format: "esm",
        from: "vite",
      })

      try {
        app = await __federation_method_getRemote(name, module)
      } catch (err) {
        console.log(err)
      }
    }
    return app
  })
  return (
    <>
      <Suspense fallback="Loading...">
        <DynamicRemoteApp></DynamicRemoteApp>
      </Suspense>
    </>
  )
}

export default ViewPanel
