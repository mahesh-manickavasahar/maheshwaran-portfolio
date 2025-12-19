import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaAndroid, FaJava, FaDownload, FaMobile, FaLaptopCode, FaArrowUp, FaGraduationCap, FaCode, FaTools, FaWhatsapp } from 'react-icons/fa';
import { SiKotlin, SiFirebase, SiJetpackcompose, SiAndroidstudio } from 'react-icons/si';
import { MdPhoneAndroid } from 'react-icons/md';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { FaEye } from "react-icons/fa";

const App = () => {
  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef();

  // Add email constant
  const EMAIL = "mahesh.manickavasahar@gmail.com";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleViewProjects = () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  };

  // Update the download handler to use the correct file
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Mahesh_Android_Developer.pdf';
    link.download = 'Mahesh_Android_Developer.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add a handler to view the resume in a new tab
  const handleViewResume = () => {
    window.open('/Mahesh_Android_Developer.pdf', '_blank');
  };

  // Optimized animation variants for better performance
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Optimized hover animations
  const enhancedHoverAnimation = {
    whileHover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    whileTap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const cardHoverAnimation = {
    whileHover: {
      scale: 1.02,
      boxShadow: "0 0 20px rgba(0, 122, 255, 0.15)",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  // Optimized continuous animations
  const floatingAnimation = {
    animate: {
      y: [0, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const rotateAnimation = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

  try {
  const result = await emailjs.sendForm(
    import.meta.env.VITE_EMAIL_SERVICE_ID, 
    import.meta.env.VITE_EMAIL_TEMPLATE_ID,
    formRef.current,
   import.meta.env.VITE_EMAIL_PUBLIC_KEYcls
  );
  
  console.log('SUCCESS!', result.status, result.text);
  setSubmitStatus('success');
  setFormData({ name: '', email: '', message: '' });
  
} catch (error) {
  setSubmitStatus('error');
} finally {
  setIsSubmitting(false);
}}

  // Update mobile styles
  const mobileStyles = {
    section: "py-12 md:py-20",
    heading: "text-3xl md:text-4xl",
    container: "px-4 md:px-6",
    form: "w-full max-w-[90%] md:max-w-2xl mx-auto bg-dark/80 p-6 rounded-xl border border-gray-800", // Added background and padding
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark to-gray-900 text-light">
      {/* Navigation */}
      <motion.nav 
        className="fixed w-full bg-dark/90 backdrop-blur-md z-50 border-b border-gray-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Name */}
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <motion.div
                animate={floatingAnimation.animate}
              >
              </motion.div>
            <motion.div 
            className="text-xl md:text-2xl font-bold text-primary"
            animate={floatingAnimation.animate}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-1">
              <SiKotlin className="text-primary text-xl md:text-2xl" />
              <span>Maheshwaran</span>
            </div>
          </motion.div>

            </motion.a>

            {/* Desktop Navigation */}
            <motion.div 
              className="hidden md:flex items-center space-x-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {['About', 'Skills', 'Projects', 'Education', 'Experience', 'Contact'].map((item) => (
                <motion.a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-primary transition-colors relative text-sm"
                  variants={letterAnimation}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item === 'Education' ? 'Education & Certifications' : item}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative w-8 h-8 flex items-center justify-center"
              whileHover={{ 
                scale: 1.1,
                rotate: 90,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <motion.div 
                className="relative w-5 h-4"
                animate={{
                  rotate: isMenuOpen ? 180 : 0
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}
              >
                <motion.span 
                  className={`absolute top-0 left-0 w-5 h-0.5 bg-primary transform transition-all duration-300 origin-center ${
                    isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                  animate={{
                    backgroundColor: isMenuOpen ? "#a4c639" : "#a4c639"
                  }}
                  transition={{
                    duration: 0.3
                  }}
                />
                <motion.span 
                  className={`absolute top-1/2 left-0 w-5 h-0.5 bg-primary transform -translate-y-1/2 transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0 scale-x-0' : ''
                  }`}
                  animate={{
                    backgroundColor: isMenuOpen ? "#a4c639" : "#a4c639"
                  }}
                  transition={{
                    duration: 0.3
                  }}
                />
                <motion.span 
                  className={`absolute bottom-0 left-0 w-5 h-0.5 bg-primary transform transition-all duration-300 origin-center ${
                    isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                  animate={{
                    backgroundColor: isMenuOpen ? "#a4c639" : "#a4c639"
                  }}
                  transition={{
                    duration: 0.3
                  }}
                />
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="md:hidden absolute right-4 top-16 w-48 bg-dark/95 rounded-lg shadow-xl overflow-hidden border border-gray-800"
              >
                <div className="flex flex-col py-2">
                  {['About', 'Skills', 'Projects', 'Education', 'Experience', 'Contact'].map((item, index) => (
                    <React.Fragment key={item}>
                      <motion.a
                        href={`#${item.toLowerCase()}`}
                        className="px-4 py-2.5 text-gray-300 hover:text-primary hover:bg-primary/10 transition-colors text-sm"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item === 'Education' ? 'Education & Certifications' : item}
                      </motion.a>
                      {index < ['About', 'Skills', 'Projects', 'Education', 'Experience', 'Contact'].length - 1 && (
                        <div className="h-px bg-gray-800 mx-4" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-dark/80 backdrop-blur-md border border-primary/30 text-primary p-4 rounded-full shadow-lg z-50 transition-all duration-300 hover:border-primary hover:bg-primary/10"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 20px rgba(0, 122, 255, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaArrowUp className="text-xl" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section 
        className="h-screen flex items-center justify-center relative overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Background gradient animation */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating icons */}
       <motion.div
          className="absolute top-[10%] left-[5%] md:top-1/4 md:left-1/4"
          animate={floatingAnimation.animate}
        >
          <div className="flex items-center space-x-4">
            <SiKotlin className="text-3xl md:text-5xl text-primary/70" />
            <FaCode className="text-3xl md:text-5xl text-primary/70" />
            <SiJetpackcompose className="text-3xl md:text-5xl text-primary/70" />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-[10%] right-[5%] md:bottom-1/4 md:right-1/4"
          animate={floatingAnimation.animate}
          transition={{ delay: 1 }}
        >
          <SiAndroidstudio className="text-3xl md:text-5xl text-primary/70" />
        </motion.div>
        <motion.div
          className="absolute top-[20%] right-[1%] md:top-1/3 md:right-1/4"
          animate={floatingAnimation.animate}
          transition={{ delay: 2 }}
        >
          <MdPhoneAndroid className="text-5xl md:text-7xl mx-auto" style={{ color: '#a4c639' }} />
        </motion.div>

        {/* Mouse follower - Optimized for mobile */}
        <motion.div
          className="fixed pointer-events-none hidden md:block"
          style={{
            width: '200px',
            height: '200px',
            background: "radial-gradient(circle, rgba(61, 220, 132, 0.15) 0%, rgba(61, 220, 132, 0) 70%)",
            position: 'fixed',
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div 
          style={{ opacity, scale }}
          className="text-center z-10 px-4 md:px-0 relative"
          variants={staggerContainer}
        >
          <motion.div
            variants={scaleIn}
            className="mb-6 md:mb-8"
          >
            <motion.div
              animate={floatingAnimation.animate}
            >
              <FaAndroid className="text-6xl md:text-8xl text-primary mx-auto opacity-90" />
            </motion.div>
          </motion.div>

          <motion.h1 
            className="text-3xl md:text-6xl font-bold mb-4 md:mb-6"
            variants={fadeInUp}
          >
            Android Developer
            <motion.span 
              className="block text-primary mt-2"
              variants={fadeInUp}
            >
              Maheshwaran
            </motion.span>
          </motion.h1>

          <motion.p 
            className="text-base md:text-xl mb-6 md:mb-8 text-gray-300"
            variants={fadeInUp}
          >
           Android Developer (2 Years) | Proficient in Kotlin, Jetpack Compose, and XML | Experienced in Android UI Development and SDK Integration
          </motion.p>

          {/* Skill tags */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-6 md:mb-8"
            variants={staggerContainer}
          >
            {['Kotlin', 'XML Layouts', 'Jetpack Compose', 'Android SDK'].map((skill, index) => (
              <motion.span
                key={skill}
                className="px-3 py-1.5 bg-primary/10 rounded-full text-primary text-sm"
                variants={letterAnimation}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(61, 220, 132, 0.2)"
                }}
                transition={{ delay: 0.1 * index }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>

          <motion.div 
            className="flex flex-col md:flex-row justify-center gap-3 md:gap-4"
            variants={staggerContainer}
          >
            <motion.button
              {...enhancedHoverAnimation}
              className="bg-transparent border-2 border-primary text-primary hover:bg-primary/10 px-6 py-2.5 md:px-8 md:py-3 rounded-full text-base md:text-lg font-semibold transition-colors flex items-center justify-center gap-2"
              onClick={handleViewProjects}
            >
              <motion.div
                animate={{
                  y: [0, 3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaLaptopCode />
              </motion.div>
              View Projects
            </motion.button>
            <motion.button
              {...enhancedHoverAnimation}
              className="bg-transparent border-2 border-primary text-primary hover:bg-primary/10 px-6 py-2.5 md:px-8 md:py-3 rounded-full text-base md:text-lg font-semibold transition-colors flex items-center justify-center gap-2"
              onClick={handleDownloadResume}
            >
              <motion.div
                animate={{
                  y: [0, 3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaDownload />
              </motion.div>
              Download Resume
            </motion.button>
           <motion.button
              {...enhancedHoverAnimation}
              className="bg-transparent border-2 border-primary text-primary hover:bg-primary/10 px-6 py-2.5 md:px-8 md:py-3 rounded-full text-base md:text-lg font-semibold transition-colors flex items-center justify-center gap-2"
              onClick={handleViewResume}
            >
              <motion.div
                animate={{
                  y: [0, 3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FaEye />
              </motion.div>
              View Resume
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Section with enhanced scroll animation */}
      <motion.section 
        id="about" 
        className={`${mobileStyles.section} bg-dark/50`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className={`container mx-auto ${mobileStyles.container}`}>
          <motion.div
            ref={ref}
            className="max-w-4xl mx-auto"
            variants={staggerContainer}
          >
            <motion.h2 
              className={`${mobileStyles.heading} font-bold mb-8 text-center`}
              variants={letterAnimation}
            >
              About Me
            </motion.h2>
            <motion.div 
              className="space-y-6 text-lg text-gray-300 leading-relaxed"
              variants={letterAnimation}
            >
              <p>
                I'm a dedicated Android developer with strong experience in building modern mobile applications using Kotlin. I work extensively with both Jetpack Compose and XML-based layouts, following Material Design principles to create polished, user-centric experiences.
              </p>
              <p>
                My expertise includes developing responsive UIs, implementing smooth animations, and handling complex state management. I have solid experience in app performance optimization and ensuring consistent behavior across various Android devices and versions.
              </p>
              <p>
                I implement MVVM architecture and SOLID principles in my projects, leveraging core Jetpack libraries like ViewModel, LiveData, Navigation Component, and Room. I have practical experience integrating third-party libraries and APIs to build feature-rich applications.
              </p>
              <p>
                I'm passionate about writing clean, maintainable code and staying updated with the latest Android development trends and best practices. I enjoy tackling challenging problems and continuously enhancing my technical skills.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section with enhanced scroll animation */}
      <motion.section 
        id="skills" 
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            variants={letterAnimation}
          >
            Technical Skills
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {/* Frontend Development */}
            <motion.div 
              variants={letterAnimation}
              whileHover={cardHoverAnimation.whileHover}
            >
              <div className="bg-dark/50 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <FaAndroid className="text-2xl text-primary" />
                  <h3 className="text-xl font-bold">Android Development</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li>• Kotlin</li>
                  <li>• Jetpack Compose & XML Layouts & Views</li>
                  <li>• Android SDK & Components </li>
                  <li>• MVVM Architecture</li>
                  <li>• Location Services & GPS</li>
                </ul>
              </div>
            </motion.div>

            {/* Architecture & Design */}
            <motion.div 
              variants={letterAnimation}
              whileHover={cardHoverAnimation.whileHover}
            >
              <div className="bg-dark/50 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <FaJava className="text-2xl text-primary" />
                  <h3 className="text-xl font-bold">Architecture & Design</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li>• MVVM Pattern</li>
                  <li>• Repository Pattern</li>
                  <li>• RESTful API Integration</li>
                  <li>• Material Design Principles</li>
                  <li>• Third-party Library Integration</li>
                </ul>
              </div>
            </motion.div>

            {/* Tools & Technologies */}
            <motion.div 
              variants={letterAnimation}
              whileHover={cardHoverAnimation.whileHover}
            >
              <div className="bg-dark/50 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <FaTools className="text-2xl text-primary" />
                  <h3 className="text-xl font-bold">Tools & Technologies</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li>• Android Studio</li>
                  <li>• Git Version Control (GitHub, Bitbucket)</li>
                  <li>• Firebase Services</li>
                  <li>• Postman & MongoDB</li>
                  <li>• Google Play Console</li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section with enhanced scroll animation */}
      <motion.section 
        id="projects" 
        className="py-20 bg-dark/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            variants={letterAnimation}
          >
            Featured Projects
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 gap-8"
            variants={staggerContainer}
          >
            {/* Project 1 */}
            <motion.div 
              variants={letterAnimation}
              whileHover={cardHoverAnimation.whileHover}
            >
              <div className="bg-dark/50 rounded-xl overflow-hidden border border-gray-800">
               
                  <div className="h-64 md:h-72 flex items-center justify-center bg-gradient-to-br from-[#a4c63915] via-[#a4c63908] to-transparent relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#a4c63905] to-transparent animate-pulse"></div>
                    <div className="relative h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 flex items-center justify-center p-4">
                      <div className="absolute inset-0 bg-[#a4c63910] rounded-2xl blur-xl"></div>
                      <img 
                        src="/ic-jusride.png"  
                        alt="Jusride" 
                        className="h-full w-full object-contain drop-shadow-2xl filter brightness-110 contrast-110 relative z-10 transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Wattawow – Ride Companion App</h3>
                  <p className="text-gray-300 mb-2">
                    <span className="font-semibold">White-labeled as "JusRide" on Play Store</span><br/>
                    <span className="block">Role: <span style={{ color: '#a4c639' }}>Android Developer</span></span>
                    <span className="block">Tech Stack: Kotlin, Ola Maps SDK, Retrofit, Firebase (FCM, Auth, Analytics), ViewPager2, Glide</span>
                    <span className="block">Duration: February 2024 - Present (Production App)</span>
                  </p>
                  <p className="text-gray-300 mb-4">
                    Contributed to the full-cycle development of Wattawow, a white-labeled ride-sharing and exploration app, deployed publicly under the name JusRide on the Google Play Store. The app combines social networking features with ride planning and bicycle service booking, helping users discover rides, connect with fellow cyclists, and book maintenance services.
                  </p>
                  <p className="text-gray-300 mb-3 font-semibold">Key Contributions:</p>
                  <ul className="text-gray-300 mb-4 list-disc pl-5 text-sm space-y-1">
                    <li>Integrated Ola Maps SDK (formerly Mapbox) for interactive map views, custom markers, and live ride tracking with real-time GPS updates.</li>
                    <li>Designed dynamic swipeable ride cards using ViewPager2 with custom page transformers and implemented double-tap gestures for quick interactions.</li>
                    <li>Developed social networking features including user profiles, follower/following system, activity feeds, and engagement features (likes, comments, shares).</li>
                    <li>Implemented Retrofit with OkHttp for seamless REST API integration, handling ride data, user content, service bookings, and payment processing.</li>
                    <li>Integrated payment gateway for secure in-app bicycle service bookings and premium feature subscriptions.</li>
                    <li>Used Firebase Cloud Messaging (FCM) for real-time push notifications based on ride events, social interactions, and booking confirmations.</li>
                    <li>Implemented Firebase Authentication for secure user login and Firebase Analytics for tracking user engagement and conversion metrics.</li>
                    <li>Managed and optimized image loading using Glide with custom transformations, memory caching, and support for large background images.</li>
                    <li>Ensured smooth UI/UX with consistent theming, transition animations, map customization, and deep linking for marketing campaigns.</li>
                    <li>Managed complete Play Store release cycle including AAB signing, metadata optimization, and version updates maintaining 99.9% crash-free rate.</li>
                    <li>Collaborated with cross-functional teams in Agile sprints, participating in code reviews and technical discussions.</li>
                  </ul>
                  <p className="text-gray-300 mb-3 font-semibold">Technical Highlights:</p>
                  <ul className="text-gray-300 mb-4 list-disc pl-5 text-sm space-y-1">
                    <li>Architected using MVVM pattern with Repository layer for clean separation of concerns</li>
                    <li>Implemented CI/CD pipeline via Bitbucket for automated builds and testing</li>
                    <li>Optimized app performance with lazy loading, image compression, and efficient memory management</li>
                    <li>Achieved consistent month-over-month user growth with positive user feedback</li>
                  </ul>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#a4c63922', color: '#a4c639' }}>Kotlin</span>
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#a4c63922', color: '#a4c639' }}>Ola Maps SDK</span>
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#a4c63922', color: '#a4c639' }}>Retrofit</span>
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#a4c63922', color: '#a4c639' }}>Firebase Cloud Messaging</span>
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#a4c63922', color: '#a4c639' }}>Firebase Auth</span>
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#a4c63922', color: '#a4c639' }}>Firebase Analytics</span>
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#a4c63922', color: '#a4c639' }}>ViewPager2</span>
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#a4c63922', color: '#a4c639' }}>Glide</span>
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#a4c63922', color: '#a4c639' }}>Room Database</span>
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#a4c63922', color: '#a4c639' }}>Payment Gateway</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <a href="https://play.google.com/store/apps/details?id=com.milespeak.jusridemobile&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" className="underline font-medium" style={{ color: '#a4c639' }}>🔗 Live App: JusRide on Play Store</a>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">📝 Note: JusRide is a client-branded, white-labeled version of Wattawow, developed by our team.</div>
                </div>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div 
              variants={letterAnimation}
              whileHover={cardHoverAnimation.whileHover}
            >
              <div className="bg-dark/50 rounded-xl overflow-hidden border border-gray-800">
                                  <div className="h-64 md:h-72 flex items-center justify-center bg-gradient-to-br from-[#a4c63915] via-[#a4c63908] to-transparent relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#a4c63905] to-transparent animate-pulse"></div>
                    <div className="relative h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 flex items-center justify-center p-4">
                      <div className="absolute inset-0 bg-[#a4c63910] rounded-2xl blur-xl"></div>
                      <img 
                        src="/ic-ems.png"  
                        alt="Leave Management System" 
                        className="h-full w-full object-contain drop-shadow-2xl filter brightness-110 contrast-110 relative z-10 transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Leave Management App (Internal Training Project)</h3>
                  <p className="text-gray-300 mb-2">
                    <span className="block">Role: <span style={{ color: '#a4c639' }}>Android Developer (Trainee)</span></span>
                    <span className="block">Tech Stack: Kotlin, Jetpack Compose, Firebase, Room Database, MVVM</span>
                    <span className="block">Duration: 3 months (During initial company training)</span>
                  </p>
                  <p className="text-gray-300 mb-4">
                    Built a basic internal leave tracking app during training to understand Android fundamentals, clean architecture, and collaborative development. The app allowed employees to apply for leaves and managers to review and approve them.
                  </p>
                  <ul className="text-gray-300 mb-4 list-disc pl-5 text-sm">
                    <li>Developed modules for login/authentication, leave submission, and admin approval dashboard.</li>
                    <li>Followed MVVM architecture with LiveData, ViewModel, and Repository pattern.</li>
                    <li>Used Room Database and Firebase for local and remote data storage.</li>
                    <li>Managed version control and team collaboration via Bitbucket repositories.</li>
                  </ul>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#a4c63922', color: '#a4c639' }}>Kotlin</span>
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#a4c63922', color: '#a4c639' }}>Jetpack Compose</span>
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#a4c63922', color: '#a4c639' }}>Firebase</span>
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#a4c63922', color: '#a4c639' }}>Room Database</span>
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#a4c63922', color: '#a4c639' }}>MVVM</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">📌 Note: This app was created for internal training purposes and is not actively used in production.</div>
                </div>
              </div>
            </motion.div>


          </motion.div>
        </div>
      </motion.section>

      {/* Education & Certifications Section */}
      <motion.section 
        id="education" 
        className="py-20 bg-dark/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            variants={letterAnimation}
          >
            Education & Certifications
          </motion.h2>
          <motion.div 
            className="max-w-3xl mx-auto space-y-8"
            variants={staggerContainer}
          >
            {/* Education 1 */}
            <motion.div
              variants={letterAnimation}
              whileHover={cardHoverAnimation.whileHover}
            >
              <div className="bg-dark/50 p-6 rounded-xl border border-gray-800">
                <div className="flex items-center gap-3 mb-3">
                  <FaGraduationCap className="text-2xl text-primary" />
                  <h3 className="text-xl font-bold">Bachelor of Engineering – Computer Science and Engineering</h3>
                </div>
                <p className="text-primary mb-2">Jeppiaar Engineering College, Chennai | 2019 – 2023</p>
                <p className="text-gray-300 mb-2">
                  Completed comprehensive coursework in software engineering, data structures, and algorithms.
                </p>
                <p className="text-gray-300">
                  Gained hands-on experience in developing projects using Java, databases, and front-end technologies.
                </p>
              </div>
            </motion.div>

            {/* Certification 1 */}
            <motion.div
              variants={letterAnimation}
              whileHover={cardHoverAnimation.whileHover}
            >
              <div className="bg-dark/50 p-6 rounded-xl border border-gray-800">
                <div className="flex items-center gap-3 mb-3">
                  <FaCode className="text-2xl text-primary" />
                  <h3 className="text-xl font-bold">Java Full Stack Development Certification</h3>
                </div>
                <p className="text-primary mb-2">Q-Spiders, Chennai | August 2023 – February 2024</p>
                <p className="text-gray-300 mb-2">Completed an intensive training program covering:</p>
                <ul className="text-gray-300 list-disc pl-5 space-y-1">
                  <li>Core Java – Object-Oriented Programming, Collections, Exception Handling</li>
                  <li>MySQL Database Management – Queries, Joins, Normalization</li>
                  <li>Front-end Technologies – HTML, CSS, JavaScript</li>
                  <li>Software Development Best Practices – Version control, debugging, and code optimization</li>
                </ul>
                <p className="text-gray-300 mt-3">
                  Developed practical projects demonstrating full-stack application development.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Experience Section with enhanced scroll animation */}
      <motion.section 
        id="experience" 
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            variants={letterAnimation}
          >
            Work Experience
          </motion.h2>
          <motion.div 
            className="max-w-3xl mx-auto space-y-8"
            variants={staggerContainer}
          >
            {/* Experience 1 */}
            <motion.div
              variants={letterAnimation}
              whileHover={cardHoverAnimation.whileHover}
            >
              <div className="bg-dark/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-bold mb-2">Junior Android Developer</h3>
                <p className="block text-primary mt-2">Milespeak Technologies • 2024 - Present</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Developed and maintained multiple Android applications using Kotlin</li>
                  <li>• Built responsive UIs using XML layouts, Jetpack Compose, and Material Design principles</li>
                  <li>• Integrated RESTful APIs using Retrofit and OkHttp</li>
                  <li>• Implemented local data storage solutions using Room database and SharedPreferences</li>
                  <li>• Contributed to Play Store optimization and handled app publishing workflows</li>
                  <li>• Ensured app performance and stability through rigorous testing and debugging</li>
                </ul>
              </div>
            </motion.div> 
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section with enhanced scroll animation */}
      <motion.section 
        id="contact" 
        className={`${mobileStyles.section} bg-dark/50 min-h-screen flex items-center justify-center`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className={`container mx-auto ${mobileStyles.container}`}>
          <motion.h2 
            className={`${mobileStyles.heading} font-bold mb-8 text-center`}
            variants={letterAnimation}
          >
            Get In Touch
          </motion.h2>
          <motion.div 
            className="max-w-2xl mx-auto"
            variants={staggerContainer}
          >
            {/* Email display */}
            <motion.div 
              className="text-center mb-8"
              variants={letterAnimation}
            >
              <motion.a
                href={`mailto:${EMAIL}`}
                className="text-lg md:text-xl text-primary hover:text-white visited:text-primary transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {EMAIL}
              </motion.a>
            </motion.div>

            {/* Social icons */}
            <div className="flex justify-center space-x-8 mb-8 md:mb-12">
              <motion.a
                whileHover={{ 
                  scale: 1.2,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
                href="https://github.com/mahesh-manickavasahar/maheshwaran-portfolio"
                className="text-2xl md:text-3xl text-gray-300 hover:text-primary"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                whileHover={{ 
                  scale: 1.2,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
                href="https://www.linkedin.com/in/mahesh-vasu"
                className="text-2xl md:text-3xl text-gray-300 hover:text-primary"
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                whileHover={{ 
                  scale: 1.2,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
                href={`https://wa.me/9566842195?text=${encodeURIComponent('Hello Maheshwaran!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl md:text-3xl text-gray-300 hover:text-primary"
              >
                <FaWhatsapp />
              </motion.a>
            </div>

            {/* Contact form */}
            <motion.form 
              ref={formRef} 
              onSubmit={handleSubmit} 
              className={`${mobileStyles.form} space-y-4 md:space-y-6 backdrop-blur-sm`}
              variants={staggerContainer}
            >
              <motion.div variants={letterAnimation}>
                <motion.input
                  type="text"
                  name="from_name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  whileFocus={{ 
                    scale: 1.01,
                    boxShadow: "0 0 15px rgba(0, 122, 255, 0.15)",
                    transition: { duration: 0.2 }
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-gray-800 focus:border-primary focus:outline-none text-base md:text-lg text-white placeholder-gray-400"
                />
              </motion.div>
              <motion.div variants={letterAnimation}>
                <motion.input
                  type="email"
                  name="from_email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                  whileFocus={{ 
                    scale: 1.01,
                    boxShadow: "0 0 15px rgba(0, 122, 255, 0.15)",
                    transition: { duration: 0.2 }
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-gray-800 focus:border-primary focus:outline-none text-base md:text-lg text-white placeholder-gray-400"
                />
              </motion.div>
              <motion.div variants={letterAnimation}>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  required
                  rows="4"
                  whileFocus={{ 
                    scale: 1.01,
                    boxShadow: "0 0 15px rgba(0, 122, 255, 0.15)",
                    transition: { duration: 0.2 }
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-gray-800 focus:border-primary focus:outline-none text-base md:text-lg text-white placeholder-gray-400 resize-none"
                />
              </motion.div>
              {submitStatus === 'success' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-success text-center text-base md:text-lg"
                >
                  Message sent successfully!
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-error text-center text-base md:text-lg"
                >
                  Failed to send message. Please try again.
                </motion.p>
              )}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg text-base md:text-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="py-8 bg-dark"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>© 2025 Maheshwaran. All rights reserved.</p>
          <p className="mt-2">Designed and developed by Maheshwaran</p>
        </div>
      </motion.footer>

      {/* Add a scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ 
          scaleX: scrollYProgress,
          transformOrigin: "0%"
        }}
      />

      {/* Add a subtle background animation */}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-dark to-gray-900"
        animate={{
          background: [
            "linear-gradient(to bottom right, #1C1C1E, #2C2C2E)",
            "linear-gradient(to bottom right, #1C1C1E, #3C3C3E)",
            "linear-gradient(to bottom right, #1C1C1E, #2C2C2E)"
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse"
        }}
        style={{ zIndex: -1 }}
      />
    </div>
  );
};

export default App;
