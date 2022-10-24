import express from 'express'
import { abandonedCheckoutController, getAllMessages, getAllOrders, resetAllDbs } from './Scheduler/abandonedCheckout.js';

const router = express.Router();

// endpoint to receive abondened data
//create new notifying jobs
router.get('/messages', getAllMessages)
router.get('/orders', getAllOrders)
router.delete('/delete/all', resetAllDbs)
router.post('/abandoned', abandonedCheckoutController)

export default router;