import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { v4 as uuidv4 } from "uuid";
import useModalStore from "../../store/useModalStore";
import { useNoteStore } from "../../store/useNotesStore";
import styles from "./ModalComponent.module.css";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
    background: "var(--card)",
  },
};

const ModalComponent = () => {
  const { modalIsOpen, selectedNote, closeModal } = useModalStore();
  const { addNote, updateNote, deleteNote } = useNoteStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Update the form inputs when selected note changes
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setDescription(selectedNote.description);
    }
  }, [selectedNote]);

  const handleSubmit = () => {
    if (title && description) {
      const noteId = selectedNote?.id || uuidv4(); // Generate a unique ID if creating a new note
      if (selectedNote) {
        updateNote(noteId, { title, description });
      } else {
        addNote({
          id: noteId,
          title,
          description,
        });
      }
      closeModal();
    }
  };

  const handleDelete = () => {
    if (selectedNote) {
      deleteNote(selectedNote.id);
      closeModal();
    }
  };

  const isSubmitDisabled = !title || !description;

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Edit Note"
    >
      <h2 style={{ marginBottom: "12px" }}>
        {selectedNote ? "Edit Note" : "Create Note"}
      </h2>
      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder="Enter note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <textarea
          placeholder="Enter note description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
        />
      </div>
      <div className={styles.actions}>
        <button className={styles.cancelButton} onClick={closeModal}>
          Cancel
        </button>
        {selectedNote && (
          <button className={styles.deleteButton} onClick={handleDelete}>
            Delete Note
          </button>
        )}
        <button
          className={styles.createButton}
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          style={{
            opacity: isSubmitDisabled ? 0.7 : 1,
            cursor: isSubmitDisabled ? "not-allowed" : "pointer",
          }}
        >
          {selectedNote ? "Update" : "Create"}
        </button>
      </div>
    </Modal>
  );
};

export default ModalComponent;
