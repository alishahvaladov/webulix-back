import { Request, Response, NextFunction } from "express";

class ProductMiddleware {
  getProductMiddleware(req: Request, res: Response, next: NextFunction) {
    const { _token } = req.cookies;

    if (!_token || _token !== "authed") {
      return res.status(401).send({
        success: false,
        message: "Not Authenticated!"
      });
    }
    next();
  }
  addProductMiddleware(req: Request, res: Response, next: NextFunction) {
    const { auth = ""} = req.body || {};

    if(auth !== "auth") {
      return res.status(401).send({
        success: false,
        message: "Not Authenticated!"
      });
    }
    next();
  }
}

export const { getProductMiddleware, addProductMiddleware } = new ProductMiddleware();