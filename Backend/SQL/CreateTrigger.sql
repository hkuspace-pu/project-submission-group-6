create trigger trail_level 
on trail
after update 
as
update trail
set trail.level = 'Hard' where trail.Length > 10;