import axios from "axios";

import React, { useState } from "react";

export const PostData = () => {
  const [street, setStreet] = useState("");
  const [data, setData] = useState([]);

  const [area, setArea] = useState("");
  const handlePost = () => {
    axios
      .post("http://localhost:8000/api/addresses", {
        Street: street,
        Area: area,
      })
      .then(function (response) {
        setData(response.data.data.allData);
      })
      .catch(function (error) {
        console.log(error);
      });


  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.currentTarget.value)}
        />
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.currentTarget.value)}
        />
      </div>
      <button onClick={handlePost}>Click To Post Data</button>
    </div>
  );
};
