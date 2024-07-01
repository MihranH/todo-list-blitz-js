'use client';

import Tasks from './components/tasks';
import styles from '../styles/Task.module.css';

export default function TasksComponent() {
  return (
    <div className='center'>
      <div className={styles.body}>
        <Tasks />
      </div>
    </div>
  );
}
