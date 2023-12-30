import multiparty from "multiparty";
import { BlobServiceClient, AnonymousCredential } from "@azure/storage-blob";
import fs from "fs";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";
import mime from "mime-types";

const containerName = "testkart"; // Replace with your Azure Blob Storage container name

const blobServiceClient = new BlobServiceClient(
  `https://taaharkart.blob.core.windows.net`,
  new AnonymousCredential()
);

const containerClient = blobServiceClient.getContainerClient(containerName);

export default async function handle(req, res) {
  try {
    await mongooseConnect();
    await isAdminRequest(req, res);

    const form = new multiparty.Form();

    form.on("error", (err) => {
      console.log("Multiparty Error:", err);
      res.status(500).json({ error: "Error processing form data" });
    });

    form.on("close", async () => {
      // Perform operations after form parsing is complete
      // This might include file processing or other actions
    });

    const { files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ files });
      });
    });

    const links = [];
    for (const file of files.file) {
      const ext = mime.extension(file.headers["content-type"]);
      const newFilename = Date.now() + "." + ext;

      const blockBlobClient = containerClient.getBlockBlobClient(newFilename);

      const fileStream = fs.createReadStream(file.path);
      await blockBlobClient.uploadStream(fileStream, file.size);

      const link = blockBlobClient.url;
      links.push(link);
    }

    return res.json({ links });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
