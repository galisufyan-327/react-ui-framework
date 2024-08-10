import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export interface DiagramEdge {
  id: string
  source: string
  target: string
}

export interface DiagramNodePosition {
  x: number
  y: number
}

export interface DiagramNode {
  id: string
  data: { label: string }
  position: DiagramNodePosition
  type?: string
}

export interface DiagramSliceState {
  nodes: DiagramNode[]
  edges: DiagramEdge[]
}

const initialState: DiagramSliceState = { nodes: [], edges: [] }

export const diagramSlice = createAppSlice({
  name: "diagram",
  initialState,
  reducers: create => ({
    renderDiagram: create.reducer(
      (state, action: PayloadAction<DiagramSliceState>) => {
        state.edges = action.payload.edges
        state.nodes = action.payload.nodes
      },
    ),
  }),
  selectors: {
    selectDiagramConfig: diagram => diagram,
  },
})

export const { renderDiagram } = diagramSlice.actions

export const { selectDiagramConfig } = diagramSlice.selectors
