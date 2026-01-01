import { sendEmail, emailTemplates } from '../config/email.js';

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

    // Validate professional booking fields if selected
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

    // ================================
    // 🔹 DIRECT EMAIL SENDING (IMPORTANT)
    // ================================
    const template = emailTemplates.contactForm(formData);

    try {
      const info = await sendEmail(template, process.env.EMAIL_USER);
      console.log("EMAIL SENT SUCCESSFULLY:", {
        accepted: info.accepted,
        response: info.response,
        timestamp: new Date().toISOString()
      });
    } catch (emailError) {
      console.error("EMAIL FAILED TO SEND:", emailError);
      return res.status(500).json({
        success: false,
        message: "Contact form submitted, but email sending failed. Please try again later."
      });
    }

    // Log submission for backend debugging
    console.log("Contact form submitted:", {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      bookProfessional: formData.bookProfessional || false,
      timestamp: new Date().toISOString()
    });

    // Send API response
    res.status(200).json({
      success: true,
      message: "Contact form submitted successfully! We will get back to you within 24 hours.",
      data: {
        submittedAt: new Date().toISOString(),
        emailDelivered: true
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

// ================================
// 📊 GET CONTACT STATS (Kept for admin panel compatibility)
// ================================
export const getContactStats = async (req, res) => {
  try {
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

// Final combined export
export default {
  sendContactForm,
  getContactStats
};
