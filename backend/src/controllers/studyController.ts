import { Request, Response } from "express";
import { IStudy } from "../interfaces/study";
import study from "../models/study";

const studyController = {
    create: async (req: Request, res: Response) => {
        try
        {
            const { name, objective, description, tags } = req.body;
            const studyLocal: IStudy = {
                name,
                objective,
                description,
                tags: tags.split(';')
            };
            await study.create(studyLocal);

            return res.status(201).json(study);
        } catch(error) {
            return res.status(500).send(error);
        }
    },
    getAll: async (req: Request, res: Response) => {
        try {
            const studies: IStudy[] = await study.find({});
            return res.status(200).json({studies});
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    getStudyById: async (req: Request, res: Response) => {
        try {
            const { studyId } = req.params;
            const studyDb: IStudy | null = await study.findById(studyId);
            if (!studyDb)
                return res.status(404).json({ message: 'Study not found' });

            return res.status(200).json({studyDb});
        } catch (error) {
            return res.status(500).send(error);
        }
    },
};

export default studyController;