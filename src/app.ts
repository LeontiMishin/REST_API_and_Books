import express from "express";
import { bookRoutes } from "./express/routes/book-routes";
import { errorHandler } from "./middleware/error-handler";
import { notFoundHandler } from "./middleware/not-found";

export const app = express();

app.use(express.json());

app.get("/health", (_request, response) => {
  response.status(200).json({
    data: {
      status: "ok"
    }
  });
});

app.use("/api/v1", bookRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
