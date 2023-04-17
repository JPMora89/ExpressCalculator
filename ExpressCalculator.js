const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/mean', (req, res) => {
  const nums = req.query.nums.split(',').map(Number);
  if (nums.some(isNaN)) {
    res.status(400).json({ error: `${req.query.nums} contains invalid numbers` });
    return;
  }
  if (nums.length === 0) {
    res.status(400).json({ error: 'numbers are required' });
    return;
  }
  const mean = nums.reduce((acc, cur) => acc + cur, 0) / nums.length;
  res.json({ operation: 'mean', value: mean });
});

app.get('/median', (req, res) => {
  const nums = req.query.nums.split(',').map(Number);
  if (nums.some(isNaN)) {
    res.status(400).json({ error: `${req.query.nums} contains invalid numbers` });
    return;
  }
  if (nums.length === 0) {
    res.status(400).json({ error: 'numbers are required' });
    return;
  }
  const sortedNums = nums.sort((a, b) => a - b);
  const mid = Math.floor(sortedNums.length / 2);
  const median = sortedNums.length % 2 === 0 ? (sortedNums[mid - 1] + sortedNums[mid]) / 2 : sortedNums[mid];
  res.json({ operation: 'median', value: median });
});

app.get('/mode', (req, res) => {
  const nums = req.query.nums.split(',').map(Number);
  if (nums.some(isNaN)) {
    res.status(400).json({ error: `${req.query.nums} contains invalid numbers` });
    return;
  }
  if (nums.length === 0) {
    res.status(400).json({ error: 'numbers are required' });
    return;
  }
  const numCounts = new Map();
  for (const num of nums) {
    numCounts.set(num, (numCounts.get(num) || 0) + 1);
  }
  let mode;
  let maxCount = -Infinity;
  for (const [num, count] of numCounts) {
    if (count > maxCount) {
      mode = num;
      maxCount = count;
    }
  }
  res.json({ operation: 'mode', value: mode });
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});




