class User {
    constructor(data = {}) {
        this.id = null;
        this.username = null;
        this.token = null;
        this.intro = null;
        this.travelnotes = null;
        Object.assign(this, data);
    }
}
export default User;