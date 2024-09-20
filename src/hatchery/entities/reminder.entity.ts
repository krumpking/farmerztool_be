export class Reminder {
    collectionName: string;
    reminderTitle: string;
    reminderCategory: string;
    reminderNotes?: string;
    reminderDate: Date;
    reminderFrequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
    adminId: string;
    reminderTime: string;
    isReminderValid: boolean;
    reminder: string;
}