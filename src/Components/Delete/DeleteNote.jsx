import { useContext, useState } from "react";
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
    const [isHovered, setIsHovered] = useState(false);

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
    <StyledCard
  
    >
        <CardContent>
            <Typography>{deleteNote.heading}</Typography>
            <Typography>{deleteNote.text}</Typography>

        </CardContent>
        <CardActions>
                    <Delete 
                        fontSize="small" 
                        style={{marginLeft:'auto', cursor: 'pointer', backgroundColor: isHovered ? 'lightcoral' : 'transparent' }}
                        onClick={() => removeNote(deleteNote)}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    />
                    <Restore 
                        fontSize="small"
                        onClick={() => restoreNote(deleteNote)}
                        style={{ cursor: 'pointer', backgroundColor: isHovered ? 'lightgray' : 'transparent' }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    />
        </CardActions>
    </StyledCard>
  )
}

export default Note