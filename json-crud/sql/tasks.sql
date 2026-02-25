DROP TABLE IF EXISTS `tasks`;

CREATE TABLE `tasks` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `completed` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `tasks` (`title`, `description`, `completed`) VALUES
    ('Do a backflip', 'Try to land safely.', 0),
    ('Play football', 'Evening match at 18:00.', 1),
    ('Go running', '5 km in the park.', 0),
    ('Finish CRUD assignment', 'Complete tasks with flash messages.', 0),
    ('Buy groceries', 'Milk, eggs, bread.', 1);