import { body, param } from "express-validator"

const rules = () => {
    return [
        body('name')
        .notEmpty().withMessage('Study name is required')
        .trim()
    ]
}

const params = () => {
    return [
        param('studyId')
        .isString().withMessage('Study ID not valid')
        .notEmpty().withMessage('Sutdy ID is required')
        .trim()
        .isMongoId()
    ]
}

const studyValidations = { 
    rules,
    params
};

export default studyValidations;