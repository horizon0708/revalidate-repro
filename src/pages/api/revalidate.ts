import { NextApiRequest, NextApiResponse } from "next";

/**
 * Clears cache for the whole blog.
 *
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req?.query?.apiKey !== process.env.SECRET_KEY) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    console.log(req.query.path);
    await res.revalidate((req?.query?.path as string) ?? "");
    return res.json({ revalidated: true });
  } catch (e) {
    console.error(e);
    return res.json({ revalidated: false });
  }
}
