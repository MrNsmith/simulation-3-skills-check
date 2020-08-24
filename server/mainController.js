module.exports = {
  logMeIn: async (req, res) => {
    const db = req.app.get("db");
    if (req.session.user) {
      console.log(req.session.user.user_id, "logMeIn controller");
      const me = await db.get_user_id(req.session.user.user_id);
      res.status(200).send(me[0]);
    }
  },
  searchPostByTitle: (req, res) => {
    const db = req.app.get("db"),
      { title } = req.params;
    console.log(title);
    db.search_post(title)
      .then((post) => res.status(200).send(post))
      .catch((err) => res.status(500).send(err));
  },

  getUserPosts: (req, res) => {
    db = req.app.get("db");

    db.get_user_posts()
      .then((posts) => res.status(200).send(posts))
      .catch((err) => res.status(500).send(err));
  },
  myPost: (req, res) => {
    const { id } = req.params,
      db = req.app.get("db");
    db.user_check_box(id)
      .then((posts) => {
        res.status(200).send(posts);
      })
      .catch((err) => res.status(500).send(err));
  },
  addPost: (req, res) => {
    const {title, img, content, author_id} = req.body,
    db = req.app.get('db');
    db.create_post({title,img,content,author_id})
    .then(()=>res.sendStatus(200))
    .catch((err)=>console.log(err))
    

  },

  deletePost: (req, res) => {
    const { id } = req.params,
      db = req.app.get("db");
  
    db.delete_post(id)
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(500).send(err));
  },
};
