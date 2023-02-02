import { Zakaznik } from "../models/Zakaznik";
import { Request, Response } from "express";

export async function create(req: Request, res: Response){
    /**
     * @param req Request object
     * @param res Response object
     * 
     * @description Creates a new Zakaznik object with the given request data and saves it to the database
     */
    const zakaznik = new Zakaznik(undefined, req.body.surname, req.body.first_name, req.body.phone_number, req.body.email, req.body.country);
    try {
        const result = await zakaznik.save();
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
     * @description Creates a new Zakaznik object and returns all the customers from the database
     */
    try {
        const result = await new Zakaznik().getAll();
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
     * @description Creates a new Zakaznik object with the given id and returns the customer from the database
     */
    const id: number = parseInt(req.params.id);
    const zakaznik = new Zakaznik(id);
    try {
        const result = await zakaznik.getById();
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
     * @description Creates a new Zakaznik object with the given id and request data and updates the customer in the database
     */
    const id: number = parseInt(req.params.id);
    const zakaznik = new Zakaznik(id, req.body.surname, req.body.first_name, req.body.phone_number, req.body.email, req.body.country);
    try {
        const result = await zakaznik.update();
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
     * @description Creates a new Zakaznik object with the given id and deletes the customer from the database
     */
    const id: number = parseInt(req.params.id);
    const zakaznik = new Zakaznik(id);
    try {
        const result = await zakaznik.delete();
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
     * @description Creates a new Zakaznik object and imports the data from the given path
     */
    try {
        const result = await new Zakaznik().importData(req.body.path);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}