import { Feedback } from "../models/Feedback";
import { Request, Response } from "express";

export async function create(req: Request, res: Response){
    /**
     * @param req Request object
     * @param res Response object
     * 
     * @description Creates a new Feedback object with the given request data and saves it to the database
     */
    const feedback = new Feedback(undefined, req.body.id_zak, req.body.id_prod, req.body.title, req.body.text);
    try {
        const result = await feedback.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function readAll(req: Request, res: Response){
    /**
     * @param req Request object
     * @param res Response object
     * 
     * @description Creates a new Feedback object and returns all the feedbacks from the database
     */
    try {
        const result = await new Feedback().getAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function readById(req: Request, res: Response){
    /**
     * @param req Request object
     * @param res Response object
     * 
     * @description Creates a new Feedback object with the given id and returns the feedback from the database
    */
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
    /**
     * @param req Request object
     * @param res Response object
     * 
     * @description Creates a new Feedback object with the given id and request data and updates the feedback in the database
     */
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
    /**
     * @param req Request object
     * @param res Response object
     * 
     * @description Creates a new Feedback object with the given id and deletes the feedback from the database
     */
    const id: number = parseInt(req.params.id);
    const feedback = new Feedback(id);
    try {
        const result = await feedback.delete();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function readReport(req: Request, res: Response){
    /**
     * @param req Request object
     * @param res Response object
     * 
     * @description Creates a new Feedback object with the given product id and returns the summary from the database
     */
    const id_prod = parseInt(req.params.id_prod);
    const feedback = new Feedback(undefined, undefined, id_prod);
    try {
        const result = await feedback.getReport();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function importData(req: Request, res: Response){
    /**
     * @param req Request object
     * @param res Response object
     * 
     * @description Creates a new Feedback object and imports the data from the given path
     */
    try {
        const result = await new Feedback().importData(req.body.path);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}