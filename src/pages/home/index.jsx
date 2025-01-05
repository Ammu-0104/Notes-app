import React from 'react';
import Navbar from './components/Navbar';
import BreadCrumbs from './components/BreadCrumbs';
import NotesList from './components/NotesList';
import useUserStore from '../../store/useUserStore';
import styles from './Home.module.css';

const Home = () => {
  const { user } = useUserStore();

  return (
    <div className={styles.home}>
      <Navbar />
      <div className={styles.contain}>
        <BreadCrumbs />
        <div className={styles.container}>
          <h3 className={styles.homeTitle}>Good Morning, {user?.user_name || 'Guest'}!</h3>
          <NotesList />
        </div>
      </div>
    </div>
  );
};

export default Home;
