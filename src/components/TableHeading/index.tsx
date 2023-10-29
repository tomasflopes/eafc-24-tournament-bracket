const TableHeading: React.FC = () => {
  return (
    <thead className="text-xs text-white uppercase bg-primary">
      <tr>
        <th scope="col" className="text-xs px-4 py-3">
          Jogador 1
        </th>
        <th scope="col" className="text-xs px-4 py-3">
          Jogador 2
        </th>
        <th scope="col" className="text-xs px-4 py-3">
          Score
        </th>
        <th scope="col" className="text-xs px-4 py-3">
          Score
        </th>
        <th scope="col" className="text-xs px-4 py-3">
          Data
        </th>
      </tr>
    </thead>
  );
};

export default TableHeading;
