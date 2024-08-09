import { useEffect, useState } from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { replaceMenuItems, selectMenuItems } from "./menuSlice"
import { Menu, MenuItem } from "@mui/material"
import type { ViewPanelConfig } from "../viewPanel/viewPanelSlice"
import {
  mountApp,
  replaceRemoteAppConfigs,
  selectRemoteAppConfigs,
} from "../viewPanel/viewPanelSlice"

export default function DynamicMenu() {
  const dispatch = useAppDispatch()
  const navItems = useAppSelector(selectMenuItems)
  const remoteAppOptions = useAppSelector(selectRemoteAppConfigs)

  useEffect(() => {
    import("../../menuConfig.json").then(dynamicMenuItems => {
      dispatch(replaceMenuItems(dynamicMenuItems.default.menuItems))
      dispatch(replaceRemoteAppConfigs(dynamicMenuItems.default.remoteApps))
      dispatch(mountApp(dynamicMenuItems.default.remoteApps[0]))
    })
  }, [dispatch])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const setCurrentApp = (remoteAppConfig: ViewPanelConfig) => {
    dispatch(mountApp(remoteAppConfig))
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { sm: "block" } }}
            >
              Dynamic Menu
            </Typography>
            <Box sx={{ display: { sm: "block" } }}>
              {navItems.map(item => (
                <Button key={item.text} sx={{ color: "#fff" }}>
                  <Link to={item.to}>{item.text}</Link>
                </Button>
              ))}
            </Box>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              color="success"
            >
              Apps
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {remoteAppOptions.map(option => {
                return (
                  <MenuItem onClick={() => setCurrentApp(option)}>
                    {option.display_name}
                  </MenuItem>
                )
              })}
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}
