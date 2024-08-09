import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export interface ComponentVersionConfig {
  version: number
}

export interface ComponentVersionSliceState {
  componentVersions: {
    [key: string]: ComponentVersionConfig
  }
}

const initialState: ComponentVersionSliceState = { componentVersions: {} }

export const componentVersionSlice = createAppSlice({
  name: "componentVersion",
  initialState,
  reducers: create => ({
    replaceComponentVersionConfigs: create.reducer(
      (state, action: PayloadAction<ComponentVersionSliceState>) => {
        state.componentVersions = action.payload.componentVersions
      },
    ),
  }),
  selectors: {
    selectComponentVersionConfig: componentVersion =>
      componentVersion.componentVersions,
  },
})

export const { replaceComponentVersionConfigs } = componentVersionSlice.actions

export const { selectComponentVersionConfig } = componentVersionSlice.selectors
