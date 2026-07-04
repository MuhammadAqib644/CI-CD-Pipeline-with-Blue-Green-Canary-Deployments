const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || 'v2';
const COLOR = process.env.APP_COLOR || 'green';

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Demo App ${VERSION}</title></head>
      <body style="font-family: sans-serif; background:${COLOR}; color:white; text-align:center; padding-top:100px;">
        <h1>Version: ${VERSION}</h1>
        <h2>Color: ${COLOR}</h2>
        <p>Served by pod: ${os.hostname()}</p>
      </body>
    </html>
  `);
});

// Used by k8s liveness/readiness probes and by the Argo Rollouts AnalysisTemplate
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', version: VERSION });
});

app.get('/version', (req, res) => {
  res.json({ version: VERSION, color: COLOR, hostname: os.hostname() });
});

app.listen(PORT, () => {
  console.log(`Demo app ${VERSION} (${COLOR}) listening on port ${PORT}`);
});
