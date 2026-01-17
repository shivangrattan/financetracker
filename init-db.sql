-- Initialize database schema and sample transactions for the finance tracker

-- Create ENUM type for transaction type
CREATE TYPE transaction_type AS ENUM ('INCOME', 'EXPENSE');

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    amount NUMERIC(10, 2) NOT NULL,
    type transaction_type NOT NULL,
    category VARCHAR(255) NOT NULL,
    description VARCHAR(500),
    date DATE NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Insert sample transactions
INSERT INTO transactions (amount, type, category, description, date, created_at) VALUES
(5000.00, 'INCOME', 'Salary', 'Monthly salary', '2026-01-05', CURRENT_DATE),
(1200.00, 'EXPENSE', 'Food', 'Groceries', '2026-01-06', CURRENT_DATE),
(500.00, 'EXPENSE', 'Transport', 'Fuel', '2026-01-07', CURRENT_DATE),
(2000.00, 'EXPENSE', 'Utilities', 'Electricity bill', '2026-01-08', CURRENT_DATE),
(800.00, 'EXPENSE', 'Entertainment', 'Movie tickets', '2026-01-09', CURRENT_DATE),
(1500.00, 'INCOME', 'Freelance', 'Freelance project', '2026-01-10', CURRENT_DATE),
(300.00, 'EXPENSE', 'Food', 'Restaurant', '2026-01-11', CURRENT_DATE),
(600.00, 'EXPENSE', 'Transport', 'Auto fare', '2026-01-12', CURRENT_DATE),
(1000.00, 'INCOME', 'Bonus', 'Performance bonus', '2026-01-13', CURRENT_DATE),
(400.00, 'EXPENSE', 'Food', 'Coffee', '2026-01-14', CURRENT_DATE),
(2000.00, 'EXPENSE', 'Utilities', 'Internet bill', '2026-01-15', CURRENT_DATE),
(3500.00, 'INCOME', 'Salary', 'Monthly salary', '2026-01-15', CURRENT_DATE);
