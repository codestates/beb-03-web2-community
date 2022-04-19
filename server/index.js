const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const indexRouter = require("./routes/index");
// const etherRouter = require("./routes/ether");
// const accountRouter = require("./routes/account");
// mongosh "mongodb+srv://cluster0.ej0vx.mongodb.net/community" --apiVersion 1 --username web2-community

mongoose.connect(`mongodb+srv://web2-community:1234@cluster0.ej0vx.mongodb.net/community`)
.then(() => console.log('MongoDB connected...'))
.catch(error => console.log(error))

// const db = mongoose.connection;
// db.on('err', console.error);
// db.once('open', function() {
// console.log('connected mongodb server')
// });

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	cors({
		origin: "http://localhost:3000",
	})
);

app.use(express.json());

// app.use("/nft", nftRouter);
// app.use("/ether", etherRouter);
// app.use("/account", accountRouter);

app.get("/", (req, res) => {});
app.listen(port, () => {
	console.log("Listening...");
});
