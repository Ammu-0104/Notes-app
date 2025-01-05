import React from 'react';
import useModalStore from '../../../store/useModalStore'; 
import styles from './CreateButton.module.css'; 
import ModalComponent from '../../../ui/Modal/Modal';

const CreateButton = () => {
  const { openModal } = useModalStore(); 

  return (
    <>
    <button className={styles.createButton} onClick={openModal} aria-label="Create Note">
      +
    </button>
    <ModalComponent/>
    </>
  );
}

export default CreateButton;
