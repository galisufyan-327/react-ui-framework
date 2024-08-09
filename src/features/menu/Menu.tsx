import { useEffect, useState } from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import MenuIcon from "@mui/icons-material/Menu"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { replaceMenuItems, selectMenuItems } from "./menuSlice"

const drawerWidth = 240

export default function Menu() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const dispatch = useAppDispatch()
  const navItems = useAppSelector(selectMenuItems)

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState)
  }

  useEffect(() => {
    import("../../menuConfig.json").then(dynamicMenuItems => {
      dispatch(replaceMenuItems(dynamicMenuItems.default))
    })
  }, [dispatch])

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Dynamic Menu
      </Typography>
      <Divider />
      <List>
        {navItems.map(item => (
          <ListItem key={item.text} disablePadding>
            <Link to={item.to}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Dynamic Menu
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map(item => (
                <Button key={item.text} sx={{ color: "#fff" }}>
                  <Link to={item.to}>{item.text}</Link>
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </>
  )
}
