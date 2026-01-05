import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Pool } from 'pg';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database configuration
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'football_quiz',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

type Question = {
  question: string;
  options: Array<{
    value: string;
    isCorrect: boolean;
  }>;
};

async function seedQuestions() {
  const client = await pool.connect();

  try {
    // Read JSON file
    const filePath = resolve(__dirname, '../../football_quiz.json');
    const fileContent = readFileSync(filePath, 'utf-8');
    const questions: Question[] = JSON.parse(fileContent);

    console.log(`Found ${questions.length} questions to import`);

    // Begin transaction
    await client.query('BEGIN');

    let importedQuestions = 0;
    let importedOptions = 0;

    for (const questionData of questions) {
      // Insert question
      const questionResult = await client.query('INSERT INTO questions (question_text) VALUES ($1) RETURNING id', [questionData.question]);

      const questionId = questionResult.rows[0].id;
      importedQuestions++;

      // Insert options
      for (const option of questionData.options) {
        await client.query('INSERT INTO questions_options (question_id, option_value, is_correct) VALUES ($1, $2, $3)', [
          questionId,
          option.value,
          option.isCorrect,
        ]);
        importedOptions++;
      }
    }

    // Commit transaction
    await client.query('COMMIT');

    console.log('✓ Successfully imported:');
    console.log(`  - ${importedQuestions} questions`);
    console.log(`  - ${importedOptions} options`);
  } catch (error) {
    // Rollback on error
    await client.query('ROLLBACK');
    console.error('✗ Error importing questions:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run seed
seedQuestions()
  .then(() => {
    console.log('✓ Seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('✗ Seed failed:', error);
    process.exit(1);
  });
