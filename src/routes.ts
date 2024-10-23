import { Router, Request, Response } from 'express';
import { faunaClient } from './fauna_client';
import { fql } from 'fauna';
const router = Router();
  
router.get('/blogs', async (req: Request, res: Response) => {
  try {
    const result = await faunaClient.query(fql `Blog.all()`);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    });     
  }
});


router.get('/projects', async (req: Request, res: Response) => {
  try {
    const result = await faunaClient.query(fql `Project.all()`);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    });     
  }
});


router.get('/certificates', async (req: Request, res: Response) => {
  try {
    const result = await faunaClient.query(fql `Certificate.all()`);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    });     
  }
});


router.get('/experiences', async (req: Request, res: Response) => {
  try {
    const result = await faunaClient.query(fql `Experience.all()`);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    });     
  }
});

router.all('/', async (req: Request, res: Response) => {
  res.status(200).json("OK");
});

export default router;