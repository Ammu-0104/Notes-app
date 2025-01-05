import React, { useState } from "react";
import Modal from "react-modal";
import { v4 as uuidv4 } from "uuid"; // Import the UUID function
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
  const { modalIsOpen, closeModal } = useModalStore();
  const { addNote } = useNoteStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (title && description) {
      const noteId = uuidv4(); // Generate a unique ID for the note
      addNote({ id: noteId, title, description });
      setTitle("");
      setDescription("");
      closeModal();
    }
  };

  const isSubmitDisabled = !title || !description;

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Create Note"
    >
      <h2 style={{ marginBottom: "12px" }}>Create Note</h2>
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
        <button
          className={styles.cancelButton}
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className={styles.createButton}
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          style={{
            opacity: isSubmitDisabled ? 0.7 : 1,
            cursor: isSubmitDisabled ? "not-allowed" : "pointer",
          }}
        >
          Create
        </button>
      </div>
    </Modal>
  );
};

export default ModalComponent;
