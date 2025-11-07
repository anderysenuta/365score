import { Box, Button, Card, Flex } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../contexts/UserContext.tsx';
import { getRandomId } from '../../utils/getRandomId.ts';

const WelcomePage = () => {
  const { setSessionId } = useSession();
  const navigate = useNavigate();

  const handleStart = () => {
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
          <Button onClick={handleStart} style={{ width: '100%' }} data-testid='welcome-start-btn'>
            Start
          </Button>
        </Card>
      </Box>
    </Flex>
  );
};

export default WelcomePage;
