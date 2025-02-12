import NotificationsApi from "@/api/hadithi/NotificationsApi";

/**
 * @name NotificationsService
 * @description Service to manage Notifications
 * @class
 * @public
 */

class NotificationsService {

  /**
   * Send Notification.
   *
   * @param {object} notification notification to send
   * @return {object} notification send status
   */
  async sendNotification(notification) {
    return NotificationsApi.sendNotification(notification);
  }
}

export default new NotificationsService();
