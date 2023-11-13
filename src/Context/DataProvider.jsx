import { createContext, useState } from 'react';

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {

    const [notes, setNotes] = useState([]);
    const [deletedNotes, setDeletedNotes] = useState([]);
    const [pinnedNotes, setPinnedNotes] = useState([]);
    const [editableNote, setEditableNote] = useState([]);
    const [showTextArea, setShowTextArea] = useState(false);
    const updateNote = (noteId, updatedData) => {
        setNotes((prevNotes) => {
          const updatedNotes = prevNotes.map((note) =>
            note.id === noteId ? { ...note, ...updatedData } : note
          );
          return updatedNotes;
        });
      };

    return (
        <DataContext.Provider value={{
            notes,
            setNotes,
            deletedNotes,
            setDeletedNotes,
            pinnedNotes,
            setPinnedNotes,
            updateNote,
            showTextArea,
            setShowTextArea,
            editableNote,
            setEditableNote
        }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;