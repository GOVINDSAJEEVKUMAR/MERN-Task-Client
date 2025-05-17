import React, { useEffect, useState } from 'react'
import AddNote from './components/AddNote'
import GetNote from './components/GetNote'
import Server from './server'
import { Grid, Paper, Typography } from '@mui/material'

const App = () => {
  const [note, setNotes] = useState([])

  const getNotes = async () => {
    try {
      const response = await Server.get('/api/get');
      setNotes(response.data);
    } catch (error) {
      console.error('An error occurred:', error.response?.data || error.message);
    }
  }

  useEffect(() => {
    getNotes()
  }, [])

  return (
    <Grid container spacing={3} sx={{ padding: 4 }}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>Add a Note</Typography>
          <AddNote getNotes={getNotes} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} >
        <Paper elevation={3} sx={{ padding: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>Your Notes</Typography>
          <GetNote note={note} />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default App
