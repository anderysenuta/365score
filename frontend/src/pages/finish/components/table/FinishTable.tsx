import { Table } from '@radix-ui/themes';

const FinishTable = () => {
  return (
    <Table.Root mb='4'>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Session ID</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Score</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
          <Table.Cell>5</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
          <Table.Cell>23</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
          <Table.Cell>44</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
};

export default FinishTable;
