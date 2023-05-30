CREATE VIEW Trail_location_list AS
SELECT a.Trail_id AS Trail_id, b.Name as Location_name, b.Geo_detail as Location_geo, a.Location_order
FROM Trail_location_point a
LEFT JOIN Location b
ON a.Location_id = b.Location_id;