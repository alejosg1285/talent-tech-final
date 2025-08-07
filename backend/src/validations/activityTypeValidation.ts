import { body } from "express-validator"

const rules = () => {
    return [
        body('type')
        .notEmpty().withMessage('Type name is required')
        .trim()
    ]
}

const activityTypeValidations = { 
    rules,
};

export default activityTypeValidations;