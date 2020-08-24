create table users(
   user_id serial primary key,
    username varchar(20),
    password varchar(50),
    profile_pic text
)
create table posts(
   post_id serial primary key,
    title varchar(45),
    img text, 
    content text, 
    author_id integer references users(user_id)
)
