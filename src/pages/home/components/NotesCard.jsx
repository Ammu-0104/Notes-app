import React from 'react';
import styles from './NotesCard.module.css';
import { useNavigate } from 'react-router-dom';

// Utility function to truncate text with slice and space
const truncateText = (text, maxLength = 25) => {
  const validText = text ? String(text) : '';
  return validText.length > maxLength ? validText.slice(0, maxLength - 3) + '...' : validText;
};

const NotesCard = ({ note }) => {
  const navigate = useNavigate();

  // Handle navigation with query parameters
  const handleNavigate = () => {
    // Navigate to the route with query params for the selected note
    navigate(`/note?id=${note.id}&title=${encodeURIComponent(note.title)}&description=${encodeURIComponent(note.description)}`);
  };

  // Apply truncation safely
  const truncatedTitle = truncateText(note?.title);
  const truncatedDescription = truncateText(note?.description);

  return (
    <div className={styles.notesCard} onClick={handleNavigate}>
      <h3 className={styles.cardTitle}>{truncatedTitle}</h3>
      <p className={styles.cardDescription}>{truncatedDescription}</p>
    </div>
  );
};

export default NotesCard;
