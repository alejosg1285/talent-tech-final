import { Router } from "express";
import indexController from "../controllers/indexController";
import studyValidations from "../validations/studyValidation";
import studyController from "../controllers/studyController";
import validationMiddleware from "../middleware/validationMiddleware";
import activityTypeValidations from "../validations/activityTypeValidation";
import activityTypeController from "../controllers/activityTypeController";
import activityValidations from "../validations/activityValidation";
import activityController from "../controllers/activityController";
import registerController from "../controllers/registerController";

const router = Router();

router.get('/', indexController.index);

router.post('/study/', studyValidations.rules(), validationMiddleware.validate, studyController.create);
router.get('/study', studyController.getAll);
router.get('/study/:studyId', studyValidations.params(), validationMiddleware.validate, studyController.getStudyById);

router.post('/activityType', activityTypeValidations.rules(), validationMiddleware.validate, activityTypeController.create);
router.get('/activityType', activityTypeController.getAll);

router.post('/activity/:studyId', activityValidations.rules(), validationMiddleware.validate, activityController.create);
router.get('/activity/:studyId', studyValidations.params(), validationMiddleware.validate, activityController.getByStudy);

router.post('/register/:activityId', activityValidations.params(), validationMiddleware.validate, registerController.create);

export default router;