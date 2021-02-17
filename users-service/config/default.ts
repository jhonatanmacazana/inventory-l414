export default {
  db: {
    type: "mongodb",
    user: "root",
    password: "password",
    host: "users-service-db",
    database: "db",
    URI: "mongodb://root:password@users-service-db/db",
  },
  USERS_SERVICE_DB_URI: "mongodb://root:password@users-service-db/db",
  USER_SESSION_EXPIRY_HOURS: 1,
};
