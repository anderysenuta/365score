export const insertUserQuery = `
    INSERT INTO users (name)
    VALUES (%L)
    RETURNING *
`;
