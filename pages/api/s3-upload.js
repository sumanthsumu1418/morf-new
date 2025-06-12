// import { APIRoute } from "next-s3-upload";

// export default APIRoute.configure({
//   accessKeyId: process.env.S3_UPLOAD_KEY,
//   secretAccessKey: process.env.S3_UPLOAD_SECRET,
//   bucket: process.env.S3_UPLOAD_BUCKET,
//   region: process.env.S3_UPLOAD_REGION,
//   // key(req, filename) {
//   //   return `my/uploads/path/${filename.toUpperCase()}`;
//   // },
// });

import { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: process.env.S3_UPLOAD_REGION,
  accessKeyId: process.env.S3_UPLOAD_KEY,
  secretAccessKey: process.env.S3_UPLOAD_SECRET,
  signatureVersion: "v4",
});

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    let { name, type } = req.body;

    const fileParams = {
      Bucket: process.env.S3_UPLOAD_BUCKET,
      Key: name,
      Expires: 600,
      ContentType: "application/octet-stream",
      ACL: "public-read",
    };

    const url = await s3.getSignedUrlPromise("putObject", fileParams);

    res.status(200).json({ url });
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb", // Set desired value here
    },
  },
};
