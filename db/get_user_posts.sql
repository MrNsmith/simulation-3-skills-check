select p.title, p.content, u.username, p.img, u.user_id, p.post_id
from posts p
join users u 
on p.author_id = u.user_id;


