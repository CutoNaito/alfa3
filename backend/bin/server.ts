import express from 'express';
import "dotenv/config";

import ZakaznikRoutes from '../src/routes/ZakaznikRoutes';
import ObjednavkaRoutes from '../src/routes/ObjednavkaRoutes';
import ProduktRoutes from '../src/routes/ProduktRoutes';
import FeedbackRoutes from '../src/routes/FeedbackRoutes';
import ZamestnanecRoutes from '../src/routes/ZamestnanecRoutes';

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/zakaznik', ZakaznikRoutes);
app.use('/objednavka', ObjednavkaRoutes);
app.use('/produkt', ProduktRoutes);
app.use('/feedback', FeedbackRoutes);
app.use('/zamestnanec', ZamestnanecRoutes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    }
);