import { migrate, migrateMapping } from "../migrations";

export async function GET(req: Request, res: Response) {

 let status = 200, body = {
    message: "migration success"
 };
 try {
    migrate();
    migrateMapping();
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