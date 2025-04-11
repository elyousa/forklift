CREATE TABLE forklifts (
    ID VARCHAR(255) PRIMARY KEY,
    Name VARCHAR(255),
    Status VARCHAR(100),
    lat DECIMAL(5,2),
    lng DECIMAL(5,2)
);

ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'magna';
FLUSH PRIVILEGES;