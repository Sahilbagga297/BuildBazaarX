import { sendEmail, emailTemplates } from '../config/email.js';

class EmailQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  addToQueue(emailData) {
    this.queue.push(emailData);
    this.processQueue();
  }

  async processQueue() {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;

    while (this.queue.length > 0) {
      const emailData = this.queue.shift();
      await this.sendEmail(emailData);
    }

    this.processing = false;
  }

  async sendEmail(emailData) {
    try {
      const { type, formData, recipient, subject, html } = emailData;
      
      const result = await sendEmail(recipient, subject, html);
      
      if (result.success) {
        console.log(`${type} email sent successfully to ${recipient}`);
      } else {
        console.error(`Failed to send ${type} email to ${recipient}:`, result.error);
      }
    } catch (error) {
      console.error(`Error sending email:`, error);
    }
  }

  async queueContactEmails(formData) {
    // Queue admin notification email
    const adminEmailTemplate = emailTemplates.contactForm(formData);
    this.addToQueue({
      type: 'admin_notification',
      formData,
      recipient: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: adminEmailTemplate.subject,
      html: adminEmailTemplate.html
    });

    // Queue auto-reply email
    const autoReplyTemplate = emailTemplates.autoReply(formData);
    this.addToQueue({
      type: 'auto_reply',
      formData,
      recipient: formData.email,
      subject: autoReplyTemplate.subject,
      html: autoReplyTemplate.html
    });
  }
}

export default new EmailQueue();

