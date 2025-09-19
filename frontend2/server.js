const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`Demo frontend2 running on port ${PORT}`);
});
