import { db } from "./database";

export const migrate = () => {
  db.serialize(() => {
   db.run(
    `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `,
    (err: Error) => {
     if (err) {
      console.error(err.message);
     }
     console.log("users table created successfully.");
    }
   );
  });
}

export const migrateMapping = () => {
    db.serialize(() => {
     db.run(
      `
        CREATE TABLE IF NOT EXISTS usersPublicKey (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          publicKey TEXT NOT NULL,
          userID INTEGER NOT NULL
        );
      `,
      (err: Error) => {
       if (err) {
        console.error(err.message);
       }
       console.log("users table created successfully.");
      }
     );
    });
}

migrate();
migrateMapping();