CREATE PROCEDURE trail_DeleteOneById @Trail_id int
AS
BEGIN
DELETE FROM User_own_trail
WHERE Trail_id = @Trail_id;
DELETE FROM User_trail_view_record
WHERE Trail_id = @Trail_id;
DELETE FROM Trail 
WHERE Trail_id = @Trail_id;
SELECT * FROM Trail;
END
