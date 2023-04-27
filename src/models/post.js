class Post {
    constructor(data = {}) {
        this.authorId = null;
        this.content = null;
        this.sharedNoteId = null
        Object.assign(this, data);
    }
}
export default Post;