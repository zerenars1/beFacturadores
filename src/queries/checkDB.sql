-- getTime
SELECT
    now();

-- extractDay
SELECT
    extract (
        day
        FROM
            date :fecha
    );