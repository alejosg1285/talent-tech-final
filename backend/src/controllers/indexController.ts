import { Request, Response } from "express";

const indexController = {
    index: (req: Request, res: Response) => {
        return res.status(200).send("Index");
    }
};

export default indexController;