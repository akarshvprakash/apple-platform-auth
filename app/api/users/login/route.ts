import { apiPost } from "../../database";

export async function POST(req: Request, res: Response) {
 const body = await req.json();
 const { name, description, imageUrl, articleUrl, slug } = body;

 const query = `
    INSERT INTO articles(name, description, imageUrl, articleUrl, slug)
    VALUES(?, ?, ?, ?, ?)
  `;
 const values = [name, description, imageUrl, articleUrl, slug];

 let status, respBody;
 await apiPost(query, values)
  .then(() => {
   status = 200;
   respBody = { message: "Successfully" };
  })
  .catch((err) => {
   status = 400;
   respBody = err;
  });
 return Response.json(respBody, {
  status,
 });
}