import React, { useState, useContext, useRef, useEffect } from 'react';
import { Card, CardContent, Typography, ClickAwayListener } from "@mui/material"
import { styled } from '@mui/material/styles'
import { DataContext } from '../Context/DataProvider';

const StyledCard = styled(Card)`
  border-radius: 8px;
  width: 240px;
  margin: 8px;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
`;

const EditableNote = ({ note, noteId}) => {
  const [heading, setHeading] = useState(note.heading);
  const [text, setText] = useState(note.text);
  const { updateNote, setShowTextArea, setEditableNote } = useContext(DataContext);

  const headingRef = useRef(null);
  const textRef = useRef(null);

  const handleHeadingChange = (e) => {
    setHeading(e.target.innerText);
  };

  const handleTextChange = (e) => {
    setText(e.target.innerText);
  };

  const handleSave = () => {
    // Update the note content in the context
    updateNote(note.id, { ...note, heading, text });

    // Reset editableNoteId to null to stop editing mode
    setShowTextArea(false)
    setEditableNote(null)
  };

  useEffect(() => {
    // Set cursor position to the end of the content after rendering
    const setCursorPosition = (element) => {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(element);
      range.collapse(false); // Collapse to the end of the range
      selection.removeAllRanges();
      selection.addRange(range);
    };

    if (headingRef.current) {
      setCursorPosition(headingRef.current);
    }
    if (textRef.current) {
      setCursorPosition(textRef.current);
    }
  }, [heading, text]);

  return (
    <ClickAwayListener onClickAway={handleSave}>

        <StyledCard>
        <CardContent>
            <Typography
            variant="h6"
            contentEditable
            onInput={handleHeadingChange}
            suppressContentEditableWarning // To suppress React warning about using contentEditable
            dangerouslySetInnerHTML={{ __html: heading }} // Set initial HTML content
            style={{ outline: 'none' }} // Remove the outline styling
            ref={headingRef}
            />
            <Typography
            variant="body2"
            contentEditable
            onInput={handleTextChange}
            suppressContentEditableWarning // To suppress React warning about using contentEditable
            dangerouslySetInnerHTML={{ __html: text }} // Set initial HTML content
            style={{ outline: 'none' }} // Remove the outline styling
            ref={textRef}
            />
        </CardContent>
        </StyledCard>
    </ClickAwayListener>
  );
};

export default EditableNote;

