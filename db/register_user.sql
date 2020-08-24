insert into users(
    username,
    password,
    profile_pic
) values (
    ${username},
    ${password},
    'https://robohash.org/nicholas.png'
)
returning user_id, username, profile_pic;