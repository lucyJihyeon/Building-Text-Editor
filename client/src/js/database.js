import { openDB } from "idb";

const initdb = async () =>
  //creating a new database named 'jate' which uses version 1
  openDB("jate", 1, {
    //check if the object store already has 'jate' created
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      //if it has not been created already, create a new object store with the key path of id that is auto incremeneted.
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  //open the jate database with version 1
  const jateDb = await openDB("jate", 1);
  //create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readwrite");
  // Open up the desired object store and get all of the data in the database.
  const store = tx.objectStore("jate");
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log("Data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  //open the jate database with version 1
  const jateDb = await openDB("jate", 1);
  //create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readonly");
  // Open up the desired object store and get all of the data in the database.
  const store = tx.objectStore("jate");
  const request = store.get(1);
  const result = await request;
  result
    ? console.log("data retrieved from the database", result.value)
    : console.log("data not found in the database");
  return result?.value;
};

initdb();
