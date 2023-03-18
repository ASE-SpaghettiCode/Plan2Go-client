class User {
    constructor(data = {}) {
        this.userId = null;
        this.username = null;
        this.token = null;
        this.password = null;
        // this.intro = null;
        // this.travelnotes = null;
        Object.assign(this, data);
    }
}
export default User;