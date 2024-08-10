import { Route, Routes } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import Menu from "./features/menu/Menu"
import ViewPanel from "./features/viewPanel/ViewPanel"
import {
  mountApp,
  replaceRemoteAppConfigs,
  selectCurrentRemoteApp,
} from "./features/viewPanel/viewPanelSlice"
import { lazy, Suspense, useEffect } from "react"
import {
  replaceComponentVersionConfigs,
  selectComponentVersionConfig,
} from "./features/componentVersion/componentVersionSlice"
import { replaceMenuItems } from "./features/menu/menuSlice"
import { renderDiagram } from "./features/diagram/diagramSlice"
import DiagramContainer from "./features/diagram/DiagramContainer"

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
  const formComponentVersion =
    useAppSelector(selectComponentVersionConfig).formComponent || {}

  const FormComponent = lazy(() => {
    let component
    switch (Number(formComponentVersion.version)) {
      case 2:
        component = import("./components/contactForm/ContactFormV2")
        break

      // use v1 if v1 configured or no version specified
      case 1:
      default:
        component = import("./components/contactForm/ContactFormV1")
        break
    }
    return component
  })
  return (
    <div className="App">
      <Menu></Menu>
      <Routes>
        <Route
          path="/contact"
          element={
            <Suspense fallback="Loading...">
              <FormComponent></FormComponent>
            </Suspense>
          }
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
