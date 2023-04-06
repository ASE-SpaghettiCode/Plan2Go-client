class Post {
    constructor(data = {}) {
        this.authoreId = null;
        this.content = null;
        Object.assign(this, data);
    }
}
export default Post;