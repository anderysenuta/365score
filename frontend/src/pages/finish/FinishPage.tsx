import { Box, Button, Card, Flex } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../contexts/UserContext.tsx';
import { getRandomId } from '../../utils/getRandomId.ts';
import FinishTable from './components/table';

const FinishPage = () => {
  const { setSessionId } = useSession();
  const navigate = useNavigate();

  const handleReset = () => {
    setSessionId(getRandomId());
    navigate('/questions');
  };

  return (
    <Flex
      align='center'
      justify='center'
      style={{
        minHeight: '100vh',
        padding: '1rem',
      }}
    >
      <Box style={{ width: '100%', maxWidth: '400px' }}>
        <Card size='4'>
          <FinishTable />
          <Flex justify='center'>
            <Button onClick={handleReset}>Try Again</Button>
          </Flex>
        </Card>
      </Box>
    </Flex>
  );
};

export default FinishPage;
