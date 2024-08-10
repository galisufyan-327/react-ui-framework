import { Route, Routes } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import Menu from "./features/menu/Menu"
import ViewPanel from "./features/viewPanel/ViewPanel"
import {
  mountApp,
  replaceRemoteAppConfigs,
  selectCurrentRemoteApp,
} from "./features/viewPanel/viewPanelSlice"
import { useEffect } from "react"
import { replaceComponentVersionConfigs } from "./features/componentVersion/componentVersionSlice"
import { replaceMenuItems } from "./features/menu/menuSlice"
import { renderDiagram } from "./features/diagram/diagramSlice"
import DiagramContainer from "./features/diagram/DiagramContainer"
import ComponentVersion from "./features/componentVersion/ComponentVersion"

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    import("./frameworkConfig.json").then(dynamicMenuItems => {
      dispatch(replaceMenuItems(dynamicMenuItems.default.menuItems))
      dispatch(replaceRemoteAppConfigs(dynamicMenuItems.default.remoteApps))
      dispatch(mountApp(dynamicMenuItems.default.remoteApps[0]))
      dispatch(replaceComponentVersionConfigs(dynamicMenuItems.default))
      dispatch(
        renderDiagram({
          edges: dynamicMenuItems.default.edges,
          nodes: dynamicMenuItems.default.nodes,
        }),
      )
    })
  }, [dispatch])

  const currentRemoteAppConfig = useAppSelector(selectCurrentRemoteApp)

  return (
    <div className="App">
      <Menu></Menu>
      <Routes>
        <Route
          path="/contact"
          element={<ComponentVersion componentName="contactForm" />}
        />
        <Route
          path="/diagram"
          element={<DiagramContainer></DiagramContainer>}
        />

        <Route
          path="*"
          element={
            currentRemoteAppConfig && (
              <ViewPanel remoteConfig={currentRemoteAppConfig}></ViewPanel>
            )
          }
        />
      </Routes>
    </div>
  )
}

export default App
