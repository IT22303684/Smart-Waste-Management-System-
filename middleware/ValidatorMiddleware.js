import { body ,param, validationResult} from 'express-validator';
import { BadRequestError  , NotFoundError, UnauthorizedError} from '../errors/customErrors.js';
import {RITEM_CATEGORY , RITEM_STATUS} from "../Utils/constants.js";
import User from '../models/UserModel.js';
import RItem from '../models/RItemsModel.js'
import Company from '../models/CompanyModel.js';
import emp from '../models/Employee.js'
import cItems from '../models/CompanyItemsModel.js'
import TimeTable from '../models/TimeTable.js';

import mongoose, { mongo } from 'mongoose';


const withValidationError = (validateValue) => {
    return [validateValue , 
        (req, res , next ) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const errorMessage = errors.array().map(error => error.msg);
            if(errorMessage[0].startsWith('Recycle item with')) {
                throw new NotFoundError(errorMessage);
            }

            if(errorMessage[0].startsWith('not authorized')){
                throw new UnauthorizedError('not authorized to access this route');
            }
            
            throw new BadRequestError(errorMessage);
        }
        next();
    }];
};



