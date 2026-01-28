import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue, useInView } from 'framer-motion'
import { ArrowRight, Plus, Minus } from 'lucide-react'

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [activeService, setActiveService] = useState(null)
  const buttonRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Magnetic button effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (buttonRef.current && isHovering) {
        const rect = buttonRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const deltaX = (e.clientX - centerX) * 0.3
        const deltaY = (e.clientY - centerY) * 0.3
        setMousePosition({ x: deltaX, y: deltaY })
      } else {
        setMousePosition({ x: 0, y: 0 })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isHovering])

  const globalTransition = {
    ease: [0.76, 0, 0.24, 1],
    duration: 1.2
  }

  const MaskReveal = ({ children, delay = 0 }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    
    return (
      <div ref={ref} className="overflow-hidden">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: isInView ? 0 : "100%" }}
          transition={{ ...globalTransition, delay }}
        >
          {children}
        </motion.div>
      </div>
    )
  }

  const projects = [
    {
      title: "Ethereal Commerce",
      category: "E-Commerce Platform",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      delay: 0.2
    },
    {
      title: "Zenith Bank",
      category: "Financial Services",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      delay: 0.4
    },
    {
      title: "Noir Fashion",
      category: "Luxury Brand",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
      delay: 0.2
    },
    {
      title: "Pulse Fitness",
      category: "Health & Wellness",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
      delay: 0.4
    }
  ]

  const services = [
    {
      title: "Brand Strategy",
      description: "We craft comprehensive brand strategies that define your unique position in the market. Through deep research and strategic thinking, we create frameworks that guide all aspects of your brand expression and business growth."
    },
    {
      title: "Digital Experience",
      description: "Our team designs and develops seamless digital experiences that captivate users and drive results. From web platforms to mobile applications, we build products that are both beautiful and functional."
    },
    {
      title: "Creative Direction",
      description: "We provide art direction that elevates your visual identity across all touchpoints. Our creative leadership ensures consistency, innovation, and impact in every piece of communication."
    },
    {
      title: "Motion & Animation",
      description: "We bring brands to life through sophisticated motion design and animation. Our work adds depth, personality, and engagement to digital experiences and brand communications."
    }
  ]

  return (
    <div className="bg-[#0c0c0c] text-[#f0f0f0] font-sans">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#f0f0f0] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={globalTransition}
        className="fixed top-0 w-full z-40 px-[10vw] py-8"
      >
        <nav className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...globalTransition, delay: 0.2 }}
            className="text-sm tracking-[0.2em] font-medium"
          >
            STUDIO
          </motion.div>
          <motion.button
            ref={buttonRef}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              x: mousePosition.x,
              y: mousePosition.y
            }}
            transition={{ ...globalTransition, delay: 0.4 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="px-8 py-3 border border-[#f0f0f0] text-sm tracking-wider hover:bg-[#f0f0f0] hover:text-[#0c0c0c] transition-all duration-500"
          >
            CONTACT
          </motion.button>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-[10vw] py-[15vh]">
        <div className="mb-16">
          <MaskReveal delay={0.5}>
            <h1 className="font-serif text-[12vw] leading-[0.9] font-semibold tracking-tight">
              WE CREATE
            </h1>
          </MaskReveal>
          <MaskReveal delay={0.7}>
            <h1 className="font-serif text-[12vw] leading-[0.9] font-semibold tracking-tight">
              DIGITAL BALANCE
            </h1>
          </MaskReveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...globalTransition, delay: 1 }}
          className="grid md:grid-cols-2 gap-12 max-w-5xl"
        >
          <div>
            <p className="text-lg leading-relaxed text-[#a0a0a0] font-light">
              We are a design studio focused on creating meaningful digital experiences. Our work exists at the intersection of art and function.
            </p>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-[#a0a0a0] font-light">
              Through strategic thinking and meticulous craft, we help brands find their essence and express it with clarity and confidence.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="px-[10vw] py-[15vh]">
        <div className="mb-20">
          <MaskReveal>
            <h2 className="font-serif text-6xl md:text-7xl font-semibold">Selected Works</h2>
          </MaskReveal>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-32">
          {projects.map((project, index) => {
            const ref = useRef(null)
            const isInView = useInView(ref, { once: true, margin: "-100px" })
            
            return (
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 60 }}
                transition={{ ...globalTransition, delay: project.delay }}
                className={index % 2 === 0 ? "md:mt-0" : "md:mt-32"}
              >
                <div className="relative overflow-hidden mb-6 group cursor-pointer">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-[4/5] object-cover"
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={globalTransition}
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute inset-0 bg-[#0c0c0c] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-3xl font-semibold">{project.title}</h3>
                  <p className="text-[#a0a0a0] tracking-wide text-sm">{project.category}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Services Accordion */}
      <section className="px-[10vw] py-[15vh]">
        <div className="mb-20">
          <MaskReveal>
            <h2 className="font-serif text-6xl md:text-7xl font-semibold">What We Do</h2>
          </MaskReveal>
        </div>

        <div className="max-w-5xl">
          {services.map((service, index) => {
            const isActive = activeService === index
            const ref = useRef(null)
            const isInView = useInView(ref, { once: true, margin: "-50px" })
            
            return (
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                transition={{ ...globalTransition, delay: index * 0.1 }}
                className="border-t border-[#2a2a2a] last:border-b"
              >
                <button
                  onClick={() => setActiveService(isActive ? null : index)}
                  className="w-full py-8 flex items-center justify-between text-left group"
                >
                  <span className="font-serif text-3xl md:text-4xl font-semibold group-hover:text-[#a0a0a0] transition-colors duration-500">
                    {service.title}
                  </span>
                  <motion.div
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Plus className="w-6 h-6" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ ...globalTransition }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-lg leading-relaxed text-[#a0a0a0] font-light max-w-3xl">
                        {service.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-[10vw] py-[20vh]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={globalTransition}
          className="text-center"
        >
          <motion.h2
            className="font-serif text-[15vw] leading-[0.9] font-semibold cursor-pointer inline-block"
            whileHover={{ fontStyle: "italic" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            START A PROJECT
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...globalTransition, delay: 0.3 }}
            className="mt-12"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-3 text-sm tracking-[0.2em] hover:gap-6 transition-all duration-500"
            >
              GET IN TOUCH
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-[10vw] py-12 border-t border-[#2a2a2a]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm tracking-[0.2em] text-[#a0a0a0]">
            STUDIO © 2024
          </div>
          <div className="flex gap-12 text-sm tracking-wider text-[#a0a0a0]">
            <a href="#" className="hover:text-[#f0f0f0] transition-colors duration-300">Instagram</a>
            <a href="#" className="hover:text-[#f0f0f0] transition-colors duration-300">Twitter</a>
            <a href="#" className="hover:text-[#f0f0f0] transition-colors duration-300">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App