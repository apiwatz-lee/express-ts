import axios from 'axios';
import { Request, Response } from 'express';
import * as userServices from '../services/user.service';
import { User } from '../types/user.type';

export const getDepartmentSummary = async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get<{ users: User[] }>(
      'https://dummyjson.com/users'
    );

    const summary = userServices.summarizeDepartment(data.users);

    res.status(200).json({
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      message: 'error',
    });
  }
};
