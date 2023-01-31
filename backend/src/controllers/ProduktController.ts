import { Produkt } from "../models/Produkt";
import { Request, Response } from "express";

export async function create(req: Request, res: Response){
    const produkt = new Produkt(undefined, req.body.name, req.body.price, req.body.size);
    try {
        const result = await produkt.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function readAll(req: Request, res: Response){
    try {
        const result = await new Produkt().getAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function readById(req: Request, res: Response){
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
    const id: number = parseInt(req.params.id);
    const produkt = new Produkt(id);
    try {
        const result = await produkt.delete();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

