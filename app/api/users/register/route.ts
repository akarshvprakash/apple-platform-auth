import { apiPost } from "../../database";

export async function POST(req: Request, res: Response) {
 const body = await req.json();
 const { name, email, password } = body;

 const query = `
    INSERT INTO users(name, email, password)
    VALUES(?, ?, ?)
  `;
 const values = [name, email, password];

 let status, respBody;
 await apiPost(query, values)
  .then(() => {
   status = 200;
   respBody = { message: "Successfully created user" };
  })
  .catch((err) => {
   status = 400;
   respBody = err;
  });
 return Response.json(respBody, {
  status,
 });
}