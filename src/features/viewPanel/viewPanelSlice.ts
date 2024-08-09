import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export interface ViewPanelConfig {
  url: string
  name: string
  module: string
  display_name: string
}

export interface ViewPanelSliceState {
  configs: ViewPanelConfig[]
  value: ViewPanelConfig | null
}

const initialState: ViewPanelSliceState = { configs: [], value: null }

export const viewPanelSlice = createAppSlice({
  name: "viewPanel",
  initialState,
  reducers: create => ({
    appendRemoteAppConfig: create.reducer(
      (state, action: PayloadAction<ViewPanelConfig>) => {
        state.configs.push(action.payload)
      },
    ),
    replaceRemoteAppConfigs: create.reducer(
      (state, action: PayloadAction<ViewPanelConfig[]>) => {
        state.configs = action.payload
      },
    ),
    mountApp: create.reducer(
      (state, action: PayloadAction<ViewPanelConfig>) => {
        state.value = action.payload
      },
    ),
  }),
  selectors: {
    selectRemoteAppConfigs: viewPanel => viewPanel.configs,
    selectCurrentRemoteApp: viewPanel => viewPanel.value,
  },
})

export const { appendRemoteAppConfig, replaceRemoteAppConfigs, mountApp } =
  viewPanelSlice.actions

export const { selectRemoteAppConfigs, selectCurrentRemoteApp } =
  viewPanelSlice.selectors
