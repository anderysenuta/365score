import { Box, Button, Card, Flex, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../contexts/UserContext';
import { getRandomId } from '../../utils/getRandomId';

const WelcomePage = () => {
  const [name, setName] = useState('');
  const { setSessionId } = useSession();
  const navigate = useNavigate();

  const handleStart = () => {
    console.log(name);
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
          <TextField.Root placeholder='Enter your name...' onChange={(e) => setName(e.target.value)} />
          <Button onClick={handleStart} style={{ width: '100%' }} data-testid='welcome-start-btn'>
            Start
          </Button>
        </Card>
      </Box>
    </Flex>
  );
};

export default WelcomePage;
