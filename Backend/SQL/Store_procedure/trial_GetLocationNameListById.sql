CREATE PROCEDURE trial_GetLocationNameListById @Trail_id int
AS
BEGIN
SELECT * 
FROM Trail_location_list
WHERE Trail_id = @Trail_id
END