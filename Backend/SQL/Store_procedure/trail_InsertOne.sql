CREATE PROCEDURE trail_InsertOne @Name varchar(255), @Description varchar(255), @Length float(2), @Time int, @Level varchar(255), @User_Id int
AS
BEGIN
INSERT INTO Trail (Trail_Name,Description,Length,Time,Level)
VALUES(@Name,@Description,@Length,@Time,@Level);
INSERT INTO User_own_trail (Trail_id,User_id)
VALUES((SELECT TOP 1 Trail_id FROM Trail ORDER BY Trail_id DESC),@User_Id);
SELECT * FROM Trail;
END