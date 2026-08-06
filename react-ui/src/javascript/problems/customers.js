const input_transactions = [
  { id: 1, customer: "Alice", amount: 120 },
  { id: 2, customer: "Bob", amount: 50 },
  { id: 3, customer: "Alice", amount: 80 },
  { id: 4, customer: "Charlie", amount: 150 },
  { id: 5, customer: "Bob", amount: 75 },
  { id: 6, customer: "Alice", amount: 100 },
];

/**
 * Expected output
 * 
 * [
  {
    customer: "Alice",
    totalAmount: 300,
    transactionCount: 3,
    averageAmount: 100
  },
  {
    customer: "Bob",
    totalAmount: 125,
    transactionCount: 2,
    averageAmount: 62.5
  },
  {
    customer: "Charlie",
    totalAmount: 150,
    transactionCount: 1,
    averageAmount: 150
  }
]

 */

function summarizeTransactions(transactions) {
  const map = new Map();

  for (const txn of transactions) {
    if (!map.has(txn.customer)) {
      map.set(txn.customer, {
        customer: txn.customer,
        totalAmount: 0,
        transactionCount: 0,
      });
    }

    const customer = map.get(txn.customer);
    customer.totalAmount += txn.amount;
    customer.transactionCount++;
  }

  const result = [...map.values()].map((c) => ({
    ...c,
    averageAmount: c.totalAmount / c.transactionCount,
  }));

  return result;
}

const result = summarizeTransactions(input_transactions);
console.log(result);
