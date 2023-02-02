import { Produkt } from "../models/Produkt";
import { Request, Response } from "express";

export async function create(req: Request, res: Response){
    /**
     * @param req Request object
     * @param res Response object
     * 
     * @description Creates a new Produkt object with the given request data and saves it to the database
     */
    const produkt = new Produkt(undefined, req.body.name, req.body.price, req.body.size);
    try {
        const result = await produkt.save();
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
     * @description Creates a new Produkt object and returns all the products from the database
     */
    try {
        const result = await new Produkt().getAll();
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
     * @description Creates a new Produkt object with the given id and returns the product from the database
     */
    const id: number = parseInt(req.params.id);
    const produkt = new Produkt(id);
    try {
        const result = await produkt.getById();
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
     * @description Creates a new Produkt object with the given id and request data and updates the product in the database
     */
    const id: number = parseInt(req.params.id);
    const produkt = new Produkt(id, req.body.name, req.body.price, req.body.size);
    try {
        const result = await produkt.update();
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
     * @description Creates a new Produkt object with the given id and deletes the product from the database
     */
    const id: number = parseInt(req.params.id);
    const produkt = new Produkt(id);
    try {
        const result = await produkt.delete();
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
     * @description Creates a new Produkt object and imports the data from the given path
     */
    try {
        const result = await new Produkt().importData(req.body.path);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

