import React from 'react';
import styles from './Navbar.module.css'; 

const Navbar = () => {
  return (
    <div className={styles.navbar}>
        <h2>Keep Notes</h2>
        <button>Logout</button>
    </div>
  );
}

export default Navbar;
