import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export interface MenuItem {
  text: string
  to: string
}

export interface MenuSliceState {
  value: MenuItem[]
}

const initialState: MenuSliceState = { value: [{ text: "Home", to: "/" }] }

export const menuSlice = createAppSlice({
  name: "menu",
  initialState,
  reducers: create => ({
    appendMenuItem: create.reducer((state, action: PayloadAction<MenuItem>) => {
      state.value.push(action.payload)
    }),
    replaceMenuItems: create.reducer(
      (state, action: PayloadAction<MenuItem[]>) => {
        state.value = action.payload
      },
    ),
  }),
  selectors: {
    selectMenuItems: menu => menu.value,
  },
})

export const { appendMenuItem, replaceMenuItems } = menuSlice.actions

export const { selectMenuItems } = menuSlice.selectors
