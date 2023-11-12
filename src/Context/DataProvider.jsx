import { createContext, useState } from 'react';

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {

    const [notes, setNotes] = useState([]);
    const [deletedNotes, setDeletedNotes] = useState([]);
    const [pinnedNotes, setPinnedNotes] = useState([]);

    return (
        <DataContext.Provider value={{
            notes,
            setNotes,
            deletedNotes,
            setDeletedNotes,
            pinnedNotes,
            setPinnedNotes
        }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;