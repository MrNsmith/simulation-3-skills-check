select * from posts p
where p.title like '%' || $1 || '%';