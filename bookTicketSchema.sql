-- Seats table
CREATE TABLE IF NOT EXISTS seats (
  id        SERIAL PRIMARY KEY,
  isbooked  SMALLINT NOT NULL DEFAULT 0,  -- 0 = available, 1 = booked
  name      VARCHAR(255)                   -- name of person who booked
);


-- Seed 32 empty seats (4 rows × 8 seats)
INSERT INTO seats (isbooked, name)
SELECT 0, NULL
FROM generate_series(1, 32);


