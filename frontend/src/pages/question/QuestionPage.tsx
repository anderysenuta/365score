import { Box, Button, Card, Flex, Progress, RadioGroup, Text } from '@radix-ui/themes';

const QuestionPage = () => {
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
        <Card size='4' mb='4'>
          <Text weight='bold' as='div' mb='4'>
            Sample football question number 26ss?
          </Text>
          <Box mb='4'>
            <RadioGroup.Root name='example'>
              <RadioGroup.Item value='1'>Default</RadioGroup.Item>
              <RadioGroup.Item value='2'>Comfortable</RadioGroup.Item>
              <RadioGroup.Item value='3'>Compact</RadioGroup.Item>
            </RadioGroup.Root>
          </Box>
          <Flex justify='center'>
            <Button>Next</Button>
          </Flex>
        </Card>
        <Flex justify='center'>
          <Progress value={25} size='1' variant='soft' />
        </Flex>
      </Box>
    </Flex>
  );
};

export default QuestionPage;
