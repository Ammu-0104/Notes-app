import React, { useState } from "react";
import NotesCard from "./NotesCard";
import styles from "./NotesList.module.css";
import ModalComponent from "../../../ui/Modal/Modal";
import useModalStore from "../../../store/useModalStore";
import { useNoteStore } from "../../../store/useNotesStore";

const NotesList = () => {
  const { notes } = useNoteStore();
  const { openModal, closeModal } = useModalStore();
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter notes based on the search query
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCardClick = (note) => {
    openModal(note); // Open modal with the selected note
  };

  return (
    <div className={styles.notesList}>
      <div className={styles.notesLeft}>
        <div className={styles.notesTop}>
          <input
            type="text"
            placeholder="Search notes..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className={styles.notesListContent}>
          {filteredNotes.length === 0 ? (
            <p>No notes found</p>
          ) : (
            filteredNotes.map((note) => (
              <NotesCard
                key={note.id}
                note={note}
                onClick={() => handleCardClick(note)}
              />
            ))
          )}
        </div>
      </div>
      {/* Modal component to edit or create notes */}
      <ModalComponent />

      <div className={styles.notesRight}>
        {/* Display selected note details */}
        <h2 className={styles.cardTitle}>{filteredNotes[0]?.title}</h2>
        <p className={styles.cardDescription}>{filteredNotes[0]?.description}</p>
      </div>
    </div>
  );
};

export default NotesList;
