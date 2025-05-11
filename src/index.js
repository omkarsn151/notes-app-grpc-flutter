import "dotenv/config";
import connectDB from "./db/index.js";
import app from "./app.js";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import noteController from "./controllers/notesController.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, "../../proto/notes.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(packageDef).notes;

const server = new grpc.Server();
server.addService(proto.NoteService.service, noteController);

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log(`REST server running on port 3000`);
    });

    server.bindAsync(
      `${process.env.IP}:${process.env.PORT}`,
      grpc.ServerCredentials.createInsecure(),
      (err, port) => {
        if (err) throw err;
        console.log(`gRPC Server running at you server:${port}`);
        server.start();
      }
    );
  })
  .catch((err) => {
    console.error("Failed to connect DB:", err);
  });