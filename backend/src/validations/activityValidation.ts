import { body, param } from "express-validator"

const rules = () => {
    return [
        param('studyId')
        .isString().withMessage('Study ID not valid')
        .notEmpty().withMessage('Sutdy ID is required')
        .trim()
        .isMongoId(),
        body('name')
        .notEmpty().withMessage('Study name is required')
        .trim(),
        /*body('time_diary')
        .isInt().withMessage('Time is not a valid number')
        .custom(val => {
            if (val <= 0) {
                throw new Error('Time must be greater than 0');
            }
        })*/
    ]
}

const params = () => {
    return [
        param('activityId')
        .isString().withMessage('Activity ID not valid')
        .notEmpty().withMessage('Activity ID is required')
        .trim()
        .isMongoId()
    ]
}

const activityValidations = { 
    rules,
    params
};

export default activityValidations;