import React, { useContext, useState } from 'react';
import { Box, Grid, Pagination } from '@mui/material';
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

  const allNotes = [...pinnedNotes, ...notes];

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  const indexOfLastNote = currentPage * recordsPerPage;
  const indexOfFirstNote = indexOfLastNote - recordsPerPage;
  const currentNotes = allNotes.slice(indexOfFirstNote, indexOfLastNote);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box sx={{ p: 3, width: '100%' }}>
        <DrawerHeader />
        <Form />
        {allNotes.length > 0 ? (
          <>
            <Grid container style={{ marginTop: '16vh', gridGap: '50px' }}>
              {currentNotes.map((note) => (
                <Grid item key={note.id}>
                  {pinnedNotes.includes(note) ? (
                    <PinnedNote note={note} />
                  ) : (
                    <Note note={note} />
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
        ) : (
          <EmptyNotes />
        )}
      </Box>
    </Box>
  );
};

export default Notes;