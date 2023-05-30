CREATE PROCEDURE trail_UpdateOneById @Trail_id int, @Name varchar(255), @Description varchar(255), @Length float(2), @Time int, @Level varchar(255)
AS
BEGIN
UPDATE Trail
SET Trail_name = IsNull(@Name, Trail_name),
    Description = IsNull(@Description, Description),
    Length = IsNull(@Length, length),
    Time = IsNull(@Time, Time),
    Level = IsNull(@level, Level)
WHERE Trail_id = @Trail_id;
SELECT * FROM Trail WHERE Trail_id = @Trail_id;
END