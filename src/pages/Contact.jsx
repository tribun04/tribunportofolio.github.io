import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUser, FaTag } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  const formRef = useRef(null);
  const contactInfoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form animations
      gsap.from(".form-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".form-field", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      gsap.from(".contact-info-item", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

    }, formRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    setIsSuccess(null);

    if (formData.honeypot) {
      setSubmitMessage('Spam detected. Please try again.');
      setIsSuccess(false);
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you for your message! I will get back to you soon.');
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: "Location",
      content: "kosova, Kaqanik",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Phone",
      content: "+383 45 488-938",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email",
      content: "tribunbajra4@gmail.com",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#0f0f10] text-white pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -left-20 top-1/4 w-72 h-72 bg-[#bd34fe] rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -right-20 top-1/2 w-72 h-72 bg-[#7c3aed] rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 mb-6">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#bd34fe] to-[#ff6cde] animate-pulse"></div>
            <span className="text-sm font-medium">Get In Touch</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bd34fe] to-[#ff6cde]">Work Together</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your project and create something amazing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div ref={contactInfoRef} className="space-y-8">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="contact-info-item flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-[#bd34fe] transition-all duration-300 group">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-gray-400">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Response Time</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Initial Response</span>
                  <span className="text-[#bd34fe] font-semibold">Within 24 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Project Discussion</span>
                  <span className="text-[#bd34fe] font-semibold">1-2 business days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Availability</span>
                  <span className="text-green-400 font-semibold">Open for Projects</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <div className="form-header mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Send a Message</h2>
              <p className="text-gray-400">Fill out the form below and I'll get back to you ASAP</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field */}
              <div className="sr-only">
                <input
                  type="text"
                  id="honeypot-field"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="form-field">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl outline-none
                                text-white placeholder-gray-500 text-base
                                focus:border-[#bd34fe] focus:ring-1 focus:ring-[#bd34fe] transition-all duration-300"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="form-field">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl outline-none
                                text-white placeholder-gray-500 text-base
                                focus:border-[#bd34fe] focus:ring-1 focus:ring-[#bd34fe] transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>

              {/* Subject Field */}
              <div className="form-field">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                  Subject
                </label>
                <div className="relative">
                  <FaTag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl outline-none
                              text-white placeholder-gray-500 text-base
                              focus:border-[#bd34fe] focus:ring-1 focus:ring-[#bd34fe] transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="form-field">
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl outline-none
                            text-white placeholder-gray-500 text-base resize-none
                            focus:border-[#bd34fe] focus:ring-1 focus:ring-[#bd34fe] transition-all duration-300"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#bd34fe] to-[#7c3aed] rounded-xl font-semibold text-white 
                          flex items-center justify-center gap-3 group hover:shadow-2xl hover:shadow-[#bd34fe]/40 
                          transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </>
                )}
              </button>

              {/* Submission Feedback */}
              {submitMessage && (
                <div className={`p-4 rounded-xl text-center ${
                  isSuccess ? 'bg-green-500/20 border border-green-500 text-green-400' : 'bg-red-500/20 border border-red-500 text-red-400'
                }`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-20">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-12 border border-gray-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bd34fe] to-[#ff6cde]">Project</span>?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's collaborate to create something extraordinary. I'm excited to hear about your ideas and help bring them to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <a href="mailto:tribunbajra4@gmail.com">
              <button className="px-8 py-4 bg-gradient-to-r from-[#bd34fe] to-[#7c3aed] rounded-xl font-semibold text-white hover:shadow-2xl hover:shadow-[#bd34fe]/40 transition-all duration-300 hover:-translate-y-1">
                Schedule a Call
              </button>
            </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;