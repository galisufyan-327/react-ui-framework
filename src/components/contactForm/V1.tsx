import type { ChangeEvent, FormEvent } from "react"
import { useState } from "react"
import {
  TextField,
  Button,
  Typography,
  Container,
  Snackbar,
} from "@mui/material"
import Alert from "@mui/material/Alert"

interface FormState {
  name: string
  email: string
  message: string
}

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
}

const ContactForm = () => {
  const [formState, setFormState] = useState<FormState>(initialState)
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted:", formState)
    setOpenSnackbar(true)
    setFormState(initialState)
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Send Message
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thank you for your message!
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default ContactForm
