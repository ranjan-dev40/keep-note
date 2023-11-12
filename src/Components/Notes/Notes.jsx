import { useContext, useState } from 'react';
import { Box, Grid, Button } from '@mui/material';
import { styled } from "@mui/material/styles";
import Form from './Form';
import Note from './Note';
import { DataContext } from '../../Context/DataProvider';
import EmptyNotes from './EmptyNotes';
import PinnedNote from '../Pinned/PinnedNote';

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Notes = () => {
  const { notes } = useContext(DataContext);
  const { pinnedNotes } = useContext(DataContext);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  const indexOfLastNote = currentPage * recordsPerPage;
  const indexOfFirstNote = indexOfLastNote - recordsPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (indexOfLastNote < notes.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box sx={{ p: 3, width: '100%' }}>
        <DrawerHeader />
        <Form />
        {notes.length > 0 ? (
          <>
            <Grid container style={{ marginTop: '16vh', gridGap: '50px' }}>
              {pinnedNotes.map((pinned) => (
                <Grid item key={pinned.id}>
                  <PinnedNote pinned={pinned} />
                </Grid>
              ))}
              {currentNotes.map((note) => (
                <Grid item key={note.id}>
                  <Note note={note} />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                Prev
              </Button>
              <Button onClick={handleNextPage} disabled={indexOfLastNote >= notes.length}>
                Next
              </Button>
            </Box>
          </>
        ) : (
          <EmptyNotes />
        )}
      </Box>
    </Box>
  );
};

export default Notes;
