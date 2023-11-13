import { useContext, useState } from "react";
import { Card, CardActions, CardContent, Typography } from "@mui/material"
import {styled} from '@mui/material/styles'
import {  PushPinOutlined as UnPinned } from "@mui/icons-material";
import { DataContext } from "../../Context/DataProvider";

const StyledCard = styled(Card)`
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
`;



const PinnedNote = ({ note }) => {

  const { pinnedNotes, setNotes, setPinnedNotes } = useContext(DataContext);
  const [isHovered, setIsHovered] = useState(false);

 

  const unPinned = (note) => {
      const updatedNotes = pinnedNotes.filter(data => data.id !== note.id);
      setPinnedNotes(updatedNotes);
      setNotes(prevArr => [note, ...prevArr]);
  }

  return (
    <StyledCard
    
    >
        <CardActions>
           
            <UnPinned
               fontSize="small"
               style={{marginLeft:'auto', cursor: 'pointer', backgroundColor: isHovered ? 'lightgray' : 'transparent' }}
               onClick={() => unPinned( note ) }
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
            />
        </CardActions>
        <CardContent>
            <Typography variant="h6" style={{ marginBottom:12 }}>{note.heading}</Typography>
            <Typography variant="body1">{note.text}</Typography>

        </CardContent>
        
    </StyledCard>
  )
}

export default PinnedNote