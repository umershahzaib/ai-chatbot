'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  Bot,
  Code2,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Sparkles,
  Zap,
  Brain,
  FileText,
  MessageSquare,
  GraduationCap,
  Layers,
  ArrowRight,
  User,
  Briefcase
} from 'lucide-react'
import { motion } from 'framer-motion'

const skills = [
  { name: 'Next.js', icon: Layers, category: 'Frontend' },
  { name: 'React', icon: Code2, category: 'Frontend' },
  { name: 'TypeScript', icon: Code2, category: 'Frontend' },
  { name: 'Tailwind CSS', icon: Sparkles, category: 'Frontend' },
  { name: 'Node.js', icon: Zap, category: 'Backend' },
  { name: 'AI Integration', icon: Brain, category: 'AI/ML' },
  { name: 'Google Gemini', icon: Sparkles, category: 'AI/ML' },
  { name: 'API Development', icon: Code2, category: 'Backend' },
]

const projects = [
  {
    title: 'AI Chat Bot with Study Tools',
    description: 'A comprehensive AI-powered platform featuring multi-model chat (Gemini 2.5), intelligent note generation, interactive quiz creation, and smart flashcard systems. Built with Next.js, TypeScript, and Google Gemini AI.',
    features: [
      'Multi-AI Model Support (Gemini 2.5 Flash)',
      'Smart Notes Generation',
      'Interactive Quiz Creator',
      'Flashcard Learning System',
      'Real-time Chat Interface',
      'Conversation History Management'
    ],
    tech: ['Next.js', 'TypeScript', 'Gemini AI', 'Tailwind CSS', 'React'],
    demoLink: '/chat',
    githubLink: 'https://github.com/umershahzaib/ai-chatbot',
    featured: true
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <Bot className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
            <span className="font-bold text-xl">Umer Shahzaib</span>
          </Link>
          <nav className="flex items-center space-x-4 md:space-x-6">
            <Link href="#about" className="text-sm font-medium hover:text-primary transition hidden md:inline">
              About
            </Link>
            <Link href="#skills" className="text-sm font-medium hover:text-primary transition hidden md:inline">
              Skills
            </Link>
            <Link href="#projects" className="text-sm font-medium hover:text-primary transition hidden md:inline">
              Projects
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition hidden md:inline">
              Contact
            </Link>
            <ThemeToggle />
            <Link href="/chat">
              <Button size="sm" className="group">
                Try AI Chat
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-background via-secondary/20 to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center rounded-full border px-4 py-1.5 mb-6 text-sm bg-secondary/50"
            >
              <Sparkles className="h-4 w-4 mr-2 text-primary" />
              <span>Full Stack Developer & AI Enthusiast</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
            >
              Hi, I'm <span className="text-primary">Umer Shahzaib</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Building intelligent web applications with modern technologies.
              Passionate about AI integration and creating seamless user experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="#projects">
                <Button size="lg" className="w-full sm:w-auto group">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Get In Touch
                  <Mail className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center gap-4 mt-8"
            >
              <a
                href="https://github.com/umershahzaib/ai-chatbot"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/umer-shahzaib-86b0b5418/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:umershahjpi18@gmail.com"
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
              <div className="w-20 h-1 bg-primary mx-auto"></div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader className="space-y-4">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      I'm a passionate full-stack developer with a strong focus on modern web technologies
                      and artificial intelligence integration. I specialize in building scalable, user-friendly
                      applications that solve real-world problems.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      My expertise lies in creating intelligent applications using cutting-edge frameworks like
                      Next.js and React, combined with powerful AI models. I'm constantly exploring new technologies
                      and best practices to deliver exceptional digital experiences.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      When I'm not coding, I enjoy learning about emerging AI technologies, contributing to
                      open-source projects, and sharing knowledge with the developer community.
                    </p>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                My toolkit for building modern, intelligent applications
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            >
              {skills.map((skill, index) => (
                <motion.div key={skill.name} variants={itemVariants}>
                  <Card className="group hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50 h-full">
                    <CardHeader className="text-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                        <skill.icon className="h-7 w-7 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{skill.name}</CardTitle>
                      <CardDescription>
                        <Badge variant="secondary" className="mt-2">
                          {skill.category}
                        </Badge>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Showcasing my work in AI and web development
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="max-w-5xl mx-auto">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl overflow-hidden"
                >
                  <CardHeader className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <CardTitle className="text-2xl md:text-3xl">
                            {project.title}
                          </CardTitle>
                          {project.featured && (
                            <Badge className="bg-primary/20 text-primary border-primary/30">
                              <Sparkles className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-base leading-relaxed">
                          {project.description}
                        </CardDescription>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Zap className="h-4 w-4 mr-2 text-primary" />
                          Key Features
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {project.features.map((feature, i) => (
                            <div
                              key={i}
                              className="flex items-start space-x-2 text-sm bg-secondary/50 p-3 rounded-lg hover:bg-secondary transition-colors"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Code2 className="h-4 w-4 mr-2 text-primary" />
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, i) => (
                            <Badge key={i} variant="secondary" className="px-3 py-1">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-4">
                        <Link href={project.demoLink}>
                          <Button className="group">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Try Live Demo
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline">
                            <Github className="h-4 w-4 mr-2" />
                            View Code
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Connect</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Interested in collaborating or have a project in mind? I'd love to hear from you!
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader className="space-y-6">
                  <div className="grid sm:grid-cols-3 gap-6">
                    <a
                      href="mailto:umershahjpi18@gmail.com"
                      className="flex flex-col items-center p-6 rounded-lg bg-secondary/50 hover:bg-secondary transition-all hover:scale-105 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-sm text-muted-foreground text-center break-all">
                        umershahjpi18@gmail.com
                      </p>
                    </a>

                    <a
                      href="https://github.com/umershahzaib/ai-chatbot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-6 rounded-lg bg-secondary/50 hover:bg-secondary transition-all hover:scale-105 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                        <Github className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-1">GitHub</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        @umershahzaib
                      </p>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/umer-shahzaib-86b0b5418/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-6 rounded-lg bg-secondary/50 hover:bg-secondary transition-all hover:scale-105 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                        <Linkedin className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-1">LinkedIn</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Connect with me
                      </p>
                    </a>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience My AI Chat Bot?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Try my featured project - An intelligent chatbot powered by Google Gemini AI with study tools
            </p>
            <Link href="/chat">
              <Button size="lg" variant="secondary" className="group">
                Launch AI Chat Bot
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <Bot className="h-6 w-6 text-primary" />
                  <span className="font-bold text-xl">Umer Shahzaib</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 max-w-md">
                  Full Stack Developer specializing in AI-powered web applications.
                  Building the future with modern technologies and intelligent systems.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/umershahzaib/ai-chatbot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-secondary transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/umer-shahzaib-86b0b5418/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-secondary transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="mailto:umershahjpi18@gmail.com"
                    className="p-2 rounded-full hover:bg-secondary transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Quick Links</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="#about" className="hover:text-primary transition-colors">
                      About Me
                    </Link>
                  </li>
                  <li>
                    <Link href="#skills" className="hover:text-primary transition-colors">
                      Skills
                    </Link>
                  </li>
                  <li>
                    <Link href="#projects" className="hover:text-primary transition-colors">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link href="#contact" className="hover:text-primary transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Projects</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="/chat" className="hover:text-primary transition-colors">
                      AI Chat Bot
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://github.com/umershahzaib/ai-chatbot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      View on GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Umer Shahzaib. All rights reserved.</p>
              <p className="flex items-center gap-2">
                Built with <span className="text-red-500">❤️</span> using Next.js & Gemini AI
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
