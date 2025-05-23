import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Import auth routes
import authRoutes from './auth/auth.routes';

app.use('/auth', authRoutes);

// Import certificate routes
import certificateRoutes from './certificate/certificate.routes';

// Import transaction routes
import transactionRoutes from './transaction/transaction.routes';

// Import account routes
import accountRoutes from './account/account.routes';

app.use('/certificate', certificateRoutes);
app.use('/transaction', transactionRoutes);
app.use('/account', accountRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Digital Asset Certificate Backend Service');
});

app.listen(port, () => {
  console.log(`Backend service running on port ${port}`);
});
