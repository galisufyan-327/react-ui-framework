// DiagramContainer.js
import Diagram from "./Diagram"
import { useAppSelector } from "../../app/hooks"
import { selectDiagramConfig } from "./diagramSlice"

const DiagramContainer = () => {
  const { nodes, edges } = useAppSelector(selectDiagramConfig)

  return <Diagram nodes={nodes} edges={edges} />
}

export default DiagramContainer
