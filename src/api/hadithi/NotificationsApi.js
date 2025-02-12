import HadithiApi from "@/api/hadithi/HadithiApi";

/**
 * @name NotificationsApi
 * @description Api Wrapper to manage Notifications
 * @class
 * @public
 */

class NotificationsApi extends HadithiApi {
  /**
   * uriSegment is api uri segment
   * @type {string}
   * @public
   */
  constructor() {
    super(`notifications/v1`);
  }

  /**
   * Send notification
   *
   * @param {object} notification  notification to send
   * @return {object} notification status
   */
  sendNotification(notification) {
    this.apiURL = this.getApiURL(this.urlPath);
    return this.postData(notification);
  }

}

export default new NotificationsApi();

