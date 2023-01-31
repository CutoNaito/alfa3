import { Objednavka } from "../models/Objednavka";
import { Request, Response } from "express";

export async function create(req: Request, res: Response){
    const objednavka = new Objednavka(undefined, req.body.id_zak, req.body.id_zam, req.body.id_prod, req.body.datum_vytvoreni, req.body.isPaid);
    try {
        const result = await objednavka.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function readAll(req: Request, res: Response){
    try {
        const result = await new Objednavka().getAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function readById(req: Request, res: Response){
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
    const id: number = parseInt(req.params.id);
    const objednavka = new Objednavka(id);
    try {
        const result = await objednavka.delete();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}