import { Router } from "express";
import { IssueController } from "./issues.controller";
import { USER_ROLE } from "../../types";
import auth from "../../middleware/auth";

const router=Router();

router.post('/',auth(USER_ROLE.contributor,USER_ROLE.maintainer),IssueController.createIssue)
router.get('/',IssueController.getAllIssue)
router.get('/:id',IssueController.getSingleIssue)
router.patch('/:id',auth(USER_ROLE.contributor,USER_ROLE.maintainer),IssueController.updateIssue)
router.delete('/:id',auth(USER_ROLE.maintainer),IssueController.deleteIssue)

export const issuesRoute=router;