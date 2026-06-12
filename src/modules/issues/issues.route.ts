import { Router } from "express";
import { IssueController } from "./issues.controller";

const router=Router();

router.post('/',IssueController.createIssue)
router.get('/',IssueController.getAllIssue)
router.get('/:id',IssueController.getSingleIssue)
router.patch('/:id',IssueController.updateIssue)
router.delete('/:id',IssueController.deleteIssue)

export const issuesRoute=router;