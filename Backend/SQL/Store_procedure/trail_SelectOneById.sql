CREATE PROCEDURE trail_SelectOneById @Trail_id int, @User_id int
AS
BEGIN
INSERT INTO User_trail_view_record(User_id, Trail_id)
VALUES(@User_id,@Trail_id);
SELECT * FROM Trail 
WHERE Trail_id = @Trail_id
END