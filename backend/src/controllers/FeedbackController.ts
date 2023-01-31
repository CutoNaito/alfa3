import { Feedback } from "../models/Feedback";
import { Request, Response } from "express";

export async function create(req: Request, res: Response){
    const feedback = new Feedback(undefined, req.body.id_zak, req.body.id_prod, req.body.title, req.body.text);
    try {
        const result = await feedback.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function readAll(req: Request, res: Response){
    try {
        const result = await new Feedback().getAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function readById(req: Request, res: Response){
    const id: number = parseInt(req.params.id);
    const feedback = new Feedback(id);
    try {
        const result = await feedback.getById();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function update(req: Request, res: Response){
    const id: number = parseInt(req.params.id);
    const feedback = new Feedback(id, req.body.id_zak, req.body.id_prod, req.body.title, req.body.text);
    try {
        const result = await feedback.update();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function remove(req: Request, res: Response){
    const id: number = parseInt(req.params.id);
    const feedback = new Feedback(id);
    try {
        const result = await feedback.delete();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}