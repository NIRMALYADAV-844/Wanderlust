if(process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj,owner: "6785680581793a9cd4c12ea6"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

// initDB();