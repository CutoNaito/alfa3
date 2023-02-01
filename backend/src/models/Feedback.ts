import database from "../config/DBConfig";

export class Feedback {
    id: number | undefined;
    id_zak: number | undefined;
    id_prod: number | undefined;
    title: string | undefined;
    text: string | undefined;

    constructor(id?: number, id_zak?: number, id_prod?: number, title?: string, text?: string) {
        if (id) {
            this.id = id;
        }
        if (id_zak) {
            this.id_zak = id_zak;
        }
        if (id_prod) {
            this.id_prod = id_prod;
        }
        if (title) {
            this.title = title;
        }
        if (text) {
            this.text = text;
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
            const [result] = await database.execute("INSERT INTO feedback (id_zak, id_prod, title, text) VALUES (?, ?, ?, ?)", [this.id_zak, this.id_prod, this.title, this.text], (err: any, result: any) => {
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
            await database.query("START TRANSACTION"), [], (err: any, result: any) => {
                if (err) {
                    console.log(err);
                    database.query("ROLLBACK");
                }
            };
            const [result] = await database.execute("UPDATE feedback SET id_zak = ?, id_prod = ?, title = ?, text = ? WHERE id = ?", [this.id_zak, this.id_prod, this.title, this.text, this.id], (err: any, result: any) => {
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
            await database.query("START TRANSACTION"), [], (err: any, result: any) => {
                if (err) {
                    console.log(err);
                    database.query("ROLLBACK");
                }
            };
            const [result] = await database.execute("DELETE FROM feedback WHERE id = ?", [this.id], (err: any, result: any) => {
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
            const [result] = await database.execute("SELECT * FROM feedback");
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getById() {
        try {
            const [result] = await database.execute("SELECT * FROM feedback WHERE id = ?", [this.id]);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getReport() {
        try {
            const [result] = await database.execute("SELECT * FROM feedback_on_product WHERE id_prod = ?", [this.id_prod]);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}