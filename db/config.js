db = db.getSiblingDB('admin'); // Switch to the 'admin' database

db.createUser({
    user: "vanshika",
    pwd: "password", // Make sure to use a secure password
    roles: [{ role: "readWrite", db: "admin" }] // Adjust roles as necessary
});

// Optionally, you can create additional users or databases here
