import express, { Request, Response, NextFunction } from 'express';
import Deployment from "../services/deployment";
import validators from "./validators";
// import { IDeployment } from '../interfaces/IDeployment';
import { IDeployment } from '../interfaces/IDeployment';

const router = express.Router();
const deploymentService = new Deployment();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deployments = await deploymentService.all();
    res.json({ deployments });
  } catch (err) {
    console.error(err);
    next(new Error("Failed to fetch deployments"));
  }
});

router.post('/',
  validators.deployment,
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deployment = await deploymentService.add(req.body as IDeployment);
    res.json({ status: "SUCCESS", data: deployment });
  } catch (err) {
    console.error(err);
    next(new Error("Failed to add deployment"));
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await deploymentService.delete(req.params.id);
    if (deleted) {
      res.json({ status: "SUCCESS", message: "Deployment deleted" });
    } else {
      res.json({ status: "FAILURE", message: "Deployment doesn't exist" });
    }
  } catch (err) {
    console.log(err);
    next(new Error());
  }
});

export default router;