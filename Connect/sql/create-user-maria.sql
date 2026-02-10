--
-- Create a user with full grants.
--
DROP USER IF EXISTS 'maria'@'localhost';
DROP USER IF EXISTS 'maria'@'%';

CREATE USER 'maria'@'localhost'
IDENTIFIED BY 'M@ria'
;

GRANT ALL PRIVILEGES
ON *.* TO 'maria'@'localhost'
WITH GRANT OPTION
;

CREATE USER 'maria'@'%'
IDENTIFIED BY 'M@ria'
;

GRANT ALL PRIVILEGES
ON *.* TO 'maria'@'%'
WITH GRANT OPTION
;

FLUSH PRIVILEGES;

SELECT USER();

SELECT
    User,
    Host,
    Grant_priv,
    Super_priv,
    Trigger_priv,
    plugin
FROM mysql.user
ORDER BY User
;