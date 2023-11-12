import {useContext} from 'react'
import { Box, Grid } from '@mui/material'
import { styled } from "@mui/material/styles";
import DeleteNote from './DeleteNote'
import { DataContext } from '../../Context/DataProvider';

const DrawerHeader = styled("div")(({ theme }) => ({
    ...theme.mixins.toolbar,
  }));

const DeleteNotes = () => {
  const {deletedNotes} = useContext(DataContext);
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                 
                    <Grid container style={{ marginTop: 16}} >
                      {
                        deletedNotes.map( deleteNote => (
                          <Grid item>
                            <DeleteNote deleteNote={deleteNote} />
                          </Grid>
                            
                        ) )
                      }
                    </Grid>
                    
            </Box>
        </Box>
  )
}

export default DeleteNotes;