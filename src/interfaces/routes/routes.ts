import { Request, Response, Application } from "express";
import productRoutes from "./product.routes";

const routing = (app: Application) => {
  app.use('/api/', productRoutes);
  app.route('/*').get((_: Request, res: Response) => res.status(404).send());
};

export default routing;