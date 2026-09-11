const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const ordersPath = path.join(__dirname, '../../../data/orders.json');
const readOrders = () => JSON.parse(fs.readFileSync(ordersPath, 'utf8'));
const writeOrders = orders => fs.writeFileSync(ordersPath, `${JSON.stringify(orders, null, 2)}\n`);
const validStatuses = ['received', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'];

router.get('/', (req, res) => {
  res.json(readOrders());
});

router.post('/', (req, res) => {
  const { items, orderType = 'delivery', customer } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must contain at least one item.' });
  }

  const total = items.reduce((sum, item) => {
    const price = Number(item.price);
    const quantity = Number(item.quantity);
    if (!Number.isFinite(price) || !Number.isInteger(quantity) || quantity < 1) return NaN;
    return sum + price * quantity;
  }, 0);

  if (!Number.isFinite(total)) {
    return res.status(400).json({ error: 'Each item must include a valid price and quantity.' });
  }

  const order = {
    id: Date.now(),
    items,
    customer: customer || null,
    orderType,
    total: Number(total.toFixed(2)),
    status: 'received',
    createdAt: new Date().toISOString(),
  };

  const orders = readOrders();
  orders.unshift(order);
  writeOrders(orders);
  res.status(201).json(order);
});

router.patch('/:id/status', (req, res) => {
  const orders = readOrders();
  const order = orders.find(item => item.id === Number(req.params.id));
  const { status } = req.body;

  if (!order) return res.status(404).json({ error: 'Order not found.' });
  if (!validStatuses.includes(status)) return res.status(400).json({ error: 'Invalid order status.' });

  order.status = status;
  writeOrders(orders);
  req.app.get('io')?.emit('status_changed', { orderId: order.id, status: order.status });
  res.json(order);
});

module.exports = router;