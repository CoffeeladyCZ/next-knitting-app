import { createServer } from "https";
import { parse } from "url";
import next from "next";
import fs from "fs";
import path from "path";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Paths to SSL certificate files
const certPath = path.join(process.cwd(), "certs");
const keyPath = path.join(certPath, "localhost-key.pem");
const certFilePath = path.join(certPath, "localhost.pem");

app.prepare().then(() => {
  // Check if certificate files exist
  if (!fs.existsSync(keyPath) || !fs.existsSync(certFilePath)) {
    console.error(
      "\n❌ SSL certificates not found!\n" +
        "Please generate SSL certificates first.\n" +
        "Run: yarn generate-certs\n\n",
    );
    process.exit(1);
  }

  const httpsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certFilePath),
  };

  createServer(httpsOptions, async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(port, (err?: Error) => {
    if (err) throw err;
    console.log(
      `\n✅ Ready on https://${hostname}:${port}\n` +
        `   Local: https://localhost:${port}\n`,
    );
  });
});
