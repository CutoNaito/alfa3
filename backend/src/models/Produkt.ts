import database from "../config/DBConfig";

export class Produkt {
    id: number | undefined;
    name: string | undefined;
    price: number | undefined;
    size: string | undefined;

    constructor(id?: number, name?: string, price?: number, size?: string) {
        if (id) {
            this.id = id;
        }
        if (name) {
            this.name = name;
        }
        if (price) {
            this.price = price;
        }
        if (size) {
            this.size = size;
        }
    }

    async save() {
        try {
            await database.query("START TRANSACTION").catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });
            const [result] = await database.execute("INSERT INTO produkt (name, price, size) VALUES (?, ?, ?)", [this.name, this.price, this.size], (err: any, result: any) => {
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

    async update() {
        try {
            await database.query("START TRANSACTION").catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });
            const [result] = await database.execute("UPDATE produkt SET name = ?, price = ?, size = ? WHERE id = ?", [this.name, this.price, this.size, this.id], (err: any, result: any) => {
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
            await database.query("START TRANSACTION").catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });
            const [result] = await database.execute("DELETE FROM produkt WHERE id = ?", [this.id], (err: any, result: any) => {
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
            const [result] = await database.execute("SELECT * FROM produkt");
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getById() {
        try {
            const [result] = await database.execute("SELECT * FROM produkt WHERE id = ?", [this.id]);
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
            const [result] = await database.query("LOAD DATA INFILE '" + path + "' INTO TABLE produkt FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' (`name`, `price`, `size`)").then((result: any) => {
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