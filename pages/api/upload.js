import multiparty from "multiparty";
import { BlobServiceClient, AnonymousCredential } from "@azure/storage-blob";
import fs from "fs";
import mime from "mime-types";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

const containerName = "testkart"; // Replace with your Azure Blob Storage container name

const blobServiceClient = new BlobServiceClient(
  `https://taaharkart.blob.core.windows.net`,
  new AnonymousCredential()
);

const containerClient = blobServiceClient.getContainerClient(containerName);

export default async function handle(req, res) {
  console.log("req.body", req.body);
  await mongooseConnect();
  await isAdminRequest(req, res);

  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const links = [];
  for (const file of files.file) {
    const ext = file.originalFilename.split(".").pop();
    const newFilename = Date.now() + "." + ext;

    const blockBlobClient = containerClient.getBlockBlobClient(newFilename);

    await blockBlobClient.uploadBrowserData(fs.readFileSync(file.path));

    const link = blockBlobClient.url;
    links.push(link);
  }

  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};
