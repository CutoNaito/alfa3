import { Objednavka } from "../models/Objednavka";
import { Request, Response } from "express";

export async function create(req: Request, res: Response){
    /**
     * @param req Request object
     * @param res Response object
     * 
     * @description Creates a new Objednavka object with the given request data and saves it to the database
     */
    const objednavka = new Objednavka(undefined, req.body.id_zak, req.body.id_zam, req.body.id_prod, req.body.datum_vytvoreni, req.body.isPaid);
    try {
        const result = await objednavka.save();
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
     * @description Creates a new Objednavka object and returns all the orders from the database
     */
    try {
        const result = await new Objednavka().getAll();
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
     * @description Creates a new Objednavka object with the given id and returns the order from the database
     */
    const id: number = parseInt(req.params.id);
    const objednavka = new Objednavka(id);
    try {
        const result = await objednavka.getById();
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
     * @description Creates a new Objednavka object with the given id and request data and updates the order in the database
     */
    const id: number = parseInt(req.params.id);
    const objednavka = new Objednavka(id, req.body.id_zak, req.body.id_zam, req.body.id_prod, req.body.datum_vytvoreni, req.body.isPaid);
    try {
        const result = await objednavka.update();
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
     * @description Creates a new Objednavka object with the given id and deletes the order from the database
     */
    const id: number = parseInt(req.params.id);
    const objednavka = new Objednavka(id);
    try {
        const result = await objednavka.delete();
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
     * @description Creates a new Objednavka object with the given id and returns the summary from the database
     */
    const id_zak = parseInt(req.params.id_zak);
    const objednavka = new Objednavka(undefined, id_zak);
    try {
        const result = await objednavka.getReport();
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
     * @description Creates a new Objednavka object and imports the data from the given path
     */
    try {
        const result = await new Objednavka().importData(req.body.path);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}