import { Request, Response } from "express";
import { IRegister } from "../interfaces/register";
import moment from "moment";
import { Types } from "mongoose";
import register from "../models/register";

const registerController = {
    create: async (req: Request, res: Response) => {
        try {
            const { activityId } = req.params;
            const { activity_time, initial_time, final_time, total_time } = req.body;
            
            const regist: IRegister = {
                initial_time: moment(initial_time, 'YYYY-MM-DD HH:mm:ss').toDate(),
                final_time:  moment(final_time, 'YYYY-MM-DD HH:mm:ss').toDate(),
                activity_time,
                total_time: total_time,
                activity: new Types.ObjectId(activityId)
            }
            const itemDb = await register.create(regist);
            return res.status(201).json(itemDb);
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    getByActivity: async (req: Request, res: Response) => {
        try {
            const { activityId } = req.params;

            const registers: IRegister[] = await register.find({ activity: activityId });
            return res.status(200).json(registers);
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

export default registerController;