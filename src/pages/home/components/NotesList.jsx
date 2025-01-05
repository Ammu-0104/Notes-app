import React from 'react';
import { useLocation } from 'react-router-dom';
import CreateButton from './CreateButton';
import NotesCard from './NotesCard';
import styles from './NotesList.module.css';
import { useNoteStore } from '../../../store/useNotesStore';

// Utility function to truncate text with slice and space
const truncateText = (text, maxLength = 25) => {
  const validText = text ? String(text) : '';
  return validText.length > maxLength ? validText.slice(0, maxLength - 3) + '...' : validText;
};

const NotesList = () => {
  const { notes, deleteNote } = useNoteStore();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const selectedNoteId = queryParams.get('id');
  const selectedTitle = queryParams.get('title');
  const selectedDescription = queryParams.get('description');

  // Find selected note or fallback to query params
  const selectedNote = notes?.find((note) => note.id === selectedNoteId) || {
    title: selectedTitle || 'No Title Selected',
    description: selectedDescription || 'No Description Available',
  };

  // Truncate selected note details
  const truncatedTitle = truncateText(selectedNote.title);
  const truncatedDescription = truncateText(selectedNote.description);

  // Handle note deletion with confirmation
  const handleDeleteNote = () => {
    const confirmed = window.confirm('Are you sure you want to delete this note?');
    if (confirmed) {
      deleteNote(selectedNote.id); // Delete the note by id
    }
  };

  return (
    <div className={styles.notesList}>
      <div className={styles.notesLeft}>
        <div className={styles.notesTop}>
          <input type="text" placeholder="Search notes..." className={styles.searchInput} />
          <CreateButton />
        </div>
        <div className={styles.notesListContent}>
          {notes?.map((note) => (
            <NotesCard key={note.id} note={note} />
          ))}
        </div>
      </div>
      <div className={styles.notesRight}>
        <div className={styles.notesCardDetail}>
          <div style={{display:"flex" , gap:"12px",width:"100%",justifyContent:"space-between"}}>
            <h2 className={styles.cardTitle}>{selectedTitle}</h2>
            <button className={styles.deleteButton} onClick={handleDeleteNote}>
              Delete Note
            </button>
          </div>
          <p className={styles.cardDescription}>{selectedDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default NotesList;
