import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react"
import type { DiagramSliceState } from "./diagramSlice"
import "@xyflow/react/dist/style.css"

const Diagram = ({ nodes, edges }: DiagramSliceState) => {
  return (
    <div style={{ height: 800 }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
}

export default Diagram
