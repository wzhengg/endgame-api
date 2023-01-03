import * as dotenv from 'dotenv';
dotenv.config();
require('express-async-errors');

import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
