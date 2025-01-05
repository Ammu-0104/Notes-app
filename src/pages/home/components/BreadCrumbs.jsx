import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './BreadCrumbs.module.css';

const BreadCrumbs = () => {
  return (
    <div className={styles.breadcrumbs}>
      <Link to="/">Home</Link> / <span>Notes</span>
    </div>
  );
}

export default BreadCrumbs;
