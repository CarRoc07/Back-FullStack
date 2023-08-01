import express from 'express';
import cors from 'cors';
import authRouter from '../routes/auth.router';
import productsRouter from '../routes/products.route';
import ordersRouter from '../routes/orders.router';
import categoryRouter from '../routes/category.router';
import { PORT } from '../config';

const app =  express();

app.use(cors())
app.use(express.json());

app.use('/api', authRouter)
app.use('/api', productsRouter)
app.use('/api', ordersRouter)
app.use('/api', categoryRouter)

app.listen(PORT, () => {
    console.log('Server is running');
})