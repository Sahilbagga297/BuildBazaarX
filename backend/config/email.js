import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // You can change this to other services like 'outlook', 'yahoo', etc.
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS  // Your email password or app password
    }
  });
};

// Email templates
export const emailTemplates = {
  contactForm: (formData) => {
    const isProfessionalBooking = formData.bookProfessional;
    
    let emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #f59e0b, #ea580c); padding: 30px; border-radius: 10px; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 28px; text-align: center;">
            🛠️ BuildBazaarX - New Contact Form Submission
          </h1>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #1f2937; margin-top: 0; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
            Contact Information
          </h2>
          
          <div style="margin-bottom: 20px;">
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Subject:</strong> ${formData.subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 5px; margin-top: 5px;">
              ${formData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          ${isProfessionalBooking ? `
            <h2 style="color: #1f2937; margin-top: 30px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
              Professional Booking Details
            </h2>
            
            <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p><strong>Project Type:</strong> ${formData.projectType}</p>
              <p><strong>Budget Range:</strong> ${formData.budget}</p>
              <p><strong>Timeline:</strong> ${formData.timeline}</p>
              <p><strong>Urgency Level:</strong> ${formData.urgency}</p>
              <p><strong>Project Location:</strong> ${formData.location}</p>
              <p><strong>Preferred Contact Method:</strong> ${formData.preferredContactMethod}</p>
            </div>
            
            <h3 style="color: #1f2937; margin-top: 20px;">Project Description:</h3>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 5px; margin-top: 5px;">
              ${formData.projectDescription.replace(/\n/g, '<br>')}
            </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding: 20px; background: #f0f9ff; border-left: 4px solid #0ea5e9; border-radius: 5px;">
            <p style="margin: 0; color: #0c4a6e;">
              <strong>Next Steps:</strong> Please respond to this inquiry within 24 hours. 
              ${isProfessionalBooking ? 'This is a professional booking request that requires immediate attention.' : ''}
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px;">
          <p>This email was sent from the BuildBazaarX contact form.</p>
          <p>BuildBazaarX - Your Trusted Furniture & Professional Services Partner</p>
        </div>
      </div>
    `;
    
    return {
      subject: `New Contact Form Submission${isProfessionalBooking ? ' - Professional Booking Request' : ''} - ${formData.subject}`,
      html: emailContent
    };
  },

  autoReply: (formData) => {
    const isProfessionalBooking = formData.bookProfessional;
    
    return {
      subject: 'Thank you for contacting BuildBazaarX - We\'ll be in touch soon!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #f59e0b, #ea580c); padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 28px; text-align: center;">
              🛠️ BuildBazaarX
            </h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #1f2937; margin-top: 0;">Thank you for reaching out!</h2>
            
            <p>Dear ${formData.name},</p>
            
            <p>Thank you for contacting BuildBazaarX! We have received your message and will get back to you within 24 hours.</p>
            
            ${isProfessionalBooking ? `
              <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e40af; margin-top: 0;">Professional Booking Request Received</h3>
                <p>We've received your professional booking request for <strong>${formData.projectType}</strong> and will connect you with our best professionals in your area.</p>
                <p>Our team will review your project details and contact you via ${formData.preferredContactMethod} to discuss next steps.</p>
              </div>
            ` : ''}
            
            <p>In the meantime, feel free to:</p>
            <ul style="color: #4b5563;">
              <li>Browse our <a href="${process.env.FRONTEND_URL || 'https://build-bazaar-x.vercel.app'}/marketplace" style="color: #f59e0b;">marketplace</a> for furniture and home decor</li>
              <li>Check out our <a href="${process.env.FRONTEND_URL || 'https://build-bazaar-x.vercel.app'}/professionals" style="color: #f59e0b;">professional services</a></li>
              <li>Follow us on social media for updates and inspiration</li>
            </ul>
            
            <p>Best regards,<br>
            The BuildBazaarX Team</p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px;">
            <p>BuildBazaarX - Your Trusted Furniture & Professional Services Partner</p>
            <p>📧 info@buildbazaax.com | 📞 +91 98765 43210</p>
          </div>
        </div>
      `
    };
  }
};

// Function to send email
export const sendEmail = async (to, subject, html) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"BuildBazaarX" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: html
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

export default { createTransporter, emailTemplates, sendEmail };
