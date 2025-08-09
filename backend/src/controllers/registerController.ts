import { Request, Response } from "express";
import { IRegister } from "../interfaces/register";
import moment from "moment";
import { Types } from "mongoose";
import register from "../models/register";

const registerController = {
    create: async (req: Request, res: Response) => {
        try {
            const { activityId } = req.params;
            const { activity_time } = req.body;
            const currentDate = moment();
            const seconds = 10;
            const regist: IRegister = {
                initial_time: currentDate.format('YYYY-MM-DD HH:mm:ss'),
                final_time:  currentDate.add(seconds, 'seconds').format('YYYY-MM-DD HH:mm:ss'),
                activity_time,
                total_time: seconds,
                activity: new Types.ObjectId(activityId)
            }
            const itemDb = await register.create(regist);
            console.log(itemDb);
            return res.status(201).json(itemDb);
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

export default registerController;