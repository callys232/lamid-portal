import React from "react";

interface Transaction {
  id: string;
  date: string;
  projectTitle: string;
  type: string;
  amount: number;
  status: string;
  action: string;
}

interface EscrowTableProps {
  transactions: Transaction[];
}

const EscrowTable: React.FC<EscrowTableProps> = ({ transactions }) => (
  <table className="w-full text-left text-sm text-gray-300">
    <thead>
      <tr>
        <th>Date</th>
        <th>Project</th>
        <th>Type</th>
        <th>Amount</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map((tx) => (
        <tr key={tx.id}>
          <td>{tx.date}</td>
          <td>{tx.projectTitle}</td>
          <td>{tx.type}</td>
          <td>${tx.amount}</td>
          <td>{tx.status}</td>
          <td>
            <button className="text-blue-500 hover:underline">
              {tx.action}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default EscrowTable;
