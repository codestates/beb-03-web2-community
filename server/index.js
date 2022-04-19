const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

 const indexRouter = require("./routes/index");
// const etherRouter = require("./routes/ether");
// const accountRouter = require("./routes/account");


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
