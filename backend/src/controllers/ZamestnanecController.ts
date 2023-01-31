import { Zamestnanec } from "../models/Zamestnanec";
import { Request, Response } from "express";

export async function create(req: Request, res: Response){
    const zamestnanec = new Zamestnanec(undefined, req.body.surname, req.body.first_name, req.body.phone_number, req.body.email, req.body.country);
    try {
        const result = await zamestnanec.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function readAll(req: Request, res: Response){
    try {
        const result = await new Zamestnanec().getAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function readById(req: Request, res: Response){
    const id: number = parseInt(req.params.id);
    const zamestnanec = new Zamestnanec(id);
    try {
        const result = await zamestnanec.getById();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function update(req: Request, res: Response){
    const id: number = parseInt(req.params.id);
    const zamestnanec = new Zamestnanec(id, req.body.surname, req.body.first_name, req.body.phone_number, req.body.email, req.body.country);
    try {
        const result = await zamestnanec.update();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function remove(req: Request, res: Response){
    const id: number = parseInt(req.params.id);
    const zamestnanec = new Zamestnanec(id);
    try {
        const result = await zamestnanec.delete();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}
