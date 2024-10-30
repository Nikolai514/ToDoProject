import express from "express";
const router = express.Router();
import { check } from 'express-validator';

import { auth } from '../../middleware/auth.js';
import ToDoController from '../../controllers/todo.js';

router.get('/', auth, ToDoController.getData);
router.get('/:id', auth, ToDoController.getDataByID);

router.post(
    '/',
    [
        auth,
        [
            check("text", "Todo is required").not().isEmpty(),
            check("tagId", "Tag is required").not().isEmpty(),
        ],
    ],
    ToDoController.addData
);

router.put(
    '/:id',
    [
        auth,
        [
            check("text", "Todo is required").not().isEmpty(),
            check("tagId", "Tag is required").not().isEmpty(),
        ],
    ],
    ToDoController.upDateData
);

router.put('/complete/:id', auth, ToDoController.completeData);

router.delete('/:id', auth, ToDoController.deleteData);

export default router;