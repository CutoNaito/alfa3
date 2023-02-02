import database from "../config/DBConfig";

export class Objednavka {
    /**
     * @param id
     * @param id_zak
     * @param id_zam
     * @param id_prod
     * @param datum_vytvoreni
     * @param isPaid
     * 
     * @description Creates a new Objednavka object
    */
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
        /**
         * @description Saves the object to the database
        */
        try {
            await database.query("START TRANSACTION").catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });
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
        /**
         * @description Updates the object in the database
        */
        try {
            await database.query("START TRANSACTION").catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });
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
        /**
         * @description Deletes the object from the database
        */
        try {
            await database.query("START TRANSACTION").catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });
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
        /**
         * @description Returns all objects from the database
        */
        try {
            const [result] = await database.execute("SELECT * FROM objednavka");
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getById() {
        /**
         * @description Returns the object with the specified id
        */
        try {
            const [result] = await database.execute("SELECT * FROM objednavka WHERE id = ?", [this.id]);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getReport() {
        /**
         * @description Returns a summary of all orders per person
        */
        try {
            const [result] = await database.execute("SELECT * FROM orders_per_person WHERE id_zak = ?", [this.id_zak]);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async importData(path: string) {
        /**
         * @description Imports data from a CSV file into the database
         * @param path Path to the CSV file
        */
        try {
            await database.query("START TRANSACTION").catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });
            const [result] = await database.query("LOAD DATA INFILE '" + path + "' INTO TABLE objednavka FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' (`name`, `price`, `size`)").then((result: any) => {
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