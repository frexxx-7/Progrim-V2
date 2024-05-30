import React from 'react';
import classes from './MainPage.module.scss';

const MainPage = () => {
  return (
    <div className={classes.mainContainer}>
      <header className={classes.header}>
        <h1>Добро пожаловать в Progrim V2</h1>
        <p>Следите за новостями и организанциями!</p>
      </header>
      
      <section className={classes.features}>
        <div className={classes.feature}>
          <img src="https://cdn-icons-png.flaticon.com/512/5738/5738173.png"/>
          <h2>Оптимизируйте управление проектами с помощью Progrim V2</h2>
        </div>
        <div className={classes.feature}>
          <img src="https://cdn-icons-png.flaticon.com/512/3886/3886839.png" alt="Interactive Map" />
          <h2>Повысьте эффективность коммуникации в вашей организации</h2>
        </div>
        <div className={classes.feature}>
          <img src="https://cdn-icons-png.flaticon.com/512/1373/1373060.png" alt="AI Assistant" />
          <h2>Автоматизируйте создание планов и отслеживание прогресса.</h2>
        </div>
        <div className={classes.feature}>
          <img src="https://cdn-icons-png.flaticon.com/512/854/854929.png" alt="AI Assistant" />
          <h2>Используйте интерактивную карту для взаимодействия с географическими данными</h2>
        </div>
        <div className={classes.feature}>
          <img src="https://cdn-icons-png.flaticon.com/512/1042/1042680.png" alt="AI Assistant" />
          <h2>Следите за мировыми новостями</h2>
        </div>
        <div className={classes.feature}>
          <img src="https://cdn-icons-png.flaticon.com/512/10163/10163006.png" alt="AI Assistant" />
          <h2>Укрепите имидж вашей организации через публикацию достижений и мероприятий</h2>
        </div>
      </section>
      
      <footer className={classes.footer}>
        <p>&copy; 2024 Progrim V2</p>
      </footer>
    </div>
  );
}

export default MainPage;
