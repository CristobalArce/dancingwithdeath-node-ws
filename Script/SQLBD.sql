CREATE TABLE DANCINGDATE
(
    DANCING_ID INTEGER NOT NULL,
    SNAME VARCHAR(50) NOT NULL,
    DDATE DATE NOT NULL,
	NTIME INTEGER NOT NULL,
    SCONTACT varchar(50) NOT NULL,
    PRIMARY KEY (DANCING_ID)
);
	
CREATE SEQUENCE SEQ_DANCING_ID
START WITH 1
increment BY 1
minvalue 1
maxvalue 9999999
NO CYCLE;