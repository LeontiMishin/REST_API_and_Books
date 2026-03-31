import { app } from "./app";

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/api/v1/books`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
