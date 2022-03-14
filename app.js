const express = require("express");
const app = express();
const fs = require("fs");
var cors = require("cors");
const { v4: uuid } = require("uuid");
app.use(express.json());
app.use(cors());
const port = 8000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

const locationDetails = JSON.parse(fs.readFileSync(`${__dirname}/db.json`));

app.get("/api/addresses", (req, res) => {
  res.json({
    results: locationDetails.length,
    data: {
      locationDetails: locationDetails,
    },
  });
});

app.get("/api/addresses/:id", (req, res) => {
  const id = req.params.id;
  const user = locationDetails.find((item) => item.id == id);
  res.json({
    data: {
      locationDetails: user,
    },
  });
});

app.post("/api/addresses", (req, res) => {
  const newId = uuid();
  const newData = Object.assign({ id: newId }, req.body);
  locationDetails.push(newData);
  fs.writeFile(`${__dirname}/db.json`, JSON.stringify(locationDetails), () => {
    res.json({
      data: {
        locationDetails: newData,
      },
    });
  });
});

app.patch("/api/addresses/:id", (req, res) => {
  const id = req.params.id;
  const data = locationDetails.find((item) => item.id == id);
  const update = Object.assign(data, req.body);
  fs.writeFile(`${__dirname}/db.json`, JSON.stringify(locationDetails), () => {
    res.json({
      data: {
        locationDetails: update,
      },
    });
  });
});

app.delete("/api/addresses/:id", (req, res) => {
  const id = req.params.id;
  const index = locationDetails.findIndex((item) => item.id == id);
  locationDetails.splice(index, 1);
  fs.writeFile(`${__dirname}/db.json`, JSON.stringify(locationDetails), () => {
    res.json({
      status: "success",
    });
  });
});
