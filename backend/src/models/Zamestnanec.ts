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
            await database.query("START TRANSACTION").catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });
            const [result] = await database.execute("INSERT INTO zamestnanec (surname, first_name, phone_number, email, country) VALUES (?, ?, ?, ?, ?)", [this.surname, this.first_name, this.phone_number, this.email, this.country], (err: any, result: any) => {
                if (err) {
                    console.log(err);
                    database.query("ROLLBACK");
                } else {
                    database.query("COMMIT");
                }
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async update() {
        try {
            await database.query("START TRANSACTION").catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });
            const [result] = await database.execute("UPDATE zamestnanec SET surname = ?, first_name = ?, phone_number = ?, email = ?, country = ? WHERE id = ?", [this.surname, this.first_name, this.phone_number, this.email, this.country, this.id], (err: any, result: any) => {
                if (err) {
                    console.log(err);
                    database.query("ROLLBACK");
                } else {
                    database.query("COMMIT");
                }
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async delete() {
        try {
            await database.query("START TRANSACTION").catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });
            const [result] = await database.execute("DELETE FROM zamestnanec WHERE id = ?", [this.id], (err: any, result: any) => {
                if (err) {
                    console.log(err);
                    database.query("ROLLBACK");
                } else {
                    database.query("COMMIT");
                }
            });
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

    async importData(path: string) {
        try {
            await database.query("START TRANSACTION").catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });
            const [result] = await database.query("LOAD DATA INFILE '" + path + "' INTO TABLE zamestnanec FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' (`name`, `price`, `size`)").then((result: any) => {
                database.query("COMMIT")
            }).catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}