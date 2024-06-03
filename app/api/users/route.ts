import { apiGet } from "../database";

export async function GET(req: Request, res: Response) {
 const query = `
    SELECT * from users
  `;

 let status, body;
 try {
  await apiGet(query)
   .then((res) => {
    status = 200;
    body = res;
   })
   .catch((err: Error) => {
    status = 400;
    body = { error: err };
   });
  return Response.json(body, {
   status,
  });
 } catch (error: any) {
  console.error(error.message);
  return Response.json(
   { error: error },
   {
    status: 400,
   }
  );
 }
}