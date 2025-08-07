import { Request, Response } from "express";
import { IActivityType } from "../interfaces/activityType";
import activityType from "../models/activityType";

const activityTypeController = {
    create: async (req: Request, res: Response) => {
        try {
            const { type: name } = req.body;
            const activityTypeLocal: IActivityType = {
                type: name
            };

            await activityType.create(activityTypeLocal);
            return res.status(201).json({activityTypeLocal});
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    getAll: async (req: Request, res: Response) => {
        try {
            const activityTypes: IActivityType[] = await activityType.find({});
            return res.status(200).json({activityTypes});
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

export default activityTypeController;