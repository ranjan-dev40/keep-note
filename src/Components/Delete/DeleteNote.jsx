import { useContext } from "react";
import { Card, CardActions, CardContent, Typography } from "@mui/material"
import {styled} from '@mui/material/styles'
import { RestoreFromTrashOutlined as Restore, DeleteForeverOutlined as Delete } from '@mui/icons-material';
import { DataContext } from "../../Context/DataProvider";

const StyledCard = styled(Card)`
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
`;



const Note = ({ deleteNote }) => {

    const { deletedNotes, setNotes, setDeletedNotes } = useContext(DataContext);

   const restoreNote = (deleteNote) => {
        const updatedNotes = deletedNotes.filter(data => data.id !== deleteNote.id);
        setDeletedNotes(updatedNotes);
        setNotes(prevArr => [deleteNote, ...prevArr]);
    }

    const removeNote = (deleteNote) => {
        const updatedNotes = deletedNotes.filter(data => data.id !== deleteNote.id);
        setDeletedNotes(updatedNotes);
    }

  return (
    <StyledCard>
        <CardContent>
            <Typography>{deleteNote.heading}</Typography>
            <Typography>{deleteNote.text}</Typography>

        </CardContent>
        <CardActions>
                    <Delete 
                        fontSize="small" 
                        style={{ marginLeft: 'auto' }} 
                        onClick={() => removeNote(deleteNote)}
                    />
                    <Restore 
                        fontSize="small"
                        onClick={() => restoreNote(deleteNote)}
                    />
        </CardActions>
    </StyledCard>
  )
}

export default Note