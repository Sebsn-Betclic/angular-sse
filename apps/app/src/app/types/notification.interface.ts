import { NotificationType } from './notification.enum';

export interface Notification {
  id: string;
  type: NotificationType;
  user: string;
  createdDate: Date;
  content: string;
}
