import { useContext } from "react";
import { Card, CardActions, CardContent, Typography } from "@mui/material"
import {styled} from '@mui/material/styles'
import {  PushPin as UnPinned } from "@mui/icons-material";
import { DataContext } from "../../Context/DataProvider";

const StyledCard = styled(Card)`
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
`;



const PinnedNote = ({ note }) => {

  const { pinnedNotes, setNotes, setPinnedNotes } = useContext(DataContext);

 

  const unPinned = (note) => {
      const updatedNotes = pinnedNotes.filter(data => data.id !== note.id);
      setPinnedNotes(updatedNotes);
      setNotes(prevArr => [note, ...prevArr]);
  }

  return (
    <StyledCard>
        <CardActions>
           
            <UnPinned
               fontSize="small"
               style={{marginLeft: 'auto'}} 
               onClick={() => unPinned( note ) }
            />
        </CardActions>
        <CardContent>
            <Typography>{ note.heading}</Typography>
            <Typography>{ note.text}</Typography>

        </CardContent>
        
    </StyledCard>
  )
}

export default PinnedNote