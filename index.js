const express = require('express');
const request = require('request');

const app = express();

/**
 * `q` is the link to visit, uriencoded, with protocol
 * `s` if set, skips sending back of the body
**/
app.get('/go', (req, res) => {
  const url = decodeURIComponent(req.query.q);

  if (!url.startsWith('http')) {
    res.status(400);
    return res.send('malformed url, missing protocol');
  }

  request.get(url, (rerr, rres, rbody) => {
    if (rerr) {
      res.status(400);
    }

    const code = rres.statusCode;
    if (code !== 200) {
      res.status(code);
      return res.send(`code ${code} - ${rres.statusMessage}`);
    }

    return res.send(rerr || rbody);
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
