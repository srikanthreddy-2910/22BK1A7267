const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Users",
  tableName: "users",
  columns: { 
    name: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    email: {
      type: "varchar",
      length: 255,
      unique: true,
      nullable: false,
    },
    githubUsername:{
        type: "varchar",
      length: 255,
      unique: true,
      nullable: false,
    },
    mobileNo: {
      type: "varchar",
      length: 20,
      nullable: false,
    },
    rollNo: {
      type: "varchar",
      unique: true,
      primary: true,
    },
    accessCode: {
      type: "varchar",
      length: 100,
      nullable: true,
    },
    clientID: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    clientSecret: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
  },
});
