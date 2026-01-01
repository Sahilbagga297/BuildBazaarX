import { sendEmail, emailTemplates } from '../config/email.js';
import emailQueue from '../utils/emailQueue.js';

// Send contact form email
export const sendContactForm = async (req, res) => {
  try {
    const formData = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'subject', 'message'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // If professional booking is selected, validate additional fields
    if (formData.bookProfessional) {
      const professionalFields = ['projectType', 'budget', 'timeline', 'location', 'projectDescription'];
      const missingProfessionalFields = professionalFields.filter(field => !formData[field]);
      
      if (missingProfessionalFields.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Missing required professional booking fields: ${missingProfessionalFields.join(', ')}`
        });
      }
    }

    // Queue emails for background processing
    emailQueue.queueContactEmails(formData);

    // Log the contact form submission
    console.log('Contact form submitted:', {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      isProfessionalBooking: formData.bookProfessional,
      timestamp: new Date().toISOString()
    });

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully. We will get back to you within 24 hours.',
      data: {
        submittedAt: new Date().toISOString(),
        emailsQueued: true
      }
    });

  } catch (error) {
    console.error('Error in sendContactForm:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
};

// Get contact form statistics (for admin dashboard)
export const getContactStats = async (req, res) => {
  try {
    // This would typically fetch from a database
    // For now, return mock data
    res.status(200).json({
      success: true,
      data: {
        totalSubmissions: 0,
        professionalBookings: 0,
        generalInquiries: 0,
        lastSubmission: null
      }
    });
  } catch (error) {
    console.error('Error in getContactStats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact statistics'
    });
  }
};
