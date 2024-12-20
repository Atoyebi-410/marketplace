import sequelize from './database.js'; // Make sure the path is correct

sequelize.sync({ force: true })
  .then(() => {
    console.log("All tables cleared and re-created.");
  })
  .catch((err) => {
    console.error("Error clearing tables:", err);
  });
