select p.title, p.content, u.username, p.img, u.user_id
from posts p
join users u 
on p.author_id = u.user_id
where u.user_id = $1
