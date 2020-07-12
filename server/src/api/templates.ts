import express, { Request, Response, NextFunction } from 'express';
import Template from "../services/template";

const router = express.Router();
const templateService = new Template();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const templates = await templateService.all();
    res.json({ templates });
  } catch (err) {
    console.error(err);
    next(new Error("Failed to fetch templates"));
  }
});

export default router;