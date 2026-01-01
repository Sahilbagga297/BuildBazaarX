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

    // 🟢 DIRECT EMAIL SENDING (instead of queue)
    const template = emailTemplates.contactForm(formData);

    try {
      const info = await sendEmail(template, formData.email);
      console.log("EMAIL SENT:", info.accepted || info.response);
    } catch (emailError) {
      console.error("EMAIL SENDING FAILED:", emailError);
      return res.status(500).json({
        success: false,
        message: "Contact form submitted but email sending failed.",
      });
    }

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
      message: 'Contact form submitted successfully. Check your email — we will get back to you within 24 hours.',
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
