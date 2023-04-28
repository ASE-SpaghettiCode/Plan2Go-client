class Notification {
    constructor(data = {}) {
        this.actorId = null;
        this.context = null;
        this.method = null;
        this.notificationId = null;
        this.ownId = null;
        this.read = null;
        this.targetId = null;
        this.targetType = null;
        Object.assign(this, data);
    }
}
export default Notification;