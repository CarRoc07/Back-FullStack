import express from 'express';
import cors from 'cors';
import authRouter from '../routes/auth.router';
import productsRouter from '../routes/products.route';
import ordersRouter from '../routes/orders.router';
import categoryRouter from '../routes/category.router';

const app =  express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());

app.use('/api', authRouter)
app.use('/api', productsRouter)
app.use('/api', ordersRouter)
app.use('/api', categoryRouter)

app.listen(3000, () => {
    console.log('Server is running');
})