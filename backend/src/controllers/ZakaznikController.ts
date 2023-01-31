import { Zakaznik } from "../models/Zakaznik";
import { Request, Response } from "express";

export async function create(req: Request, res: Response){
    const zakaznik = new Zakaznik(undefined, req.body.surname, req.body.first_name, req.body.phone_number, req.body.email, req.body.country);
    try {
        const result = await zakaznik.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function readAll(req: Request, res: Response){
    try {
        const result = await new Zakaznik().getAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function readById(req: Request, res: Response){
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
    const id: number = parseInt(req.params.id);
    const zakaznik = new Zakaznik(id);
    try {
        const result = await zakaznik.delete();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}