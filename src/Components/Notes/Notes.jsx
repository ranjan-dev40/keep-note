import React, { useContext, useState } from 'react';
import { Box, Grid, Pagination } from '@mui/material';
import { styled } from "@mui/material/styles";
import Form from './Form';
import Note from './Note';
import { DataContext } from '../../Context/DataProvider';
import EmptyNotes from './EmptyNotes';
import PinnedNote from '../Pinned/PinnedNote';
import EditableNote from '../EditableNote';

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Notes = () => {
  const { notes, pinnedNotes, showTextArea, setShowTextArea, editableNote, setEditableNote } = useContext(DataContext);

  const allNotes = [...pinnedNotes, ...notes];
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  const indexOfLastNote = currentPage * recordsPerPage;
  const indexOfFirstNote = indexOfLastNote - recordsPerPage;
  const currentNotes = allNotes.slice(indexOfFirstNote, indexOfLastNote);

  const handleNoteClick = (noteId) => {
    setShowTextArea(true);
    const note = currentNotes.find((note) => note.id === noteId);
    setEditableNote(note)
    
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box sx={{ p: 3, width: '100%' }}>
        <DrawerHeader />
        <Form />
        {allNotes.length > 0 ? (
          <>
            {showTextArea ? (
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Center the content horizontally
                justifyContent: 'center', // Center the content vertically
                width: '100%',
                height: '100vh', // Use the full height of the viewport
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1000, // Set a higher z-index to make sure it appears above other elements
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                marginLeft: 16,
                marginTop: 3
              }}>
                <EditableNote note={editableNote} />
              </Box>
            ) : (
              <>
                <Grid container style={{ marginTop: '16vh', gridGap: '50px' }}>
                  {currentNotes.map((note) => (
                    <Grid item key={note.id}>
                      {pinnedNotes.includes(note) ? (
                        <PinnedNote note={note} />
                      ) : (
                        <Note note={note} onClick={() => handleNoteClick(note.id)} />
                      )}
                    </Grid>
                  ))}
                </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <Pagination
                  count={Math.ceil(allNotes.length / recordsPerPage)}
                  page={currentPage}
                  variant="outlined"
                  shape="rounded"
                  sx={{ color: 'primary.main', '&.MuiPaginationItem-outlined': { border: '1px solid rgba(0, 0, 0, 0.23)' } }}
                  onChange={(event, value) => setCurrentPage(value)}
                />
              </Box>
              </>
            )}
            
            
          </>
        ) : (
          <EmptyNotes />
        )}
      </Box>
    </Box>
  );
};

export default Notes;