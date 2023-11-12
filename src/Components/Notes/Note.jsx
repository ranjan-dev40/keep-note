import { useContext } from "react";
import { Card, CardActions, CardContent, Typography } from "@mui/material"
import {styled} from '@mui/material/styles'
import { DeleteOutlineOutlined as Delete, PushPin as Pinned } from "@mui/icons-material";
import { DataContext } from "../../Context/DataProvider";

const StyledCard = styled(Card)`
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
`;



const Note = ({ note }) => {

  const { notes, setNotes, setPinnedNotes, setDeletedNotes } = useContext(DataContext);

  const pinnedNote = (note) => {
      const updatedNotes = notes.filter(data => data.id !== note.id);
      setNotes(updatedNotes);
      setPinnedNotes(prevArr => [note, ...prevArr]);
  }

  const deleteNote = (note) => {
      const updatedNotes = notes.filter(data => data.id !== note.id);
      setNotes(updatedNotes);
      setDeletedNotes(prevArr => [note, ...prevArr]);
  }

  return (
    <StyledCard>
        <CardContent>
            <Typography>{note.heading}</Typography>
            <Typography>{note.text}</Typography>

        </CardContent>
        <CardActions>
            <Delete
               fontSize="small"
               style={{marginLeft: 'auto'}} 
               onClick={() => deleteNote(note) }
            />
            <Pinned
               fontSize="small"
               onClick={() => pinnedNote(note) }
            />
        </CardActions>
    </StyledCard>
  )
}

export default Note