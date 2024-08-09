import { useAppSelector } from "./app/hooks"
import Menu from "./features/menu/Menu"
import ViewPanel from "./features/viewPanel/ViewPanel"
import { selectCurrentRemoteApp } from "./features/viewPanel/viewPanelSlice"

const App = () => {
  const currentRemoteAppConfig = useAppSelector(selectCurrentRemoteApp)
  return (
    <div className="App">
      <Menu></Menu>
      {currentRemoteAppConfig && (
        <ViewPanel remoteConfig={currentRemoteAppConfig}></ViewPanel>
      )}
    </div>
  )
}

export default App
