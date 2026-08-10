export interface FCMDeviceToken {
  token: string;
  userRole: string;
  registeredAt: string;
  permissionGranted: boolean;
}

class FCMNotificationService {
  private registeredToken: FCMDeviceToken | null = null;

  public async requestNotificationPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notifications.');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        this.registeredToken = {
          token: `fcm-token-${Math.random().toString(36).substring(2, 10)}`,
          userRole: 'student',
          registeredAt: new Date().toISOString(),
          permissionGranted: true,
        };
        return true;
      }
    } catch (err) {
      console.error('Failed to request notification permission:', err);
    }
    return false;
  }

  public getDeviceToken(): FCMDeviceToken | null {
    return this.registeredToken;
  }

  public async sendPushNotification(title: string, body: string) {
    if (!('Notification' in window)) return;
    
    if (Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;
    }

    new Notification(title, {
      body,
      icon: '/favicon.ico',
    });
  }
}

export const fcmService = new FCMNotificationService();
