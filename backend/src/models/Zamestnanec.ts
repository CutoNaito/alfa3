import database from "../config/DBConfig";

export class Zamestnanec {
    id: number | undefined;
    surname: string | undefined;
    first_name: string | undefined;
    phone_number: number | undefined;
    email: string | undefined;
    country: string | undefined;

    constructor(id?: number, surname?: string, first_name?: string, phone_number?: number, email?: string, country?: string) {
        if (id) {
            this.id = id;
        }
        if (surname) {
            this.surname = surname;
        }
        if (first_name) {
            this.first_name = first_name;
        }
        if (phone_number) {
            this.phone_number = phone_number;
        }
        if (email) {
            this.email = email;
        }
        if (country) {
            this.country = country;
        }
    }

    async save() {
        try {
            const [result] = await database.execute("INSERT INTO zamestnanec (surname, first_name, phone_number, email, country) VALUES (?, ?, ?, ?, ?)", [this.surname, this.first_name, this.phone_number, this.email, this.country]);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async update() {
        try {
            const [result] = await database.execute("UPDATE zamestnanec SET surname = ?, first_name = ?, phone_number = ?, email = ?, country = ? WHERE id = ?", [this.surname, this.first_name, this.phone_number, this.email, this.country, this.id]);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async delete() {
        try {
            const [result] = await database.execute("DELETE FROM zamestnanec WHERE id = ?", [this.id]);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const [result] = await database.execute("SELECT * FROM zamestnanec");
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getById() {
        try {
            const [result] = await database.execute("SELECT * FROM zamestnanec WHERE id = ?", [this.id]);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}