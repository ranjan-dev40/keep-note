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



const PinnedNote = ({ pinned }) => {

  const { pinnedNotes, setNotes, setPinnedNotes } = useContext(DataContext);

 

  const unPinned = (pinned) => {
      const updatedNotes = pinnedNotes.filter(data => data.id !== pinned.id);
      setPinnedNotes(updatedNotes);
      setNotes(prevArr => [pinned, ...prevArr]);
  }

  return (
    <StyledCard>
        <CardActions>
           
            <UnPinned
               fontSize="small"
               style={{marginLeft: 'auto'}} 
               onClick={() => unPinned(pinned) }
            />
        </CardActions>
        <CardContent>
            <Typography>{pinned.heading}</Typography>
            <Typography>{pinned.text}</Typography>

        </CardContent>
        
    </StyledCard>
  )
}

export default PinnedNote