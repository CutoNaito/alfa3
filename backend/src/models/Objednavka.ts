import database from "../config/DBConfig";

export class Objednavka {
    id: number | undefined;
    id_zak: number | undefined;
    id_zam: number | undefined;
    id_prod: number | undefined;
    datum_vytvoreni: Date | undefined;
    isPaid: boolean | undefined;

    constructor(id?: number, id_zak?: number, id_zam?: number, id_prod?: number, datum_vytvoreni?: Date, isPaid?: boolean) {
        if (id) {
            this.id = id;
        }
        if (id_zak) {
            this.id_zak = id_zak;
        }
        if (id_zam) {
            this.id_zam = id_zam;
        }
        if (id_prod) {
            this.id_prod = id_prod;
        }
        if (datum_vytvoreni) {
            this.datum_vytvoreni = datum_vytvoreni;
        }
        if (isPaid) {
            this.isPaid = isPaid;
        }
    }

    async save() {
        try {
            await database.query("START TRANSACTION"), [], (err: any, result: any) => {
                if (err) {
                    console.log(err);
                    database.query("ROLLBACK");
                }
            };
            const [result] = await database.execute("INSERT INTO objednavka (id_zak, id_zam, id_prod, datum_vytvoreni, isPaid) VALUES (?, ?, ?, ?, ?)", [this.id_zak, this.id_zam, this.id_prod, this.datum_vytvoreni, this.isPaid], (err: any, result: any) => {
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
            await database.execute("START TRANSACTION"), [], (err: any, result: any) => {
                if (err) {
                    console.log(err);
                    database.execute("ROLLBACK");
                }
            };
            const [result] = await database.execute("UPDATE objednavka SET id_zak = ?, id_zam = ?, id_prod = ?, datum_vytvoreni = ?, isPaid = ? WHERE id = ?", [this.id_zak, this.id_zam, this.id_prod, this.datum_vytvoreni, this.isPaid, this.id], (err: any, result: any) => {
                if (err) {
                    console.log(err);
                    database.execute("ROLLBACK");
                } else {
                    database.execute("COMMIT");
                }
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async delete() {
        try {
            await database.execute("START TRANSACTION"), [], (err: any, result: any) => {
                if (err) {
                    console.log(err);
                    database.execute("ROLLBACK");
                }
            };
            const [result] = await database.execute("DELETE FROM objednavka WHERE id = ?", [this.id], (err: any, result: any) => {
                if (err) {
                    console.log(err);
                    database.execute("ROLLBACK");
                } else {
                    database.execute("COMMIT");
                }
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const [result] = await database.execute("SELECT * FROM objednavka");
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getById() {
        try {
            const [result] = await database.execute("SELECT * FROM objednavka WHERE id = ?", [this.id]);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getReport() {
        try {
            const [result] = await database.execute("SELECT * FROM orders_per_person WHERE id_zak = ?", [this.id_zak]);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async importData(path: string) {
        try {
            const [result] = await database.execute("LOAD DATA INFILE ? INTO TABLE objednavka FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n'", [path]);
            return result;
        } catch (error) {
            console.log(error);
        }
    } 
}