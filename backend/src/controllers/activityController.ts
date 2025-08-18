import { Request, Response } from "express";
import { IActivity } from "../interfaces/activity";
import { Types } from "mongoose";
import activity from "../models/activity";

const activityController = {
    create: async (req: Request, res: Response) => {
        try {
            const { studyId } = req.params;
            const { name, description, time_diary, study_type } = req.body;
            console.log(req.body);
            const activityLocal: IActivity = {
                name,
                description,
                time_diary,
                study_type,
                study: new Types.ObjectId(studyId)
            };
            const activityDb = await activity.create(activityLocal);

            return res.status(201).json(activityDb);
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    getByStudy: async (req: Request, res: Response) => {
        try {
            const { studyId } = req.params;

            const activities: IActivity[] = await activity.find({ study: studyId, active: true }).populate('study_type');
            return res.status(200).json(activities);
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

export default activityController;