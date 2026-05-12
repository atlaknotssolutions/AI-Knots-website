import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import { createContext, useContext, useState, useEffect, useRef, useCallback, Suspense, useMemo } from "react";
import { NavLink, useLocation, Link, Outlet, useNavigate, useParams, createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChevronDown, Sun, Moon, X, Menu, Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, MessageCircle, Send, ArrowRight, Code, ShieldCheck, Users, Server, Headphones, BarChart3, CheckCircle, Briefcase, HardDrive, Building2, Cloud, Database, Smartphone, Zap, CheckCircle2, Rocket, Shield, Search, Star, ShoppingCart, Clock, Wrench, Landmark, Code2, Building, ArrowUp, Sparkles, ChevronRight, Newspaper, Globe, TrendingUp, Calendar, Eye, Heart, Loader2, Cpu, ExternalLink, Megaphone, FileText, Link as Link$1, Palette, Image, Video, Monitor, Apple, Filter, CreditCard, Percent, Bell, Package, Lock, Scale, Container, LineChart, MessageSquare, Brain, Hospital, GraduationCap, Home as Home$1, ShieldAlert, Target, Youtube, Repeat, Pin, BookOpen, Pen, RefreshCw, DollarSign, Layout as Layout$1, PenTool, MousePointer, Truck, HeartPulse, Plane } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useTransform, useInView, animate } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector, Provider } from "react-redux";
import { createAsyncThunk, createSlice, configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, Environment, Float, Sphere } from "@react-three/drei";
import DOMPurify from "dompurify";
import { HelmetProvider } from "react-helmet-async";
const ATLAknots = "/assets/ITLogo-BAK4XZa_.png";
const ATLAknots2 = "/assets/logoimage2-DeJgb0g5.PNG";
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);
const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { isDark, toggleTheme }, children });
};
const navItems = [
  { name: "Home", path: "/" },
  {
    name: "About",
    path: "/about"
  },
  { name: "Recent Work", path: "/recentwork" },
  {
    name: "Service",
    path: "/service",
    hasDropdown: true,
    dropdownItems: [
      {
        name: "Digital Marketing",
        path: "/digital-marketing",
        hasDropdown: true,
        dropdownItems: [
          { name: "SEO Services", path: "/seo" },
          { name: "Social Media Marketing", path: "/socialmediamarketing" },
          { name: "Paid Advertisement", path: "/paidadv" },
          { name: "Graphic design", path: "/graphicdesign" },
          { name: "Local Marketing", path: "/localmarketing" }
        ]
      },
      {
        name: "Development",
        path: "/software",
        hasDropdown: true,
        dropdownItems: [
          { name: "Software development", path: "/software" },
          { name: "Mobile App development", path: "/mobiledevelopment" },
          { name: "E-commerce", path: "/ecommercedevelopment" },
          { name: "Custom ERP Software", path: "/erpdevelopment" },
          { name: "Cloud Services", path: "/cloudsolutions" },
          { name: "AI & Machine Learning", path: "/ai-mlservice" }
        ]
      },
      {
        name: "Design",
        path: "/graphics",
        hasDropdown: true,
        dropdownItems: [
          { name: "UI/UX Design", path: "/uidesign" },
          {
            name: "Web Design & Development",
            path: "/websitedesigndevelopment"
          },
          { name: "Branding", path: "/contentwritingbranding" }
        ]
      }
    ]
  },
  {
    name: "Blog",
    path: "/blog"
  },
  // { name: "Careers", path: "/careers" },
  { name: "AI Technology", path: "/technology" },
  { name: "Tech News", path: "/technews" },
  {
    name: "Contact",
    path: "/contact",
    hasDropdown: true,
    dropdownItems: [
      { name: "Careers", path: "/careers" },
      { name: "Gallery", path: "/gallery" }
    ]
  }
];
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const { isDark, toggleTheme } = useTheme();
  useEffect(() => {
    if (!isOpen) return;
    const timerId = setTimeout(() => {
      setIsOpen(false);
      setOpenDropdown(null);
      setOpenSubDropdown(null);
    }, 5e3);
    return () => clearTimeout(timerId);
  }, [isOpen]);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeAll = () => {
    setIsOpen(false);
    setOpenDropdown(null);
    setOpenSubDropdown(null);
  };
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      className: `
        sticky top-0 z-50 border-b transition-all duration-300
        ${isDark ? "bg-black/90 border-gray-800" : "bg-white/95 border-gray-200 shadow-sm"}
      `,
      children: [
        /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-5", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center h-20", children: [
          /* @__PURE__ */ jsx(NavLink, { to: "/", onClick: closeAll, children: /* @__PURE__ */ jsx(
            "img",
            {
              src: isDark ? ATLAknots : ATLAknots2,
              alt: "ATLAKnots Logo",
              className: "h-12 w-auto md:h-12 lg:h-18 object-contain"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center gap-1", children: navItems.map((item) => /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsxs(
              NavLink,
              {
                to: item.path,
                onClick: item.name === "Home" ? void 0 : void 0,
                className: `
                    px-4 py-5 flex items-center gap-1.5 transition-colors duration-150
                    ${isDark ? "text-gray-200 hover:text-red-400" : "text-gray-700 hover:text-blue-600 font-medium"}
                  `,
                children: [
                  item.name,
                  item.hasDropdown && /* @__PURE__ */ jsx(
                    ChevronDown,
                    {
                      size: 16,
                      className: `transition-transform duration-200 
                        ${isDark ? "group-hover:rotate-180" : "group-hover:rotate-180 text-blue-600"}`
                    }
                  )
                ]
              }
            ),
            item.hasDropdown && /* @__PURE__ */ jsx(
              "div",
              {
                className: `
                      absolute left-0 top-full pt-2 w-56 
                      border rounded-lg shadow-xl transition-all duration-200 ease-out
                      opacity-0 scale-95 pointer-events-none
                      group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
                      ${isDark ? "bg-black/95 border-gray-700" : "bg-white border-gray-200 shadow-lg"}
                    `,
                children: item.dropdownItems.map((sub) => /* @__PURE__ */ jsxs("div", { className: "relative group/sub", children: [
                  /* @__PURE__ */ jsxs(
                    NavLink,
                    {
                      to: sub.path,
                      className: `
                            flex justify-between items-center px-4 py-2.5 
                            transition-colors duration-150
                            ${isDark ? "text-gray-200 hover:bg-red-900/40" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}
                          `,
                      children: [
                        sub.name,
                        sub.hasDropdown && /* @__PURE__ */ jsx(
                          ChevronDown,
                          {
                            size: 14,
                            className: `transition-transform duration-200
                                ${isDark ? "rotate-[-90deg] group-hover/sub:rotate-[-270deg]" : "rotate-[-90deg] group-hover/sub:rotate-[-270deg] text-blue-600"}`
                          }
                        )
                      ]
                    }
                  ),
                  sub.hasDropdown && /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `
                              absolute left-full top-0 ml-1 w-52 border rounded-lg shadow-xl
                              transition-all duration-200 ease-out
                              opacity-0 scale-95 pointer-events-none
                              group-hover/sub:opacity-100 group-hover/sub:scale-100 group-hover/sub:pointer-events-auto
                              ${isDark ? "bg-black/95 border-gray-700" : "bg-white border-gray-200"}
                            `,
                      children: sub.dropdownItems.map((child) => /* @__PURE__ */ jsx(
                        NavLink,
                        {
                          to: child.path,
                          className: `
                                  block px-4 py-2.5 transition-colors duration-150
                                  ${isDark ? "text-gray-200 hover:bg-red-900/40" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}
                                `,
                          children: child.name
                        },
                        child.path
                      ))
                    }
                  )
                ] }, sub.name))
              }
            )
          ] }, item.name)) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: toggleTheme,
                className: `
                p-2 rounded-full transition-all duration-150
                ${isDark ? "text-gray-200 hover:text-red-400 hover:bg-gray-800" : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"}
              `,
                title: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
                children: isDark ? /* @__PURE__ */ jsx(Sun, { size: 22 }) : /* @__PURE__ */ jsx(Moon, { size: 22 })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx(
              "button",
              {
                onClick: toggleMenu,
                className: isDark ? "text-gray-200" : "text-gray-700",
                children: isOpen ? /* @__PURE__ */ jsx(X, { size: 28 }) : /* @__PURE__ */ jsx(Menu, { size: 28 })
              }
            ) })
          ] })
        ] }) }),
        isOpen && /* @__PURE__ */ jsx(
          "div",
          {
            className: `
            md:hidden px-5 py-6 space-y-2 border-t
            ${isDark ? "bg-black border-gray-800" : "bg-white border-gray-200"}
          `,
            children: navItems.map((item) => /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsx(
                  NavLink,
                  {
                    to: item.path,
                    onClick: closeAll,
                    className: `
                    py-3 flex-1 transition-colors
                    ${isDark ? "text-gray-200" : "text-gray-800 font-medium"}
                  `,
                    children: item.name
                  }
                ),
                item.hasDropdown && /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setOpenDropdown(
                      openDropdown === item.name ? null : item.name
                    ),
                    children: /* @__PURE__ */ jsx(
                      ChevronDown,
                      {
                        size: 20,
                        className: `${isDark ? "text-gray-400" : "text-gray-500"} 
                        ${openDropdown === item.name ? "rotate-180" : ""}`
                      }
                    )
                  }
                )
              ] }),
              item.hasDropdown && openDropdown === item.name && /* @__PURE__ */ jsx("div", { className: "pl-6 space-y-1", children: item.dropdownItems.map((sub) => /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                  /* @__PURE__ */ jsx(
                    NavLink,
                    {
                      to: sub.path,
                      onClick: closeAll,
                      className: `
                            py-2.5 flex-1 transition-colors
                            ${isDark ? "text-gray-300" : "text-gray-700"}
                          `,
                      children: sub.name
                    }
                  ),
                  sub.hasDropdown && /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setOpenSubDropdown(
                        openSubDropdown === sub.name ? null : sub.name
                      ),
                      children: /* @__PURE__ */ jsx(
                        ChevronDown,
                        {
                          size: 18,
                          className: `${isDark ? "text-gray-400" : "text-gray-500"} 
                                ${openSubDropdown === sub.name ? "rotate-180" : ""}`
                        }
                      )
                    }
                  )
                ] }),
                sub.hasDropdown && openSubDropdown === sub.name && /* @__PURE__ */ jsx("div", { className: "pl-6", children: sub.dropdownItems.map((child) => /* @__PURE__ */ jsx(
                  NavLink,
                  {
                    to: child.path,
                    onClick: closeAll,
                    className: `
                                block py-2 text-sm transition-colors
                                ${isDark ? "text-gray-400" : "text-gray-600"}
                              `,
                    children: child.name
                  },
                  child.path
                )) })
              ] }, sub.name)) })
            ] }, item.name))
          }
        )
      ]
    }
  );
}
function SocialLink({ href, icon, label, isDark }) {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": label,
      className: `transition-all hover:scale-110 duration-300 cursor-pointer inline-flex items-center justify-center w-10 h-10 rounded-lg border border-transparent hover:border-red-500/20 ${isDark ? "text-gray-400 hover:text-red-500 hover:bg-red-500/10" : "text-gray-500 hover:text-red-500 hover:bg-red-50"}`,
      children: icon
    }
  );
}
const Footer = () => {
  const { isDark } = useTheme();
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const location = useLocation();
  const handleFooterLink = (e, path) => {
    if (location.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 0);
    }
  };
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/service" },
    { name: "Recent Work", path: "/recentwork" },
    { name: "Contact", path: "/contact" }
  ];
  const services2 = [
    {
      category: "Digital Marketing",
      items: [
        { name: "SEO Services", path: "/seo" },
        { name: "Social Media Marketing", path: "/socialmediamarketing" },
        { name: "Paid Advertisement", path: "/paidadv" },
        { name: "Graphic Design", path: "/graphics" },
        { name: "Local Marketing", path: "/localmarketing" }
      ]
    },
    {
      category: "Development",
      items: [
        { name: "Software Development", path: "/software" },
        { name: "Mobile App Development", path: "/mobiledevelopment" },
        { name: "E-commerce Development", path: "/ecommercedevelopment" },
        { name: "Custom ERP Software", path: "/erpdevelopment" },
        { name: "Cloud Solutions", path: "/cloudsolutions" },
        { name: "AI & Machine Learning", path: "/ai-mlservice" }
      ]
    }
  ];
  return /* @__PURE__ */ jsxs(
    "footer",
    {
      className: `border-t text-gray-400 ${isDark ? "bg-gradient-to-b from-black to-zinc-950 border-red-900/30" : "bg-gradient-to-b from-gray-50 to-white border-gray-200"}`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 items-start", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-1", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: isDark ? ATLAknots : ATLAknots2,
                alt: "ATLAKnots Logo",
                className: "h-12 w-[200px] md:h-16 md:w-[260px] lg:h-20 lg:w-[320px] mt-2 object-contain"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-6 mt-8", children: [
              /* @__PURE__ */ jsx(
                SocialLink,
                {
                  href: "https://www.facebook.com/profile.php?id=61588297089600",
                  icon: /* @__PURE__ */ jsx(Facebook, { size: 22 }),
                  label: "Facebook",
                  isDark
                }
              ),
              /* @__PURE__ */ jsx(
                SocialLink,
                {
                  href: "https://twitter.com/atlaknots",
                  icon: /* @__PURE__ */ jsx(Twitter, { size: 22 }),
                  label: "Twitter",
                  isDark
                }
              ),
              /* @__PURE__ */ jsx(
                SocialLink,
                {
                  href: "https://www.linkedin.com/in/atla-knots-solutions-756702394",
                  icon: /* @__PURE__ */ jsx(Linkedin, { size: 22 }),
                  label: "LinkedIn",
                  isDark
                }
              ),
              /* @__PURE__ */ jsx(
                SocialLink,
                {
                  href: "https://www.instagram.com/atlaknots",
                  icon: /* @__PURE__ */ jsx(Instagram, { size: 22 }),
                  label: "Instagram",
                  isDark
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              "h4",
              {
                className: `font-semibold mb-4 text-sm uppercase tracking-widest ${isDark ? "text-white" : "text-gray-900"}`,
                children: "Quick Links"
              }
            ),
            /* @__PURE__ */ jsx("ul", { className: "space-y-2.5 text-sm", children: quickLinks.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              Link,
              {
                to: item.path,
                onClick: (e) => handleFooterLink(e, item.path),
                className: `transition-all hover:translate-x-1 inline-block duration-200 ${isDark ? "text-gray-400 hover:text-red-400" : "text-gray-600 hover:text-red-500"}`,
                children: item.name
              }
            ) }, item.name)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
            /* @__PURE__ */ jsx(
              "h4",
              {
                className: `font-semibold mb-4 text-sm uppercase tracking-widest ${isDark ? "text-white" : "text-gray-900"}`,
                children: "Our Services"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8", children: services2.map((group) => /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "h5",
                {
                  className: `font-medium text-xs uppercase tracking-widest mb-3 ${isDark ? "text-red-400" : "text-red-600"}`,
                  children: group.category
                }
              ),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2.5 text-sm", children: group.items.map((service) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                Link,
                {
                  to: service.path,
                  onClick: (e) => handleFooterLink(e, service.path),
                  className: `transition-all hover:translate-x-1 inline-block duration-200 ${isDark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-red-600"}`,
                  children: service.name
                }
              ) }, service.name)) })
            ] }, group.category)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              "h4",
              {
                className: `font-semibold mb-4 text-sm uppercase tracking-widest ${isDark ? "text-white" : "text-gray-900"}`,
                children: "Contact Us"
              }
            ),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-sm", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx(MapPin, { size: 18, className: "text-red-500 mt-0.5 shrink-0" }),
                /* @__PURE__ */ jsx("span", { className: isDark ? "text-gray-300" : "text-gray-700", children: "Bhopal, Madhya Pradesh, India" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx(Phone, { size: 18, className: "text-red-500 shrink-0" }),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "tel:+917869636070",
                    className: `transition-colors ${isDark ? "hover:text-red-400" : "hover:text-red-500"}`,
                    children: "+91 78696 36070"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx(Mail, { size: 18, className: "text-red-500 shrink-0" }),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "mailto:support@atlaknots.com",
                    className: `transition-colors break-all ${isDark ? "hover:text-red-400" : "hover:text-red-500"}`,
                    children: "support@atlaknots.com"
                  }
                )
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `border-t py-6 text-center text-xs ${isDark ? "border-red-900/20 text-gray-500" : "border-gray-200 text-gray-500"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-4", children: [
              /* @__PURE__ */ jsxs("p", { className: isDark ? "text-gray-500" : "text-gray-600", children: [
                "© ",
                currentYear,
                " AI Knots IT Solutions. All rights reserved."
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-6 justify-center", children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/privacypolicy",
                    onClick: (e) => handleFooterLink(e, "/privacypolicy"),
                    className: `transition-colors ${isDark ? "hover:text-red-400" : "hover:text-red-500"}`,
                    children: "Privacy Policy"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/termsofservice",
                    onClick: (e) => handleFooterLink(e, "/termsofservice"),
                    className: `transition-colors ${isDark ? "hover:text-red-400" : "hover:text-red-500"}`,
                    children: "Terms of Service"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/cookiepolicy",
                    onClick: (e) => handleFooterLink(e, "/cookiepolicy"),
                    className: `transition-colors ${isDark ? "hover:text-red-400" : "hover:text-red-500"}`,
                    children: "Cookie Policy"
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  );
};
const Chatbot = () => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi! I'm Atlas, your AI assistant at AI Knots IT Solutions. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);
  const quickReplies = [
    "Tell me about your services",
    "How can you help my business?",
    "What is your pricing?",
    "Contact support"
  ];
  useEffect(() => {
    const toggleVisibility = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const sendMessage = (text = input) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { type: "user", text }]);
    setInput("");
    setTimeout(() => {
      let reply = "Thanks for reaching out! Our team will get back to you shortly.";
      const lowerText = text.toLowerCase();
      if (lowerText.includes("service") || lowerText.includes("offer")) {
        reply = "We offer Web & Mobile Development, Testing, L2 Support, Voice/Chat/Email BPO, Cataloguing, Quality Assurance, and complete Infrastructure Setup.";
      } else if (lowerText.includes("help") || lowerText.includes("business")) {
        reply = "We help businesses with cost-effective IT solutions, digital transformation, and scalable BPO services.";
      } else if (lowerText.includes("price") || lowerText.includes("cost") || lowerText.includes("pricing")) {
        reply = "Our pricing is flexible and project-based. Would you like a free consultation?";
      } else if (lowerText.includes("contact") || lowerText.includes("support")) {
        reply = "You can email us at support@atlaknots.com or call our 24×7 support team.";
      }
      setMessages((prev) => [...prev, { type: "bot", text: reply }]);
    }, 700);
  };
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: scrollToTop,
        className: `fixed bottom-8 right-8 z-[90] p-4 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/40 transition-all duration-300 ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"}`,
        "aria-label": "Scroll back to top",
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-6 h-6",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M5 10l7-7m0 0l7 7m-7-7v18"
              }
            )
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "fixed bottom-8 right-24 z-[100] p-4 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-900/50 transition-all duration-300 flex items-center justify-center",
        "aria-label": "Open Chatbot",
        children: /* @__PURE__ */ jsx(MessageCircle, { className: "w-6 h-6" })
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 100, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 100, scale: 0.95 },
        transition: { duration: 0.3 },
        className: `fixed bottom-24 right-8 z-[110] w-full max-w-[380px] border rounded-3xl shadow-2xl overflow-hidden ${isDark ? "bg-gray-950 border-red-900/50" : "bg-white border-gray-200"}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-red-600 p-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center", children: /* @__PURE__ */ jsx(MessageCircle, { className: "w-6 h-6" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-white", children: "Atlas Assistant" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-red-100", children: "Online • AI Knots IT" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsOpen(false),
                className: "text-white hover:text-red-200 transition-colors",
                children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: chatRef,
              className: `h-80 overflow-y-auto p-4 space-y-4 ${isDark ? "bg-black/60" : "bg-gray-50"}`,
              children: messages.map((msg, idx) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: `flex ${msg.type === "user" ? "justify-end" : "justify-start"}`,
                  children: /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.type === "user" ? "bg-red-600 text-white" : isDark ? "bg-gray-900 text-gray-200 border border-gray-800" : "bg-gray-100 text-gray-800 border border-gray-200"}`,
                      children: msg.text
                    }
                  )
                },
                idx
              ))
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `p-3 border-t flex flex-wrap gap-2 ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"}`,
              children: quickReplies.map((reply, idx) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => sendMessage(reply),
                  className: `text-xs px-4 py-2 rounded-full transition-all ${isDark ? "bg-gray-900 hover:bg-red-950 border border-gray-700" : "bg-gray-100 hover:bg-red-50 border border-gray-300"}`,
                  children: reply
                },
                idx
              ))
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `p-4 border-t flex gap-2 ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"}`,
              children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: input,
                    onChange: (e) => setInput(e.target.value),
                    onKeyPress: (e) => e.key === "Enter" && sendMessage(),
                    placeholder: "Type your message...",
                    className: `flex-1 rounded-full px-5 py-3 text-sm focus:outline-none ${isDark ? "bg-gray-900 border border-gray-700 focus:border-red-600" : "bg-gray-100 border border-gray-300 focus:border-red-500"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => sendMessage(),
                    disabled: !input.trim(),
                    className: "bg-red-600 hover:bg-red-700 disabled:bg-gray-700 p-3 rounded-full transition-all",
                    children: /* @__PURE__ */ jsx(Send, { className: "w-5 h-5" })
                  }
                )
              ]
            }
          )
        ]
      }
    ) })
  ] });
};
const Layout = () => {
  const { isDark } = useTheme();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `min-h-screen w-full flex flex-col antialiased ${isDark ? "bg-black text-white" : "bg-white text-gray-900"}`,
      children: [
        /* @__PURE__ */ jsx(
          "header",
          {
            className: `sticky top-0 z-50 w-full backdrop-blur-xl border-b ${isDark ? "bg-black/80 border-zinc-800/70" : "bg-white/80 border-gray-200/70"}`,
            children: /* @__PURE__ */ jsx(Navbar, {})
          }
        ),
        /* @__PURE__ */ jsx("main", { className: "flex-grow w-full", children: /* @__PURE__ */ jsx(Outlet, {}) }),
        /* @__PURE__ */ jsx(
          "footer",
          {
            className: `w-full border-t ${isDark ? "bg-zinc-950 border-zinc-900" : "bg-gray-50 border-gray-200"}`,
            children: /* @__PURE__ */ jsx(Footer, {})
          }
        ),
        /* @__PURE__ */ jsx(Chatbot, {})
      ]
    }
  );
};
const heroVideo = "/assets/herosectionvideo-CZKDLRYE.mp4";
const submitContactForm = createAsyncThunk(
  "contact/submitForm",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/contact/create",
        payload
      );
      return response.data;
    } catch (error) {
      let errorMsg = "Something went wrong. Please try again.";
      if (error.response) {
        errorMsg = error.response.data?.message || error.response.data?.error || errorMsg;
      } else if (error.request) {
        errorMsg = "No response from server. Please check if backend is running.";
      }
      return rejectWithValue(errorMsg);
    }
  }
);
const initialFormData = {
  usernamee: "",
  email: "",
  phone: "",
  subject: "",
  message: ""
};
const contactSlice = createSlice({
  name: "contact",
  initialState: {
    formData: initialFormData,
    captchaValue: null,
    loading: false,
    successMessage: null,
    errorMessage: null
  },
  reducers: {
    // Update any single form field
    updateField(state, action) {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    // Store reCAPTCHA token
    setCaptcha(state, action) {
      state.captchaValue = action.payload;
    },
    // Reset entire form after success
    resetForm(state) {
      state.formData = initialFormData;
      state.captchaValue = null;
      state.successMessage = null;
      state.errorMessage = null;
    },
    // Clear alert messages manually if needed
    clearMessages(state) {
      state.successMessage = null;
      state.errorMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(submitContactForm.pending, (state) => {
      state.loading = true;
      state.successMessage = null;
      state.errorMessage = null;
    }).addCase(submitContactForm.fulfilled, (state) => {
      state.loading = false;
      state.successMessage = "Message sent successfully! We'll get back to you soon.";
      state.formData = initialFormData;
      state.captchaValue = null;
    }).addCase(submitContactForm.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    });
  }
});
const { updateField, setCaptcha, resetForm: resetForm$1, clearMessages } = contactSlice.actions;
const contactReducer = contactSlice.reducer;
const background = "/assets/backgroundimage1-CgAQc4hH.jpeg";
const background2 = "/assets/backgroundimage2-CZZ4e8W4.jpeg";
const background3 = "/assets/backgroundimage3-DlFVuEra.jpeg";
const fadeInUp$g = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const staggerContainer$g = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};
const HERO_SLIDES = [
  {
    image: background,
    title: "Global IT Services",
    subtitle: "End-to-end digital transformation, product engineering, and cloud delivery for growing brands",
    cta: "Discover ATLA"
  },
  {
    image: background2,
    title: "Marketing & Growth",
    subtitle: "Performance marketing, SEO, and brand campaigns designed to convert and scale",
    cta: "Grow with ATLA"
  },
  {
    image: background3,
    title: "Creative Product Design",
    subtitle: "UX-driven web and mobile experiences that engage users and accelerate adoption",
    cta: "See Solutions"
  }
];
function Home() {
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData, captchaValue, loading, successMessage, errorMessage } = useSelector((state) => state.contact);
  const [showPopup, setShowPopup] = useState(false);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5e3);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 1500);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, { position: "top-right", autoClose: 5e3 });
      dispatch(clearMessages());
      setShowPopup(false);
    }
  }, [successMessage, dispatch]);
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, { position: "top-right", autoClose: 7e3 });
      dispatch(clearMessages());
    }
  }, [errorMessage, dispatch]);
  const handleChange = (e) => {
    dispatch(updateField({ name: e.target.name, value: e.target.value }));
  };
  const handleCaptchaChange = (value) => {
    dispatch(setCaptcha(value));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaValue) {
      toast.error("Please verify that you are not a robot.");
      return;
    }
    dispatch(submitContactForm({ ...formData, captcha: captchaValue }));
  };
  const goToPortfolio = () => {
    navigate("/portfolio");
  };
  const cardClass = isDark ? "bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center h-full hover:border-red-500/50 transition-colors" : "bg-white border border-gray-200 shadow-md rounded-2xl p-6 md:p-8 flex flex-col items-center text-center h-full hover:shadow-xl transition-shadow";
  const headingClass = isDark ? "text-white" : "text-gray-900";
  const bodyClass = isDark ? "text-gray-300" : "text-gray-700";
  const accentClass = "text-red-500";
  const sectionHeadingAccent = "text-red-500";
  const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: `border rounded-3xl overflow-hidden transition-all duration-300 ${isDark ? "border-gray-800 bg-gray-900 hover:border-red-500/40" : "border-gray-200 bg-white hover:border-red-200 shadow-sm"}`,
        children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setIsOpen(!isOpen),
              className: `w-full px-8 py-7 flex justify-between items-center text-left transition-all duration-300 hover:bg-red-50 dark:hover:bg-gray-800 ${isOpen ? isDark ? "bg-gray-800" : "bg-red-50" : ""}`,
              children: [
                /* @__PURE__ */ jsx("span", { className: `font-semibold text-lg ${headingClass} pr-6`, children: question }),
                /* @__PURE__ */ jsx("div", { className: `transition-transform duration-300 ${accentClass}`, children: /* @__PURE__ */ jsx(
                  ChevronDown,
                  {
                    size: 28,
                    className: `transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`
                  }
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `overflow-hidden transition-all duration-400 ease-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`,
              children: /* @__PURE__ */ jsx("div", { className: `px-8 pb-9 pt-2 ${bodyClass} leading-relaxed`, children: answer })
            }
          )
        ]
      }
    );
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `min-h-screen overflow-x-hidden transition-colors duration-700
      ${isDark ? "bg-black text-white" : "bg-white text-gray-900"}`,
      children: [
        /* @__PURE__ */ jsx(
          ToastContainer,
          {
            position: "top-right",
            autoClose: 5e3,
            theme: isDark ? "dark" : "light"
          }
        ),
        /* @__PURE__ */ jsxs("section", { className: "relative", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative w-full h-[70vh] min-h-[520px] overflow-hidden", children: [
            HERO_SLIDES.map((slide, index) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: `absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentHeroSlide ? "opacity-100" : "opacity-0"}`,
                children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: slide.image,
                      alt: slide.title,
                      className: "w-full h-full object-cover brightness-[0.85]"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-transparent/30",
                      "w-": true
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center px-5 sm:px-10 ", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-4/5xl ", children: [
                    /* @__PURE__ */ jsxs("h2", { className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4 md:mb-6 drop-shadow-2xl", children: [
                      "Power Your Brand Growth with",
                      /* @__PURE__ */ jsx("br", {}),
                      /* @__PURE__ */ jsxs("span", { className: "text-red-500", children: [
                        "AI KNOTS ",
                        slide.title
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl md:text-2xl text-white/95 font-medium mb-8 md:mb-12 max-w-4xl mx-auto drop-shadow-lg", children: slide.subtitle }),
                    /* @__PURE__ */ jsx(Link, { to: "/service", children: /* @__PURE__ */ jsxs("button", { className: "bg-gradient-to-r from-red-600 via-red-500 to-rose-600 text-white font-bold uppercase tracking-wider px-10 py-5 mb-3 rounded-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1.5 transition-all duration-300 text-lg md:text-xl", children: [
                      slide.cta,
                      " →"
                    ] }) })
                  ] }) })
                ]
              },
              index
            )),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-6 sm:bottom-10 left-0 right-0 flex justify-center gap-4 z-20", children: HERO_SLIDES.map((_, i) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setCurrentHeroSlide(i),
                className: `w-3.5 h-3.5 rounded-full transition-all duration-400 shadow-md ${i === currentHeroSlide ? "bg-red-500 scale-125 ring-2 ring-red-500/60" : "bg-white/60 hover:bg-white/90"}`
              },
              i
            )) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-6 -mt-20 sm:-mt-24 relative z-10", children: /* @__PURE__ */ jsx("div", { className: "bg-white/95 backdrop-blur-lg border border-red-500/30 rounded-2xl shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-6 p-8 md:p-10", children: [
            { n: "10+", l: "Years of Experience" },
            { n: "5x", l: "Average return on Investment" },
            { n: "100+", l: "Businesses Transformation" },
            { n: "50+", l: "Industry we serve" }
          ].map((s, i) => /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "text-red-500 text-4xl md:text-5xl font-extrabold", children: s.n }),
            /* @__PURE__ */ jsx("div", { className: "text-[#0a2342] text-sm md:text-base uppercase tracking-wider mt-2 font-semibold", children: s.l })
          ] }, i)) }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsxs(
              "video",
              {
                autoPlay: true,
                loop: true,
                muted: true,
                playsInline: true,
                className: "absolute inset-0 w-full h-full object-cover",
                children: [
                  /* @__PURE__ */ jsx("source", { src: heroVideo, type: "video/mp4" }),
                  "Your browser does not support the video tag."
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `absolute inset-0 z-10 transition-colors duration-700
              ${isDark ? "bg-gradient-to-br from-black/90 via-black/80 to-black/90" : "bg-gradient-to-br from-slate-950/95 via-slate-950/90 to-black/70"}`
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto text-center relative z-20", children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: "hidden",
              animate: "visible",
              variants: staggerContainer$g,
              children: [
                /* @__PURE__ */ jsxs(
                  motion.h1,
                  {
                    variants: fadeInUp$g,
                    className: "text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-white",
                    children: [
                      "AI Knots",
                      /* @__PURE__ */ jsx("br", {}),
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: isDark ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-red-400 to-white" : "text-red-600",
                          children: "IT SOLUTIONS"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp$g,
                    className: `text-xl md:text-2xl max-w-4xl mx-auto mb-10 leading-relaxed
                ${isDark ? "text-gray-300" : "text-white"}`,
                    children: "Making technology impactful, dependable, and easy to use — for businesses of all sizes."
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp$g,
                    className: `text-lg md:text-xl max-w-3xl mx-auto mb-12
                ${isDark ? "text-gray-400" : "text-white/90"}`,
                    children: "We build secure, future-ready software that drives efficiency and digital transformation."
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    variants: fadeInUp$g,
                    className: "flex flex-col sm:flex-row gap-6 justify-center",
                    children: [
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          onClick: () => setShowPopup(true),
                          className: "group px-10 py-5 rounded-full text-lg font-semibold flex items-center gap-3 transition-all\r\n                  bg-red-600 hover:bg-red-700 active:bg-red-800 text-white",
                          children: [
                            "GET STARTED",
                            /* @__PURE__ */ jsx(ArrowRight, { className: "w-6 h-6 group-hover:translate-x-1 transition-transform" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx(Link, { to: "/portfolio", children: /* @__PURE__ */ jsx(
                        "button",
                        {
                          className: `group px-10 py-5 border-2 rounded-full text-lg font-semibold transition-all
                  ${isDark ? "border-red-600/60 text-red-400 hover:border-red-500 hover:text-red-300" : "border-white/80 text-white hover:bg-white/10"}`,
                          children: "VIEW OUR WORK"
                        }
                      ) })
                    ]
                  }
                )
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-6 md:px-12 lg:px-24 transition-colors
        ${isDark ? "bg-gradient-to-b from-black to-gray-950" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: fadeInUp$g,
                  className: `text-5xl md:text-6xl font-bold text-center mb-6 ${headingClass}`,
                  children: [
                    "OUR ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "SERVICES" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: fadeInUp$g,
                  className: `text-xl text-center mb-16 max-w-3xl mx-auto ${bodyClass}`,
                  children: "Comprehensive IT & BPO solutions — from development to support and infrastructure"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "space-y-20", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(
                    "h3",
                    {
                      className: `text-4xl md:text-5xl font-bold mb-8 text-center tracking-tight ${sectionHeadingAccent}`,
                      children: "Information Technology Services"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: `text-lg md:text-xl mb-12 text-center max-w-4xl mx-auto leading-relaxed ${bodyClass}`,
                      children: "Supporting companies at every stage of the product lifecycle."
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8", children: [Code, ShieldCheck, Users, Server].map((Icon, index) => /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      initial: "hidden",
                      whileInView: "visible",
                      viewport: { once: true },
                      variants: fadeInUp$g,
                      className: cardClass,
                      children: [
                        /* @__PURE__ */ jsx(
                          Icon,
                          {
                            className: `w-12 h-12 md:w-14 md:h-14 mb-6 ${accentClass}`
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "h4",
                          {
                            className: `text-xl md:text-2xl font-bold mb-5 ${headingClass}`,
                            children: [
                              "Development",
                              "Testing",
                              "L2 Support",
                              "Product Assistance"
                            ][index]
                          }
                        ),
                        /* @__PURE__ */ jsxs(
                          "ul",
                          {
                            className: `text-sm md:text-base w-full max-w-xs space-y-3 ${bodyClass}`,
                            children: [
                              index === 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
                                /* @__PURE__ */ jsx("li", { children: "• Web application development" }),
                                /* @__PURE__ */ jsx("li", { children: "• Mobile application development" }),
                                /* @__PURE__ */ jsx("li", { children: "• Secure, scalable & user-friendly solutions" })
                              ] }),
                              index === 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
                                /* @__PURE__ */ jsx("li", { children: "• Web application testing" }),
                                /* @__PURE__ */ jsx("li", { children: "• Mobile application testing" }),
                                /* @__PURE__ */ jsx("li", { children: "• Quality, performance & security assurance" })
                              ] }),
                              index === 2 && /* @__PURE__ */ jsx("li", { children: "• Advanced troubleshooting, in-depth diagnosis & root cause resolution." }),
                              index === 3 && /* @__PURE__ */ jsxs(Fragment, { children: [
                                /* @__PURE__ */ jsx("li", { children: "• Continuous support & maintenance" }),
                                /* @__PURE__ */ jsx("li", { children: "• Ticket & incident management" }),
                                /* @__PURE__ */ jsx("li", { children: "• Change management & SLA tracking" })
                              ] })
                            ]
                          }
                        )
                      ]
                    },
                    index
                  )) })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(
                    "h3",
                    {
                      className: `text-4xl md:text-5xl font-bold mb-8 text-center tracking-tight ${sectionHeadingAccent}`,
                      children: "Business Process Outsourcing (BPO) Services"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: `text-lg md:text-xl mb-12 text-center max-w-3xl mx-auto leading-relaxed ${bodyClass}`,
                      children: "Streamline operations and enhance customer engagement with reliable support."
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8", children: [Headphones, BarChart3, CheckCircle].map((Icon, index) => /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      initial: "hidden",
                      whileInView: "visible",
                      viewport: { once: true },
                      variants: fadeInUp$g,
                      className: cardClass,
                      children: [
                        /* @__PURE__ */ jsx(
                          Icon,
                          {
                            className: `w-12 h-12 md:w-14 md:h-14 mb-6 ${accentClass}`
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "h4",
                          {
                            className: `text-xl md:text-2xl font-bold mb-5 ${headingClass}`,
                            children: [
                              "Voice, Chat &amp; Email",
                              "Cataloguing &amp; Enrichment",
                              "Quality Assurance"
                            ][index]
                          }
                        ),
                        /* @__PURE__ */ jsxs(
                          "ul",
                          {
                            className: `text-sm md:text-base w-full max-w-xs space-y-3 ${bodyClass}`,
                            children: [
                              index === 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
                                /* @__PURE__ */ jsx("li", { children: "• Inbound & outbound voice support" }),
                                /* @__PURE__ */ jsx("li", { children: "• Real-time chat assistance" }),
                                /* @__PURE__ */ jsx("li", { children: "• Structured email & ticketing" })
                              ] }),
                              index === 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
                                /* @__PURE__ */ jsx("li", { children: "• Product descriptions, tags & keywords" }),
                                /* @__PURE__ */ jsx("li", { children: "• Data validation & cleaning" }),
                                /* @__PURE__ */ jsx("li", { children: "• Category & attribute enrichment" })
                              ] }),
                              index === 2 && /* @__PURE__ */ jsx(
                                "p",
                                {
                                  className: `text-sm md:text-base leading-relaxed max-w-xs ${bodyClass}`,
                                  children: "Call/chat audits, SOP/SLA compliance, feedback & continuous improvement."
                                }
                              )
                            ]
                          }
                        )
                      ]
                    },
                    index
                  )) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-center max-w-5xl mx-auto", children: [
                  /* @__PURE__ */ jsx(
                    "h3",
                    {
                      className: `text-4xl md:text-5xl font-bold mb-8 tracking-tight ${sectionHeadingAccent}`,
                      children: "Digital & Marketing Services"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: `text-lg md:text-xl leading-relaxed ${bodyClass} mb-12`,
                      children: "In today’s digital-first world, building a strong online presence is essential for businesses to grow and stay ahead."
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8", children: [Headphones, BarChart3, CheckCircle].map((Icon, index) => /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      initial: "hidden",
                      whileInView: "visible",
                      viewport: { once: true },
                      variants: fadeInUp$g,
                      className: cardClass,
                      children: [
                        /* @__PURE__ */ jsx(
                          Icon,
                          {
                            className: `w-12 h-12 md:w-14 md:h-14 mb-6 ${accentClass}`
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "h4",
                          {
                            className: `text-xl md:text-2xl font-bold mb-5 ${headingClass}`,
                            children: [
                              "Search Engine Optimization",
                              "Social Media Marketing",
                              "Google &amp; Meta Ads"
                            ][index]
                          }
                        ),
                        /* @__PURE__ */ jsxs(
                          "ul",
                          {
                            className: `text-sm md:text-base w-full max-w-xs space-y-3 ${bodyClass}`,
                            children: [
                              index === 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
                                /* @__PURE__ */ jsx("li", { children: "• Boost your website ranking" }),
                                /* @__PURE__ */ jsx("li", { children: "• Increase organic traffic" }),
                                /* @__PURE__ */ jsx("li", { children: "• Attract the right audience" }),
                                /* @__PURE__ */ jsx("li", { children: "• Gain competitive edge" })
                              ] }),
                              index === 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
                                /* @__PURE__ */ jsx("li", { children: "• Reach the right audience" }),
                                /* @__PURE__ */ jsx("li", { children: "• Build trust and brand awareness" }),
                                /* @__PURE__ */ jsx("li", { children: "• Increase engagement" }),
                                /* @__PURE__ */ jsx("li", { children: "• Convert followers into customers" })
                              ] }),
                              index === 2 && /* @__PURE__ */ jsxs(Fragment, { children: [
                                /* @__PURE__ */ jsx("li", { children: "• Targeted ad campaigns" }),
                                /* @__PURE__ */ jsx("li", { children: "• Improve brand visibility" }),
                                /* @__PURE__ */ jsx("li", { children: "• Generate quality leads" }),
                                /* @__PURE__ */ jsx("li", { children: "• Effective PPC strategies" })
                              ] })
                            ]
                          }
                        )
                      ]
                    },
                    index
                  )) })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-6 md:px-12 lg:px-24 ${isDark ? "bg-gray-950" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: fadeInUp$g,
                  className: "text-center mb-16",
                  children: [
                    /* @__PURE__ */ jsx(
                      "h2",
                      {
                        className: `text-5xl md:text-6xl font-bold mb-4 ${headingClass}`,
                        children: "TESTIMONIALS"
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: `text-2xl font-medium ${accentClass}`, children: "Real Results, Real Client Experiences." }),
                    /* @__PURE__ */ jsx("p", { className: `mt-6 text-lg max-w-3xl mx-auto ${bodyClass}`, children: "We focus on performance, transparency, and long-term partnerships." })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: [
                {
                  name: "Swadesh Jyoti",
                  text: "A reliable digital marketing partner. AI Knots understands business needs and works with clear communication."
                },
                {
                  name: "Amina",
                  text: "Working with AI Knots has been a great decision. Their team understands our brand and consistently helps us reach more customers."
                },
                {
                  name: "Bharat e-Filing",
                  text: "AI Knots has helped us improve our digital visibility and attract more clients. Practical and result-focused."
                }
              ].map((testimonial, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: fadeInUp$g,
                  className: `p-8 rounded-3xl h-full flex flex-col ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg border border-gray-100"}`,
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "flex gap-1 text-2xl text-yellow-400 mb-6", children: "★★★★★" }),
                    /* @__PURE__ */ jsxs("p", { className: `flex-1 leading-relaxed mb-8 ${bodyClass}`, children: [
                      '"',
                      testimonial.text,
                      '"'
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: `font-semibold text-lg ${headingClass}`, children: testimonial.name })
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-6 md:px-12 lg:px-24 ${isDark ? "bg-black" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: fadeInUp$g,
                  className: `text-5xl md:text-6xl font-bold text-center mb-16 ${headingClass}`,
                  children: [
                    "WHY ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "CHOOSE US" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-10 lg:gap-16 text-center", children: [
                {
                  icon: Users,
                  title: "True Partnership",
                  desc: "We become an extension of your team — understanding your business deeply."
                },
                {
                  icon: Briefcase,
                  title: "Enterprise Expertise",
                  desc: "Proven experience in BFSI, retail, government & PSU projects."
                },
                {
                  icon: HardDrive,
                  title: "Long-term Support",
                  desc: "24×7 production support, SLA-based maintenance & AMS."
                }
              ].map((item, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: fadeInUp$g,
                  className: `p-10 rounded-3xl border transition-all ${isDark ? "bg-gray-900 border-gray-800 hover:border-red-500/30" : "bg-white border-gray-200 shadow-md hover:shadow-lg"}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8 mx-auto ${isDark ? "bg-gray-800" : "bg-red-50"}`,
                        children: /* @__PURE__ */ jsx(item.icon, { className: `w-10 h-10 ${accentClass}` })
                      }
                    ),
                    /* @__PURE__ */ jsx("h3", { className: `text-3xl font-bold mb-5 ${headingClass}`, children: item.title }),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        className: `leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`,
                        children: item.desc
                      }
                    )
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-6 md:px-12 lg:px-24 ${isDark ? "bg-black" : "bg-white"}`,
            children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-16 items-start", children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: fadeInUp$g,
                  children: [
                    /* @__PURE__ */ jsx(
                      "h2",
                      {
                        className: `text-5xl md:text-6xl font-bold mb-3 ${headingClass}`,
                        children: "Let's Discuss Your Project"
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: `text-xl mb-10 ${bodyClass}`, children: "Tell us about your requirements. Our team will get back to you shortly." }),
                    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
                      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            name: "usernamee",
                            value: formData.usernamee,
                            onChange: handleChange,
                            placeholder: "Your Name",
                            required: true,
                            disabled: loading,
                            className: `w-full px-6 py-4 rounded-2xl border focus:outline-none focus:border-red-500 transition-colors ${isDark ? "bg-gray-900 border-gray-700 text-white" : "bg-gray-50 border-gray-300 text-gray-900"}`
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "email",
                            name: "email",
                            value: formData.email,
                            onChange: handleChange,
                            placeholder: "Your Email",
                            required: true,
                            disabled: loading,
                            className: `w-full px-6 py-4 rounded-2xl border focus:outline-none focus:border-red-500 transition-colors ${isDark ? "bg-gray-900 border-gray-700 text-white" : "bg-gray-50 border-gray-300 text-gray-900"}`
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "tel",
                          name: "phone",
                          value: formData.phone,
                          onChange: handleChange,
                          placeholder: "Mobile Number",
                          required: true,
                          disabled: loading,
                          className: `w-full px-6 py-4 rounded-2xl border focus:outline-none focus:border-red-500 transition-colors ${isDark ? "bg-gray-900 border-gray-700 text-white" : "bg-gray-50 border-gray-300 text-gray-900"}`
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          name: "subject",
                          value: formData.subject,
                          onChange: handleChange,
                          placeholder: "Subject (Optional)",
                          disabled: loading,
                          className: `w-full px-6 py-4 rounded-2xl border focus:outline-none focus:border-red-500 transition-colors ${isDark ? "bg-gray-900 border-gray-700 text-white" : "bg-gray-50 border-gray-300 text-gray-900"}`
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "textarea",
                        {
                          name: "message",
                          value: formData.message,
                          onChange: handleChange,
                          rows: 5,
                          placeholder: "Tell us about your project...",
                          required: true,
                          disabled: loading,
                          className: `w-full px-6 py-4 rounded-3xl border focus:outline-none focus:border-red-500 transition-colors resize-y ${isDark ? "bg-gray-900 border-gray-700 text-white" : "bg-gray-50 border-gray-300 text-gray-900"}`
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        ReCAPTCHA,
                        {
                          sitekey: "6LfP7nEsAAAAAOLxpk34nW3cU3uYXON85c8n4D2H",
                          onChange: handleCaptchaChange,
                          theme: isDark ? "dark" : "light"
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 pt-4", children: [
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "submit",
                            disabled: loading,
                            className: `flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-5 rounded-2xl transition-all text-lg ${loading ? "opacity-70 cursor-not-allowed" : ""}`,
                            children: loading ? "Sending..." : "Submit Inquiry"
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => window.open("https://wa.me/917869636070", "_blank"),
                            className: "flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-5 rounded-2xl transition-all text-lg flex items-center justify-center gap-3",
                            children: "Chat on WhatsApp"
                          }
                        )
                      ] })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: fadeInUp$g,
                  className: "space-y-8",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "rounded-3xl overflow-hidden shadow-2xl border border-gray-200 h-[420px]", children: /* @__PURE__ */ jsx(
                      "iframe",
                      {
                        title: "AI Knots - MP Nagar, Bhopal",
                        src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.8!2d77.432!3d23.198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39631f8a00000001%3A0x0!2sM.P.+Nagar+Zone+2%2C+Bhopal%2C+Madhya+Pradesh+462011!5e0!3m2!1sen!2sin!4v1738000000000!5m2!1sen!2sin",
                        width: "100%",
                        height: "100%",
                        style: { border: 0 },
                        allowFullScreen: "",
                        loading: "lazy",
                        referrerPolicy: "no-referrer-when-downgrade"
                      }
                    ) }),
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: `p-8 rounded-3xl ${isDark ? "bg-gray-900" : "bg-gray-50"}`,
                        children: [
                          /* @__PURE__ */ jsx("h3", { className: `text-2xl font-semibold mb-4 ${headingClass}`, children: "AI Knots Solutions" }),
                          /* @__PURE__ */ jsxs("p", { className: `leading-relaxed ${bodyClass}`, children: [
                            "103, Goyal Vihar,",
                            /* @__PURE__ */ jsx("br", {}),
                            "Plot No 31-C, Zone 2,",
                            /* @__PURE__ */ jsx("br", {}),
                            "M.P. Nagar, Bhopal - 462011",
                            /* @__PURE__ */ jsx("br", {}),
                            "Madhya Pradesh, India"
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-2", children: [
                            /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "tel:+917869636070",
                                className: "block text-red-500 hover:underline",
                                children: "+91 78696 36070"
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "mailto:admin@atlaknots.com",
                                className: "block text-red-500 hover:underline",
                                children: "admin@atlaknots.com"
                              }
                            )
                          ] })
                        ]
                      }
                    )
                  ]
                }
              )
            ] }) })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `relative py-20 md:py-24 lg:py-28 px-5 sm:px-8 md:px-10 lg:px-16 overflow-hidden rounded-3xl my-12 md:my-16
          ${isDark ? "bg-gray-950/90 border border-red-900/50" : "bg-white border border-gray-100 shadow-2xl"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: fadeInUp$g,
                  className: "text-center mb-16",
                  children: [
                    /* @__PURE__ */ jsxs(
                      "h2",
                      {
                        className: `text-5xl md:text-6xl font-bold mb-4 ${headingClass}`,
                        children: [
                          "FREQUENTLY ASKED ",
                          /* @__PURE__ */ jsx("span", { className: accentClass, children: "QUESTIONS" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: `text-xl ${bodyClass}`, children: "Find quick answers to common questions about our services" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
                {
                  q: "What services does your IT company provide?",
                  a: "We offer comprehensive end-to-end IT services including Web & Mobile App Development, Custom Software Development, QA Testing, L2/L3 Support, BPO (Voice, Chat, Email), Digital Marketing (SEO, SMM, PPC, Content), Cloud Solutions, and Professional IT Training programs."
                },
                {
                  q: "Do you work with startups or only large enterprises?",
                  a: "We work with businesses of all sizes — from startups and SMEs to large enterprises, government projects, and PSUs."
                },
                {
                  q: "How long does it take to complete a project?",
                  a: "Project timelines depend on scope and complexity. A simple static website takes 3–6 weeks, while a full-scale web/mobile application or complex ERP/CRM project can take 3–8 months."
                },
                {
                  q: "Do you provide ongoing support and maintenance?",
                  a: "Yes. We provide 24×7 production support, SLA-based Annual Maintenance Contracts (AMC), Application Management Services (AMS), and dedicated support teams."
                },
                {
                  q: "What is the process for starting a project with you?",
                  a: "It starts with a free consultation call → detailed requirement gathering → proposal with timeline & cost estimate → NDA & agreement → project kickoff with regular sprint reviews and updates."
                },
                {
                  q: "Do you offer free demos or consultations?",
                  a: "Absolutely! We offer free initial consultations, requirement analysis sessions, and live demos of similar projects we have delivered."
                },
                {
                  q: "Where is your IT company located?",
                  a: "We are based in Bhopal, Madhya Pradesh (M.P. Nagar Zone 2). We serve clients across India and globally through remote and on-site models."
                },
                {
                  q: "What makes your IT company different from others?",
                  a: "We focus on long-term partnerships, complete transparency, result-oriented delivery, quality-first approach, and post-delivery support rather than just project completion."
                },
                {
                  q: "Do you sign NDAs and ensure data security?",
                  a: "Yes. We sign NDAs with every client and follow strict data security protocols, ISO standards, and secure development practices."
                }
              ].map((faq, index) => /* @__PURE__ */ jsx(FAQItem, { question: faq.q, answer: faq.a }, index)) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-20 px-6 md:px-12 lg:px-24 ${isDark ? "bg-gray-950" : "bg-white"}`,
            children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto text-center", children: /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: "hidden",
                whileInView: "visible",
                viewport: { once: true },
                variants: fadeInUp$g,
                children: [
                  /* @__PURE__ */ jsxs(
                    "h2",
                    {
                      className: `text-5xl md:text-6xl font-bold mb-6 ${headingClass}`,
                      children: [
                        "Explore Our ",
                        /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Portfolio" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: `text-xl max-w-2xl mx-auto mb-10 ${bodyClass}`, children: "Discover our latest projects in web development, digital marketing, and IT solutions that have delivered real results for our clients." }),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: goToPortfolio,
                      className: "group inline-flex items-center gap-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg px-12 py-5 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
                      children: [
                        "View Complete Portfolio",
                        /* @__PURE__ */ jsx(ArrowRight, { className: "w-6 h-6 group-hover:translate-x-1 transition-transform" })
                      ]
                    }
                  )
                ]
              }
            ) })
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { children: showPopup && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4",
            onClick: () => setShowPopup(false),
            children: /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { scale: 0.9, y: 40, opacity: 0 },
                animate: { scale: 1, y: 0, opacity: 1 },
                exit: { scale: 0.9, y: 40, opacity: 0 },
                transition: { duration: 0.3, ease: "easeOut" },
                className: "bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col lg:flex-row max-h-[92vh]",
                onClick: (e) => e.stopPropagation(),
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "lg:w-1/2 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 p-8 lg:p-10 pb-16 flex flex-col", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
                      /* @__PURE__ */ jsx("div", { className: "bg-red-600 text-white font-bold px-6 py-2 rounded-full text-sm tracking-wider", children: "LIMITED TIME OFFER" }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setShowPopup(false),
                          className: "text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors",
                          children: /* @__PURE__ */ jsx(X, { size: 28 })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("h2", { className: "text-3xl lg:text-4xl font-bold leading-tight text-gray-900 dark:text-white mb-3", children: [
                      "Get up to ",
                      /* @__PURE__ */ jsx("span", { className: "text-red-600", children: "5% OFF" }),
                      /* @__PURE__ */ jsx("br", {}),
                      "on IT Services & Business Solutions"
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-lg text-red-600 font-medium mb-5", children: "Grow Your Business with Atla Knots IT Solution" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative flex justify-center my-5", children: [
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070",
                          alt: "AI Knots IT Services",
                          className: "w-56 lg:w-72 rounded-3xl shadow-2xl object-cover"
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { className: "absolute -top-5 -left-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 text-center", children: [
                        /* @__PURE__ */ jsx("p", { className: "text-red-600 font-semibold text-sm", children: "★ Top Rated" }),
                        /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white text-xs mt-1", children: "AI Knots" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "absolute -bottom-5 -right-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 text-center", children: [
                        /* @__PURE__ */ jsx("p", { className: "text-red-600 font-bold text-sm", children: "Bhopal Based" }),
                        /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900 dark:text-white text-xs mt-1", children: "Pan India Delivery" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mt-auto grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700 dark:text-gray-300", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-600" }),
                        " Web & Mobile App"
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-600" }),
                        " Digital Marketing"
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-600" }),
                        " 24×7 Support"
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-600" }),
                        " 100+ Projects Delivered"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "lg:w-1/2 bg-white dark:bg-gray-900 p-8 lg:p-10 pb-16 flex flex-col", children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-red-600 text-2xl font-bold", children: "Book Your FREE IT Consultation Today" }),
                      /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 mt-1 text-sm", children: "Get expert advice • No obligation • Quick Response" })
                    ] }),
                    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5 flex-1", children: [
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          name: "usernamee",
                          value: formData.usernamee,
                          onChange: handleChange,
                          placeholder: "Full Name *",
                          required: true,
                          disabled: loading,
                          className: "w-full px-5 py-3.5 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-red-500 outline-none"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "email",
                          name: "email",
                          value: formData.email,
                          onChange: handleChange,
                          placeholder: "Email ID *",
                          required: true,
                          disabled: loading,
                          className: "w-full px-5 py-3.5 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-red-500 outline-none"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "tel",
                          name: "phone",
                          value: formData.phone,
                          onChange: handleChange,
                          placeholder: "Mobile Number *",
                          required: true,
                          disabled: loading,
                          className: "w-full px-5 py-3.5 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-red-500 outline-none"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        ReCAPTCHA,
                        {
                          sitekey: "6LfP7nEsAAAAAOLxpk34nW3cU3uYXON85c8n4D2H",
                          onChange: handleCaptchaChange,
                          theme: isDark ? "dark" : "light"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "submit",
                          disabled: loading,
                          className: "w-full py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-2xl text-lg transition-all shadow-md mt-4",
                          children: loading ? "Submitting..." : "Get Free Consultation"
                        }
                      ),
                      /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-gray-500 dark:text-gray-400 mt-4", children: "✅ No spam • 100% Free Consultation • Confidential" })
                    ] })
                  ] })
                ]
              }
            )
          }
        ) })
      ]
    }
  );
}
const img4$1 = "/assets/Atlaimage-DjKCzzdx.jpg";
const img1$2 = "/assets/22-RmXeTiCY.png";
const img2$1 = "/assets/32-Bnt2LwWq.png";
const img3$1 = "/assets/24-FL7r0Yio.png";
const MobileOnboarding = () => {
  const { isDark } = useTheme();
  const images2 = [img1$2, img2$1, img3$1];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % images2.length);
    }, 3e3);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: `min-h-screen transition-colors duration-500 ${isDark ? "bg-black" : "bg-gray-50"} px-4 py-16`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center md:text-left md:w-1/2", children: [
      /* @__PURE__ */ jsx("h1", { className: `text-2xl md:text-4xl font-bold mb-4 leading-snug transition-colors ${isDark ? "text-white" : "text-gray-900"}`, children: "The Revolutionary App That Helps To Control Your Digital Business" }),
      /* @__PURE__ */ jsx("p", { className: `text-sm md:text-base leading-relaxed mb-6 transition-colors ${isDark ? "text-gray-400" : "text-gray-600"}`, children: "Smart IT solutions to manage, scale and grow your business with secure, modern and high-performance technology." }),
      /* @__PURE__ */ jsx("button", { className: "inline-block px-8 py-3 rounded-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium transition-all duration-200 active:scale-95 shadow-lg shadow-red-500/30", children: "Get Started" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "md:w-1/2 flex justify-center", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: `relative w-60 h-[420px] 
              sm:w-64 sm:h-[460px]
              md:w-72 md:h-[520px]
              rounded-[2.5rem] 
              transition-all duration-500
              ${isDark ? "bg-zinc-950 shadow-[0_20px_60px_rgba(185,28,28,0.4)] ring-1 ring-zinc-800" : "bg-zinc-900 shadow-[0_20px_60px_rgba(255,0,0,0.25)] ring-1 ring-gray-300"}`,
        children: /* @__PURE__ */ jsxs("div", { className: `relative w-full h-full rounded-[2rem] overflow-hidden transition-colors ${isDark ? "bg-gradient-to-br from-zinc-950 via-black to-red-950" : "bg-white"}`, children: [
          /* @__PURE__ */ jsx("div", { className: "relative w-full h-full overflow-hidden", children: images2.map((img, index) => /* @__PURE__ */ jsx(
            "img",
            {
              src: img,
              alt: `Onboarding ${index + 1}`,
              className: `absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${active === index ? "opacity-100" : "opacity-0"}`
            },
            index
          )) }),
          /* @__PURE__ */ jsxs("div", { className: `absolute bottom-0 w-full px-5 pb-12 bg-gradient-to-t transition-colors ${isDark ? "from-black/90 via-black/70 to-transparent" : "from-black/80 via-black/60 to-transparent"}`, children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-2 mb-4", children: images2.map((_, i) => /* @__PURE__ */ jsx(
              "span",
              {
                className: `w-2 h-2 rounded-full transition-all duration-300 ${active === i ? "bg-red-500 scale-125" : isDark ? "bg-red-500/40" : "bg-red-500/50"}`
              },
              i
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs uppercase tracking-wider font-medium", children: [
              /* @__PURE__ */ jsx("button", { className: `transition-colors ${isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-300 hover:text-white"}`, children: "Skip" }),
              /* @__PURE__ */ jsx("button", { className: "font-semibold text-red-400 hover:text-red-300 transition-colors", children: "Next" })
            ] })
          ] })
        ] })
      }
    ) })
  ] }) });
};
const img1$1 = "/assets/mobileviewpart1-0Y9c2cFS.png";
const img6$1 = "/assets/mobileview-C2Zwqsh5.png";
const FounderImg = "/assets/nagar-CkDA4frb.jpg";
const MdImg = "/assets/managerdirector-DjZp5GeT.jpeg";
const CeoImg = "/assets/CEO-Ck_H0bQ0.jpg";
const CtoImg = "/assets/CTO-WnJ5B38L.jpg";
const OurTeam = "/assets/OurTeam-DW4GDYnk.jpg";
const OurTeam2 = "/assets/silder-DJlbwNbX.jpeg";
const OurTeam3 = "/assets/silder3-D_dqVwtz.jpeg";
function Counter({ value, duration = 2.5 }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    const target = Number(value) || 0;
    const controls = animate(count, target, { duration, ease: "easeOut" });
    return () => controls.stop();
  }, [isInView, value, duration, count]);
  return /* @__PURE__ */ jsx("div", { ref, className: "inline-block", children: /* @__PURE__ */ jsx(motion.span, { children: rounded }) });
}
const AnimatedSphere = ({ position, color }) => {
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 3e-3;
      meshRef.current.rotation.y += 4e-3;
      meshRef.current.position.y = position[1] + Math.sin(Date.now() * 6e-4 + position[0]) * 0.18;
    }
  });
  return /* @__PURE__ */ jsx(Float, { speed: 1.1, rotationIntensity: 0.5, floatIntensity: 0.9, children: /* @__PURE__ */ jsx(Sphere, { ref: meshRef, args: [1.1, 42, 42], position, children: /* @__PURE__ */ jsx(
    "meshStandardMaterial",
    {
      color,
      roughness: 0.55,
      metalness: 0.35,
      transparent: true,
      opacity: 0.82
    }
  ) }) });
};
const Scene3D = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx(PerspectiveCamera, { makeDefault: true, position: [0, 0, 9.5] }),
  /* @__PURE__ */ jsx(
    OrbitControls,
    {
      enableZoom: false,
      enablePan: false,
      autoRotate: true,
      autoRotateSpeed: 0.7
    }
  ),
  /* @__PURE__ */ jsx("ambientLight", { intensity: 0.65 }),
  /* @__PURE__ */ jsx("pointLight", { position: [10, 10, 10], intensity: 1.3, color: "#dc2626" }),
  /* @__PURE__ */ jsx("pointLight", { position: [-10, -10, -10], intensity: 0.85, color: "#ef4444" }),
  /* @__PURE__ */ jsx("pointLight", { position: [0, 6, 6], intensity: 1, color: "#f87171" }),
  /* @__PURE__ */ jsx(AnimatedSphere, { position: [-2.8, 1.8, -2.2], color: "#dc2626" }),
  /* @__PURE__ */ jsx(AnimatedSphere, { position: [2.8, -1.6, -1.8], color: "#ef4444" }),
  /* @__PURE__ */ jsx(AnimatedSphere, { position: [0.4, 2.4, 0.8], color: "#f87171" }),
  /* @__PURE__ */ jsx(AnimatedSphere, { position: [-1.2, -2.1, -3.5], color: "#991b1b" }),
  /* @__PURE__ */ jsx(Environment, { preset: "city" })
] });
const particlesOptions$1 = {
  fullScreen: { enable: true, zIndex: -1 },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: { enable: true, mode: "repulse" },
      resize: true
    },
    modes: { push: { quantity: 4 }, repulse: { distance: 140, duration: 0.4 } }
  },
  particles: {
    color: { value: ["#dc2626", "#ef4444", "#f87171"] },
    links: {
      color: "#dc2626",
      distance: 140,
      enable: true,
      opacity: 0.15,
      width: 1
    },
    move: {
      direction: "none",
      enable: true,
      outModes: { default: "bounce" },
      random: true,
      speed: 1.1,
      straight: false
    },
    number: { density: { enable: true, area: 800 }, value: 70 },
    opacity: { value: 0.35 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3.5 } }
  },
  detectRetina: true
};
const fadeInUp$f = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};
const staggerContainer$f = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};
const imageVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 1.1, ease: "easeOut" } },
  exit: { opacity: 0, x: -40, transition: { duration: 1.1, ease: "easeIn" } }
};
const LinkedInIcon = () => /* @__PURE__ */ jsx("svg", { className: "w-7 h-7", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" }) });
const GitHubIcon = () => /* @__PURE__ */ jsx("svg", { className: "w-7 h-7", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" }) });
const FAQAccordion$1 = ({ isDark }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs2 = [
    {
      question: "What kind of projects do you take?",
      answer: "We handle custom web & mobile applications, enterprise software, government / PSU compliant systems, cloud migrations, legacy modernization, and full digital transformation initiatives."
    },
    {
      question: "Do you provide maintenance after launch?",
      answer: "Yes — we offer comprehensive Application Maintenance Services (AMS) including proactive monitoring, bug fixes, performance optimization, security patches, and regular updates."
    },
    {
      question: "What are your BPO working hours?",
      answer: "We provide 24/7 support coverage with multiple shifts. Most clients choose 24×5 or 24×7 depending on their time zone and SLA requirements."
    },
    {
      question: "Which technologies do you work with?",
      answer: "Frontend: React, Next.js, TypeScript | Backend: Java + Spring Boot, Node.js, Python | Databases: PostgreSQL, MongoDB, MySQL | Cloud: AWS, Azure, GCP | Others: Docker, Kubernetes, CI/CD pipelines."
    },
    {
      question: "How do you ensure data security & compliance?",
      answer: "We follow ISO 27001 practices, implement encryption at rest & in transit, conduct regular security audits, follow GDPR / DPDP / IT Act guidelines (where applicable), and provide role-based access control."
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "space-y-5", children: faqs2.map((faq, index) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: `group backdrop-blur-lg border rounded-2xl overflow-hidden shadow-xl transition-all duration-300 ${isDark ? "bg-gray-950/75 border-red-900/50 hover:shadow-red-900/40" : "bg-white border-gray-200 hover:shadow-red-200/60 shadow-gray-200"}`,
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setOpenIndex(openIndex === index ? null : index),
            className: `w-full px-6 md:px-8 py-6 text-left flex items-center justify-between transition-colors duration-300 ${isDark ? "hover:bg-red-950/40" : "hover:bg-red-50"}`,
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `text-xl md:text-2xl font-semibold transition-colors ${isDark ? "text-white group-hover:text-red-300" : "text-gray-900 group-hover:text-red-600"}`,
                  children: faq.question
                }
              ),
              /* @__PURE__ */ jsx(
                ChevronDown,
                {
                  className: `w-7 h-7 md:w-8 md:h-8 flex-shrink-0 text-red-500 transition-transform duration-300 ${openIndex === index ? "rotate-180 scale-110" : "scale-100"}`
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: false,
            animate: {
              height: openIndex === index ? "auto" : 0,
              opacity: openIndex === index ? 1 : 0
            },
            transition: { duration: 0.4, ease: "easeInOut" },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: `px-6 md:px-8 pb-6 pt-3 leading-relaxed text-base md:text-lg border-t ${isDark ? "text-gray-200 border-red-900/40" : "text-gray-700 border-gray-200"}`,
                children: faq.answer
              }
            )
          }
        )
      ]
    },
    index
  )) });
};
const LeaderCard = ({
  img,
  alt,
  name,
  role,
  exp,
  desc,
  linkedIn,
  github,
  isDark
}) => /* @__PURE__ */ jsxs(
  motion.div,
  {
    variants: scaleIn,
    whileHover: { scale: 1.05, y: -10 },
    className: `backdrop-blur-sm border rounded-2xl overflow-hidden shadow-xl transition-all duration-300 ${isDark ? "bg-gray-900/60 border-red-900/30 shadow-red-950/30" : "bg-white border-gray-200 shadow-gray-200"}`,
    children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("img", { src: img, alt, className: "w-full h-64 object-cover" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 text-center", children: [
        /* @__PURE__ */ jsx(
          "h3",
          {
            className: `text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`,
            children: name
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "font-semibold mb-2 text-red-500", children: role }),
        /* @__PURE__ */ jsx(
          "p",
          {
            className: `text-sm mb-3 ${isDark ? "text-gray-400" : "text-gray-500"}`,
            children: exp
          }
        ),
        /* @__PURE__ */ jsx(
          "p",
          {
            className: `text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`,
            children: desc
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-6 mt-4", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: linkedIn,
              target: "_blank",
              rel: "noopener noreferrer",
              className: `transition-colors ${isDark ? "text-gray-400 hover:text-red-500" : "text-gray-500 hover:text-red-500"}`,
              children: /* @__PURE__ */ jsx(LinkedInIcon, {})
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: github,
              target: "_blank",
              rel: "noopener noreferrer",
              className: `transition-colors ${isDark ? "text-gray-400 hover:text-red-500" : "text-gray-500 hover:text-red-500"}`,
              children: /* @__PURE__ */ jsx(GitHubIcon, {})
            }
          )
        ] })
      ] })
    ]
  }
);
function About() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    category: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const teamImages = [OurTeam2, OurTeam3];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () => setActiveTestimonial((prev) => (prev + 1) % 3),
      5e3
    );
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const interval = setInterval(
      () => setActiveImageIndex((prev) => (prev + 1) % teamImages.length),
      4800
    );
    return () => clearInterval(interval);
  }, []);
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await axios.post("http://localhost:8000/query/create", formData);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        category: ""
      });
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess(false);
      }, 2e3);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const testimonials = [
    {
      text: "The website exceeded our expectations. The design is clean, professional, and helped us get more leads. Highly recommended!",
      author: "Dabeer",
      rating: 5
    },
    {
      text: "Very professional service. Our online presence improved significantly after launching the website and running ads.",
      author: "Karamveer",
      rating: 4
    },
    {
      text: "Amazing work! From website development to Meta Ads management, everything was handled perfectly",
      author: "Aman",
      rating: 5
    }
  ];
  const bg = isDark ? "bg-black" : "bg-gray-50";
  const text = isDark ? "text-white" : "text-gray-900";
  const subText = isDark ? "text-gray-300" : "text-gray-600";
  const inputClass = isDark ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-red-600" : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-red-500";
  const headingClass = isDark ? "text-white" : "text-gray-900";
  const bodyClass = isDark ? "text-gray-300" : "text-gray-700";
  const cardClass = isDark ? "bg-gray-900/70 border-red-900/40 hover:border-red-700/60 hover:shadow-red-950/50" : "bg-white border-gray-200 hover:border-red-200 hover:shadow-xl";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `min-h-screen ${bg} ${text} relative overflow-x-hidden transition-colors duration-500`,
      children: [
        isDark && /* @__PURE__ */ jsx(
          Particles,
          {
            id: "tsparticles",
            init: particlesInit,
            options: particlesOptions$1,
            className: "absolute inset-0 z-0"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 pointer-events-none z-0", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `absolute top-20 right-0 w-96 h-96 rounded-full blur-3xl animate-pulse ${isDark ? "bg-red-600/20" : "bg-red-100/60"}`
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `absolute bottom-40 left-0 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${isDark ? "bg-red-800/15" : "bg-red-100/40"}`
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=2340&q=80",
                alt: "About Background",
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `absolute inset-0 ${isDark ? "bg-gradient-to-br from-black/85 via-black/75 to-black/90" : "bg-gradient-to-br from-black/60 via-black/50 to-black/40"}`
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-10", children: /* @__PURE__ */ jsx(Canvas, { children: /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(Scene3D, {}) }) }) }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `absolute inset-0 z-20 ${isDark ? "bg-gradient-to-br from-red-950/40 via-black/60 to-black/80" : "bg-gradient-to-br from-red-50/70 via-white/60 to-white/80"}`
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: "hidden",
              animate: "visible",
              variants: staggerContainer$f,
              className: "relative z-30 w-full max-w-7xl mx-auto text-center",
              children: [
                /* @__PURE__ */ jsxs(motion.div, { variants: fadeInUp$f, className: "mb-10 pt-20 md:pt-24", children: [
                  /* @__PURE__ */ jsx(
                    "h1",
                    {
                      className: `text-6xl md:text-7xl lg:text-8xl font-black mb-6 ${text}`,
                      children: "ABOUT AI Knots"
                    }
                  ),
                  /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold", children: /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: isDark ? "text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-600" : "text-red-600",
                      children: "Your Technology Partner"
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxs(
                  motion.p,
                  {
                    variants: fadeInUp$f,
                    className: `text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed px-4 ${subText}`,
                    children: [
                      "We provide complete digital services,",
                      " ",
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: `font-semibold ${isDark ? "text-red-500" : "text-red-600"}`,
                          children: "including SEO, digital marketing,"
                        }
                      ),
                      " ",
                      "website development, social media management, software development, and ERP solutions."
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "space-y-16 lg:space-y-24 pb-16 pt-20", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-stretch min-h-[500px] lg:min-h-[680px]", children: [
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: `w-full md:w-5/12 z-10 flex flex-col justify-center order-2 md:order-1 px-6 md:px-10 lg:px-16 py-12 md:py-16 ${isDark ? "bg-gradient-to-r from-gray-900/90 to-transparent" : "bg-gradient-to-r from-white/95 to-transparent"}`,
                        children: [
                          /* @__PURE__ */ jsxs(
                            "h3",
                            {
                              className: `text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 ${text}`,
                              children: [
                                "Building the ",
                                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Future" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "p",
                            {
                              className: `text-lg md:text-xl leading-relaxed mb-8 max-w-xl ${subText}`,
                              children: "At we believe technology should empower—not complicate."
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              onClick: () => setIsModalOpen(true),
                              className: "px-8 py-4 rounded-full font-semibold transition w-fit text-white bg-red-600 hover:bg-red-700",
                              children: "Get Started"
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "w-full md:w-7/12 self-end order-1 md:order-2", children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: img4$1,
                        alt: "Collaboration",
                        className: "w-full h-full object-cover"
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row-reverse items-stretch min-h-[500px] lg:min-h-[680px]", children: [
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: `w-full md:w-5/12 z-10 flex flex-col justify-center px-6 md:px-10 lg:px-16 py-12 md:py-16 ${isDark ? "bg-gradient-to-l from-gray-900/90 to-transparent" : "bg-gradient-to-l from-white/95 to-transparent"}`,
                        children: [
                          /* @__PURE__ */ jsxs(
                            "h3",
                            {
                              className: `text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 ${text}`,
                              children: [
                                "Innovation Meets",
                                " ",
                                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Excellence" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "p",
                            {
                              className: `text-lg md:text-xl leading-relaxed mb-8 max-w-xl ${subText}`,
                              children: "We transform businesses through seamless digital solutions."
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "w-full md:w-7/12 relative group overflow-hidden order-1 md:order-2", children: [
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: img1$1,
                          alt: "Innovation",
                          className: "w-full h-full object-contain md:object-cover transition-opacity duration-500 group-hover:opacity-0"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: img6$1,
                          alt: "Innovation Hover",
                          className: "w-full h-full object-contain md:object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    variants: fadeInUp$f,
                    className: "mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center px-4",
                    children: [
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          onClick: () => setIsModalOpen(true),
                          className: "px-12 py-6 rounded-full text-xl font-bold transition flex items-center gap-2 text-white bg-gradient-to-r from-red-600 to-red-800 shadow-lg shadow-red-900/50 hover:shadow-red-900/70",
                          children: [
                            "Start Building Your Future ",
                            /* @__PURE__ */ jsx(ArrowRight, { className: "w-6 h-6" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          onClick: () => navigate("/recentwork"),
                          className: "px-10 py-6 border-2 rounded-full transition flex items-center gap-3 font-medium border-red-600/60 hover:bg-red-950/20 text-red-400",
                          children: [
                            "See Our Solutions ",
                            /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(AnimatePresence, { children: isModalOpen && /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4",
                    onClick: (e) => e.target === e.currentTarget && setIsModalOpen(false),
                    children: /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        initial: { scale: 0.8, opacity: 0, y: 50 },
                        animate: { scale: 1, opacity: 1, y: 0 },
                        exit: { scale: 0.8, opacity: 0, y: 50 },
                        className: `border rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden ${isDark ? "bg-gray-900 border-red-900/30" : "bg-white border-gray-200"}`,
                        children: [
                          /* @__PURE__ */ jsxs(
                            "div",
                            {
                              className: `px-6 py-4 flex justify-between items-center ${isDark ? "bg-gradient-to-r from-red-900/80 to-red-800/60" : "bg-gradient-to-r from-red-700 to-red-600"}`,
                              children: [
                                /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white", children: "Get in Touch" }),
                                /* @__PURE__ */ jsx(
                                  "button",
                                  {
                                    onClick: () => setIsModalOpen(false),
                                    className: "text-white hover:text-red-300 transition",
                                    children: /* @__PURE__ */ jsx(X, { className: "w-7 h-7" })
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-5", children: [
                            ["name", "email", "phone"].map((field) => /* @__PURE__ */ jsx(
                              "input",
                              {
                                type: field === "email" ? "email" : field === "phone" ? "tel" : "text",
                                name: field,
                                placeholder: `${field.charAt(0).toUpperCase() + field.slice(1)} *`,
                                value: formData[field],
                                onChange: handleChange,
                                required: true,
                                className: `w-full px-4 py-3 border rounded-lg focus:outline-none ${inputClass}`
                              },
                              field
                            )),
                            /* @__PURE__ */ jsxs(
                              "select",
                              {
                                name: "category",
                                value: formData.category,
                                onChange: handleChange,
                                required: true,
                                className: `w-full px-4 py-3 border rounded-lg focus:outline-none ${inputClass}`,
                                children: [
                                  /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Select Category *" }),
                                  /* @__PURE__ */ jsx("option", { value: "SEO", children: "SEO" }),
                                  /* @__PURE__ */ jsx("option", { value: "Software Developer", children: "Software Developer" }),
                                  /* @__PURE__ */ jsx("option", { value: "BPO", children: "BPO" }),
                                  /* @__PURE__ */ jsx("option", { value: "Digital Marketing", children: "Digital Marketing" }),
                                  /* @__PURE__ */ jsx("option", { value: "Web Development", children: "Web Development" }),
                                  /* @__PURE__ */ jsx("option", { value: "Other", children: "Other" })
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "textarea",
                              {
                                name: "message",
                                placeholder: "Your Message / Requirement...",
                                value: formData.message,
                                onChange: handleChange,
                                rows: 4,
                                className: `w-full px-4 py-3 border rounded-lg focus:outline-none ${inputClass}`
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "button",
                              {
                                type: "submit",
                                disabled: loading,
                                className: `w-full py-4 rounded-lg font-bold text-lg text-white transition ${loading ? "bg-gray-700 cursor-not-allowed" : "bg-red-700 hover:bg-red-600 shadow-lg shadow-red-900/40"}`,
                                children: loading ? "Sending..." : "Submit Inquiry"
                              }
                            ),
                            success && /* @__PURE__ */ jsx("p", { className: "text-green-500 text-center font-medium", children: "Thank you! We'll get back to you soon." }),
                            error && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-center", children: error })
                          ] })
                        ]
                      }
                    )
                  }
                ) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `relative py-16 px-4 sm:px-6 lg:px-8 transition-colors ${isDark ? "bg-black" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: staggerContainer$f,
                  className: "text-center mb-12",
                  children: /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: `text-xl md:text-2xl max-w-4xl mx-auto px-4 ${subText}`,
                      children: "Technology that connects. Solutions that deliver. Partnerships that last."
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `relative h-96 mb-12 rounded-2xl overflow-hidden border ${isDark ? "border-red-900/20" : "border-red-100"}`,
                  children: /* @__PURE__ */ jsx(Canvas, { children: /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(Scene3D, {}) }) })
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: staggerContainer$f,
                  className: "grid md:grid-cols-2 gap-8 items-center mb-12",
                  children: [
                    /* @__PURE__ */ jsxs(motion.div, { variants: fadeInLeft, className: "space-y-6", children: [
                      /* @__PURE__ */ jsx("h5", { className: "font-semibold text-xl text-red-500", children: "About Our Solution" }),
                      /* @__PURE__ */ jsx("h2", { className: `text-4xl md:text-5xl font-bold ${text}`, children: "#1 Partner For Your Business Growth" }),
                      /* @__PURE__ */ jsx("p", { className: `text-lg leading-relaxed ${subText}`, children: "We deliver cutting-edge technology solutions that transform businesses..." }),
                      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-8 my-8", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("div", { className: `text-4xl font-black text-red-500`, children: "50+" }),
                          /* @__PURE__ */ jsx("p", { className: subText, children: "Projects Delivered" })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("div", { className: `text-4xl font-black text-red-500`, children: "100+" }),
                          /* @__PURE__ */ jsx("p", { className: subText, children: "Happy Clients" })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setIsModalOpen(true),
                          className: "px-10 py-4 rounded-full text-lg font-semibold transition text-white bg-red-600 hover:bg-red-700",
                          children: "Read More →"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        variants: fadeInRight,
                        className: `relative rounded-2xl shadow-2xl overflow-hidden border aspect-[4/3] md:aspect-[5/4] lg:aspect-[3/2] ${isDark ? "border-red-900/30" : "border-gray-200"}`,
                        children: [
                          /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: /* @__PURE__ */ jsx(
                            motion.img,
                            {
                              src: teamImages[activeImageIndex],
                              alt: "Our team working",
                              className: "absolute inset-0 w-full h-full object-cover",
                              variants: imageVariants,
                              initial: "initial",
                              animate: "animate",
                              exit: "exit"
                            },
                            activeImageIndex
                          ) }),
                          /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-0 right-0 flex justify-center gap-2.5 z-10", children: teamImages.map((_, idx) => /* @__PURE__ */ jsx(
                            "button",
                            {
                              onClick: () => setActiveImageIndex(idx),
                              className: `w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === activeImageIndex ? "bg-red-500 shadow-md shadow-red-600/50 scale-125" : "bg-white/50 hover:bg-white/80"}`
                            },
                            idx
                          )) })
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: staggerContainer$f,
                  className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12",
                  children: [
                    { num: "50+", label: "Projects Delivered", icon: Code },
                    { num: "24/7", label: "Support Coverage", icon: Headphones },
                    { num: "90%", label: "Uptime Commitment", icon: ShieldCheck },
                    { num: "99+", label: "Happy Clients", icon: Users }
                  ].map((item, index) => {
                    const isAnimated = !item.num.includes("/");
                    const numericValue = isAnimated ? parseFloat(item.num) : null;
                    return /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        variants: scaleIn,
                        whileHover: isDark ? { scale: 1.05, y: -8 } : {},
                        className: `border rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[220px] transition-all duration-300
                    ${isDark ? "bg-gradient-to-br from-gray-900 to-black border-red-900/30" : "bg-white border-gray-200 shadow-md"}`,
                        children: [
                          /* @__PURE__ */ jsx(
                            item.icon,
                            {
                              className: `w-14 h-14 mx-auto mb-5 text-red-500`
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: `text-5xl md:text-6xl lg:text-7xl font-black mb-2 tracking-tight leading-none ${text}`,
                              children: isAnimated ? /* @__PURE__ */ jsxs(Fragment, { children: [
                                /* @__PURE__ */ jsx(Counter, { value: numericValue, duration: 2.6 }),
                                item.num.includes("+") && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "+" }),
                                item.num.includes("%") && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "%" })
                              ] }) : /* @__PURE__ */ jsxs("span", { className: "flex items-baseline justify-center gap-1", children: [
                                /* @__PURE__ */ jsx("span", { children: "24" }),
                                /* @__PURE__ */ jsx("span", { className: "text-6xl font-black text-red-500", children: "/" }),
                                /* @__PURE__ */ jsx("span", { children: "7" })
                              ] })
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "p",
                            {
                              className: `text-lg md:text-xl font-medium mt-3 ${subText}`,
                              children: item.label
                            }
                          )
                        ]
                      },
                      index
                    );
                  })
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "mb-12", children: /* @__PURE__ */ jsx(MobileOnboarding, {}) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `relative py-16 px-4 sm:px-6 lg:px-8 transition-colors ${isDark ? "bg-gradient-to-b from-black to-gray-950" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: staggerContainer$f,
                  className: "text-center mb-12",
                  children: [
                    /* @__PURE__ */ jsxs("h2", { className: `text-5xl md:text-7xl font-black mb-4 ${text}`, children: [
                      "Meet Our ",
                      /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Leadership" })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: `text-xl md:text-2xl max-w-3xl mx-auto ${subText}`, children: "The visionaries driving AI Knots toward innovation and excellence" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8", children: [
                /* @__PURE__ */ jsx(
                  LeaderCard,
                  {
                    isDark,
                    img: CeoImg,
                    alt: "Ghulam Haider",
                    name: "Ghulam Haider",
                    role: "Founder",
                    exp: "15+ Years of Experience",
                    desc: "Visionary leader with over 15 years of experience in IT and digital transformation.",
                    linkedIn: "https://www.linkedin.com/in/aley-nabi-9396b31b/",
                    github: "https://github.com/aleynabi-atlaknots"
                  }
                ),
                /* @__PURE__ */ jsx(
                  LeaderCard,
                  {
                    isDark,
                    img: FounderImg,
                    alt: "Rakesh Nagar",
                    name: "Rakesh Nagar",
                    role: "Chief Executive Officer",
                    exp: "15+ Years of Experience",
                    desc: "Strategic leader with over 15 years of experience in driving business growth and innovation.",
                    linkedIn: "https://www.linkedin.com/in/aley-nabi-9396b31b/",
                    github: "https://github.com/aleynabi-atlaknots"
                  }
                ),
                /* @__PURE__ */ jsx(
                  LeaderCard,
                  {
                    isDark,
                    img: MdImg,
                    alt: "Alquma jabeen",
                    name: "Alquma jabeen",
                    role: "Managing Director",
                    exp: "7+ Years of Experience",
                    desc: "With over 7 years of expertise in the Banking sector and 3+ years of experience in Business Process Outsourcing (BPO)",
                    linkedIn: "https://www.linkedin.com/in/aley-nabi-profile",
                    github: "https://github.com/aleynabi-atlaknots"
                  }
                ),
                /* @__PURE__ */ jsx(
                  LeaderCard,
                  {
                    isDark,
                    img: CtoImg,
                    alt: "Azhar Uddin",
                    name: "Azhar Uddin",
                    role: "Chief Technical Officer",
                    exp: "7+ Years of Experience",
                    desc: "Leading technical innovation, architecture, and engineering teams to deliver cutting-edge solutions.",
                    linkedIn: "https://www.linkedin.com/in/aley-nabi-profile",
                    github: "https://github.com/aleynabi-atlaknots"
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx("section", { className: "py-16 px-5 sm:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              variants: staggerContainer$f,
              className: "text-center mb-12",
              children: [
                /* @__PURE__ */ jsxs("h2", { className: `text-5xl md:text-6xl font-black mb-4 ${text}`, children: [
                  "Our ",
                  /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Team" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: `text-xl md:text-2xl max-w-3xl mx-auto ${subText}`, children: "The passionate people behind AI Knots' success" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `rounded-2xl overflow-hidden border shadow-2xl ${isDark ? "border-red-900/30" : "border-gray-200"}`,
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: OurTeam,
                  alt: "Our Team",
                  className: "w-full h-auto max-h-[700px] object-cover"
                }
              )
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 relative overflow-hidden ${isDark ? "bg-gradient-to-b from-black to-gray-900" : "bg-gradient-to-b from-gray-50 to-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 lg:px-8 relative z-10", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
                /* @__PURE__ */ jsx(
                  "h2",
                  {
                    className: `text-4xl md:text-5xl font-bold mb-4 ${headingClass}`,
                    children: "Our Core Services"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-gradient-to-r from-red-600 to-red-800 mx-auto mb-6" }),
                /* @__PURE__ */ jsx("p", { className: `text-lg max-w-2xl mx-auto ${bodyClass}`, children: "From ideation to 24/7 support — we deliver end-to-end excellence." })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10", children: [
                {
                  title: "Application & Website Development",
                  icon: Code,
                  items: [
                    { text: "Corporate websites", icon: Building2 },
                    { text: "Enterprise web applications", icon: Cloud },
                    { text: "Portals & dashboards", icon: Database },
                    { text: "Mobile applications", icon: Smartphone },
                    { text: "Microservices & cloud-based systems", icon: Zap }
                  ]
                },
                {
                  title: "Testing & Quality Assurance",
                  icon: Search,
                  items: [
                    { text: "Manual testing", icon: CheckCircle2 },
                    { text: "Automation testing", icon: Zap },
                    { text: "Performance testing", icon: Rocket },
                    { text: "Security testing", icon: Shield }
                  ]
                },
                {
                  title: "Digital Marketing & E-commerce Solutions",
                  icon: ShoppingCart,
                  items: [
                    { text: "SEO & SEM services", icon: Search },
                    { text: "Social media marketing", icon: MessageCircle },
                    { text: "E-commerce platform development", icon: Building2 },
                    { text: "Content marketing & strategy", icon: Star },
                    { text: "Conversion rate optimization", icon: ArrowRight }
                  ]
                },
                {
                  title: "Production Support & Maintenance",
                  icon: Wrench,
                  items: [
                    { text: "24×7 application support", icon: Clock },
                    { text: "Bug fixing & enhancements", icon: Wrench },
                    { text: "SLA-based support", icon: CheckCircle2 },
                    { text: "Monitoring & incident management", icon: Shield }
                  ]
                },
                {
                  title: "BPO & IT Staffing Solutions",
                  icon: Users,
                  items: [
                    { text: "IT staffing & recruitment", icon: Building2 },
                    { text: "BPO services", icon: Landmark },
                    { text: "Remote team augmentation", icon: Building2 },
                    { text: "Project-based staffing", icon: ArrowRight }
                  ]
                }
              ].map((service, idx) => {
                const ServiceIcon = service.icon;
                return /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `group relative rounded-3xl p-8 border transition-all duration-500 hover:-translate-y-3 ${cardClass}`,
                    children: /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-all duration-300", children: /* @__PURE__ */ jsx(ServiceIcon, { className: "w-8 h-8 text-white" }) }),
                      /* @__PURE__ */ jsx("h3", { className: `text-2xl font-bold mb-6 ${headingClass}`, children: service.title }),
                      /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: service.items.map((item, i) => {
                        const ItemIcon = item.icon;
                        return /* @__PURE__ */ jsxs(
                          "li",
                          {
                            className: `flex items-start gap-3 ${bodyClass} hover:translate-x-2 transition-all duration-300`,
                            children: [
                              /* @__PURE__ */ jsx(ItemIcon, { className: "w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" }),
                              /* @__PURE__ */ jsx("span", { children: item.text })
                            ]
                          },
                          i
                        );
                      }) })
                    ] })
                  },
                  idx
                );
              }) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 relative overflow-hidden ${isDark ? "bg-gradient-to-b from-black to-gray-900" : "bg-gradient-to-b from-gray-50 to-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 lg:px-8 relative z-10", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
                /* @__PURE__ */ jsx(
                  "h2",
                  {
                    className: `text-4xl md:text-5xl font-bold mb-4 ${headingClass}`,
                    children: "Industry-Specific Solutions"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-gradient-to-r from-red-600 to-red-800 mx-auto mb-6" }),
                /* @__PURE__ */ jsx("p", { className: `text-lg max-w-2xl mx-auto ${bodyClass}`, children: "Tailored digital solutions designed for diverse industry verticals" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10", children: [
                {
                  title: "Banking & Financial Services",
                  icon: Landmark,
                  items: [
                    { text: "Core banking support", icon: Building2 },
                    { text: "Loan management systems", icon: Database },
                    { text: "Payment integrations", icon: Zap },
                    { text: "KYC / AML solutions", icon: Shield },
                    { text: "Secure APIs & reporting", icon: Code2 }
                  ]
                },
                {
                  title: "Retail & E-Commerce",
                  icon: ShoppingCart,
                  items: [
                    { text: "E-commerce platforms", icon: ShoppingCart },
                    { text: "Order & inventory management", icon: Database },
                    { text: "Payment gateways", icon: Zap },
                    { text: "CRM & loyalty systems", icon: Building2 }
                  ]
                },
                {
                  title: "Enterprise Solutions",
                  icon: Building,
                  items: [
                    { text: "HRMS", icon: Building2 },
                    { text: "ERP modules", icon: Database },
                    { text: "Workflow automation", icon: Zap },
                    { text: "Reporting & analytics", icon: Code2 }
                  ]
                },
                {
                  title: "Government & PSU Projects",
                  icon: Landmark,
                  items: [
                    { text: "Citizen portals", icon: Building2 },
                    { text: "Data management systems", icon: Database },
                    { text: "Secure web applications", icon: Shield },
                    { text: "Long-term support contracts", icon: CheckCircle2 }
                  ]
                }
              ].map((domain, idx) => {
                const DomainIcon = domain.icon;
                return /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `group relative rounded-3xl p-8 border transition-all duration-500 hover:-translate-y-3 ${cardClass}`,
                    children: /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-all duration-300", children: /* @__PURE__ */ jsx(DomainIcon, { className: "w-8 h-8 text-white" }) }),
                      /* @__PURE__ */ jsx(
                        "h3",
                        {
                          className: `text-2xl font-bold mb-6 ${headingClass} group-hover:text-red-600 transition-colors`,
                          children: domain.title
                        }
                      ),
                      /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: domain.items.map((item, i) => {
                        const ItemIcon = item.icon;
                        return /* @__PURE__ */ jsxs(
                          "li",
                          {
                            className: `flex items-start gap-3 ${bodyClass} hover:translate-x-2 transition-all duration-300`,
                            children: [
                              /* @__PURE__ */ jsx(ItemIcon, { className: "w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" }),
                              /* @__PURE__ */ jsx("span", { children: item.text })
                            ]
                          },
                          i
                        );
                      }) }),
                      /* @__PURE__ */ jsx("div", { className: "mt-8 pt-6 border-t border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxs("button", { className: "text-red-600 hover:text-red-700 font-medium flex items-center gap-2 group-hover:gap-3 transition-all duration-300", children: [
                        "Explore Solutions",
                        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 transition-transform group-hover:translate-x-1" })
                      ] }) })
                    ] })
                  },
                  idx
                );
              }) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true },
            className: "mb-12 px-4",
            children: [
              /* @__PURE__ */ jsxs("h2", { className: `text-5xl font-black text-center mb-12 ${text}`, children: [
                "What Our ",
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Clients Say" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "relative max-w-4xl mx-auto h-80 md:h-72", children: testimonials.map((t, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  animate: {
                    opacity: idx === activeTestimonial ? 1 : 0,
                    scale: idx === activeTestimonial ? 1 : 0.9
                  },
                  transition: { duration: 0.6 },
                  className: `absolute inset-0 border rounded-3xl p-10 flex flex-col justify-between ${isDark ? "bg-gradient-to-br from-gray-900/90 to-black/90 border-red-900/30" : "bg-white border-gray-200 shadow-lg"}`,
                  style: {
                    pointerEvents: idx === activeTestimonial ? "auto" : "none"
                  },
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "flex gap-1 text-2xl text-red-500", children: "★".repeat(t.rating) }),
                    /* @__PURE__ */ jsxs(
                      "p",
                      {
                        className: `text-2xl italic ${isDark ? "text-gray-100" : "text-gray-700"}`,
                        children: [
                          '"',
                          t.text,
                          '"'
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: `font-bold ${text}`, children: t.author })
                  ]
                },
                idx
              )) }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-3 mt-8", children: testimonials.map((_, i) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setActiveTestimonial(i),
                  className: `h-3 rounded-full transition-all ${i === activeTestimonial ? "w-10 bg-red-600" : "w-3 bg-gray-400"}`
                },
                i
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-6xl mx-auto pb-16 px-4", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              variants: staggerContainer$f,
              children: [
                /* @__PURE__ */ jsxs(
                  motion.h2,
                  {
                    variants: fadeInUp$f,
                    className: `text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-6 md:mb-8 tracking-tight ${text}`,
                    children: [
                      "FREQUENTLY ",
                      /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "ASKED" }),
                      " QUESTIONS"
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp$f,
                    className: `text-lg sm:text-xl md:text-2xl text-center mb-12 md:mb-16 font-light max-w-4xl mx-auto ${subText}`,
                    children: "Got questions? We've got clear, straightforward answers."
                  }
                ),
                /* @__PURE__ */ jsx(FAQAccordion$1, { isDark })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              variants: staggerContainer$f,
              className: "text-center py-16",
              children: [
                /* @__PURE__ */ jsxs("h3", { className: `text-5xl md:text-6xl font-black mb-8 px-4 ${text}`, children: [
                  "Ready to build something ",
                  /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "great" }),
                  " ",
                  "together?"
                ] }),
                /* @__PURE__ */ jsx("p", { className: `text-xl mb-10 max-w-2xl mx-auto px-4 ${subText}`, children: "Let's turn your vision into reality. Our team is ready to start today." }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setIsModalOpen(true),
                    className: "px-12 py-6 rounded-full text-2xl font-bold shadow-2xl transition text-white bg-gradient-to-r from-red-600 to-red-800 hover:shadow-red-900/70",
                    children: "LET'S START THE CONVERSATION →"
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
const serviceimg1 = "/assets/service-C6sgegK0.jpeg";
const serviceimg2 = "/assets/service2-DVyS2m4D.jpeg";
const fadeInUp$e = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};
const staggerContainer$e = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};
const FAQAccordion = ({ isDark }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs2 = [
    {
      question: "What kind of projects do you take?",
      answer: "We handle custom web & mobile applications, enterprise software, government / PSU compliant systems, cloud migrations, legacy modernization, and full digital transformation initiatives."
    },
    {
      question: "Do you provide maintenance after launch?",
      answer: "Yes — we offer comprehensive Application Maintenance Services (AMS) including proactive monitoring, bug fixes, performance optimization, security patches, and regular updates."
    },
    {
      question: "What are your BPO working hours?",
      answer: "We provide 24/7 support coverage with multiple shifts. Most clients choose 24×5 or 24×7 depending on their time zone and SLA requirements."
    },
    {
      question: "Which technologies do you work with?",
      answer: "Frontend: React, Next.js, TypeScript | Backend: Java + Spring Boot, Node.js, Python | Databases: PostgreSQL, MongoDB, MySQL | Cloud: AWS, Azure, GCP | Others: Docker, Kubernetes, CI/CD pipelines."
    },
    {
      question: "How do you ensure data security & compliance?",
      answer: "We follow ISO 27001 practices, implement encryption at rest & in transit, conduct regular security audits, follow GDPR / DPDP / IT Act guidelines (where applicable), and provide role-based access control."
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "space-y-5", children: faqs2.map((faq, index) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: `group backdrop-blur-lg border rounded-2xl overflow-hidden shadow-xl transition-all duration-300
            ${isDark ? "bg-gray-950/90 border-red-800/60 hover:border-red-700" : "bg-white border-gray-200 hover:border-red-300 shadow-gray-100"}`,
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setOpenIndex(openIndex === index ? null : index),
            className: `w-full px-6 md:px-8 py-6 text-left flex items-center justify-between transition-all duration-300
              ${isDark ? "hover:bg-red-950/50" : "hover:bg-red-50"}`,
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `text-xl md:text-2xl font-semibold transition-colors
              ${isDark ? "text-white group-hover:text-red-400" : "text-gray-900 group-hover:text-red-600"}`,
                  children: faq.question
                }
              ),
              /* @__PURE__ */ jsx(
                ChevronDown,
                {
                  className: `w-7 h-7 md:w-8 md:h-8 flex-shrink-0 transition-transform duration-400 text-red-500
                ${openIndex === index ? "rotate-180" : ""}`
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: false,
            animate: {
              height: openIndex === index ? "auto" : 0,
              opacity: openIndex === index ? 1 : 0
            },
            transition: { duration: 0.4, ease: "easeInOut" },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: `px-6 md:px-8 pb-6 pt-3 leading-relaxed text-base md:text-lg border-t
              ${isDark ? "text-gray-300 border-red-900/50" : "text-gray-700 border-gray-200"}`,
                children: faq.answer
              }
            )
          }
        )
      ]
    },
    index
  )) });
};
const Service = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `relative min-h-screen overflow-x-hidden transition-colors duration-500
      ${isDark ? "bg-black text-gray-100" : "bg-gray-50 text-gray-900"}`,
      children: [
        /* @__PURE__ */ jsxs("section", { className: "relative h-[85vh] flex items-center justify-center overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=2340&q=80",
                alt: "Services Background",
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `absolute inset-0 transition-all duration-700
              ${isDark ? "bg-gradient-to-br from-black/85 via-black/75 to-black/90" : "bg-gradient-to-br from-black/60 via-black/50 to-black/40"}`
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center px-6 max-w-5xl mx-auto", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-red-500 via-rose-400 to-red-600 bg-clip-text text-transparent", children: "Our Services" }) }),
            /* @__PURE__ */ jsx(
              "p",
              {
                className: `mt-6 text-xl md:text-2xl max-w-4xl mx-auto font-light leading-relaxed text-white/90`,
                children: "End-to-end IT solutions & premium BPO services — empowering your business with innovation, reliability, and scale."
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "mt-10 h-1.5 w-40 mx-auto rounded-full bg-gradient-to-r from-red-600 to-rose-600" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 md:py-24 lg:py-32", children: [
          /* @__PURE__ */ jsx("section", { className: "mb-24 md:mb-32", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center gap-10 lg:gap-16", children: [
            /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2 rounded-3xl overflow-hidden border shadow-2xl relative group", children: [
              /* @__PURE__ */ jsx("div", { className: "w-full aspect-[4/5] lg:aspect-auto lg:h-[720px] overflow-hidden", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: serviceimg2,
                  alt: "Modern development",
                  className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2 space-y-8", children: [
              /* @__PURE__ */ jsx(
                "h2",
                {
                  className: `text-4xl md:text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent 
                ${isDark ? "from-red-400 to-rose-500" : "from-red-600 via-red-700 to-rose-600"}`,
                  children: "Information Technology Services"
                }
              ),
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: `text-xl leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`,
                  children: "Full-cycle development — from concept to deployment and long-term success."
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-5", children: [
                { title: "Website & Enterprise Apps", desc: "Custom portals, dashboards, ERP & scalable solutions" },
                { title: "Testing & Deployment", desc: "Automated & manual QA, CI/CD, smooth production rollout" },
                { title: "Application Maintenance (AMS)", desc: "Proactive monitoring, updates, performance tuning" },
                { title: "Digital Transformation", desc: "Cloud migration, legacy modernization, strategy" },
                { title: "Government & PSU Projects", desc: "Secure systems, citizen portals, compliance-focused delivery" }
              ].map((item, i) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `group backdrop-blur-md border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                      ${isDark ? "bg-gray-950/80 border-red-900/40 hover:border-red-600/60" : "bg-white border-gray-200 hover:border-red-400"}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      "h4",
                      {
                        className: `text-xl font-semibold mb-3 transition-colors ${isDark ? "text-white group-hover:text-red-400" : "text-gray-900 group-hover:text-red-600"}`,
                        children: item.title
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        className: `transition-colors ${isDark ? "text-gray-400 group-hover:text-gray-300" : "text-gray-700 group-hover:text-gray-800"}`,
                        children: item.desc
                      }
                    )
                  ]
                },
                i
              )) }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3 mt-6", children: ["Java + Spring Boot", "React / Next.js", "Node.js", "PostgreSQL / MongoDB", "AWS / Azure"].map((tech) => /* @__PURE__ */ jsx(
                "span",
                {
                  className: `px-5 py-2 rounded-full text-sm font-medium border transition-colors
                      ${isDark ? "bg-red-950/50 border-red-800 text-red-300 hover:bg-red-900/60" : "bg-red-100 border-red-200 text-red-700 hover:bg-red-200"}`,
                  children: tech
                },
                tech
              )) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("section", { className: "mb-24 md:mb-32", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16", children: [
            /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2 rounded-3xl overflow-hidden border shadow-2xl relative group", children: [
              /* @__PURE__ */ jsx("div", { className: "w-full aspect-[4/5] lg:aspect-auto lg:h-[620px] overflow-hidden", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: serviceimg1,
                  alt: "Digital Marketing",
                  className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2 space-y-8", children: [
              /* @__PURE__ */ jsx(
                "h2",
                {
                  className: `text-4xl md:text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent 
                ${isDark ? "from-red-400 to-rose-500" : "from-red-600 via-red-700 to-rose-600"}`,
                  children: "Digital Marketing"
                }
              ),
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: `text-xl leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`,
                  children: "Boost your online presence with strategic digital marketing solutions — driving traffic, engagement, and conversions."
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-5", children: [
                { title: "Search Engine Optimization (SEO)", desc: "Improve search rankings, organic traffic, and visibility" },
                { title: "Social Media Marketing", desc: "Engage audiences on platforms like Facebook, Instagram, LinkedIn" },
                { title: "Pay-Per-Click (PPC) Advertising", desc: "Targeted ads on Google, Bing, and social media" },
                { title: "Content Marketing", desc: "Create valuable content to attract and retain customers" },
                { title: "Email Marketing", desc: "Build relationships and drive sales through personalized campaigns" },
                { title: "Analytics & Reporting", desc: "Track performance, insights, and ROI optimization" }
              ].map((item, i) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `group backdrop-blur-md border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                      ${isDark ? "bg-gray-950/80 border-red-900/40 hover:border-red-600/60" : "bg-white border-gray-200 hover:border-red-400"}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      "h4",
                      {
                        className: `text-xl font-semibold mb-3 transition-colors ${isDark ? "text-white group-hover:text-red-400" : "text-gray-900 group-hover:text-red-600"}`,
                        children: item.title
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        className: `transition-colors ${isDark ? "text-gray-400 group-hover:text-gray-300" : "text-gray-700 group-hover:text-gray-800"}`,
                        children: item.desc
                      }
                    )
                  ]
                },
                i
              )) }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3 mt-6", children: ["Google Ads", "Facebook Ads", "SEO Tools", "Analytics", "Content Management"].map((tech) => /* @__PURE__ */ jsx(
                "span",
                {
                  className: `px-5 py-2 rounded-full text-sm font-medium border transition-colors
                      ${isDark ? "bg-red-950/50 border-red-800 text-red-300 hover:bg-red-900/60" : "bg-red-100 border-red-200 text-red-700 hover:bg-red-200"}`,
                  children: tech
                },
                tech
              )) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("section", { className: "mb-24 md:mb-32", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16", children: [
            /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2 space-y-8", children: [
              /* @__PURE__ */ jsx(
                "h2",
                {
                  className: `text-4xl md:text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent 
                ${isDark ? "from-red-400 to-rose-500" : "from-red-600 via-red-700 to-rose-600"}`,
                  children: "Business Process Outsourcing (BPO)"
                }
              ),
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: `text-xl leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`,
                  children: "High-quality customer support, data operations & back-office excellence — 24/7 ready."
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-5", children: [
                { title: "Voice • Chat • Email Support", desc: "Inbound / outbound calls, live chat, structured email handling" },
                { title: "Cataloguing & Data Enrichment", desc: "Product descriptions, SEO tags, image validation" },
                { title: "Level 2 (L2) Support", desc: "Advanced troubleshooting, root cause analysis" },
                { title: "Quality & Infrastructure", desc: "SLA compliance, regular audits, coaching" }
              ].map((item, i) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `group backdrop-blur-md border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                      ${isDark ? "bg-gray-950/80 border-red-900/40 hover:border-red-600/60" : "bg-white border-gray-200 hover:border-red-400"}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      "h4",
                      {
                        className: `text-xl font-semibold mb-3 transition-colors ${isDark ? "text-white group-hover:text-red-400" : "text-gray-900 group-hover:text-red-600"}`,
                        children: item.title
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        className: `transition-colors ${isDark ? "text-gray-400 group-hover:text-gray-300" : "text-gray-700 group-hover:text-gray-800"}`,
                        children: item.desc
                      }
                    )
                  ]
                },
                i
              )) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2 rounded-3xl overflow-hidden border shadow-2xl relative group", children: [
              /* @__PURE__ */ jsx("div", { className: "w-full aspect-[4/5] lg:aspect-auto lg:h-[620px] overflow-hidden", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: serviceimg1,
                  alt: "BPO Support",
                  className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(
            "section",
            {
              className: `relative py-20 md:py-24 lg:py-28 px-5 sm:px-8 md:px-10 lg:px-16 overflow-hidden rounded-3xl my-12 md:my-16
          ${isDark ? "bg-gray-950/90 border border-red-900/50" : "bg-white border border-gray-100 shadow-2xl"}`,
              children: /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-6xl mx-auto", children: /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: staggerContainer$e,
                  children: [
                    /* @__PURE__ */ jsxs(
                      motion.h2,
                      {
                        variants: fadeInUp$e,
                        className: `text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-6 md:mb-8 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`,
                        children: [
                          "FREQUENTLY ",
                          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "ASKED" }),
                          " QUESTIONS"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      motion.p,
                      {
                        variants: fadeInUp$e,
                        className: `text-lg sm:text-xl md:text-2xl text-center mb-12 md:mb-16 font-light max-w-4xl mx-auto ${isDark ? "text-gray-300" : "text-gray-700"}`,
                        children: "Got questions? We've got clear, straightforward answers."
                      }
                    ),
                    /* @__PURE__ */ jsx(FAQAccordion, { isDark })
                  ]
                }
              ) })
            }
          )
        ] }),
        showScrollTop && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: scrollToTop,
            className: `fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-xl border transition-all duration-300
            ${isDark ? "bg-gray-900 border-gray-700 hover:bg-gray-800 text-white" : "bg-white border-gray-200 hover:bg-gray-50 text-gray-900 shadow-lg"}`,
            "aria-label": "Scroll to top",
            children: /* @__PURE__ */ jsx(ArrowUp, { size: 24 })
          }
        )
      ]
    }
  );
};
const particlesOptions = {
  fullScreen: { enable: true, zIndex: -1 },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: { enable: true, mode: "repulse" },
      resize: true
    },
    modes: {
      push: { quantity: 3 },
      repulse: { distance: 120, duration: 0.4 }
    }
  },
  particles: {
    color: { value: ["#ef4444", "#f87171", "#dc2626"] },
    links: {
      color: "#ffffff",
      distance: 130,
      enable: true,
      opacity: 0.15,
      width: 1
    },
    move: {
      direction: "none",
      enable: true,
      outModes: { default: "bounce" },
      random: true,
      speed: 0.8,
      straight: false
    },
    number: { density: { enable: true, area: 800 }, value: 60 },
    opacity: { value: 0.45 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 4 } }
  },
  detectRetina: true
};
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 130, damping: 15 }
  }
};
const Contact = () => {
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const { formData, captchaValue, loading, successMessage, errorMessage } = useSelector((state) => state.contact);
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, { position: "top-right", autoClose: 5e3 });
      dispatch(clearMessages());
    }
  }, [successMessage, dispatch]);
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, { position: "top-right", autoClose: 7e3 });
      dispatch(clearMessages());
    }
  }, [errorMessage, dispatch]);
  const handleChange = (e) => {
    dispatch(updateField({ name: e.target.name, value: e.target.value }));
  };
  const handleCaptchaChange = (value) => {
    dispatch(setCaptcha(value));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaValue) {
      toast.error("Please verify that you are not a robot.");
      return;
    }
    dispatch(submitContactForm({ ...formData, captcha: captchaValue }));
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `relative min-h-screen overflow-hidden transition-colors duration-700
      ${isDark ? "bg-black text-gray-100" : "bg-white text-gray-900"}`,
      children: [
        /* @__PURE__ */ jsx(
          ToastContainer,
          {
            position: "top-right",
            autoClose: 5e3,
            theme: isDark ? "dark" : "light"
          }
        ),
        /* @__PURE__ */ jsx(
          Particles,
          {
            id: "tsparticles-contact",
            init: particlesInit,
            options: particlesOptions,
            className: "absolute inset-0 z-0"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxs("section", { className: "relative py-20 md:py-28 lg:py-36 min-h-[85vh] flex items-center overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=2340&q=80",
                  alt: "Contact Background",
                  className: "w-full h-full object-cover"
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `absolute inset-0 transition-all duration-700
              ${isDark ? "bg-gradient-to-br from-black/85 via-black/70 to-black/80" : "bg-gradient-to-br from-black/60 via-black/50 to-black/40"}`
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10", children: /* @__PURE__ */ jsxs(
              motion.div,
              {
                variants: containerVariants,
                initial: "hidden",
                animate: "visible",
                children: [
                  /* @__PURE__ */ jsx(
                    motion.h1,
                    {
                      variants: itemVariants,
                      className: `text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight ${isDark ? "text-white" : "text-white"}`,
                      children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-red-500 via-red-400 to-rose-500 bg-clip-text text-transparent", children: "Get in Touch" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    motion.p,
                    {
                      variants: itemVariants,
                      className: `mt-5 text-lg md:text-xl max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-white/90"}`,
                      children: "Have questions or ready to start a project? We're here to help."
                    }
                  )
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(
            "section",
            {
              className: `py-12 md:py-20 border-t transition-colors
          ${isDark ? "border-gray-800 bg-black/50" : "border-gray-200 bg-white/50"} backdrop-blur-sm`,
              children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-10 lg:gap-12", children: [
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    variants: containerVariants,
                    initial: "hidden",
                    whileInView: "visible",
                    viewport: { once: true },
                    children: [
                      /* @__PURE__ */ jsx(
                        "h2",
                        {
                          className: `text-3xl md:text-4xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-900"}`,
                          children: "Contact Information"
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-7", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: `p-3.5 rounded-xl ${isDark ? "bg-red-900/25 border border-red-800/40" : "bg-red-100 border border-red-200"}`,
                              children: /* @__PURE__ */ jsx(
                                Building2,
                                {
                                  className: `h-6 w-6 ${isDark ? "text-red-500" : "text-red-600"}`
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx(
                              "h3",
                              {
                                className: `text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`,
                                children: "Our Office"
                              }
                            ),
                            /* @__PURE__ */ jsxs(
                              "p",
                              {
                                className: `mt-1.5 leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`,
                                children: [
                                  "103, Goyal Vihar,",
                                  /* @__PURE__ */ jsx("br", {}),
                                  "Plot No 31-C, Zone 2,",
                                  /* @__PURE__ */ jsx("br", {}),
                                  "M.P. Nagar, Bhopal - 462011",
                                  /* @__PURE__ */ jsx("br", {}),
                                  "Madhya Pradesh, India"
                                ]
                              }
                            )
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: `p-3.5 rounded-xl ${isDark ? "bg-red-900/25 border border-red-800/40" : "bg-red-100 border border-red-200"}`,
                              children: /* @__PURE__ */ jsx(
                                Phone,
                                {
                                  className: `h-6 w-6 ${isDark ? "text-red-500" : "text-red-600"}`
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx(
                              "h3",
                              {
                                className: `text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`,
                                children: "Phone"
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "p",
                              {
                                className: `mt-1.5 ${isDark ? "text-gray-300" : "text-gray-600"}`,
                                children: /* @__PURE__ */ jsx(
                                  "a",
                                  {
                                    href: "tel:+917869636070",
                                    className: "hover:text-red-400 transition",
                                    children: "+91 78696 36070"
                                  }
                                )
                              }
                            )
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: `p-3.5 rounded-xl ${isDark ? "bg-red-900/25 border border-red-800/40" : "bg-red-100 border border-red-200"}`,
                              children: /* @__PURE__ */ jsx(
                                Mail,
                                {
                                  className: `h-6 w-6 ${isDark ? "text-red-500" : "text-red-600"}`
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx(
                              "h3",
                              {
                                className: `text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`,
                                children: "Email"
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "p",
                              {
                                className: `mt-1.5 ${isDark ? "text-gray-300" : "text-gray-600"}`,
                                children: /* @__PURE__ */ jsx(
                                  "a",
                                  {
                                    href: "mailto:admin@atlaknots.com",
                                    className: "hover:text-red-400 transition",
                                    children: "admin@atlaknots.com"
                                  }
                                )
                              }
                            )
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: `p-3.5 rounded-xl ${isDark ? "bg-red-900/25 border border-red-800/40" : "bg-red-100 border border-red-200"}`,
                              children: /* @__PURE__ */ jsx(
                                Clock,
                                {
                                  className: `h-6 w-6 ${isDark ? "text-red-500" : "text-red-600"}`
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx(
                              "h3",
                              {
                                className: `text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`,
                                children: "Working Hours"
                              }
                            ),
                            /* @__PURE__ */ jsxs(
                              "p",
                              {
                                className: `mt-1.5 ${isDark ? "text-gray-300" : "text-gray-600"}`,
                                children: [
                                  "Mon – Sat: 10:00 AM – 7:00 PM",
                                  /* @__PURE__ */ jsx("br", {}),
                                  "Sunday: Closed"
                                ]
                              }
                            )
                          ] })
                        ] })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "space-y-10", children: [
                  /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, x: 40 },
                      whileInView: { opacity: 1, x: 0 },
                      transition: { duration: 0.7 },
                      viewport: { once: true },
                      className: `rounded-2xl p-7 md:p-9 backdrop-blur-sm shadow-xl
                    ${isDark ? "bg-gray-950/70 border border-gray-800 shadow-red-950/25" : "bg-white border border-gray-200 shadow-gray-300"}`,
                      children: [
                        /* @__PURE__ */ jsx(
                          "h2",
                          {
                            className: `text-2xl md:text-3xl font-bold mb-7 ${isDark ? "text-white" : "text-gray-900"}`,
                            children: "Send Us a Message"
                          }
                        ),
                        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
                          /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
                            /* @__PURE__ */ jsx(
                              "input",
                              {
                                type: "text",
                                name: "usernamee",
                                value: formData.usernamee,
                                onChange: handleChange,
                                placeholder: "Your Name",
                                required: true,
                                disabled: loading,
                                className: `w-full px-4 py-3.5 rounded-lg focus:border-red-500 focus:outline-none transition
                          ${isDark ? "bg-gray-900/60 border-gray-700 text-white placeholder-gray-500" : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"}`
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "input",
                              {
                                type: "email",
                                name: "email",
                                value: formData.email,
                                onChange: handleChange,
                                placeholder: "Your Email",
                                required: true,
                                disabled: loading,
                                className: `w-full px-4 py-3.5 rounded-lg focus:border-red-500 focus:outline-none transition
                          ${isDark ? "bg-gray-900/60 border-gray-700 text-white placeholder-gray-500" : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"}`
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
                            /* @__PURE__ */ jsx(
                              "input",
                              {
                                type: "tel",
                                name: "phone",
                                value: formData.phone,
                                onChange: handleChange,
                                placeholder: "Phone Number",
                                required: true,
                                disabled: loading,
                                className: `w-full px-4 py-3.5 rounded-lg focus:border-red-500 focus:outline-none transition
                          ${isDark ? "bg-gray-900/60 border-gray-700 text-white placeholder-gray-500" : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"}`
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "input",
                              {
                                type: "text",
                                name: "subject",
                                value: formData.subject,
                                onChange: handleChange,
                                placeholder: "Subject",
                                required: true,
                                disabled: loading,
                                className: `w-full px-4 py-3.5 rounded-lg focus:border-red-500 focus:outline-none transition
                          ${isDark ? "bg-gray-900/60 border-gray-700 text-white placeholder-gray-500" : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"}`
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsx(
                            "textarea",
                            {
                              name: "message",
                              value: formData.message,
                              onChange: handleChange,
                              rows: 5,
                              placeholder: "Your Message...",
                              required: true,
                              disabled: loading,
                              className: `w-full px-4 py-3.5 rounded-lg focus:border-red-500 focus:outline-none resize-none transition
                        ${isDark ? "bg-gray-900/60 border-gray-700 text-white placeholder-gray-500" : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"}`
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            ReCAPTCHA,
                            {
                              sitekey: "6LfP7nEsAAAAAOLxpk34nW3cU3uYXON85c8n4D2H",
                              onChange: handleCaptchaChange
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "submit",
                              disabled: loading,
                              className: `w-full py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2.5
                        ${loading ? "opacity-70 cursor-not-allowed" : "hover:from-red-700 hover:to-rose-700 hover:shadow-red-600/40 hover:-translate-y-0.5"}`,
                              children: loading ? "Sending..." : /* @__PURE__ */ jsxs(Fragment, { children: [
                                /* @__PURE__ */ jsx(Send, { size: 18 }),
                                " Send Message"
                              ] })
                            }
                          )
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, x: 40 },
                      whileInView: { opacity: 1, x: 0 },
                      transition: { duration: 0.7, delay: 0.15 },
                      viewport: { once: true },
                      className: `rounded-2xl overflow-hidden shadow-xl h-80 md:h-96 border
                    ${isDark ? "border-gray-800" : "border-gray-200"}`,
                      children: /* @__PURE__ */ jsx(
                        "iframe",
                        {
                          title: "AI Knots Solution - MP Nagar, Bhopal",
                          src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.8!2d77.432!3d23.198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39631f8a00000001%3A0x0!2sM.P.+Nagar+Zone+2%2C+Bhopal%2C+Madhya+Pradesh+462011!5e0!3m2!1sen!2sin!4v1738000000000!5m2!1sen!2sin",
                          width: "100%",
                          height: "100%",
                          style: { border: 0 },
                          allowFullScreen: "",
                          loading: "lazy",
                          referrerPolicy: "no-referrer-when-downgrade"
                        }
                      )
                    }
                  )
                ] })
              ] }) })
            }
          )
        ] })
      ]
    }
  );
};
const FitnessMobile = () => {
  const screenshots = [
    "https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=400&h=800&fit=crop",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=800&fit=crop",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=800&fit=crop",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=800&fit=crop"
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % screenshots.length);
    }, 3e3);
    return () => clearInterval(timer);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "px-4 py-16 bg-white", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsx("h5", { className: "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 text-sm font-semibold mb-2", children: "APP SCREENSHOT" }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 leading-snug", children: "Easy & User Friendly Fitness App" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative mx-auto w-[240px] h-[480px] rounded-[2rem] shadow-2xl overflow-hidden mb-8", children: screenshots.map((img, index) => /* @__PURE__ */ jsx(
      "img",
      {
        src: img,
        alt: "fitness screenshot",
        className: `absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${active === index ? "opacity-100" : "opacity-0"}`
      },
      index
    )) }),
    /* @__PURE__ */ jsx("p", { className: "text-center text-gray-600 text-base leading-relaxed mb-6", children: "Track your workouts, stay motivated and achieve your fitness goals with our simple and powerful mobile app experience." }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3 mb-8", children: [
      "Simple & clean UI",
      "Workout tracking",
      "Daily fitness goals"
    ].map((text, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center text-gray-700", children: [
      /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 mr-3" }),
      text
    ] }, i)) }),
    /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx("button", { className: "px-8 py-3 rounded-full text-white font-medium bg-gradient-to-r from-pink-500 to-purple-600 active:scale-95 transition", children: "Read More" }) })
  ] });
};
const fetchCategories$2 = createAsyncThunk(
  "technology/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:8000/api/technology/category");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      return Array.isArray(data.data) ? data.data : [];
    } catch (err) {
      return rejectWithValue(err.message || "Failed to load categories");
    }
  }
);
const fetchProducts = createAsyncThunk(
  "technology/fetchProducts",
  async (categoryId, { rejectWithValue }) => {
    try {
      let url = "http://localhost:8000/api/technology/product";
      if (categoryId) url += `?category=${categoryId}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      let items = data.data || [];
      if (!Array.isArray(items)) items = [];
      return items.map((item, index) => ({
        id: item._id || `item-${index + 1}`,
        _id: item._id,
        slug: item.slug,
        title: item.title || item.name || "Untitled",
        description: item.description || "No description available",
        date: item.updatedAt || item.createdAt ? new Date(item.updatedAt || item.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        }) : "Recently",
        category: item.category?.name || "General",
        categoryId: item.category?._id,
        image: item.images?.[0] || null,
        images: item.images || [],
        views: item.views || 0,
        likes: item.likes || 0,
        comments: item.comments || [],
        author: item.author || "Tech Team",
        trending: Math.random() > 0.7
      }));
    } catch (err) {
      return rejectWithValue(err.message || "Failed to load products");
    }
  }
);
const fetchSinglePost = createAsyncThunk(
  "technology/fetchSinglePost",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/technology/product/technology/${slug}`
      );
      if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);
      const data = await res.json();
      console.log("✅ Single Post Response:", data);
      const item = data.data || data;
      return {
        id: item._id,
        _id: item._id,
        slug: item.slug,
        title: item.title || item.name || "Untitled",
        description: item.description || item.content || "",
        date: item.updatedAt ? new Date(item.updatedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        }) : "Recently",
        category: item.category?.name || "General",
        image: item.images?.[0] || null,
        images: item.images || [],
        views: item.views || 0,
        likes: item.likes || 0,
        comments: item.comments || [],
        author: item.author || "Tech Team"
      };
    } catch (err) {
      console.error("Fetch Single Post Error:", err);
      return rejectWithValue(err.message || "Failed to fetch post details");
    }
  }
);
const incrementPostView$1 = createAsyncThunk(
  "technology/incrementView",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/technology/product/technology/${slug}/view`,
        { method: "PUT" }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      return { slug, views: data.views };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
const togglePostLike$1 = createAsyncThunk(
  "technology/toggleLike",
  async ({ slug, email }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/technology/product/technology/${slug}/like`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      return { slug, likes: data.likes, liked: data.liked };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
const sendCommentOtp$1 = createAsyncThunk(
  "technology/sendCommentOtp",
  async ({ slug, name, email, phone }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/technology/product/technology/${slug}/send-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone })
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
const postCommentWithOtp = createAsyncThunk(
  "technology/postCommentWithOtp",
  async ({ slug, email, otp, comment }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/technology/product/technology/${slug}/comment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp, comment })
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      return { slug, comments: data.comments };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
const technologySlice = createSlice({
  name: "technology",
  initialState: {
    categories: [],
    selectedCategory: { _id: null, name: "All" },
    newsItems: [],
    loading: false,
    error: null
  },
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories$2.fulfilled, (state, action) => {
      state.categories = action.payload;
    }).addCase(fetchCategories$2.rejected, (state, action) => {
      state.error = action.payload;
    }).addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.newsItems = action.payload;
    }).addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }).addCase(fetchSinglePost.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(fetchSinglePost.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.newsItems.findIndex(
        (item) => item.slug === action.payload.slug
      );
      if (index !== -1) {
        state.newsItems[index] = action.payload;
      } else {
        state.newsItems.unshift(action.payload);
      }
    }).addCase(fetchSinglePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }).addCase(incrementPostView$1.fulfilled, (state, action) => {
      const { slug, views } = action.payload;
      const item = state.newsItems.find((i) => i.slug === slug);
      if (item) item.views = views;
    }).addCase(togglePostLike$1.fulfilled, (state, action) => {
      const { slug, likes } = action.payload;
      const item = state.newsItems.find((i) => i.slug === slug);
      if (item) item.likes = likes;
    }).addCase(postCommentWithOtp.fulfilled, (state, action) => {
      const { slug, comments } = action.payload;
      const item = state.newsItems.find((i) => i.slug === slug);
      if (item) item.comments = comments;
    });
  }
});
const { setSelectedCategory: setSelectedCategory$1, clearError: clearError$1 } = technologySlice.actions;
const technologyReducer = technologySlice.reducer;
const Technology = () => {
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, selectedCategory, newsItems, loading, error } = useSelector((state) => state.technology);
  const [scrollY, setScrollY] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [pendingSlug, setPendingSlug] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
  const [step, setStep] = useState("form");
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [updatedItems, setUpdatedItems] = useState({});
  const [userLikes, setUserLikes] = useState(/* @__PURE__ */ new Set());
  useEffect(() => {
    const savedUser = localStorage.getItem("verifiedUser");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUserInfo({
          name: parsed.name || parsed.user || "",
          email: parsed.email || "",
          phone: parsed.phone || ""
        });
        setIsVerified(true);
      } catch (error2) {
        console.warn("Failed to parse verifiedUser", error2);
      }
    }
    const savedLikes = localStorage.getItem("userLikesTech");
    if (savedLikes) setUserLikes(new Set(JSON.parse(savedLikes)));
  }, []);
  useEffect(() => {
    dispatch(fetchCategories$2());
  }, [dispatch]);
  useEffect(() => {
    const categoryId = selectedCategory?._id || null;
    dispatch(fetchProducts(categoryId));
  }, [dispatch, selectedCategory]);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const filteredNewsItems = useMemo(() => {
    if (!newsItems || newsItems.length === 0) return [];
    if (!selectedCategory?._id || selectedCategory?.name === "All") {
      return newsItems;
    }
    return newsItems.filter((item) => {
      const itemCat = (item.category || item.categoryName || "").trim().toLowerCase();
      const selCat = (selectedCategory.name || "").trim().toLowerCase();
      const idMatch = item.categoryId === selectedCategory._id || item.category_id === selectedCategory._id || item.categoryId?._id === selectedCategory._id;
      return itemCat === selCat || idMatch;
    });
  }, [newsItems, selectedCategory]);
  const getIconForCategory = (category) => {
    const cat = (category || "").toLowerCase();
    if (cat.includes("ai") || cat.includes("artificial intelligence"))
      return /* @__PURE__ */ jsx(Cpu, { className: "w-5 h-5" });
    if (cat.includes("hardware")) return /* @__PURE__ */ jsx(Zap, { className: "w-5 h-5" });
    if (cat.includes("company") || cat.includes("update"))
      return /* @__PURE__ */ jsx(Building2, { className: "w-5 h-5" });
    if (cat.includes("industry") || cat.includes("news"))
      return /* @__PURE__ */ jsx(Newspaper, { className: "w-5 h-5" });
    if (cat.includes("software") || cat.includes("developer"))
      return /* @__PURE__ */ jsx(Code2, { className: "w-5 h-5" });
    return /* @__PURE__ */ jsx(Globe, { className: "w-5 h-5" });
  };
  const handleAction = (action, item) => {
    const slug = item.slug || item._id;
    if (action === "read") {
      navigate(`/technology/${slug}`);
      return;
    }
    if (action === "view") {
      dispatch(incrementPostView$1(slug));
      return;
    }
    if (!isVerified) {
      setPendingSlug(slug);
      setShowVerifyModal(true);
      setStep("form");
      setUserInfo({ name: "", email: "", phone: "" });
      return;
    }
    if (action === "like") {
      if (userLikes.has(slug)) return;
      dispatch(togglePostLike$1({ slug, email: userInfo.email }));
      const newLikes = new Set(userLikes);
      newLikes.add(slug);
      setUserLikes(newLikes);
      localStorage.setItem("userLikesTech", JSON.stringify([...newLikes]));
    } else if (action === "comment") {
      setPendingSlug(slug);
      setCommentText("");
      setShowCommentModal(true);
    }
  };
  const sendOtp = async () => {
    if (!userInfo.name || !userInfo.email || !userInfo.phone) {
      alert("Name, Email and Phone are required");
      return;
    }
    setLoadingAction(true);
    await dispatch(
      sendCommentOtp$1({
        slug: pendingSlug,
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone
      })
    );
    setStep("otp");
    setLoadingAction(false);
  };
  const verifyOtp = () => {
    setIsVerified(true);
    localStorage.setItem(
      "verifiedUser",
      JSON.stringify({ ...userInfo, verifiedAt: (/* @__PURE__ */ new Date()).toISOString() })
    );
    setShowVerifyModal(false);
    setTimeout(() => setShowCommentModal(true), 300);
  };
  const submitComment = async () => {
    if (!commentText.trim()) return alert("Please write a comment");
    setLoadingAction(true);
    const result = await dispatch(
      postCommentWithOtp({
        slug: pendingSlug,
        email: userInfo.email,
        otp: otp || "000000",
        comment: commentText.trim()
      })
    );
    if (!result.error) {
      setUpdatedItems((prev) => ({
        ...prev,
        [pendingSlug]: { comments: result.payload?.comments || [] }
      }));
      setShowCommentModal(false);
      setCommentText("");
      alert("✅ Comment posted successfully!");
    } else {
      alert("Failed to post comment");
    }
    setLoadingAction(false);
  };
  const cardClass = isDark ? "bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-red-600/50" : "bg-white border border-gray-200 shadow-lg hover:shadow-2xl";
  const headingClass = isDark ? "text-white" : "text-gray-900";
  const bodyClass = isDark ? "text-gray-300" : "text-gray-700";
  const accentClass = "text-red-600";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `min-h-screen overflow-x-hidden relative transition-colors duration-700
      ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`,
      children: [
        /* @__PURE__ */ jsxs(
          "section",
          {
            className: `relative bg-gradient-to-br py-32 md:py-40 overflow-hidden
        ${isDark ? "from-black via-red-950 to-black" : "from-red-50 via-white to-white"} text-white`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 opacity-30", children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "absolute top-20 left-10 w-64 h-64 rounded-2xl overflow-hidden transform hover:scale-110 transition-transform duration-700 animate-float",
                    style: {
                      transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.05}deg)`,
                      animationDelay: "0s"
                    },
                    children: [
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop",
                          alt: "Technology",
                          className: "w-full h-full object-cover"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: `absolute inset-0 ${isDark ? "bg-gradient-to-br from-red-600/40 to-black/60" : "bg-gradient-to-br from-red-400/30 to-white/60"} mix-blend-multiply`
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "absolute top-40 right-20 w-72 h-72 rounded-2xl overflow-hidden transform hover:scale-110 transition-transform duration-700 animate-float-delayed",
                    style: {
                      transform: `translateY(${scrollY * 0.2}px) rotate(${-scrollY * 0.03}deg)`,
                      animationDelay: "1s"
                    },
                    children: [
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop",
                          alt: "Coding",
                          className: "w-full h-full object-cover"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: `absolute inset-0 ${isDark ? "bg-gradient-to-br from-red-700/40 to-black/60" : "bg-gradient-to-br from-red-400/30 to-white/60"} mix-blend-multiply`
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "absolute bottom-32 left-1/3 w-80 h-80 rounded-2xl overflow-hidden transform hover:scale-110 transition-transform duration-700 animate-float",
                    style: {
                      transform: `translateY(${scrollY * 0.25}px) rotate(${scrollY * 0.04}deg)`,
                      animationDelay: "2s"
                    },
                    children: [
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=400&fit=crop",
                          alt: "Analytics",
                          className: "w-full h-full object-cover"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: `absolute inset-0 ${isDark ? "bg-gradient-to-br from-red-800/40 to-black/60" : "bg-gradient-to-br from-red-400/30 to-white/60"} mix-blend-multiply`
                        }
                      )
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-20 left-20 w-2 h-2 bg-red-500 rounded-full animate-ping" }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute top-40 right-40 w-3 h-3 bg-red-400 rounded-full animate-pulse",
                    style: { animationDelay: "0.5s" }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute bottom-40 left-1/4 w-2 h-2 bg-red-600 rounded-full animate-ping",
                    style: { animationDelay: "1s" }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute top-60 right-1/3 w-3 h-3 bg-red-300 rounded-full animate-pulse",
                    style: { animationDelay: "1.5s" }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 opacity-20", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-20 left-20 w-72 h-72 bg-red-600 rounded-full blur-3xl animate-pulse" }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute bottom-20 right-20 w-96 h-96 bg-red-800 rounded-full blur-3xl animate-pulse",
                    style: { animationDelay: "1s" }
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute inset-0 opacity-5",
                  style: {
                    backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
                    backgroundSize: "50px 50px"
                  }
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 lg:px-8 relative z-10 text-center", children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: `inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full backdrop-blur-sm animate-fade-in
            ${isDark ? "bg-red-600/20 border border-red-500/30" : "bg-red-100 border border-red-200"}`,
                    children: [
                      /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-red-400 animate-pulse" }),
                      /* @__PURE__ */ jsx("span", { className: "text-red-400 font-semibold text-sm tracking-wider", children: "TECHNOLOGY EXCELLENCE" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "h1",
                  {
                    className: `text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight animate-slide-up
            ${isDark ? "bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent" : "text-gray-900"}`,
                    children: "Cutting-Edge Technology Solutions"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    className: `text-lg md:text-xl max-w-3xl mx-auto mb-12 text-gray-300 leading-relaxed animate-slide-up ${bodyClass}`,
                    style: { animationDelay: "0.2s" },
                    children: "We craft high-performance, scalable, and secure digital products that drive real business growth with precision and innovation."
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "flex flex-wrap justify-center gap-6 animate-slide-up",
                    style: { animationDelay: "0.4s" },
                    children: [
                      /* @__PURE__ */ jsx("button", { className: "group relative bg-gradient-to-r from-red-600 to-red-700 text-white font-bold px-10 py-5 rounded-lg shadow-2xl shadow-red-600/30 hover:shadow-red-600/50 transform hover:scale-105 transition-all duration-300 overflow-hidden", children: /* @__PURE__ */ jsxs("span", { className: "relative z-10 flex items-center gap-2", children: [
                        "Explore Services",
                        " ",
                        /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })
                      ] }) }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          className: `group relative border-2 font-bold px-10 py-5 rounded-lg hover:scale-105 transition-all duration-300
              ${isDark ? "border-red-500 text-white hover:bg-red-600" : "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"}`,
                          children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                            "Contact Us",
                            " ",
                            /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })
                          ] })
                        }
                      )
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 relative overflow-hidden ${isDark ? "bg-black" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 lg:px-8 relative z-10", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: `inline-flex items-center gap-2 mb-4 px-6 py-2 rounded-full backdrop-blur-sm animate-fade-in
              ${isDark ? "bg-red-600/20 border border-red-500/30" : "bg-red-100 border border-red-200"}`,
                    children: [
                      /* @__PURE__ */ jsx(Newspaper, { className: "w-4 h-4 text-red-400 animate-pulse" }),
                      /* @__PURE__ */ jsx("span", { className: "text-red-400 font-semibold text-sm tracking-wider", children: "LATEST UPDATES" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "h2",
                  {
                    className: `text-4xl md:text-5xl font-bold mb-4 ${headingClass}`,
                    children: "Tech News & Insights"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-gradient-to-r from-red-600 to-red-800 mx-auto mb-6" }),
                /* @__PURE__ */ jsx("p", { className: `text-lg max-w-2xl mx-auto ${bodyClass}`, children: "Stay updated with the latest technology trends and industry insights" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-3 mb-12", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => dispatch(setSelectedCategory$1({ _id: null, name: "All" })),
                    className: `group relative px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${!selectedCategory?._id || selectedCategory?.name === "All" ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30" : isDark ? "bg-gray-900 text-gray-400 hover:text-white border border-gray-800 hover:border-red-600/50" : "bg-white text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-red-600"}`,
                    children: /* @__PURE__ */ jsxs("span", { className: "relative z-10 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(Globe, { className: "w-4 h-4" }),
                      "All"
                    ] })
                  }
                ),
                (categories || []).map((category) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => dispatch(setSelectedCategory$1(category)),
                    className: `group relative px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${selectedCategory?._id === category._id ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30" : isDark ? "bg-gray-900 text-gray-400 hover:text-white border border-gray-800 hover:border-red-600/50" : "bg-white text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-red-600"}`,
                    children: /* @__PURE__ */ jsxs("span", { className: "relative z-10 flex items-center gap-2", children: [
                      getIconForCategory(category.name),
                      category.name
                    ] })
                  },
                  category._id
                ))
              ] }),
              loading && /* @__PURE__ */ jsxs("div", { className: "text-center py-20", children: [
                /* @__PURE__ */ jsx("div", { className: "inline-block w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" }),
                /* @__PURE__ */ jsx("p", { className: `mt-4 ${bodyClass}`, children: "Loading products..." })
              ] }),
              error && !loading && /* @__PURE__ */ jsx("div", { className: "text-center py-20", children: /* @__PURE__ */ jsx("p", { className: "text-red-500 text-lg", children: error }) }),
              !loading && !error && filteredNewsItems.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-20", children: [
                /* @__PURE__ */ jsx(Newspaper, { className: "w-16 h-16 text-gray-600 mx-auto mb-4" }),
                /* @__PURE__ */ jsx("p", { className: `text-lg ${bodyClass}`, children: !selectedCategory?._id || selectedCategory?.name === "All" ? "No products available at the moment" : `No products found in "${selectedCategory?.name}" category` })
              ] }),
              !loading && !error && filteredNewsItems.length > 0 && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: filteredNewsItems.map((news, idx) => {
                const slug = news.slug || news._id;
                const hasLiked = userLikes.has(slug);
                return /* @__PURE__ */ jsxs(
                  "article",
                  {
                    className: `group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${cardClass}`,
                    style: { animationDelay: `${idx * 150}ms` },
                    children: [
                      news.trending && /* @__PURE__ */ jsxs("div", { className: "absolute top-4 left-4 z-20 flex items-center gap-1 px-3 py-1.5 bg-red-600 rounded-full shadow-lg animate-pulse", children: [
                        /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-white" }),
                        /* @__PURE__ */ jsx("span", { className: "text-white text-xs font-bold", children: "Trending" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "relative h-56 overflow-hidden bg-gray-800", children: [
                        news.image ? /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: news.image,
                            alt: news.title,
                            className: "w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          }
                        ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Newspaper, { className: "w-16 h-16 text-gray-600" }) }),
                        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" }),
                        /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-red-500/30", children: /* @__PURE__ */ jsx("span", { className: "text-red-400 text-xs font-semibold", children: news.category }) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
                        /* @__PURE__ */ jsxs(
                          "div",
                          {
                            className: `flex items-center gap-4 mb-4 text-sm ${bodyClass}`,
                            children: [
                              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                                /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
                                /* @__PURE__ */ jsx("span", { children: news.date })
                              ] }),
                              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                                /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
                                /* @__PURE__ */ jsx("span", { children: news.readTime })
                              ] }),
                              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                                /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }),
                                /* @__PURE__ */ jsx("span", { children: news.views || 0 })
                              ] })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "h3",
                          {
                            className: `text-xl font-bold mb-3 line-clamp-2 ${headingClass} group-hover:text-red-400 transition-colors`,
                            children: news.title
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: `text-sm mb-4 line-clamp-3 leading-relaxed ${bodyClass}`,
                            dangerouslySetInnerHTML: {
                              __html: DOMPurify.sanitize(news.description || "")
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-gray-800", children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5", children: [
                            /* @__PURE__ */ jsxs(
                              "button",
                              {
                                onClick: () => handleAction("like", news),
                                className: `flex items-center gap-1 transition-colors ${hasLiked ? "text-red-500" : "hover:text-red-500"}`,
                                children: [
                                  /* @__PURE__ */ jsx(
                                    Heart,
                                    {
                                      className: `w-5 h-5 ${hasLiked ? "fill-current" : ""}`
                                    }
                                  ),
                                  news.likes || 0
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxs(
                              "button",
                              {
                                onClick: () => handleAction("comment", news),
                                className: "flex items-center gap-1 hover:text-red-500 transition-colors",
                                children: [
                                  /* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5" }),
                                  (news.comments?.length || 0) + (updatedItems[slug]?.comments?.length || 0)
                                ]
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxs(
                            "button",
                            {
                              onClick: () => handleAction("read", news),
                              className: "flex items-center gap-2 px-5 py-2 text-red-500 hover:text-red-600 font-medium rounded-lg border border-red-500/30 hover:border-red-500 transition-all",
                              children: [
                                "Read More ",
                                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                              ]
                            }
                          )
                        ] })
                      ] })
                    ]
                  },
                  slug
                );
              }) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `bg-black py-24 relative overflow-hidden ${isDark ? "" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 lg:px-8 relative z-10", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
                /* @__PURE__ */ jsx(
                  "h2",
                  {
                    className: `text-4xl md:text-5xl font-bold mb-4 ${headingClass}`,
                    children: "Technologies We Excel In"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-gradient-to-r from-red-600 to-red-800 mx-auto mb-6" }),
                /* @__PURE__ */ jsx("p", { className: `text-lg ${bodyClass}`, children: "Modern, reliable, and battle-tested tech stack" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 max-w-6xl mx-auto", children: [
                { name: "Java + Spring Boot", icon: Code2 },
                { name: "React / Angular", icon: Code2 },
                { name: "Node.js", icon: Zap },
                { name: "MySQL / PostgreSQL", icon: Database },
                { name: "AWS", icon: Cloud },
                { name: "Azure", icon: Cloud },
                { name: "GCP", icon: Cloud }
              ].map((tech) => {
                const TechIcon = tech.icon;
                return /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `group relative rounded-xl p-6 text-center font-semibold border transition-all duration-300 hover:scale-110 cursor-pointer ${cardClass}`,
                    children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col items-center gap-3", children: [
                      /* @__PURE__ */ jsx(
                        TechIcon,
                        {
                          className: `w-8 h-8 ${accentClass} group-hover:text-red-400 transition-colors`
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: `group-hover:text-black transition-colors text-sm ${bodyClass}`,
                          children: tech.name
                        }
                      )
                    ] })
                  },
                  tech.name
                );
              }) })
            ] })
          }
        ),
        showCommentModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: `max-w-lg w-full rounded-2xl p-6 ${isDark ? "bg-gray-900" : "bg-white"} shadow-2xl`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-5", children: [
                /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Write a Comment" }),
                /* @__PURE__ */ jsx("button", { onClick: () => setShowCommentModal(false), children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) })
              ] }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: commentText,
                  onChange: (e) => setCommentText(e.target.value),
                  placeholder: "What are your thoughts?",
                  rows: 5,
                  className: `w-full p-4 rounded-xl border resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-red-500 ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-300"}`
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-5", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setShowCommentModal(false),
                    className: `flex-1 py-3 rounded-xl font-medium border ${isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-100"}`,
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: submitComment,
                    disabled: loadingAction || !commentText.trim(),
                    className: `flex-1 py-3 rounded-xl font-medium text-white flex items-center justify-center ${commentText.trim() ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"}`,
                    children: loadingAction ? /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin" }) : "Post Comment"
                  }
                )
              ] })
            ]
          }
        ) }),
        showVerifyModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: `max-w-md w-full rounded-2xl p-8 ${isDark ? "bg-gray-900" : "bg-white"} shadow-2xl`,
            children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6 text-center", children: step === "form" ? "Verify Yourself" : "Enter OTP" }),
              step === "form" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Full Name",
                    value: userInfo.name,
                    onChange: (e) => setUserInfo({ ...userInfo, name: e.target.value }),
                    className: `w-full p-3 rounded-lg mb-4 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    placeholder: "Email Address",
                    value: userInfo.email,
                    onChange: (e) => setUserInfo({ ...userInfo, email: e.target.value }),
                    className: `w-full p-3 rounded-lg mb-4 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    placeholder: "Phone Number (Optional)",
                    value: userInfo.phone,
                    onChange: (e) => setUserInfo({ ...userInfo, phone: e.target.value }),
                    className: `w-full p-3 rounded-lg mb-6 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: sendOtp,
                    disabled: loadingAction,
                    className: "w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg text-white font-medium disabled:opacity-70",
                    children: "Send OTP"
                  }
                )
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs("p", { className: "text-center mb-6 text-sm opacity-75", children: [
                  "OTP sent to ",
                  /* @__PURE__ */ jsx("strong", { children: userInfo.email })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Enter 6-digit OTP",
                    value: otp,
                    onChange: (e) => setOtp(e.target.value),
                    maxLength: 6,
                    className: `w-full p-4 text-center text-2xl tracking-widest rounded-lg border mb-6 ${isDark ? "bg-gray-800" : "bg-gray-50"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: verifyOtp,
                    className: "w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg text-white font-medium",
                    children: "Verify OTP"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setShowVerifyModal(false),
                  className: "mt-6 text-sm text-gray-500 underline block mx-auto",
                  children: "Cancel"
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("style", { jsx: true, children: `
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(-5deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
      ` })
      ]
    }
  );
};
const fetchTechNews = createAsyncThunk(
  "techNews/fetchTechNews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/tech");
      let items = response.data?.data || [];
      if (!Array.isArray(items)) {
        items = [];
      }
      const formatted = items.map((item, index) => ({
        id: item._id || `item-${index + 1}`,
        title: item.title || "Untitled",
        description: item.description || "No description available",
        date: item.updatedAt || item.createdAt ? new Date(item.updatedAt || item.createdAt).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric"
          }
        ) : (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        }),
        category: item.category?.name || "General",
        link: item.link || item.url || "#",
        image: item.images && item.images.length > 0 ? item.images[0] : null
      }));
      return formatted;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to load tech news";
      return rejectWithValue(message);
    }
  }
);
const initialState$1 = {
  items: [],
  status: "idle",
  // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  selectedCategory: "All"
};
const techNewsSlice = createSlice({
  name: "techNews",
  initialState: initialState$1,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTechNews.pending, (state) => {
      state.status = "loading";
      state.error = null;
    }).addCase(fetchTechNews.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    }).addCase(fetchTechNews.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  }
});
const { setSelectedCategory } = techNewsSlice.actions;
const techNewsReducer = techNewsSlice.reducer;
const TechNews = () => {
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const {
    items: newsItems,
    selectedCategory,
    status,
    error
  } = useSelector((state) => state.techNews);
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTechNews());
    }
  }, [status, dispatch]);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const categories = [
    "All",
    ...new Set(newsItems.map((item) => item.category))
  ];
  const filteredNews = selectedCategory === "All" ? newsItems : newsItems.filter((item) => item.category === selectedCategory);
  const getIconForCategory = (category) => {
    const cat = (category || "").toLowerCase();
    if (cat.includes("ai") || cat.includes("artificial intelligence"))
      return /* @__PURE__ */ jsx(Cpu, { className: "w-5 h-5" });
    if (cat.includes("hardware")) return /* @__PURE__ */ jsx(Zap, { className: "w-5 h-5" });
    if (cat.includes("company") || cat.includes("update"))
      return /* @__PURE__ */ jsx(Cpu, { className: "w-5 h-5" });
    if (cat.includes("industry") || cat.includes("news"))
      return /* @__PURE__ */ jsx(Newspaper, { className: "w-5 h-5" });
    if (cat.includes("software") || cat.includes("developer"))
      return /* @__PURE__ */ jsx(Cpu, { className: "w-5 h-5" });
    return /* @__PURE__ */ jsx(Globe, { className: "w-5 h-5" });
  };
  const cardClass = isDark ? "bg-gray-900 border border-gray-800 hover:border-red-600/50 hover:shadow-xl hover:shadow-red-900/20" : "bg-white border border-gray-200 shadow-lg hover:shadow-2xl";
  const headingClass = isDark ? "text-white" : "text-gray-900";
  const bodyClass = isDark ? "text-gray-300" : "text-gray-700";
  const accentClass = "text-red-600";
  const sanitize = (html) => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ["b", "i", "em", "strong", "p", "br", "ul", "ol", "li", "a"],
      ALLOWED_ATTR: ["href", "target", "rel"]
    });
  };
  if (status === "loading") {
    return /* @__PURE__ */ jsxs("div", { className: `min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-700
        ${isDark ? "bg-black text-gray-100" : "bg-gray-50 text-gray-900"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "relative w-24 h-24", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-3 border-4 border-gray-300 border-r-red-500 rounded-full animate-spin", style: { animationDuration: "1.5s", animationDirection: "reverse" } }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-6 border-4 border-gray-300 border-b-red-400 rounded-full animate-spin", style: { animationDuration: "2s" } }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-red-600 rounded-full animate-pulse shadow-lg shadow-red-600/50" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Newspaper, { className: "w-5 h-5 text-red-600 animate-pulse" }),
        /* @__PURE__ */ jsx("p", { className: `text-lg ${bodyClass} animate-pulse`, children: "Loading latest tech news..." })
      ] })
    ] });
  }
  if (status === "failed") {
    return /* @__PURE__ */ jsx("div", { className: `min-h-screen flex items-center justify-center p-6 transition-colors duration-700
        ${isDark ? "bg-black text-gray-100" : "bg-gray-50 text-gray-900"}`, children: /* @__PURE__ */ jsx("div", { className: "text-xl text-red-500", children: error || "Something went wrong" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: `min-h-screen p-6 md:p-10 relative transition-colors duration-700
      ${isDark ? "bg-black text-gray-100" : "bg-gray-50 text-gray-900"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-10", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(Newspaper, { className: `w-10 h-10 ${accentClass}`, strokeWidth: 2.5 }),
        /* @__PURE__ */ jsxs("h1", { className: `text-4xl md:text-5xl font-bold tracking-tight ${headingClass}`, children: [
          "Tech",
          /* @__PURE__ */ jsx("span", { className: accentClass, children: "News" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3 mb-10", children: categories.map((category) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => dispatch(setSelectedCategory(category)),
          className: `px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category ? "bg-red-600 text-white shadow-lg shadow-red-900/40" : isDark ? "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700" : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 hover:border-red-600"}`,
          children: category
        },
        category
      )) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredNews.map((item) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: `group rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl ${cardClass}`,
          children: [
            /* @__PURE__ */ jsx("div", { className: `p-5 border-b ${isDark ? "border-gray-800" : "border-gray-200"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: `p-2 rounded-lg ${isDark ? "bg-red-900/30" : "bg-red-100"} text-red-500`, children: getIconForCategory(item.category) }),
                /* @__PURE__ */ jsx("span", { className: `text-xs font-semibold uppercase tracking-wider ${accentClass}`, children: item.category })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-1 text-xs ${bodyClass}`, children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5" }),
                item.date
              ] })
            ] }) }),
            item.image && /* @__PURE__ */ jsx("div", { className: "h-48 overflow-hidden", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: item.image,
                alt: item.title,
                loading: "lazy",
                className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
              /* @__PURE__ */ jsx("h2", { className: `text-xl font-bold mb-3 group-hover:text-red-500 transition-colors ${headingClass}`, children: item.title }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `text-sm leading-relaxed mb-6 line-clamp-3 ${bodyClass}`,
                  dangerouslySetInnerHTML: {
                    __html: sanitize(item.description || "")
                  }
                }
              ),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: item.link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: `inline-flex items-center gap-2 font-medium text-sm transition-colors ${accentClass} hover:text-red-400`,
                  children: [
                    "Read more",
                    /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" })
                  ]
                }
              )
            ] })
          ]
        },
        item.id
      )) }),
      filteredNews.length === 0 && /* @__PURE__ */ jsx("div", { className: `text-center text-lg mt-12 ${bodyClass}`, children: "No news found in this category." })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: scrollToTop,
        className: `fixed bottom-6 right-6 z-50 p-4 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/50 transition-all duration-300 hover:scale-110 active:scale-95 ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"}`,
        "aria-label": "Scroll to top",
        children: /* @__PURE__ */ jsx(ArrowUp, { className: "w-6 h-6" })
      }
    )
  ] });
};
const TechnologyDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  const { newsItems, loading, error } = useSelector(
    (state) => state.technology
  );
  const [post, setPost] = useState(null);
  const hasIncrementedView = useRef(false);
  const [commentText, setCommentText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    hasIncrementedView.current = false;
  }, [slug]);
  useEffect(() => {
    if (!slug) return;
    dispatch(fetchSinglePost(slug));
  }, [slug, dispatch]);
  useEffect(() => {
    if (slug && post && !hasIncrementedView.current) {
      dispatch(incrementPostView$1(slug));
      hasIncrementedView.current = true;
    }
  }, [slug, post, dispatch]);
  useEffect(() => {
    if (!slug) return;
    const updatedPost = newsItems.find((item) => item.slug === slug);
    if (updatedPost) {
      setPost(updatedPost);
    }
  }, [newsItems, slug]);
  if (loading && !post) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-20 text-xl", children: "Loading post..." });
  }
  if (error || !post) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: `min-h-screen flex items-center justify-center ${isDark ? "bg-black text-white" : "bg-gray-50"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4", children: "Post Not Found" }),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/technology",
              className: "text-blue-600 hover:underline text-lg",
              children: "← Back to Technology"
            }
          )
        ] })
      }
    );
  }
  const sanitizedContent = DOMPurify.sanitize(post.description || "");
  const handleLike = () => {
    if (!email) {
      alert("Please enter your email in the comment section first");
      return;
    }
    dispatch(togglePostLike$1({ slug, email }));
  };
  const handleSendOtp = async () => {
    if (!name || !email || !phone) {
      alert("All fields are required");
      return;
    }
    setIsSubmitting(true);
    const result = await dispatch(sendCommentOtp$1({ slug, name, email, phone }));
    setIsSubmitting(false);
    if (!result.error) {
      setShowOtpInput(true);
    } else {
      alert("Failed to send OTP");
    }
  };
  const handlePostComment = async () => {
    if (!otp || !commentText.trim()) {
      alert("OTP and comment are required");
      return;
    }
    setIsSubmitting(true);
    const result = await dispatch(
      postCommentWithOtp({ slug, email, otp, comment: commentText })
    );
    setIsSubmitting(false);
    if (!result.error) {
      setCommentText("");
      setOtp("");
      setShowOtpInput(false);
      alert("✅ Comment posted successfully!");
    } else {
      alert("Failed to post comment. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `min-h-screen mt-10 ${isDark ? "bg-black text-white" : "bg-white text-gray-900"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative h-[500px] overflow-hidden", children: [
          post.image ? /* @__PURE__ */ jsx(
            "img",
            {
              src: post.image,
              alt: post.title,
              className: "w-full h-full object-cover brightness-75"
            }
          ) : /* @__PURE__ */ jsx(
            "div",
            {
              className: `absolute inset-0 ${isDark ? "bg-gradient-to-br from-gray-900 to-black" : "bg-gradient-to-br from-gray-100 to-white"}`
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent" }),
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-5xl mx-auto", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `inline-block px-4 py-1.5 mb-4 text-sm rounded-full border ${isDark ? "bg-red-900/70 border-red-700 text-red-200" : "bg-red-100 border-red-200 text-red-700"}`,
                children: post.category || "Technology"
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: `flex flex-wrap items-center gap-4 text-lg ${isDark ? "text-gray-400" : "text-gray-600"} mb-4`,
                children: [
                  /* @__PURE__ */ jsx("div", { children: post.date || "Recently" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("span", { children: "•" }),
                    /* @__PURE__ */ jsx("span", { children: post.author ? `By ${post.author}` : "Anonymous" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "h1",
              {
                className: `text-4xl md:text-6xl font-bold leading-tight mb-6 
                         text-zinc-900 dark:text-white 
                         tracking-tight ${isDark ? "text-gray-300" : "text-gray-700"}`,
                children: post.title
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("main", { className: "max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-20", children: [
          /* @__PURE__ */ jsxs("article", { className: `prose max-w-none ${isDark ? "prose-invert" : ""}`, children: [
            sanitizedContent ? /* @__PURE__ */ jsx(
              "div",
              {
                className: `text-[1.1rem] leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`,
                dangerouslySetInnerHTML: { __html: sanitizedContent }
              }
            ) : /* @__PURE__ */ jsx("p", { className: "text-center py-20 italic text-gray-500", children: "Content not available" }),
            post.images?.length > 1 && /* @__PURE__ */ jsx("div", { className: "my-16 grid grid-cols-1 md:grid-cols-2 gap-6", children: post.images.slice(1).map((img, idx) => /* @__PURE__ */ jsx(
              "img",
              {
                src: img,
                alt: `Technology image ${idx + 2}`,
                className: "rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 object-cover"
              },
              idx
            )) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-end mt-8", children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleLike,
              className: "flex items-center gap-2 text-red-600 hover:text-red-700 text-2xl font-medium transition-colors",
              children: [
                "❤️ ",
                /* @__PURE__ */ jsx("span", { children: post.likes || 0 })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs("section", { className: "mt-20 bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-800", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-2", children: "Comments" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-500 dark:text-gray-400 mb-8", children: [
              post.comments?.length || 0,
              " comment",
              post.comments?.length !== 1 ? "s" : ""
            ] }),
            post.comments?.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-6", children: post.comments.map((comment, index) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: `p-6 rounded-2xl border ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-gray-50"}`,
                children: [
                  /* @__PURE__ */ jsx("div", { className: "flex justify-between mb-3", children: /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-semibold", children: comment.name || comment.username || comment.email || comment.user?.name || comment.user?.user || comment.user?.email || "Anonymous" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: comment.createdAt ? new Date(comment.createdAt).toLocaleString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      }
                    ) : "Just now" })
                  ] }) }),
                  /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-gray-700 dark:text-gray-300", children: comment.comment })
                ]
              },
              comment._id || index
            )) }) : /* @__PURE__ */ jsx("div", { className: "text-center py-12 text-gray-500 dark:text-gray-400", children: "No comments yet. Be the first to comment!" }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: `mt-12 p-8 rounded-2xl ${isDark ? "bg-zinc-900" : "bg-gray-50"}`,
                children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold mb-6", children: "Leave a Comment" }),
                  !showOtpInput ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        placeholder: "Your Name",
                        value: name,
                        onChange: (e) => setName(e.target.value),
                        className: `w-full p-4 rounded-xl mb-4 border ${isDark ? "bg-black border-gray-700" : "bg-white border-gray-300"}`
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "email",
                        placeholder: "Email Address",
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                        className: `w-full p-4 rounded-xl mb-4 border ${isDark ? "bg-black border-gray-700" : "bg-white border-gray-300"}`
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "tel",
                        placeholder: "Phone Number",
                        value: phone,
                        onChange: (e) => setPhone(e.target.value),
                        className: `w-full p-4 rounded-xl mb-6 border ${isDark ? "bg-black border-gray-700" : "bg-white border-gray-300"}`
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: handleSendOtp,
                        disabled: isSubmitting,
                        className: "w-full bg-red-600 hover:bg-red-700 py-4 rounded-xl text-white font-semibold disabled:opacity-70",
                        children: isSubmitting ? "Sending OTP..." : "Send OTP"
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        placeholder: "Enter OTP",
                        value: otp,
                        onChange: (e) => setOtp(e.target.value),
                        maxLength: 6,
                        className: `w-full p-4 rounded-xl mb-4 text-center text-2xl tracking-widest border ${isDark ? "bg-black border-gray-700" : "bg-white border-gray-300"}`
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        placeholder: "Write your comment...",
                        value: commentText,
                        onChange: (e) => setCommentText(e.target.value),
                        rows: 5,
                        className: `w-full p-4 rounded-xl mb-4 border ${isDark ? "bg-black border-gray-700" : "bg-white border-gray-300"}`
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: handlePostComment,
                        disabled: isSubmitting,
                        className: "w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl text-white font-semibold disabled:opacity-70",
                        children: isSubmitting ? "Posting..." : "Post Comment"
                      }
                    )
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-center mt-16", children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "/technology",
              className: `inline-flex items-center px-8 py-4 rounded-xl font-medium text-lg transition-all ${isDark ? "bg-red-900/60 hover:bg-red-800 border border-red-700 text-red-200" : "bg-red-100 hover:bg-red-200 border border-red-600 text-red-700"}`,
              children: "← Back to Technology"
            }
          ) })
        ] })
      ]
    }
  );
};
const img1 = "/assets/newimage1-C9geVYbM.jpg";
const img2 = "/assets/newimage4-Cvb4vwUh.jpg";
const img3 = "/assets/Generatedimage-ngU_VNNU.png";
const img4 = "/assets/generatedimage2-DtxshJSZ.jpg";
const img5 = "/assets/generatedimage4-_IaIqaco.jpg";
const img6 = "/assets/newimage2-BCV2a2Hf.jpg";
const img7 = "/assets/recentiamge2-DsbCcW4j.jpg";
const img8 = "/assets/newimage3-D_d3FMdm.jpg";
const img9 = "/assets/recentimage2-CWy9UzuM.jpg";
const portfolioItems = [
  {
    id: "1561",
    title: "Sameer Tent House",
    categories: ["Consultancy", "Global Business", "Industrial", "UI/UX"],
    image: img1,
    link: "https://www.sameertenthouse.com"
  },
  {
    id: "1554",
    title: "Balaji Events",
    categories: ["Consultancy", "Corporate", "Global Business", "UI/UX"],
    image: img2,
    link: "https://grand-sameer-project-e4z5.vercel.app/"
  },
  {
    id: "1541",
    title: "FirstMeridian",
    categories: ["Consultancy", "Resourcing"],
    image: img3,
    link: "https://firstmeridian.com"
  },
  {
    id: "1533",
    title: "Balaji Decorators",
    categories: ["Consultancy", "Corporate", "Medical", "SAAS", "Software", "UI/UX"],
    image: img6,
    link: "https://www.balajidecorater.com"
  },
  {
    id: "1522",
    title: "Clanbridge",
    categories: ["Hospitality", "Lifestyle", "Real Estate", "UI/UX"],
    image: img4,
    link: "https://clanbridge.com"
  },
  {
    id: "1477",
    title: "Acutok",
    categories: ["Consultancy", "SAAS", "Software", "UI/UX"],
    image: img5,
    link: "https://acutok.com"
  },
  {
    id: "1473",
    title: "IncorpNow",
    categories: ["Consultancy", "SAAS", "Software", "UI/UX"],
    image: img8,
    link: "https://www.incorpnow.in/"
  },
  {
    id: "1456",
    title: "Alankaram",
    categories: ["Ecommerce", "Furniture", "Lifestyle"],
    image: img7,
    link: "https://alankaram.in"
  },
  {
    id: "1517",
    title: "Vidoo",
    categories: ["Consultancy", "SAAS", "Software", "UI/UX"],
    image: img9,
    link: "https://aaalay.com"
  }
];
const allCategories = ["All", ...new Set(portfolioItems.flatMap((item) => item.categories))];
function RecentWork() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );
  const [activeFilter, setActiveFilter] = useState("All");
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return portfolioItems;
    return portfolioItems.filter((item) => item.categories.includes(activeFilter));
  }, [activeFilter]);
  return /* @__PURE__ */ jsxs("div", { className: `min-h-screen relative overflow-x-hidden transition-colors duration-500
      ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `absolute inset-0 z-0 ${isDark ? "bg-gradient-to-b from-black via-gray-950 to-black" : "bg-gradient-to-b from-white via-gray-50 to-red-50/30"}`
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 pt-16 md:pt-24 lg:pt-28 pb-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 md:mb-16", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-5xl sm:text-6xl lg:text-7xl font-black mb-5 tracking-tight leading-tight", children: [
          "OUR",
          " ",
          /* @__PURE__ */ jsx("span", { className: isDark ? "bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-rose-500 to-pink-600" : "bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-red-500 to-rose-600", children: "RECENT WORK" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: `text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`, children: "Crafting high-impact digital experiences that drive growth across industries." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-2.5 md:gap-4 mb-10 md:mb-14", children: allCategories.map((cat) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setActiveFilter(cat),
          className: `
                px-6 py-3 rounded-full text-sm md:text-base font-semibold uppercase tracking-wider
                border transition-all duration-300
                ${activeFilter === cat ? isDark ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-900/50" : "bg-red-600 border-red-500 text-white shadow-lg shadow-red-300/50" : isDark ? "bg-white/5 border-gray-700 text-gray-200 hover:bg-white/10 hover:border-gray-500" : "bg-white border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-400"}
              `,
          children: cat
        },
        cat
      )) }),
      /* @__PURE__ */ jsx("div", { className: "columns-1 sm:columns-2 lg:columns-3 gap-5 pb-8", children: filteredItems.length === 0 ? /* @__PURE__ */ jsx("div", { className: `col-span-full text-center py-20 text-xl ${isDark ? "text-gray-300" : "text-gray-600"}`, children: "No projects match this filter." }) : filteredItems.map((item) => /* @__PURE__ */ jsx(
        "a",
        {
          href: item.link,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "group block break-inside-avoid cursor-pointer pb-6",
          children: /* @__PURE__ */ jsx("div", { className: `
                  relative overflow-hidden rounded-2xl
                  border transition-all duration-300 hover:-translate-y-2
                  ${isDark ? "bg-gray-900/60 backdrop-blur-sm border-gray-800/70 shadow-xl shadow-black/60 hover:shadow-2xl hover:shadow-red-900/30" : "bg-white border-gray-200 shadow-md hover:shadow-xl hover:shadow-red-200/60"}
                `, children: /* @__PURE__ */ jsxs("div", { className: "relative w-full aspect-[4/3] overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110",
                style: { backgroundImage: `url(${item.image})` }
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" }),
            /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-500", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-black text-white tracking-tight drop-shadow-2xl", children: item.title }),
              /* @__PURE__ */ jsxs("p", { className: "mt-3 text-sm md:text-base font-medium uppercase tracking-wider text-white/90", children: [
                item.categories.slice(0, 3).join(" • "),
                item.categories.length > 3 && " • +more"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center gap-2 text-white/90 text-sm font-medium", children: [
                /* @__PURE__ */ jsx("span", { children: "View Live Project" }),
                /* @__PURE__ */ jsx(ExternalLink, { size: 18 })
              ] })
            ] })
          ] }) })
        },
        item.id
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mt-16", children: [
        /* @__PURE__ */ jsxs("h2", { className: `text-4xl md:text-5xl font-black mb-6 ${isDark ? "text-white" : "text-gray-900"}`, children: [
          "Ready to Start",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Your Project" }),
          "?"
        ] }),
        /* @__PURE__ */ jsx("p", { className: `text-lg md:text-xl mb-8 max-w-xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`, children: "Let's create something powerful together." }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/contact",
            className: `
              inline-flex items-center gap-3 px-10 py-5 rounded-full text-xl font-bold text-white
              transition-all duration-300 hover:-translate-y-1
              bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 
              shadow-xl shadow-red-900/50 hover:shadow-red-800/60
            `,
            children: [
              "Let's Talk",
              /* @__PURE__ */ jsx(ArrowRight, { size: 24 })
            ]
          }
        )
      ] })
    ] })
  ] });
}
function CareerPage() {
  const { isDark } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeName, setResumeName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("http://localhost:8000/jobapply");
        if (!res.ok) throw new Error("Failed to load job openings");
        const data = await res.json();
        setJobs(data.data || []);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const openApplyModal = (job) => {
    setSelectedJob(job);
    setFormData({ name: "", email: "", phone: "" });
    setResumeFile(null);
    setResumeName("");
    setSubmitMessage({ type: "", text: "" });
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    setResumeFile(null);
    setResumeName("");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      if (!validTypes.includes(file.type)) {
        setSubmitMessage({
          type: "error",
          text: "Only PDF, DOC, or DOCX files are allowed!"
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setSubmitMessage({
          type: "error",
          text: "File size must be less than 5MB!"
        });
        return;
      }
      setResumeFile(file);
      setResumeName(file.name);
      setSubmitMessage({ type: "", text: "" });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;
    if (!resumeFile) {
      setSubmitMessage({ type: "error", text: "Please upload your resume!" });
      return;
    }
    setSubmitting(true);
    setSubmitMessage({ type: "", text: "" });
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("resume", resumeFile);
      const res = await fetch(
        `http://localhost:8000/jobapplication/apply/${selectedJob._id}`,
        {
          method: "POST",
          body: formDataToSend
          // Do NOT set Content-Type header → Let browser set boundary
        }
      );
      const data = await res.json();
      if (res.ok) {
        setSubmitMessage({
          type: "success",
          text: "🎉 Application submitted successfully!"
        });
        setTimeout(() => closeModal(), 1800);
      } else {
        setSubmitMessage({
          type: "error",
          text: data.message || "Failed to submit application"
        });
      }
    } catch (err) {
      console.error(err);
      setSubmitMessage({
        type: "error",
        text: "Network error. Please check your connection."
      });
    } finally {
      setSubmitting(false);
    }
  };
  const cardClass = isDark ? "bg-gray-900/70 border border-gray-800 hover:border-red-600/60 p-8 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/20" : "bg-white border border-gray-200 shadow-lg hover:shadow-2xl p-8 rounded-xl transition-all duration-300";
  const headingClass = isDark ? "text-white" : "text-gray-900";
  const bodyClass = isDark ? "text-gray-300" : "text-gray-700";
  const accentClass = "text-red-600";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `min-h-screen transition-colors duration-700 relative overflow-hidden
      ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`,
      children: [
        /* @__PURE__ */ jsxs("section", { className: "relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `absolute inset-0 transition-all duration-700
          ${isDark ? "bg-gradient-to-br from-red-950/30 via-black to-black" : "bg-gradient-to-br from-red-100 via-white to-white"}`
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative max-w-7xl mx-auto px-6 lg:px-8 text-center", children: [
            /* @__PURE__ */ jsxs(
              motion.h1,
              {
                initial: { opacity: 0, y: 40 },
                animate: { opacity: 1, y: 0 },
                className: `text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight ${headingClass}`,
                children: [
                  /* @__PURE__ */ jsx("span", { className: accentClass, children: "Join" }),
                  " Our Team"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 40 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.2 },
                className: `mt-6 text-xl md:text-2xl max-w-3xl mx-auto ${bodyClass}`,
                children: "Be part of a team that's building the future. We are looking for passionate, curious and bold people."
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 40 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.4 },
                className: "mt-10",
                children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "#open-positions",
                    className: "inline-block bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-lg px-10 py-5 rounded-lg transition-all duration-300 shadow-lg shadow-red-900/40",
                    children: "See Open Positions →"
                  }
                )
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-20 border-t ${isDark ? "border-gray-800" : "border-gray-200"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-8", children: [
              /* @__PURE__ */ jsxs(
                "h2",
                {
                  className: `text-4xl md:text-5xl font-bold text-center mb-16 ${headingClass}`,
                  children: [
                    "Why Work ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "With Us?" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-10", children: [
                {
                  title: "Ownership & Impact",
                  desc: "You’ll own real features from day one and see your work used by thousands."
                },
                {
                  title: "Rapid Growth",
                  desc: "Fast-paced environment where you learn and level up every month."
                },
                {
                  title: "Great Team",
                  desc: "Work with smart, kind, and ambitious people who actually enjoy working together."
                }
              ].map((item, i) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 50 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: i * 0.1 },
                  className: cardClass,
                  children: [
                    /* @__PURE__ */ jsx("h3", { className: `text-2xl font-semibold mb-4 ${accentClass}`, children: item.title }),
                    /* @__PURE__ */ jsx("p", { className: `leading-relaxed ${bodyClass}`, children: item.desc })
                  ]
                },
                i
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            id: "open-positions",
            className: `py-20 ${isDark ? "bg-gradient-to-b from-black to-gray-950" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 lg:px-8", children: [
              /* @__PURE__ */ jsxs(
                "h2",
                {
                  className: `text-4xl md:text-5xl font-bold text-center mb-16 ${headingClass}`,
                  children: [
                    "Open ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Positions" })
                  ]
                }
              ),
              loading && /* @__PURE__ */ jsx("div", { className: "text-center py-20", children: /* @__PURE__ */ jsx("p", { className: `text-xl ${bodyClass}`, children: "Loading exciting opportunities..." }) }),
              error && /* @__PURE__ */ jsx("div", { className: "text-center py-20 text-red-500", children: /* @__PURE__ */ jsxs("p", { children: [
                "⚠️ ",
                error
              ] }) }),
              !loading && !error && jobs.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-20", children: /* @__PURE__ */ jsx("p", { className: `text-xl ${bodyClass}`, children: "No open positions right now. Please check back later!" }) }),
              /* @__PURE__ */ jsx("div", { className: "space-y-6", children: jobs.map((job, i) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: i * 0.1 },
                  className: `group flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 rounded-xl transition-all duration-300
                  ${isDark ? "bg-gray-900/70 border border-gray-800 hover:border-red-700/60" : "bg-white border border-gray-200 hover:border-red-600 shadow-md hover:shadow-xl"}`,
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsx(
                        "h3",
                        {
                          className: `text-2xl font-semibold group-hover:text-red-600 transition-colors ${headingClass}`,
                          children: job.title
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className: `mt-3 flex flex-wrap gap-4 text-sm ${bodyClass}`,
                          children: [
                            /* @__PURE__ */ jsx("span", { children: "•" }),
                            /* @__PURE__ */ jsx("span", { className: "capitalize", children: job.category?.name || "Full-time" }),
                            job.endDate && /* @__PURE__ */ jsxs(Fragment, { children: [
                              /* @__PURE__ */ jsx("span", { children: "•" }),
                              /* @__PURE__ */ jsxs("span", { children: [
                                "Closes on:",
                                " ",
                                new Date(job.endDate).toLocaleDateString("en-IN")
                              ] })
                            ] })
                          ]
                        }
                      ),
                      job.description && /* @__PURE__ */ jsx("p", { className: `mt-4 line-clamp-3 ${bodyClass}`, children: job.description })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => openApplyModal(job),
                        className: "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-8 py-4 rounded-lg font-medium transition-all whitespace-nowrap self-start md:self-center",
                        children: "Apply Now"
                      }
                    )
                  ]
                },
                job._id
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 border-t ${isDark ? "border-gray-800" : "border-gray-200"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 text-center", children: [
              /* @__PURE__ */ jsxs("h2", { className: `text-4xl md:text-5xl font-bold mb-8 ${headingClass}`, children: [
                "Ready to ",
                /* @__PURE__ */ jsx("span", { className: accentClass, children: "build" }),
                " something epic?"
              ] }),
              /* @__PURE__ */ jsx("p", { className: `text-xl mb-10 ${bodyClass}`, children: "Join us and leave your mark." }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "#open-positions",
                  className: "inline-block bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-12 py-6 text-xl font-semibold rounded-xl shadow-xl transition-all duration-300",
                  children: "Explore Open Roles →"
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { children: isModalOpen && selectedJob && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9, y: 20 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.9, y: 20 },
            className: `w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl
                ${isDark ? "bg-gray-900 border border-gray-700" : "bg-white border border-gray-200"}`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-gray-700 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: `text-2xl font-bold ${headingClass}`, children: "Apply for" }),
                  /* @__PURE__ */ jsx("p", { className: "text-red-600 font-semibold", children: selectedJob.title })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: closeModal,
                    className: "text-3xl leading-none text-gray-400 hover:text-white transition-colors",
                    children: "×"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(
                    "label",
                    {
                      className: `block mb-1 text-sm font-medium ${bodyClass}`,
                      children: "Full Name *"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      name: "name",
                      value: formData.name,
                      onChange: handleInputChange,
                      required: true,
                      className: `w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-red-600 transition-colors
                      ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"}`
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(
                      "label",
                      {
                        className: `block mb-1 text-sm font-medium ${bodyClass}`,
                        children: "Email *"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "email",
                        name: "email",
                        value: formData.email,
                        onChange: handleInputChange,
                        required: true,
                        className: `w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-red-600 transition-colors
                        ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"}`
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(
                      "label",
                      {
                        className: `block mb-1 text-sm font-medium ${bodyClass}`,
                        children: "Phone *"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "tel",
                        name: "phone",
                        value: formData.phone,
                        onChange: handleInputChange,
                        required: true,
                        className: `w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-red-600 transition-colors
                        ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"}`
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(
                    "label",
                    {
                      className: `block mb-1 text-sm font-medium ${bodyClass}`,
                      children: "Resume (PDF, DOC, DOCX) *"
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: `border-2 border-dashed rounded-xl p-6 text-center transition-all hover:border-red-600
                    ${isDark ? "border-gray-700" : "border-gray-300"}`,
                      children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "file",
                            id: "resume",
                            accept: ".pdf,.doc,.docx",
                            onChange: handleResumeChange,
                            className: "hidden"
                          }
                        ),
                        /* @__PURE__ */ jsxs(
                          "label",
                          {
                            htmlFor: "resume",
                            className: "cursor-pointer flex flex-col items-center",
                            children: [
                              /* @__PURE__ */ jsx(
                                "svg",
                                {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  className: "w-12 h-12 text-red-600 mb-3",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor",
                                  children: /* @__PURE__ */ jsx(
                                    "path",
                                    {
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      strokeWidth: 1.5,
                                      d: "M7 16a4 4 0 01-.88-7.903 5 5 0 018.962-2.585M15 11V5a3 3 0 00-6 0v6M12 19l-3-3m0 0l3-3m-3 3l3 3"
                                    }
                                  )
                                }
                              ),
                              /* @__PURE__ */ jsx("span", { className: "font-medium text-base", children: "Click to upload your resume" }),
                              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 mt-1", children: "Max 5MB • PDF, Word files only" })
                            ]
                          }
                        )
                      ]
                    }
                  ),
                  resumeName && /* @__PURE__ */ jsxs("p", { className: "mt-3 text-sm flex items-center gap-2 text-green-600", children: [
                    "✅ ",
                    resumeName
                  ] })
                ] }),
                submitMessage.text && /* @__PURE__ */ jsx(
                  "p",
                  {
                    className: `text-center font-medium py-3 rounded-lg
                    ${submitMessage.type === "success" ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"}`,
                    children: submitMessage.text
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: submitting,
                    className: "w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 py-4 rounded-xl text-white font-semibold text-lg transition-all active:scale-[0.985]",
                    children: submitting ? "Submitting Application..." : "Submit Application"
                  }
                )
              ] })
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: scrollToTop,
            className: `fixed bottom-6 right-6 z-50 p-4 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/50 transition-all duration-300 hover:scale-110 active:scale-95
          ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"}`,
            "aria-label": "Scroll back to top",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-6 h-6",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                xmlns: "http://www.w3.org/2000/svg",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 10l7-7m0 0l7 7m-7-7v18"
                  }
                )
              }
            )
          }
        )
      ]
    }
  );
}
const Gallery = () => {
  const { isDark } = useTheme();
  const [images2, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fallbackImages = [
    "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1558655146-9f40138f37f5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1581287053822-fd7bf4f1afec?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1611162617210-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80"
  ];
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/gallery");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Invalid API response format");
        }
        const allImageUrls = result.data.flatMap((item) => item.images || []).filter((url) => typeof url === "string" && url.trim() !== "");
        setImages(allImageUrls);
      } catch (err) {
        console.error("Gallery fetch error:", err);
        setError(err.message || "Failed to load gallery images");
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);
  const displayImages = images2.length > 0 ? images2 : fallbackImages;
  const bodyClass = isDark ? "text-gray-300" : "text-gray-700";
  const accentClass = "text-red-600";
  if (loading) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: `min-h-screen flex items-center justify-center transition-colors duration-700
        ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-6" }),
          /* @__PURE__ */ jsx("p", { className: `text-2xl ${bodyClass}`, children: "Loading gallery..." })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `min-h-screen px-4 py-12 md:px-8 transition-colors duration-700
      ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`,
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
        /* @__PURE__ */ jsx(
          "h1",
          {
            className: `text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-10 md:mb-16 tracking-tight ${accentClass}`,
            children: "My Photo Gallery"
          }
        ),
        error && /* @__PURE__ */ jsxs("p", { className: "text-center text-red-500 mb-8", children: [
          error,
          " — showing fallback images instead"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6", children: displayImages.map((src, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: `group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl
                ${isDark ? "shadow-black/50 hover:shadow-red-900/30" : "shadow-gray-300 hover:shadow-red-200"}`,
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: src.startsWith("http") ? `${src}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80` : `http://localhost:8000${src}?auto=format&fit=crop&w=800&q=80`,
                  alt: `Gallery image ${index + 1}`,
                  className: "w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110",
                  loading: "lazy",
                  onError: (e) => {
                    e.target.src = fallbackImages[index % fallbackImages.length];
                    e.target.alt = "Fallback image";
                  }
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end
                ${isDark ? "" : "from-black/60"}`,
                  children: /* @__PURE__ */ jsxs("p", { className: "text-white text-sm p-4 font-medium", children: [
                    "Image ",
                    index + 1
                  ] })
                }
              )
            ]
          },
          index
        )) })
      ] })
    }
  );
};
const API_BASE_URL = "http://localhost:8000";
const api = axios.create({
  baseURL: API_BASE_URL
});
const createTechApi = (data) => api.post("/portfolio/create", data);
const getCategoriesApi = () => api.get("/category/portfolio");
const getTechApi = () => api.get("/portfolio");
const updateTechApi = (id, data) => api.put(`/portfolio/update/${id}`, data);
const deleteTechApi = (id) => api.delete(`/portfolio/delete/${id}`);
const fetchTech = createAsyncThunk(
  "portfolio/fetchTech",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getTechApi();
      return res.data?.data || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch tech news"
      );
    }
  }
);
const fetchCategories$1 = createAsyncThunk(
  "portfolio/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCategoriesApi();
      return res.data?.data || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);
createAsyncThunk(
  "portfolio/createTech",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await createTechApi(formData);
      return res.data?.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create");
    }
  }
);
createAsyncThunk(
  "portfolio/updateTech",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await updateTechApi(id, formData);
      return res.data?.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update");
    }
  }
);
const deleteTech = createAsyncThunk(
  "portfolio/deleteTech",
  async (id, { rejectWithValue }) => {
    try {
      await deleteTechApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete");
    }
  }
);
const initialState = {
  items: [],
  // renamed from techs → items (more generic)
  categories: [],
  form: {
    title: "",
    description: "",
    category: "",
    link: "",
    images: []
    // FileList
  },
  editId: null,
  loading: false,
  tableLoading: false,
  deleteLoading: {},
  // { [id]: boolean }
  error: null
};
const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setFormValue: (state, action) => {
      const { field, value } = action.payload;
      state.form[field] = value;
    },
    setFormImages: (state, action) => {
      state.form.images = action.payload;
    },
    beginEdit: (state, action) => {
      const item = action.payload;
      state.editId = item._id;
      state.form = {
        title: item.title,
        description: item.description,
        category: item.category?._id || item.category || "",
        link: item.link || "",
        images: []
        // can't prefill files
      };
    },
    resetForm: (state) => {
      state.editId = null;
      state.form = {
        title: "",
        description: "",
        category: "",
        link: "",
        images: []
      };
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTech.pending, (state) => {
      state.tableLoading = true;
      state.error = null;
    }).addCase(fetchTech.fulfilled, (state, action) => {
      state.tableLoading = false;
      state.items = action.payload;
    }).addCase(fetchTech.rejected, (state, action) => {
      state.tableLoading = false;
      state.error = action.payload;
    }).addCase(fetchCategories$1.fulfilled, (state, action) => {
      state.categories = action.payload;
    }).addCase(deleteTech.pending, (state, action) => {
      state.deleteLoading[action.meta.arg] = true;
    }).addCase(deleteTech.fulfilled, (state, action) => {
      state.deleteLoading[action.payload] = false;
      state.items = state.items.filter((item) => item._id !== action.payload);
    }).addCase(deleteTech.rejected, (state, action) => {
      state.deleteLoading[action.meta.arg] = false;
      state.error = action.payload;
    });
    builder.addMatcher(
      (action) => action.type.endsWith("/pending") && (action.type.includes("createTech") || action.type.includes("updateTech")),
      (state) => {
        state.loading = true;
      }
    ).addMatcher(
      (action) => action.type.endsWith("/fulfilled") && (action.type.includes("createTech") || action.type.includes("updateTech")),
      (state) => {
        state.loading = false;
        state.editId = null;
        state.form = {
          title: "",
          description: "",
          category: "",
          link: "",
          images: []
        };
      }
    ).addMatcher(
      (action) => action.type.endsWith("/rejected") && (action.type.includes("createTech") || action.type.includes("updateTech")),
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  }
});
const { setFormValue, setFormImages, beginEdit, resetForm, clearError } = portfolioSlice.actions;
const portfolioReducer = portfolioSlice.reducer;
const MockBrowser = ({ color = "#0cbfa8", dark = false }) => /* @__PURE__ */ jsxs(
  "div",
  {
    className: "w-full h-40 flex items-center justify-center relative overflow-hidden",
    style: { background: color },
    children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "w-11/12 h-5/6 rounded-lg overflow-hidden flex flex-col",
          style: { background: dark ? "#0f0f23" : "#ffffff" },
          children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex items-center gap-1 px-2 shrink-0",
                style: {
                  height: 18,
                  background: dark ? "#1a1a2e" : "#e5e7eb"
                },
                children: [
                  /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-red-400" }),
                  /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-yellow-400" }),
                  /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-green-400" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 p-2 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "h-1.5 rounded w-3/5",
                  style: { background: dark ? "#2d2d4e" : "#d1d5db" }
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "flex-1 rounded",
                  style: { background: dark ? "#1e2540" : "#e5f4f2" }
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "h-1.5 rounded w-4/5",
                  style: { background: dark ? "#2d2d4e" : "#d1d5db" }
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "h-1.5 rounded w-2/3",
                  style: { background: dark ? "#2d2d4e" : "#d1d5db" }
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute bottom-0 right-3 w-10 h-14 rounded-t-lg opacity-60",
          style: { background: dark ? "#2d3a6e" : "#a7ddd6" }
        }
      )
    ]
  }
);
const ImageThumb = ({ src, title }) => /* @__PURE__ */ jsx("div", { className: "w-full h-40 overflow-hidden bg-gray-100 dark:bg-gray-800", children: /* @__PURE__ */ jsx(
  "img",
  {
    src,
    alt: title,
    className: "w-full h-full object-cover",
    onError: (e) => {
      e.target.style.display = "none";
    }
  }
) });
const Badge = ({ name }) => {
  const styles = {
    SEO: "bg-teal-500 text-teal-900",
    WordPress: "bg-red-600 text-white",
    "Digital Marketing": "bg-blue-500 text-blue-900",
    "IT Projects": "bg-purple-100 text-purple-800",
    "Web Development": "bg-cyan-100 text-cyan-800"
  };
  const cls = styles[name] || "bg-gray-200 text-gray-700";
  return /* @__PURE__ */ jsx("span", { className: `text-xs font-semibold px-2.5 py-0.5 rounded-full ${cls}`, children: name });
};
const PortfolioCard = ({ item, index }) => {
  const hasImage = item.images?.length > 0;
  const catName = item.category?.name || "";
  const thumbColors = [
    { bg: "#0cbfa8", dark: false },
    { bg: "#1a3a5c", dark: true },
    { bg: "#c0392b", dark: false },
    { bg: "#0cbfa8", dark: false },
    { bg: "#2c3e50", dark: true },
    { bg: "#16a085", dark: false }
  ];
  const { bg, dark } = thumbColors[index % thumbColors.length];
  return /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden flex flex-col group hover:border-red-300 dark:hover:border-red-800 transition-all duration-200 hover:-translate-y-0.5", children: [
    hasImage ? /* @__PURE__ */ jsx(ImageThumb, { src: item.images[0], title: item.title }) : /* @__PURE__ */ jsx(MockBrowser, { color: bg, dark }),
    /* @__PURE__ */ jsxs("div", { className: "p-4 flex flex-col gap-2 flex-1", children: [
      /* @__PURE__ */ jsx(Badge, { name: catName }),
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-900 dark:text-white leading-snug", children: item.title }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex-1 line-clamp-3", children: item.description || "No description available." }),
      item.link ? /* @__PURE__ */ jsxs(
        "a",
        {
          href: item.link,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "mt-1 inline-flex items-center gap-2 text-xs font-semibold text-red-600 border border-red-500 rounded-full px-3 py-1.5 w-fit hover:bg-red-600 hover:text-white transition-colors duration-150",
          children: [
            "Explore More",
            /* @__PURE__ */ jsx("span", { className: "w-4 h-4 border border-current rounded-full flex items-center justify-center text-[10px] leading-none", children: "›" })
          ]
        }
      ) : /* @__PURE__ */ jsx("span", { className: "mt-1 inline-flex items-center gap-2 text-xs font-semibold text-gray-400 border border-gray-300 dark:border-gray-700 rounded-full px-3 py-1.5 w-fit cursor-default", children: "No link" })
    ] })
  ] });
};
const PortfolioSection = ({ title, items }) => {
  if (!items.length) return null;
  return /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: title }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-gray-100 dark:bg-gray-800" }),
      /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-400 dark:text-gray-500", children: [
        items.length,
        " project",
        items.length !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: items.map((item, i) => /* @__PURE__ */ jsx(PortfolioCard, { item, index: i }, item._id)) })
  ] });
};
const SkeletonCard = () => /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden animate-pulse", children: [
  /* @__PURE__ */ jsx("div", { className: "w-full h-40 bg-gray-100 dark:bg-gray-800" }),
  /* @__PURE__ */ jsxs("div", { className: "p-4 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsx("div", { className: "h-4 w-16 rounded-full bg-gray-100 dark:bg-gray-800" }),
    /* @__PURE__ */ jsx("div", { className: "h-4 w-3/4 rounded bg-gray-100 dark:bg-gray-800" }),
    /* @__PURE__ */ jsx("div", { className: "h-3 w-full rounded bg-gray-100 dark:bg-gray-800" }),
    /* @__PURE__ */ jsx("div", { className: "h-3 w-5/6 rounded bg-gray-100 dark:bg-gray-800" }),
    /* @__PURE__ */ jsx("div", { className: "h-7 w-28 rounded-full bg-gray-100 dark:bg-gray-800 mt-1" })
  ] })
] });
const Portfolio = () => {
  const dispatch = useDispatch();
  const { items: techs, categories, tableLoading, error } = useSelector(
    (state) => state.portfolio
  );
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory2] = useState("all");
  useEffect(() => {
    dispatch(fetchTech());
    dispatch(fetchCategories$1());
  }, [dispatch]);
  useEffect(() => {
    if (error) dispatch(clearError());
  }, [error, dispatch]);
  const grouped = useMemo(() => {
    const filtered = techs.filter((item) => {
      const q = search.toLowerCase();
      const matchSearch = !q || item.title?.toLowerCase().includes(q) || item.description?.toLowerCase().includes(q);
      const matchCat = activeCategory === "all" || item.category?._id === activeCategory;
      return matchSearch && matchCat;
    });
    const map = {};
    filtered.forEach((item) => {
      const name = item.category?.name || "Other";
      if (!map[name]) map[name] = [];
      map[name].push(item);
    });
    return map;
  }, [techs, search, activeCategory]);
  const totalVisible = Object.values(grouped).reduce(
    (acc, arr) => acc + arr.length,
    0
  );
  const sectionTitle = (catName) => {
    const map = {
      SEO: "SEO Results",
      WordPress: "Website Design Results",
      "Web Development": "Web Development Results",
      "Digital Marketing": "Digital Marketing Results",
      "IT Projects": "IT Project Results"
    };
    return map[catName] || `${catName} Results`;
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 dark:bg-black py-12 px-4 md:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight", children: [
        "Our",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-red-600", children: "Portfolio" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 dark:text-gray-500 text-base", children: "Showcase of our latest web development, digital marketing, and IT projects" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 max-w-sm", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
            width: "16",
            height: "16",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            strokeWidth: 2,
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search projects...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-red-400"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setActiveCategory2("all"),
            className: `text-xs font-medium px-4 py-2 rounded-full border transition-colors ${activeCategory === "all" ? "bg-red-600 text-white border-red-600" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 hover:border-red-400"}`,
            children: "All"
          }
        ),
        categories.map((cat) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setActiveCategory2(cat._id),
            className: `text-xs font-medium px-4 py-2 rounded-full border transition-colors ${activeCategory === cat._id ? "bg-red-600 text-white border-red-600" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 hover:border-red-400"}`,
            children: cat.name
          },
          cat._id
        ))
      ] }),
      !tableLoading && /* @__PURE__ */ jsxs("span", { className: "self-center text-xs text-gray-400 whitespace-nowrap", children: [
        totalVisible,
        " result",
        totalVisible !== 1 ? "s" : ""
      ] })
    ] }),
    tableLoading && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "h-6 w-48 rounded bg-gray-200 dark:bg-gray-800 animate-pulse mb-6" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx(SkeletonCard, {}, i)) })
    ] }),
    !tableLoading && Object.entries(grouped).map(([catName, items]) => /* @__PURE__ */ jsx(
      PortfolioSection,
      {
        title: sectionTitle(catName),
        items
      },
      catName
    )),
    !tableLoading && totalVisible === 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-28 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(
        "svg",
        {
          className: "w-8 h-8 text-gray-300 dark:text-gray-600",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          strokeWidth: 1.5,
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5m16 0H4"
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 font-medium text-base", children: "No portfolio items found" }),
      search && /* @__PURE__ */ jsx("p", { className: "text-gray-400 dark:text-gray-500 text-sm mt-1", children: "Try a different search term" })
    ] })
  ] }) });
};
const fetchCategories = createAsyncThunk(
  "blog/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:8000/api/blogcategory");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed");
      return ["All", ...data.data.map((c) => c.name)];
    } catch (err) {
      return rejectWithValue(err.message || "Error fetching categories");
    }
  }
);
const fetchBlogPosts = createAsyncThunk(
  "blog/fetchBlogPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:8000/api/product");
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed");
      return data.data || [];
    } catch (err) {
      return rejectWithValue(err.message || "Error fetching blog posts");
    }
  }
);
const fetchBlogPostById = createAsyncThunk(
  "blog/fetchBlogPostById",
  async (identifier, { rejectWithValue }) => {
    try {
      if (!identifier) throw new Error("Slug/ID is required");
      const res = await fetch(`http://localhost:8000/api/product/${identifier}`);
      if (!res.ok) throw new Error("Post not found");
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to load post");
      return data.data;
    } catch (err) {
      return rejectWithValue(err.message || "Error loading blog post");
    }
  }
);
const incrementPostView = createAsyncThunk(
  "blog/incrementView",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/product/${postId}/view`,
        { method: "PUT" }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      return { postId, views: data.views };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
const togglePostLike = createAsyncThunk(
  "blog/toggleLike",
  async (payload, { rejectWithValue }) => {
    try {
      const { postId, email } = typeof payload === "string" ? { postId: payload } : payload;
      const res = await fetch(
        `http://localhost:8000/api/product/${postId}/like`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      return { postId, likes: data.likes };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
const sendCommentOtp = createAsyncThunk(
  "blog/sendCommentOtp",
  async (payload, { rejectWithValue }) => {
    try {
      const { postId, name, email, phone } = payload;
      const res = await fetch(
        `http://localhost:8000/api/product/${postId}/send-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone })
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
const verifyCommentOtp = createAsyncThunk(
  "blog/verifyCommentOtp",
  async ({ postId, email, otp }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/product/${postId}/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp })
        }
      );
      const data = await res.json();
      if (!data.success)
        throw new Error(data.message || "OTP verification failed");
      return { userId: data.userId, email };
    } catch (err) {
      return rejectWithValue(err.message || "Error verifying OTP");
    }
  }
);
const postComment = createAsyncThunk(
  "blog/postComment",
  async ({ postId, email, comment }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/product/${postId}/comment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userEmail: email, comment })
        }
      );
      const data = await res.json();
      if (!data.success)
        throw new Error(data.message || "Failed to post comment");
      return { postId, comments: data.comments };
    } catch (err) {
      return rejectWithValue(err.message || "Error posting comment");
    }
  }
);
const blogSlice = createSlice({
  name: "blog",
  initialState: {
    categories: ["All"],
    posts: [],
    activeCategory: "All",
    status: "idle",
    error: null,
    currentPost: null,
    detailStatus: "idle",
    detailError: null
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
      state.detailStatus = "idle";
      state.detailError = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = "loading";
    }).addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.categories = action.payload;
    }).addCase(fetchCategories.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    }).addCase(fetchBlogPosts.pending, (state) => {
      state.status = "loading";
    }).addCase(fetchBlogPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.posts = action.payload;
    }).addCase(fetchBlogPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    }).addCase(fetchBlogPostById.pending, (state) => {
      state.detailStatus = "loading";
      state.detailError = null;
    }).addCase(fetchBlogPostById.fulfilled, (state, action) => {
      state.detailStatus = "succeeded";
      state.currentPost = action.payload;
    }).addCase(fetchBlogPostById.rejected, (state, action) => {
      state.detailStatus = "failed";
      state.detailError = action.payload;
    }).addCase(incrementPostView.fulfilled, (state, action) => {
      const { postId, views } = action.payload;
      const post = state.posts.find((p) => p._id === postId);
      if (post) post.views = views;
      if (state.currentPost?._id === postId) state.currentPost.views = views;
    }).addCase(togglePostLike.fulfilled, (state, action) => {
      const { postId, likes } = action.payload;
      const post = state.posts.find((p) => p._id === postId);
      if (post) post.likes = likes;
      if (state.currentPost?._id === postId) state.currentPost.likes = likes;
    }).addCase(postComment.fulfilled, (state, action) => {
      const { postId, comments } = action.payload;
      const post = state.posts.find((p) => p._id === postId);
      if (post) post.comments = comments;
      if (state.currentPost?._id === postId) state.currentPost.comments = comments;
    });
  }
});
const { setActiveCategory, clearCurrentPost } = blogSlice.actions;
const blogReducer = blogSlice.reducer;
const POSTS_PER_PAGE = 6;
const Blog = () => {
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  const {
    categories,
    posts: blogPosts,
    activeCategory,
    status,
    error
  } = useSelector((state) => state.blog);
  const [currentPage, setCurrentPage] = useState(1);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [pendingPostId, setPendingPostId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [updatedPosts, setUpdatedPosts] = useState({});
  const [userLikes, setUserLikes] = useState(/* @__PURE__ */ new Set());
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
  const [step, setStep] = useState("form");
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewLoadingIds, setViewLoadingIds] = useState(/* @__PURE__ */ new Set());
  useEffect(() => {
    const savedUser = localStorage.getItem("verifiedUser");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser?.email) {
          setUserInfo({
            name: parsedUser.name || "",
            email: parsedUser.email || "",
            phone: parsedUser.phone || ""
          });
          setIsVerified(true);
        }
      } catch (error2) {
        console.error("Failed to parse verifiedUser from localStorage", error2);
      }
    }
    const savedLikes = localStorage.getItem("userLikes");
    if (savedLikes) setUserLikes(new Set(JSON.parse(savedLikes)));
  }, []);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
      dispatch(fetchBlogPosts());
    }
  }, [status, dispatch]);
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);
  const mergedPosts = blogPosts.map((post) => ({
    ...post,
    likes: updatedPosts[post._id]?.likes ?? post.likes ?? 0,
    comments: updatedPosts[post._id]?.comments ?? post.comments ?? []
  }));
  const filteredPosts = activeCategory === "All" ? mergedPosts : mergedPosts.filter((post) => post.category?.name === activeCategory);
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);
    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };
  const handleAction = (action, post) => {
    const postSlug = post.slug || post._id;
    if (action === "read") {
      setViewLoadingIds((prev) => new Set(prev).add(post._id));
      dispatch(incrementPostView(post._id));
      setTimeout(() => {
        setViewLoadingIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(post._id);
          return newSet;
        });
        window.location.href = `/blog/${postSlug}`;
      }, 150);
      return;
    }
    if (!isVerified) {
      setPendingPostId(post._id);
      setShowVerifyModal(true);
      setStep("form");
      setUserInfo({ name: "", email: "", phone: "" });
      return;
    }
    if (action === "like") {
      if (userLikes.has(post._id)) return;
      performLike(post._id);
    } else if (action === "comment") {
      setPendingPostId(post._id);
      setCommentText("");
      setShowCommentModal(true);
    }
  };
  const performLike = async (postId) => {
    if (!userInfo.email) {
      alert("Please verify with your email before liking posts.");
      return;
    }
    const result = await dispatch(
      togglePostLike({ postId, email: userInfo.email })
    );
    if (!result.error) {
      setUpdatedPosts((prev) => ({
        ...prev,
        [postId]: {
          ...prev[postId] || {},
          likes: result.payload.likes
        }
      }));
      const newLikes = new Set(userLikes);
      newLikes.add(postId);
      setUserLikes(newLikes);
      localStorage.setItem("userLikes", JSON.stringify([...newLikes]));
    }
  };
  const submitComment = async () => {
    if (!commentText.trim()) return alert("Please write a comment");
    if (!userInfo.email) {
      alert("Please verify with your email before commenting.");
      return;
    }
    setLoading(true);
    const result = await dispatch(
      postComment({
        postId: pendingPostId,
        email: userInfo.email,
        comment: commentText.trim()
      })
    );
    if (!result.error) {
      setUpdatedPosts((prev) => ({
        ...prev,
        [pendingPostId]: {
          ...prev[pendingPostId] || {},
          comments: result.payload.comments || []
        }
      }));
      setShowCommentModal(false);
      setCommentText("");
      alert("✅ Comment posted successfully!");
    } else {
      alert(result.payload || "Failed to post comment");
    }
    setLoading(false);
  };
  const sendOtp = async () => {
    if (!userInfo.name || !userInfo.email) {
      alert("Name and Email are required");
      return;
    }
    setLoading(true);
    await dispatch(
      sendCommentOtp({
        postId: pendingPostId,
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone
      })
    );
    setStep("otp");
    setLoading(false);
  };
  const verifyOtp = async () => {
    if (!otp.trim()) {
      alert("Please enter the OTP first.");
      return;
    }
    setLoading(true);
    const result = await dispatch(
      verifyCommentOtp({
        postId: pendingPostId,
        email: userInfo.email,
        otp: otp.trim()
      })
    );
    setLoading(false);
    if (result.error) {
      alert(result.payload || "Invalid OTP");
      return;
    }
    setIsVerified(true);
    localStorage.setItem(
      "verifiedUser",
      JSON.stringify({ ...userInfo, verifiedAt: (/* @__PURE__ */ new Date()).toISOString() })
    );
    setShowVerifyModal(false);
    if (pendingPostId) {
      setTimeout(() => {
        setShowCommentModal(true);
      }, 300);
    }
  };
  if (status === "loading") {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: `min-h-screen flex items-center justify-center ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`,
        children: /* @__PURE__ */ jsx("div", { className: "text-2xl animate-pulse", children: "Loading blogs..." })
      }
    );
  }
  if (status === "failed") {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: `min-h-screen flex items-center justify-center ${isDark ? "bg-black text-red-400" : "bg-gray-50 text-red-600"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "text-xl", children: [
          "Error: ",
          error
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `min-h-screen ${isDark ? "bg-black text-white" : "bg-white text-gray-900"} font-sans`,
      children: [
        /* @__PURE__ */ jsx(
          "header",
          {
            className: `border-b sticky top-0 z-10 backdrop-blur-md ${isDark ? "border-gray-800 bg-black/90" : "border-gray-200 bg-white/90"}`,
            children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3 justify-center md:justify-start", children: categories.map((cat) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => dispatch(setActiveCategory(cat)),
                className: `px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${activeCategory === cat ? "bg-red-600 text-white shadow-lg shadow-red-600/40" : isDark ? "bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-red-600/50" : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 hover:border-red-600"}`,
                children: cat
              },
              cat
            )) }) })
          }
        ),
        /* @__PURE__ */ jsx("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: filteredPosts.length === 0 ? /* @__PURE__ */ jsxs(
          "div",
          {
            className: `text-center py-24 text-2xl ${isDark ? "text-gray-400" : "text-gray-600"}`,
            children: [
              "No posts found in",
              " ",
              /* @__PURE__ */ jsxs("span", { className: "text-red-500", children: [
                '"',
                activeCategory,
                '"'
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-12", children: currentPosts.map((post) => {
            const hasLiked = userLikes.has(post._id);
            const isViewLoading = viewLoadingIds.has(post._id);
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: `group flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1
                      ${isDark ? "bg-gray-900/70 border-gray-800 hover:border-red-600/60" : "bg-white border-gray-200 hover:border-red-600/60"}`,
                children: [
                  /* @__PURE__ */ jsx("div", { className: "h-52 relative overflow-hidden", children: post.images?.[0] ? /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: post.images[0],
                      alt: post.name,
                      className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    }
                  ) : /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `absolute inset-0 flex items-center justify-center ${isDark ? "bg-gray-800" : "bg-gray-100"}`,
                      children: /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: isDark ? "text-gray-600" : "text-gray-400",
                          children: "No Image"
                        }
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col flex-grow", children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: `inline-block px-3 py-1 mb-3 text-xs rounded-full w-fit ${isDark ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`,
                        children: post.category?.name || "Uncategorized"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "h2",
                      {
                        className: `text-xl font-bold mb-2 line-clamp-2 group-hover:text-red-500 transition-colors ${isDark ? "text-white" : "text-gray-900"}`,
                        children: post.name || "Untitled"
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "p",
                      {
                        className: `text-sm mb-3 ${isDark ? "text-gray-400" : "text-gray-600"}`,
                        children: [
                          "By",
                          " ",
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: isDark ? "text-gray-200" : "text-gray-800",
                              children: post.author || "Anonymous"
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `text-sm mb-6 line-clamp-3 flex-grow ${isDark ? "text-gray-400" : "text-gray-600"}`,
                        dangerouslySetInnerHTML: {
                          __html: DOMPurify.sanitize(
                            post.description || post.excerpt || ""
                          )
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-4 flex justify-between items-center", children: [
                      /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className: `flex items-center gap-5 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`,
                          children: [
                            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                              /* @__PURE__ */ jsx(Eye, { className: "w-5 h-5" }),
                              " ",
                              post.views || 0
                            ] }),
                            /* @__PURE__ */ jsxs(
                              "div",
                              {
                                className: `flex items-center gap-1 cursor-pointer transition-colors ${hasLiked ? "text-red-500" : "hover:text-red-500"}`,
                                onClick: () => handleAction("like", post),
                                children: [
                                  /* @__PURE__ */ jsx(
                                    Heart,
                                    {
                                      className: `w-5 h-5 ${hasLiked ? "fill-current" : ""}`
                                    }
                                  ),
                                  " ",
                                  post.likes || 0
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxs(
                              "div",
                              {
                                className: "flex items-center gap-1 cursor-pointer hover:text-red-500 transition-colors",
                                onClick: () => handleAction("comment", post),
                                children: [
                                  /* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5" }),
                                  " ",
                                  post.comments?.length || 0
                                ]
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => handleAction("read", post),
                          disabled: isViewLoading,
                          className: `inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 hover:translate-x-1
                            ${isDark ? "bg-red-900/30 border border-red-700/50 text-red-300 hover:bg-red-800/50 hover:border-red-600" : "bg-red-100 border border-red-200 text-red-600 hover:bg-red-200"}
                            ${isViewLoading ? "opacity-70 cursor-wait" : ""}`,
                          children: isViewLoading ? "Opening..." : "Read More →"
                        }
                      )
                    ] })
                  ] })
                ]
              },
              post._id
            );
          }) }),
          totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4 mt-8", children: [
            /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => goToPage(currentPage - 1),
                  disabled: currentPage === 1,
                  className: `px-4 py-2 rounded-lg text-sm font-medium transition-all border ${currentPage === 1 ? isDark ? "bg-gray-800 text-gray-500 cursor-not-allowed" : "bg-gray-200 text-gray-400 cursor-not-allowed" : isDark ? "bg-gray-800 hover:bg-gray-700 border-gray-700" : "bg-gray-100 hover:bg-gray-200 border-gray-300"}`,
                  children: "← Previous"
                }
              ),
              getPageNumbers().map((page, idx) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => typeof page === "number" && goToPage(page),
                  disabled: page === "...",
                  className: `min-w-[2.5rem] h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${page === "..." ? isDark ? "text-gray-500" : "text-gray-400" : page === currentPage ? "bg-red-600 text-white shadow-lg" : isDark ? "bg-gray-800 hover:bg-gray-700 border border-gray-700" : "bg-gray-100 hover:bg-gray-200 border border-gray-300"}`,
                  children: page
                },
                idx
              )),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => goToPage(currentPage + 1),
                  disabled: currentPage === totalPages,
                  className: `px-4 py-2 rounded-lg text-sm font-medium transition-all border ${currentPage === totalPages ? isDark ? "bg-gray-800 text-gray-500 cursor-not-allowed" : "bg-gray-200 text-gray-400 cursor-not-allowed" : isDark ? "bg-gray-800 hover:bg-gray-700 border-gray-700" : "bg-gray-100 hover:bg-gray-200 border-gray-300"}`,
                  children: "Next →"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: `text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`,
                children: [
                  "Page ",
                  currentPage,
                  " of ",
                  totalPages,
                  " • ",
                  totalPosts,
                  " posts"
                ]
              }
            )
          ] })
        ] }) }),
        showCommentModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: `max-w-lg w-full rounded-2xl p-6 ${isDark ? "bg-gray-900" : "bg-white"} shadow-2xl`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-5", children: [
                /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Write a Comment" }),
                /* @__PURE__ */ jsx("button", { onClick: () => setShowCommentModal(false), children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) })
              ] }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: commentText,
                  onChange: (e) => setCommentText(e.target.value),
                  placeholder: "What are your thoughts?",
                  rows: 5,
                  className: `w-full p-4 rounded-xl border resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-red-500 ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-300"}`
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-5", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setShowCommentModal(false),
                    className: `flex-1 py-3 rounded-xl font-medium border ${isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-100"}`,
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: submitComment,
                    disabled: loading || !commentText.trim(),
                    className: `flex-1 py-3 rounded-xl font-medium text-white flex items-center justify-center ${commentText.trim() ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"}`,
                    children: loading ? /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin" }) : "Post Comment"
                  }
                )
              ] })
            ]
          }
        ) }),
        showVerifyModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: `max-w-md w-full rounded-2xl p-8 ${isDark ? "bg-gray-900" : "bg-white"} shadow-2xl`,
            children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6 text-center", children: step === "form" ? "Verify Yourself" : "Enter OTP" }),
              step === "form" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Full Name",
                    value: userInfo.name,
                    onChange: (e) => setUserInfo({ ...userInfo, name: e.target.value }),
                    className: `w-full p-3 rounded-lg mb-4 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    placeholder: "Email Address",
                    value: userInfo.email,
                    onChange: (e) => setUserInfo({ ...userInfo, email: e.target.value }),
                    className: `w-full p-3 rounded-lg mb-4 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    placeholder: "Phone Number (Optional)",
                    value: userInfo.phone,
                    onChange: (e) => setUserInfo({ ...userInfo, phone: e.target.value }),
                    className: `w-full p-3 rounded-lg mb-6 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: sendOtp,
                    disabled: loading,
                    className: "w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg text-white font-medium disabled:opacity-70",
                    children: loading ? "Sending OTP..." : "Send OTP"
                  }
                )
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs("p", { className: "text-center mb-6 text-sm opacity-75", children: [
                  "OTP sent to ",
                  /* @__PURE__ */ jsx("strong", { children: userInfo.email })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Enter 6-digit OTP",
                    value: otp,
                    onChange: (e) => setOtp(e.target.value),
                    maxLength: 6,
                    className: `w-full p-4 text-center text-2xl tracking-widest rounded-lg border mb-6 ${isDark ? "bg-gray-800" : "bg-gray-50"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: verifyOtp,
                    className: "w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg text-white font-medium",
                    children: "Verify OTP"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setShowVerifyModal(false),
                  className: "mt-6 text-sm text-gray-500 underline block mx-auto",
                  children: "Cancel"
                }
              )
            ]
          }
        ) })
      ]
    }
  );
};
const BlogDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { currentPost, detailStatus, detailError } = useSelector(
    (state) => state.blog
  );
  useEffect(() => {
    if (!slug) {
      navigate("/blog", { replace: true });
      return;
    }
    dispatch(fetchBlogPostById(slug));
    return () => {
      dispatch(clearCurrentPost());
    };
  }, [slug, dispatch, navigate]);
  if (detailStatus === "loading") {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: `min-h-screen flex items-center justify-center ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`,
        children: /* @__PURE__ */ jsx("div", { className: "text-2xl animate-pulse", children: "Loading article..." })
      }
    );
  }
  if (detailStatus === "failed" || !currentPost) {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: `min-h-screen flex flex-col items-center justify-center p-6 ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`,
        children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-red-500 mb-4", children: "Oops!" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 text-center max-w-md", children: detailError || "Post not found" }),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/blog",
              className: `px-8 py-3 rounded-xl font-medium transition-all ${isDark ? "bg-red-900/60 hover:bg-red-800 border border-red-700 text-red-200" : "bg-red-100 hover:bg-red-200 border border-red-600 text-red-700"}`,
              children: "← Back to Blog"
            }
          )
        ]
      }
    );
  }
  const post = currentPost;
  const sanitizedContent = DOMPurify.sanitize(
    post.content || post.fullDescription || post.description || ""
  );
  DOMPurify.sanitize(post.description || "", {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  }).replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `min-h-screen mt-10 ${isDark ? "bg-black text-white" : "bg-white text-gray-900"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative h-[500px] overflow-hidden", children: [
          post.images?.[0] ? /* @__PURE__ */ jsx(
            "img",
            {
              src: post.images[0],
              alt: post.name,
              className: "w-full h-full object-cover brightness-75"
            }
          ) : /* @__PURE__ */ jsx("div", { className: `absolute inset-0 ${isDark ? "bg-gradient-to-br from-gray-900 to-black" : "bg-gradient-to-br from-gray-100 to-white"}` }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-5xl mx-auto" })
        ] }),
        /* @__PURE__ */ jsxs("main", { className: "max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-20", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: `inline-block px-4 py-1.5 mb-4 text-sm rounded-full border 
    ${isDark ? "bg-red-900/70 border-red-700 text-red-200" : "bg-red-100 border-red-200 text-red-700"}`,
              children: post.category?.name || "Uncategorized"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: `flex flex-wrap items-center gap-4 text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`, children: [
            /* @__PURE__ */ jsx("div", { children: post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric"
            }) : "Recently" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { children: "•" }),
              /* @__PURE__ */ jsx("span", { children: post.author ? `By ${post.author}` : "Anonymous" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: `text-4xl md:text-6xl font-bold leading-tight mb-6 
               text-zinc-900 dark:text-white 
               tracking-tight  ${isDark ? "text-gray-300" : "text-gray-700"}`, children: post.name || "Untitled" }),
          /* @__PURE__ */ jsxs("article", { className: `prose max-w-none ${isDark ? "prose-invert" : ""}`, children: [
            sanitizedContent ? /* @__PURE__ */ jsx(
              "div",
              {
                className: `text-[1.1rem] leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`,
                dangerouslySetInnerHTML: { __html: sanitizedContent }
              }
            ) : /* @__PURE__ */ jsx("p", { className: "text-center py-20 italic text-gray-500", children: "Content not available" }),
            post.images?.length > 1 && /* @__PURE__ */ jsx("div", { className: "my-16 grid grid-cols-1 md:grid-cols-2 gap-6", children: post.images.slice(1).map((img, idx) => /* @__PURE__ */ jsx(
              "img",
              {
                src: img,
                alt: `Blog image ${idx + 2}`,
                className: "rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 object-cover"
              },
              idx
            )) })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "mt-20 bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-800", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-2", children: "Comments" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-500 dark:text-gray-400 mb-8", children: [
              post.comments?.length || 0,
              " comment",
              post.comments?.length !== 1 ? "s" : ""
            ] }),
            post.comments?.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-6", children: post.comments.map((comment, index) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: `p-6 rounded-2xl border ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-gray-50"}`,
                children: [
                  /* @__PURE__ */ jsx("div", { className: "flex justify-between mb-3", children: /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-semibold", children: comment.user?.name || comment.user?.user || comment.user?.email || "Anonymous" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: comment.createdAt ? new Date(comment.createdAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    }) : "Just now" })
                  ] }) }),
                  /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-gray-700 dark:text-gray-300", children: comment.comment })
                ]
              },
              comment._id || index
            )) }) : /* @__PURE__ */ jsx("div", { className: "text-center py-12 text-gray-500 dark:text-gray-400", children: "No comments yet. Be the first!" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-center mt-16", children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "/blog",
              className: `inline-flex items-center px-8 py-4 rounded-xl font-medium text-lg transition-all ${isDark ? "bg-red-900/60 hover:bg-red-800 border border-red-700 text-red-200" : "bg-red-100 hover:bg-red-200 border border-red-600 text-red-700"}`,
              children: "← Back to all articles"
            }
          ) })
        ] })
      ]
    }
  );
};
const images$c = {
  hero: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  growth: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
};
const services$7 = [
  {
    icon: Users,
    title: "Social Media Management",
    desc: "We manage your social media platforms with engaging content, regular posting, and strategic campaigns that help increase brand awareness and audience interaction."
  },
  {
    icon: Megaphone,
    title: "Content Marketing",
    desc: "Our content marketing services focus on creating valuable and engaging content that builds trust, attracts potential customers, and supports business growth."
  },
  {
    icon: Search,
    title: "Search Engine Optimization",
    desc: "Our SEO services help improve your website’s visibility on search engines, increase organic traffic, and attract potential customers searching for your services online."
  },
  {
    icon: Mail,
    title: "Email Marketing",
    desc: "We create targeted email marketing campaigns that help businesses communicate with customers, promote services, and build long-term relationships."
  },
  {
    icon: TrendingUp,
    title: "Social Media Advertisements",
    desc: "Our team creates creative and well-planned social media advertisements that help businesses reach the right audience and improve engagement across platforms."
  },
  {
    icon: BarChart3,
    title: "Google Ads Management",
    desc: "If your Google Ads campaigns are not delivering the results you expect, our experts can help optimize your campaigns to improve performance and maximize return on investment."
  }
];
const industries$6 = [
  "Advertising and Media",
  "Construction and Builders",
  "Education and Training",
  "Finance and Insurance",
  "Healthcare and Medical Services",
  "E-Commerce",
  "Entertainment",
  "Real Estate",
  "Hospitality",
  "Engineering Services",
  "Health and Wellness",
  "Technology",
  "Automobile Services",
  "Property Management",
  "Business Consulting",
  "Home Renovation",
  "Beauty and Wellness"
];
const fadeInUp$d = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const staggerContainer$d = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};
function DigitalMarketing() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);
  const accentClass = "text-red-500";
  const headingClass = isDark ? "text-white" : "text-gray-900";
  const bodyClass = isDark ? "text-gray-300" : "text-gray-700";
  const cardClass = isDark ? "bg-gray-900/70 backdrop-blur-sm border border-gray-800 hover:border-red-500/60 hover:shadow-red-900/30" : "bg-white border border-gray-200 hover:border-red-300 hover:shadow-2xl";
  const buttonClass = `px-12 py-6 rounded-full text-xl font-bold transition-all flex items-center gap-3 group shadow-xl
    ${isDark ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-red-900/60" : "bg-red-600 hover:bg-red-700 text-white shadow-red-600/50"}`;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `min-h-screen overflow-hidden transition-colors duration-700
        ${isDark ? "bg-black text-white" : "bg-white text-gray-900"}`,
      children: [
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: images$c.hero,
                alt: "Digital marketing strategy",
                className: "w-full h-full object-cover brightness-50"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `absolute inset-0 bg-gradient-to-br ${isDark ? "from-black/90 via-black/80 to-black/90" : "from-black/70 via-black/60 to-transparent"}`
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: "hidden",
              animate: "visible",
              variants: staggerContainer$d,
              className: "relative z-10 max-w-6xl mx-auto text-center",
              children: [
                /* @__PURE__ */ jsxs(
                  motion.h1,
                  {
                    variants: fadeInUp$d,
                    className: "text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8 text-white",
                    children: [
                      "Driving Growth with",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-red-500 to-white", children: "Proven Digital Marketing Strategies" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp$d,
                    className: `text-2xl md:text-3xl font-bold mb-8 ${accentClass}`,
                    children: "Powering Growth with a Top Digital Marketing Agency"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.p,
                  {
                    variants: fadeInUp$d,
                    className: `text-lg md:text-xl max-w-5xl mx-auto leading-relaxed mb-12 ${isDark ? "text-gray-300" : "text-white/90"}`,
                    children: [
                      "Partner with",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "font-semibold text-red-400", children: "AI Knots IT Solutions" }),
                      ", one of India’s trusted digital marketing companies. We help businesses increase their online presence, reach the right audience, and generate quality leads through smart, result-driven digital marketing campaigns."
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    variants: fadeInUp$d,
                    className: "flex flex-col sm:flex-row gap-6 justify-center",
                    children: [
                      /* @__PURE__ */ jsxs("button", { className: buttonClass, children: [
                        "Request a Quote",
                        /* @__PURE__ */ jsx(ArrowRight, { className: "w-7 h-7 group-hover:translate-x-2 transition-transform" })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          className: `px-12 py-6 border-2 border-red-500/70 rounded-full text-xl font-bold transition-all
                ${isDark ? "text-red-400 hover:bg-red-950/60 hover:border-red-500" : "text-red-600 hover:bg-red-50 border-red-600"}`,
                          children: "Free Consultation"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gray-950" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: staggerContainer$d,
                  className: "text-center mb-20",
                  children: [
                    /* @__PURE__ */ jsxs(
                      motion.h2,
                      {
                        variants: fadeInUp$d,
                        className: `text-4xl md:text-6xl font-black mb-6 ${headingClass}`,
                        children: [
                          "Transform Your Vision into",
                          " ",
                          /* @__PURE__ */ jsx("span", { className: accentClass, children: "Digital Success" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      motion.p,
                      {
                        variants: fadeInUp$d,
                        className: `text-2xl font-bold mb-8 ${accentClass}`,
                        children: "With India’s Trusted Digital Marketing Services"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8 mb-20", children: ["Be Unique", "Be Scalable", "Be Future Ready"].map((title, i) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  variants: fadeInUp$d,
                  className: `rounded-3xl p-10 text-center transition-all group ${cardClass}`,
                  children: [
                    /* @__PURE__ */ jsx("h3", { className: `text-4xl font-black mb-6 ${accentClass}`, children: title }),
                    /* @__PURE__ */ jsxs("p", { className: `text-lg leading-relaxed ${bodyClass}`, children: [
                      title === "Be Unique" && "Get digital marketing strategies designed specifically for your business goals and target audience.",
                      title === "Be Scalable" && "Grow your business with flexible marketing solutions that can expand as your company grows.",
                      title === "Be Future Ready" && "Stay ahead in the digital world with modern marketing tools and innovative strategies."
                    ] })
                  ]
                },
                i
              )) }),
              /* @__PURE__ */ jsxs(
                motion.p,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  className: `text-lg md:text-xl max-w-5xl mx-auto leading-relaxed text-center mb-16 ${isDark ? "text-gray-300" : "text-gray-700"}`,
                  children: [
                    "At Atlas Knots IT Solution, we create customized digital marketing strategies that help businesses strengthen their brand presence, manage campaigns smoothly, and build long-term engagement with customers.",
                    /* @__PURE__ */ jsx("br", {}),
                    /* @__PURE__ */ jsx("br", {}),
                    "As a trusted digital marketing company in India, we understand that every business has different goals. That is why our team creates tailored marketing solutions that help generate leads, increase website traffic, and improve customer connections.",
                    /* @__PURE__ */ jsx("br", {}),
                    /* @__PURE__ */ jsx("br", {}),
                    "Our strategies focus on helping businesses grow through practical, measurable, and result-focused marketing campaigns.",
                    /* @__PURE__ */ jsx("br", {}),
                    /* @__PURE__ */ jsx("br", {}),
                    "With years of experience in digital marketing services, our team ensures smooth campaign management, data-driven decisions, and continuous improvements.",
                    /* @__PURE__ */ jsx("br", {}),
                    /* @__PURE__ */ jsx("br", {}),
                    "From strategy planning to campaign optimization, our services are designed to support long-term business growth and build a strong digital presence."
                  ]
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-6 ${headingClass}`,
                  children: [
                    "Complete Digital Marketing",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Solutions" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  className: `text-xl text-center mb-20 max-w-4xl mx-auto ${bodyClass}`,
                  children: "Reliable and result-driven digital marketing services tailored to your business goals."
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: services$7.map((service, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 50 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.08 },
                  className: `rounded-3xl p-10 transition-all group ${cardClass}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      service.icon,
                      {
                        className: `w-16 h-16 mb-8 mx-auto transition-transform group-hover:scale-110 ${accentClass}`
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: `text-2xl font-bold mb-6 text-center ${headingClass}`,
                        children: service.title
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: `text-center leading-relaxed ${bodyClass}`, children: service.desc })
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gray-950" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-12 ${headingClass}`,
                  children: [
                    "Industries We ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Serve" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: industries$6.map((industry, idx) => /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.03 },
                  className: `px-6 py-5 rounded-2xl text-center font-medium transition-all ${cardClass}`,
                  children: industry
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto text-center", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black mb-12 ${headingClass}`,
                  children: [
                    "Innovation That Drives",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Business Growth" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.img,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  src: images$c.growth,
                  alt: "Business growth through digital marketing",
                  className: `rounded-3xl shadow-2xl mx-auto max-w-5xl w-full object-cover border ${isDark ? "border-red-900/30" : "border-gray-200"}`
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gray-950" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  className: `text-4xl md:text-5xl font-black text-center mb-16 ${headingClass}`,
                  children: [
                    "Our ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Process" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-5 gap-6 mb-24", children: [
                "01 Discovery & Strategy",
                "02 Research & Planning",
                "03 Creative Implementation",
                "04 Optimization & SEO",
                "05 Analytics & Reporting"
              ].map((step, i) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: i * 0.1 },
                  className: `rounded-3xl p-8 text-center min-h-[180px] flex flex-col justify-center border transition-all ${cardClass}`,
                  children: [
                    /* @__PURE__ */ jsx("div", { className: `text-5xl font-black mb-4 ${accentClass}`, children: step.split(" ")[0] }),
                    /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", children: step.split(" ").slice(1).join(" ") })
                  ]
                },
                i
              )) }),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: staggerContainer$d,
                  className: "text-center",
                  children: [
                    /* @__PURE__ */ jsxs(
                      motion.h2,
                      {
                        variants: fadeInUp$d,
                        className: `text-4xl md:text-6xl font-black mb-8 ${headingClass}`,
                        children: [
                          "Let’s Elevate Your Brand with",
                          " ",
                          /* @__PURE__ */ jsx("span", { className: accentClass, children: "Digital Marketing" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      motion.p,
                      {
                        variants: fadeInUp$d,
                        className: `text-xl md:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed ${bodyClass}`,
                        children: "At AI Knots IT Solutions, we believe every business has the potential to grow online with the right strategy. Contact us today and start your digital growth journey."
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      motion.button,
                      {
                        whileHover: { scale: 1.05 },
                        whileTap: { scale: 0.98 },
                        className: `px-16 py-7 rounded-full text-2xl font-bold transition-all ${isDark ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-red-900/60" : "bg-red-600 hover:bg-red-700 text-white shadow-red-600/50"}`,
                        children: "Get Started Today →"
                      }
                    )
                  ]
                }
              )
            ] })
          }
        )
      ]
    }
  );
}
const images$b = {
  dashboard: "https://media.whatagraph.com/Data_bloo_s_Google_Search_Console_report_template_6972d36596.png",
  team: "https://cdn.searchenginejournal.com/wp-content/uploads/2020/07/how-seos-the-sales-team-can-drive-business-growth-5f0c9b22e8c6d-1280x720.png",
  serp: "https://www.wordstream.com/wp-content/uploads/2008/12/organic-results-on-the-serp.png",
  localSEO: "https://zenbrief.com/wp-content/uploads/2022/07/How-To-Use-Google-Business-Profile-For-Local-SEO_-Complete-Guide-to-GBP-ex-GMB.png",
  ecommerce: "https://www.webhopers.com/wp-content/uploads/2024/06/Top-10-SEO-Strategies-for-eCommerce-Websites-4.png"
};
const seoServices = [
  {
    icon: Zap,
    title: "Technical SEO Audit",
    desc: "Detailed website audit to identify technical problems affecting rankings and performance."
  },
  {
    icon: FileText,
    title: "On-Page SEO",
    desc: "Optimize structure, content, meta tags, headings, and internal links for better understanding by search engines."
  },
  {
    icon: Link$1,
    title: "Off-Page SEO",
    desc: "Build authority through high-quality backlinks, brand mentions, and trusted references."
  },
  {
    icon: MapPin,
    title: "Local SEO",
    desc: "Rank in local search results and Google Maps to attract nearby customers."
  },
  {
    icon: Search,
    title: "Keyword Research & Strategy",
    desc: "Identify high-value keywords your potential customers search for and build strong strategies."
  },
  {
    icon: Globe,
    title: "E-commerce SEO",
    desc: "Optimize product pages, categories, and technical elements to increase visibility and sales."
  }
];
const packages = [
  {
    name: "Basic Plan",
    desc: "Best for startups and small businesses",
    features: [
      "Initial SEO analysis",
      "On-page optimization",
      "Keyword research",
      "Local SEO setup",
      "Off-page SEO",
      "Monthly reporting"
    ]
  },
  {
    name: "Advance Plan",
    desc: "Best for growing businesses",
    features: [
      "SEO audit and strategy",
      "On-page optimization",
      "Keyword targeting",
      "Local SEO optimization",
      "Content marketing",
      "Off-page SEO",
      "Monthly reporting",
      "Customer support"
    ]
  },
  {
    name: "Pro Plan",
    desc: "Best for competitive industries",
    features: [
      "Complete SEO strategy",
      "On-page + technical SEO",
      "Keyword research and targeting",
      "Local SEO optimization",
      "Content marketing",
      "High-quality backlinks",
      "Premium SEO reports",
      "Dedicated support"
    ]
  }
];
const fadeInUp$c = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};
const staggerContainer$c = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};
function SEO() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const accentClass = "text-red-500";
  const headingClass = isDark ? "text-white" : "text-gray-900";
  const bodyClass = isDark ? "text-gray-300" : "text-gray-700";
  const cardClass = isDark ? "bg-gray-900/70 backdrop-blur-sm border border-gray-800 hover:border-red-500/60 hover:shadow-red-900/30" : "bg-white border border-gray-200 hover:border-red-300 hover:shadow-2xl";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `min-h-screen overflow-hidden transition-colors duration-700
      ${isDark ? "bg-black text-white" : "bg-white text-gray-900"}`,
      children: [
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden bg-black", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: images$b.serp,
                alt: "Google SERP organic results",
                className: "w-full h-full object-cover opacity-40"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" })
          ] }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: "hidden",
              animate: "visible",
              variants: staggerContainer$c,
              className: "relative z-10 max-w-7xl mx-auto text-center",
              children: [
                /* @__PURE__ */ jsxs(
                  motion.h1,
                  {
                    variants: fadeInUp$c,
                    className: "text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight text-white",
                    children: [
                      "Best SEO Company in India That Drives Traffic & Generates",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-red-500 to-white", children: "Real Leads" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp$c,
                    className: "text-xl md:text-2xl mb-12 max-w-5xl mx-auto leading-relaxed text-white/90",
                    children: "At AI Knots IT Solutions, we are not just another digital marketing agency. We are a team that truly understands how search engines work and how businesses grow online."
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    variants: fadeInUp$c,
                    className: "flex flex-col sm:flex-row gap-6 justify-center",
                    children: [
                      /* @__PURE__ */ jsxs("button", { className: "group px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-full text-xl font-bold shadow-xl shadow-red-900/50 transition-all flex items-center gap-3 text-white", children: [
                        "Let's Talk Growth",
                        /* @__PURE__ */ jsx(ArrowRight, { className: "w-6 h-6 group-hover:translate-x-1 transition-transform" })
                      ] }),
                      /* @__PURE__ */ jsx("button", { className: "px-10 py-5 border-2 border-red-400 rounded-full text-xl font-semibold transition-all text-red-400 hover:bg-red-950/50", children: "Free SEO Audit →" })
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-20 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gray-950" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto text-center", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: fadeInUp$c,
                  className: `text-4xl md:text-5xl font-black mb-10 ${headingClass}`,
                  children: [
                    'Many promise "Rank #1 on Google." But the real question is: Will those rankings bring you',
                    " ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "real customers" }),
                    "?"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  variants: fadeInUp$c,
                  className: `text-xl mb-12 max-w-4xl mx-auto ${bodyClass}`,
                  children: "That's where we work differently. We focus on results that actually help your business grow:"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8 max-w-5xl mx-auto", children: [
                "More qualified website traffic",
                "More inquiries and calls",
                "More real customers and sales"
              ].map((point, i) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: i * 0.15 },
                  className: `rounded-3xl p-8 transition-all ${cardClass}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      CheckCircle,
                      {
                        className: `w-12 h-12 mx-auto mb-6 ${accentClass}`
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: "text-xl font-semibold", children: point })
                  ]
                },
                i
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-20 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-5xl font-black text-center mb-16 ${headingClass}`,
                  children: [
                    "Our SEO Services –",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Designed to Deliver Results" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: seoServices.map((service, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: `rounded-3xl p-8 transition-all group ${cardClass}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      service.icon,
                      {
                        className: `w-14 h-14 mb-6 mx-auto transition-transform group-hover:scale-110 ${accentClass}`
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: `text-2xl font-bold mb-4 text-center ${headingClass}`,
                        children: service.title
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: `text-center ${bodyClass}`, children: service.desc })
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-20 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gradient-to-b from-black to-gray-950" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center", children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: staggerContainer$c,
                  children: [
                    /* @__PURE__ */ jsx(
                      "h2",
                      {
                        className: `text-4xl md:text-5xl font-black mb-8 ${headingClass}`,
                        children: "Advantages of SEO for Your Business"
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: `text-lg mb-8 leading-relaxed ${bodyClass}`, children: "Search Engine Optimization helps businesses build a strong online presence and reach customers who are actively searching for their products or services." }),
                    /* @__PURE__ */ jsx("ul", { className: "space-y-4 text-lg", children: [
                      "Higher visibility on search engines",
                      "Increased website traffic",
                      "Stronger brand awareness",
                      "Higher conversion rates",
                      "Long-term business growth"
                    ].map((adv, i) => /* @__PURE__ */ jsxs(
                      motion.li,
                      {
                        variants: fadeInUp$c,
                        className: "flex items-center gap-4",
                        children: [
                          /* @__PURE__ */ jsx(
                            CheckCircle,
                            {
                              className: `w-6 h-6 flex-shrink-0 ${accentClass}`
                            }
                          ),
                          adv
                        ]
                      },
                      i
                    )) })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.img,
                {
                  initial: { opacity: 0, x: 50 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true },
                  src: images$b.dashboard,
                  alt: "SEO analytics dashboard",
                  className: `rounded-3xl shadow-2xl w-full object-cover border ${isDark ? "border-red-900/30" : "border-gray-200"}`
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-20 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center", children: [
              /* @__PURE__ */ jsx(
                motion.img,
                {
                  initial: { opacity: 0, x: -50 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true },
                  src: images$b.team,
                  alt: "SEO team collaborating",
                  className: `rounded-3xl shadow-2xl w-full object-cover border ${isDark ? "border-red-900/30" : "border-gray-200"} order-2 md:order-1`
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: staggerContainer$c,
                  className: "order-1 md:order-2",
                  children: [
                    /* @__PURE__ */ jsx(
                      "h2",
                      {
                        className: `text-4xl md:text-5xl font-black mb-8 ${headingClass}`,
                        children: "Why Choose AI Knots IT Solutions for SEO?"
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "space-y-8", children: [
                      {
                        title: "White Hat SEO Practices",
                        desc: "We follow ethical and search-engine-approved techniques that deliver long-term results."
                      },
                      {
                        title: "Transparent Reporting",
                        desc: "Weekly and monthly SEO reports so you can clearly track rankings and traffic growth."
                      },
                      {
                        title: "Dedicated SEO Team",
                        desc: "Specialists, content writers, and developers working together for your website performance."
                      },
                      {
                        title: "Proven SEO Experience",
                        desc: "We stay updated with the latest algorithm changes to keep your business ahead."
                      }
                    ].map((item, i) => /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        variants: fadeInUp$c,
                        className: "flex items-start gap-5",
                        children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: `text-4xl font-black ${accentClass} opacity-70`,
                              children: `0${i + 1}`
                            }
                          ),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("h4", { className: `text-2xl font-bold mb-2 ${headingClass}`, children: item.title }),
                            /* @__PURE__ */ jsx("p", { className: bodyClass, children: item.desc })
                          ] })
                        ]
                      },
                      i
                    )) })
                  ]
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-20 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gray-950" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-5xl font-black text-center mb-16 ${headingClass}`,
                  children: [
                    "Our SEO ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Packages" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: packages.map((pkg, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 50 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.15 },
                  className: `rounded-3xl p-8 text-center transition-all ${cardClass} ${idx === 1 ? "scale-105 border-red-500 shadow-xl" : ""}`,
                  children: [
                    /* @__PURE__ */ jsx("h3", { className: `text-3xl font-black mb-3 ${accentClass}`, children: pkg.name }),
                    /* @__PURE__ */ jsx("p", { className: `mb-6 ${bodyClass}`, children: pkg.desc }),
                    /* @__PURE__ */ jsx("ul", { className: "space-y-3 text-left", children: pkg.features.map((feat, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsx(
                        CheckCircle,
                        {
                          className: `w-5 h-5 flex-shrink-0 ${accentClass}`
                        }
                      ),
                      feat
                    ] }, i)) })
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-20 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto grid md:grid-cols-2 gap-12", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  motion.img,
                  {
                    initial: { opacity: 0, scale: 0.95 },
                    whileInView: { opacity: 1, scale: 1 },
                    viewport: { once: true },
                    src: images$b.localSEO,
                    alt: "Local SEO Google Business Profile",
                    className: `rounded-3xl shadow-2xl w-full object-cover border mb-8 ${isDark ? "border-red-900/30" : "border-gray-200"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.img,
                  {
                    initial: { opacity: 0, scale: 0.95 },
                    whileInView: { opacity: 1, scale: 1 },
                    viewport: { once: true },
                    transition: { delay: 0.3 },
                    src: images$b.ecommerce,
                    alt: "E-commerce SEO",
                    className: `rounded-3xl shadow-2xl w-full object-cover border ${isDark ? "border-red-900/30" : "border-gray-200"}`
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: staggerContainer$c,
                  className: "flex flex-col justify-center",
                  children: [
                    /* @__PURE__ */ jsxs(
                      "h2",
                      {
                        className: `text-4xl md:text-6xl font-black mb-8 ${headingClass}`,
                        children: [
                          "Let's Talk About ",
                          /* @__PURE__ */ jsx("span", { className: accentClass, children: "Growth" }),
                          " Not Just Rankings"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: `text-xl mb-10 leading-relaxed ${bodyClass}`, children: "Ranking on search engines is important, but real success happens when those rankings bring customers who are genuinely interested in your services." }),
                    /* @__PURE__ */ jsx("p", { className: `text-lg mb-12 ${bodyClass}`, children: "At AI Knots IT Solutions, we focus on attracting the right visitors who convert into leads and sales. Connect with us today and start growing your business online." }),
                    /* @__PURE__ */ jsx(
                      motion.button,
                      {
                        whileHover: { scale: 1.05 },
                        whileTap: { scale: 0.98 },
                        className: "px-12 py-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-full text-2xl font-bold shadow-2xl transition-all w-fit text-white",
                        children: "Get Your Free Consultation →"
                      }
                    )
                  ]
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: scrollToTop,
            className: `fixed bottom-8 right-8 z-50 p-4 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"}`,
            "aria-label": "Scroll back to top",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-6 h-6",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 10l7-7m0 0l7 7m-7-7v18"
                  }
                )
              }
            )
          }
        )
      ]
    }
  );
}
const images$a = {
  hero: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=2340&q=80",
  designer: "https://images.unsplash.com/photo-1558655146-9f40138f37f5?auto=format&fit=crop&w=2340&q=80"
};
const services$6 = [
  {
    icon: Palette,
    title: "Logo Designing",
    desc: "Your logo is the face of your brand. We design unique, memorable logos that perfectly represent your business values."
  },
  {
    icon: Image,
    title: "Image & Creative Designing",
    desc: "Eye-catching social media posts, banners, advertisements, and marketing visuals that grab attention instantly."
  },
  {
    icon: Video,
    title: "Video Editing",
    desc: "Professional video editing for Reels, YouTube, ads, and brand stories that engage and convert your audience."
  }
];
const whyImportant = [
  "Create a strong and memorable brand identity",
  "Attract customers at first glance",
  "Communicate your message clearly",
  "Build trust and credibility",
  "Stand out from your competitors"
];
const whyChoose$4 = [
  "Creative and experienced designers who understand brand psychology",
  "100% unique and custom designs tailored to your business",
  "Strong focus on building long-term brand identity",
  "Fast turnaround time with multiple revisions"
];
const faqs$6 = [
  {
    q: "What graphic design services does AI Knots IT Solutions provide?",
    a: "We provide logo design, social media graphics, marketing banners, brand identity kits, promotional materials, and professional video editing."
  },
  {
    q: "Why is good graphic design important for my business?",
    a: "Great design creates a strong first impression, builds trust, helps people remember your brand, and makes your marketing more effective."
  },
  {
    q: "Do you design social media graphics and posts?",
    a: "Yes, we specialize in creating engaging social media creatives, Reels thumbnails, ad banners, and consistent brand visuals across all platforms."
  },
  {
    q: "How long does it take to complete a design project?",
    a: "Simple logo or social media designs usually take 3–7 days. Complex brand identity projects may take 10–21 days depending on revisions."
  },
  {
    q: "Do you offer revisions?",
    a: "Yes, we provide multiple rounds of revisions until you are completely satisfied with the final design."
  },
  {
    q: "How can I start a graphic design project with you?",
    a: "Just contact us via call or WhatsApp. We'll discuss your requirements and start working on your project quickly."
  }
];
function GraphicDesigning() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);
  const accentClass = "text-red-500";
  const headingClass = isDark ? "text-white" : "text-gray-900";
  const bodyClass = isDark ? "text-gray-300" : "text-gray-700";
  const cardClass = isDark ? "bg-gray-900/70 backdrop-blur-sm border border-gray-800 hover:border-red-500/60 hover:shadow-red-900/30" : "bg-white border border-gray-200 hover:shadow-2xl";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `min-h-screen overflow-hidden transition-colors duration-700 ${isDark ? "bg-black text-white" : "bg-white text-gray-900"}`,
      children: [
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: images$a.hero,
                alt: "Creative Graphic Design Services in Bhopal - AI Knots",
                className: "w-full h-full object-cover brightness-50",
                loading: "eager"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `absolute inset-0 bg-gradient-to-br ${isDark ? "from-black/90 via-black/80 to-black/90" : "from-black/70 via-black/60 to-transparent"}`
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: "hidden",
              animate: "visible",
              variants: {
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } }
              },
              className: "relative z-10 max-w-6xl mx-auto text-center",
              children: [
                /* @__PURE__ */ jsxs(
                  motion.h1,
                  {
                    variants: {
                      hidden: { opacity: 0, y: 40 },
                      visible: { opacity: 1, y: 0 }
                    },
                    className: "text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8 text-white",
                    children: [
                      "Professional Graphic Design Services in",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-white", children: "Bhopal" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: {
                      hidden: { opacity: 0, y: 40 },
                      visible: { opacity: 1, y: 0 }
                    },
                    className: `text-2xl md:text-3xl font-bold mb-8 ${accentClass}`,
                    children: "Designs That Speak • Brands That Shine"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.p,
                  {
                    variants: {
                      hidden: { opacity: 0, y: 40 },
                      visible: { opacity: 1, y: 0 }
                    },
                    className: `text-lg md:text-xl max-w-4xl mx-auto leading-relaxed mb-12 ${isDark ? "text-gray-300" : "text-white/90"}`,
                    children: [
                      "At",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "font-semibold text-red-400", children: "AI Knots IT Solutions" }),
                      ", we create stunning logos, social media graphics, and videos that help your business look professional and grow faster."
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    variants: {
                      hidden: { opacity: 0, y: 40 },
                      visible: { opacity: 1, y: 0 }
                    },
                    className: "flex flex-col sm:flex-row gap-6 justify-center",
                    children: [
                      /* @__PURE__ */ jsxs("button", { className: "px-12 py-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xl font-bold rounded-full shadow-xl flex items-center gap-3 group transition-all", children: [
                        "Start Your Design Project",
                        /* @__PURE__ */ jsx(ArrowRight, { className: "w-7 h-7 group-hover:translate-x-2 transition-transform" })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          className: `px-12 py-6 border-2 border-red-500 rounded-full text-xl font-bold transition-all ${isDark ? "text-red-400 hover:bg-red-950/60" : "text-red-600 hover:bg-red-50"}`,
                          children: "View Our Work →"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gray-950" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-16 ${headingClass}`,
                  children: [
                    "Our Graphic Design ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Services" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: services$6.map((service, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 50 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: `${cardClass} rounded-3xl p-10 text-center group`,
                  children: [
                    /* @__PURE__ */ jsx(
                      service.icon,
                      {
                        className: `w-20 h-20 mx-auto mb-8 transition-transform group-hover:scale-110 ${accentClass}`
                      }
                    ),
                    /* @__PURE__ */ jsx("h3", { className: `text-2xl font-bold mb-6 ${headingClass}`, children: service.title }),
                    /* @__PURE__ */ jsx("p", { className: `leading-relaxed ${bodyClass}`, children: service.desc })
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx("section", { className: "py-24 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              "h2",
              {
                className: `text-4xl md:text-5xl font-black mb-10 ${headingClass}`,
                children: "Why Graphic Design Matters for Your Business"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: `text-xl mb-10 ${bodyClass}`, children: "Good design is not just about looking pretty — it's about making your business memorable and trustworthy." }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-6 text-lg", children: whyImportant.map((point, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx(
                CheckCircle,
                {
                  className: `w-8 h-8 mt-1 flex-shrink-0 ${accentClass}`
                }
              ),
              /* @__PURE__ */ jsx("span", { className: bodyClass, children: point })
            ] }, i)) })
          ] }),
          /* @__PURE__ */ jsx(
            motion.img,
            {
              initial: { opacity: 0, x: 50 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              src: images$a.designer,
              alt: "Professional graphic designer working on brand visuals",
              className: "rounded-3xl shadow-2xl w-full object-cover"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gray-950" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-16 ${headingClass}`,
                  children: [
                    "Why Choose ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "AI Knots" }),
                    " for Graphic Design?"
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8", children: whyChoose$4.map((reason, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 50 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: `${cardClass} rounded-3xl p-8`,
                  children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `text-6xl font-black ${accentClass} mb-6 opacity-75`,
                        children: `0${idx + 1}`
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: `text-lg leading-relaxed ${bodyClass}`, children: reason })
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx("section", { className: "py-24 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxs(
            motion.h2,
            {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: `text-4xl md:text-6xl font-black mb-8 ${headingClass}`,
              children: [
                "Let’s Create Designs That Make Your Brand",
                " ",
                /* @__PURE__ */ jsx("span", { className: accentClass, children: "Stand Out" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(motion.p, { className: `text-xl max-w-3xl mx-auto mb-12 ${bodyClass}`, children: "From logos to social media creatives and video editing — we deliver designs that help your business grow in Bhopal and beyond." }),
          /* @__PURE__ */ jsx("button", { className: "px-16 py-7 bg-red-600 hover:bg-red-700 text-white text-2xl font-bold rounded-full shadow-xl transition-all", children: "Get Your Custom Design Quote →" }),
          /* @__PURE__ */ jsx("p", { className: "mt-10 text-lg text-gray-500", children: "📞 +91 78696 36070   |   support@atlaknots.com" })
        ] }) }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gray-950" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-16 ${headingClass}`,
                  children: [
                    "Frequently Asked ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Questions" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "space-y-4", children: faqs$6.map((faq, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `border rounded-2xl overflow-hidden ${isDark ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-white"}`,
                  children: [
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        onClick: () => setOpenFaq(openFaq === idx ? null : idx),
                        className: "w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-800/30 transition-all",
                        children: [
                          /* @__PURE__ */ jsx("span", { className: `text-xl font-semibold ${headingClass}`, children: faq.q }),
                          /* @__PURE__ */ jsx(
                            ChevronDown,
                            {
                              className: `w-6 h-6 text-red-500 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`
                            }
                          )
                        ]
                      }
                    ),
                    openFaq === idx && /* @__PURE__ */ jsx("div", { className: `px-8 pb-8 text-lg ${bodyClass}`, children: faq.a })
                  ]
                },
                idx
              )) })
            ] })
          }
        )
      ]
    }
  );
}
const images$9 = {
  hero: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  // Modern coding team
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  // Collaborative dev team
  codeWorkspace: "https://images.unsplash.com/photo-1555066931-bf19c9cb1085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  // Clean code on multiple screens
  cloudDevops: "https://images.unsplash.com/photo-1563986768609-620da13593e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  // Mobile app screens mockup
  growthChart: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  // Business growth analytics
  caseStudyDashboard: "https://images.unsplash.com/photo-1551288049-b1f4d7c0e309?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
  // Analytics dashboard for case studies
};
const services$5 = [
  {
    icon: Code,
    title: "Custom Software Development",
    desc: "Develop software applications according to the changing needs of your business and customers. We build fully functional, feature-rich, and scalable software that solves business challenges and supports growth."
  },
  {
    icon: Globe,
    title: "Web Development Services",
    desc: "Grow your business with custom web development solutions that match your business requirements. Secure, scalable, and high-performance web applications that integrate perfectly with your ecosystem."
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps Solutions",
    desc: "Automation and cloud technologies help businesses manage operations efficiently. Streamline workflows, improve collaboration, and accelerate development while maintaining high performance."
  },
  {
    icon: Users,
    title: "Dedicated Development Team",
    desc: "Hire a dedicated team of experienced developers, architects, and project managers who understand your business needs and deliver real solutions."
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Build Android and iOS mobile applications (native & cross-platform) with smooth functionality, better performance, and excellent user experience."
  },
  {
    icon: Database,
    title: "Staff Augmentation",
    desc: "Flexible IT staff augmentation services to scale your development team according to project needs. Fill technical gaps, speed up development, and ensure successful completion."
  }
];
const industries$5 = [
  "Fintech & Insurance",
  "Education",
  "Retail & eCommerce",
  "Energy & Utilities",
  "Logistics & Distribution",
  "Healthcare",
  "Travel & Hospitality",
  "Media & Entertainment",
  "Public Sector",
  "Technology"
];
const techStack = {
  backend: ["Node.js", "Java", ".NET", "PHP", "Ruby on Rails"],
  frontend: ["React", "Angular", "Vue.js"],
  database: ["MySQL", "PostgreSQL", "MongoDB", "SQL Server", "Oracle"],
  mobile: ["iOS", "Android", "Flutter", "React Native"],
  cloud: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes"],
  testing: ["Selenium", "Postman", "Apache JMeter", "BrowserStack"]
};
const fadeInUp$b = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const staggerContainer$b = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};
function SoftwareDevelopment() {
  const { isDark } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `relative overflow-hidden ${isDark ? "bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white" : "bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900"}`,
      children: [
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: images$9.hero,
                alt: "Modern software development team collaborating",
                className: "w-full h-full object-cover opacity-25 brightness-50"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `absolute inset-0 ${isDark ? "bg-gradient-to-t from-black via-black/80 to-transparent" : "bg-gradient-to-t from-white via-white/80 to-transparent"}`
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: "hidden",
              animate: "visible",
              variants: staggerContainer$b,
              className: "relative z-10 max-w-7xl mx-auto text-center",
              children: [
                /* @__PURE__ */ jsx(
                  motion.h1,
                  {
                    variants: fadeInUp$b,
                    className: "text-5xl md:text-7xl font-black mb-8 tracking-tight leading-tight",
                    children: "Software Development Company India"
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp$b,
                    className: `text-2xl md:text-3xl font-bold mb-6 ${isDark ? "text-red-400" : "text-red-600"}`,
                    children: "Expand your business globally by outsourcing your technology requirements to a trusted partner."
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp$b,
                    className: `text-lg md:text-xl mb-12 max-w-5xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`,
                    children: "We provide high-quality software development services to businesses by building secure, scalable, and high-performance software solutions with excellent user experience."
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    variants: fadeInUp$b,
                    className: "flex flex-col sm:flex-row gap-6 justify-center",
                    children: [
                      /* @__PURE__ */ jsxs("button", { className: "px-12 py-6 bg-gradient-to-r from-red-600 to-red-800 rounded-full text-xl md:text-2xl font-bold shadow-2xl shadow-red-900/60 hover:shadow-red-700/80 hover:scale-105 transition-all flex items-center gap-3 group", children: [
                        "Get in Touch",
                        " ",
                        /* @__PURE__ */ jsx(ArrowRight, { className: "w-7 h-7 group-hover:translate-x-2 transition-transform" })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          className: `px-12 py-6 border-2 rounded-full text-xl md:text-2xl font-bold transition-all ${isDark ? "border-red-600/70 text-red-400 hover:bg-red-950/50" : "border-red-600 text-red-600 hover:bg-red-50"}`,
                          children: "View Portfolio →"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/50" : "bg-white/50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsx(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: "text-4xl md:text-6xl font-black mb-10 text-center",
                  children: "Empower Your Business with Modern Software Development"
                }
              ),
              /* @__PURE__ */ jsx(
                motion.img,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  src: images$9.team,
                  alt: "Dedicated software development team collaborating",
                  className: `rounded-2xl shadow-2xl mx-auto max-w-4xl w-full object-cover mb-12 ${isDark ? "border border-red-900/30" : "border border-gray-200"}`
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.p,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-xl mb-12 max-w-5xl mx-auto leading-relaxed text-center ${isDark ? "text-gray-300" : "text-gray-700"}`,
                  children: [
                    "Access a skilled team of developers who can transform your business and help you adapt to evolving technologies.",
                    /* @__PURE__ */ jsx("br", {}),
                    /* @__PURE__ */ jsx("br", {}),
                    "By partnering with Atlas Knots IT Solution, businesses can gain a strong competitive advantage. Our team delivers reliable and efficient software development services that help increase productivity and business growth.",
                    /* @__PURE__ */ jsx("br", {}),
                    /* @__PURE__ */ jsx("br", {}),
                    "We offer a wide range of services including software design, custom development, software testing, legacy system migration, product development, and many more solutions tailored to business requirements.",
                    /* @__PURE__ */ jsx("br", {}),
                    /* @__PURE__ */ jsx("br", {}),
                    "Our dedicated team of developers ensures smooth business processes, improved efficiency, and long-term profitability."
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-4 gap-8 mb-16", children: ["5+", "3+", "10+", "2+"].map((num, i) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `rounded-2xl p-10 text-center transition-all ${isDark ? "bg-gray-900/70 border border-red-900/40 hover:border-red-600/60" : "bg-white border border-gray-200 hover:border-red-500/60 shadow-md"}`,
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "text-6xl md:text-7xl font-black text-red-500 mb-4", children: num }),
                    /* @__PURE__ */ jsxs("p", { className: "text-xl font-medium", children: [
                      i === 0 && "Completed Projects",
                      i === 1 && "Years of Experience",
                      i === 2 && "Global Customers",
                      i === 3 && "Countries Clients Served"
                    ] })
                  ]
                },
                i
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: "text-4xl md:text-6xl font-black text-center mb-12",
                  children: [
                    "Our Software Development",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Services" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.img,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  src: images$9.codeWorkspace,
                  alt: "Developers writing clean code for custom software",
                  className: "rounded-2xl shadow-2xl border border-red-900/30 mx-auto max-w-4xl w-full object-cover mb-12"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: services$5.map((service, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 50 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: `backdrop-blur-sm rounded-2xl p-10 hover:shadow-2xl transition-all group ${isDark ? "bg-gray-900/70 border border-red-900/40 hover:border-red-600/60 hover:shadow-red-900/30" : "bg-white border border-gray-200 hover:border-red-500/60 hover:shadow-gray-200 shadow-md"}`,
                  children: [
                    /* @__PURE__ */ jsx(service.icon, { className: "w-16 h-16 text-red-500 mb-8 mx-auto group-hover:scale-110 transition-transform" }),
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: `text-2xl md:text-3xl font-bold mb-6 text-center ${isDark ? "text-white" : "text-gray-900"}`,
                        children: service.title
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        className: `text-lg leading-relaxed text-center ${isDark ? "text-gray-300" : "text-gray-700"}`,
                        children: service.desc
                      }
                    )
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/50" : "bg-white/50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: "text-4xl md:text-5xl font-black text-center mb-12",
                  children: [
                    "Software Development",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Case Studies" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.img,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  src: images$9.caseStudyDashboard,
                  alt: "Analytics dashboard for media and trading platforms",
                  className: "rounded-2xl shadow-2xl border border-red-900/30 mx-auto max-w-4xl w-full object-cover mb-12"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: [
                {
                  title: "Media Distribution & Aggregation Platform",
                  desc: "Interactive media distribution platform integrating social media channels, managing advertising campaigns, and collecting data into a single system."
                },
                {
                  title: "Online Forex Trading Solution",
                  desc: "Secure forex trading platform with real-time currency exchange, competitive rates, flexible payments, and strong financial security."
                },
                {
                  title: "Smart City Application",
                  desc: "IoT-connected smart city management system for monitoring environmental data, energy usage, lighting, flood detection, and air quality."
                }
              ].map((study, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 50 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.15 },
                  className: `border rounded-2xl p-10 transition-all ${isDark ? "bg-gray-900/70 border-red-900/40 hover:border-red-600/60" : "bg-white border-gray-200 hover:border-red-500/60 shadow-md"}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: `text-2xl font-bold mb-6 ${isDark ? "text-red-400" : "text-red-600"}`,
                        children: study.title
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        className: `leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`,
                        children: study.desc
                      }
                    )
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsx(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: "text-4xl md:text-5xl font-black text-center mb-12",
                  children: "Industries We Work With"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4 mb-20", children: industries$5.map((ind, i) => /* @__PURE__ */ jsx(
                motion.span,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  transition: { delay: i * 0.03 },
                  className: `px-6 py-3 rounded-full text-sm md:text-base transition-all ${isDark ? "bg-gray-900/70 border border-red-900/40 text-gray-200 hover:bg-red-900/40 hover:border-red-600/50" : "bg-white border border-gray-200 text-gray-700 hover:bg-red-50 hover:border-red-500/50 shadow-sm"}`,
                  children: ind
                },
                i
              )) }),
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: "text-4xl md:text-5xl font-black text-center mb-12",
                  children: [
                    "Technology ",
                    /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Stack" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.img,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  src: images$9.cloudDevops,
                  alt: "Cloud infrastructure and DevOps technologies",
                  className: "rounded-2xl shadow-2xl border border-red-900/30 mx-auto max-w-4xl w-full object-cover mb-12"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: Object.entries(techStack).map(([category, techs], idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `border rounded-2xl p-8 ${isDark ? "bg-gray-900/70 border-red-900/40" : "bg-white border-gray-200 shadow-md"}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: `text-2xl font-bold mb-6 capitalize ${isDark ? "text-red-400" : "text-red-600"}`,
                        children: category
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: techs.map((tech, i) => /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: `px-4 py-2 rounded-full text-sm ${isDark ? "bg-black/50 border border-red-900/30" : "bg-gray-100 border border-gray-300"}`,
                        children: tech
                      },
                      i
                    )) })
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/50" : "bg-white/50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto grid md:grid-cols-3 gap-12", children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: staggerContainer$b,
                  children: [
                    /* @__PURE__ */ jsx(
                      motion.img,
                      {
                        variants: fadeInUp$b,
                        src: images$9.codeWorkspace,
                        alt: "Developers writing secure code",
                        className: `rounded-2xl shadow-2xl w-full object-cover mb-8 ${isDark ? "border border-red-900/30" : "border border-gray-200"}`
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "h2",
                      {
                        className: `text-3xl md:text-4xl font-black mb-8 ${isDark ? "text-red-400" : "text-red-600"}`,
                        children: "Why Software Outsourcing?"
                      }
                    ),
                    /* @__PURE__ */ jsx("ul", { className: "space-y-4 text-lg", children: [
                      "Reduced software development costs",
                      "Access to skilled developers",
                      "Faster development process",
                      "Access to modern technologies",
                      "Flexible and scalable development teams",
                      "Reduced operational risks"
                    ].map((point, i) => /* @__PURE__ */ jsxs(
                      motion.li,
                      {
                        variants: fadeInUp$b,
                        className: "flex items-start gap-4",
                        children: [
                          /* @__PURE__ */ jsx(ArrowRight, { className: "w-6 h-6 text-red-500 flex-shrink-0 mt-1" }),
                          /* @__PURE__ */ jsx("span", { children: point })
                        ]
                      },
                      i
                    )) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: staggerContainer$b,
                  children: [
                    /* @__PURE__ */ jsx(
                      "h2",
                      {
                        className: `text-3xl md:text-4xl font-black mb-8 ${isDark ? "text-red-400" : "text-red-600"}`,
                        children: "Why Choose India for Software Development?"
                      }
                    ),
                    /* @__PURE__ */ jsx("ul", { className: "space-y-4 text-lg", children: [
                      "Cost-effective development solutions",
                      "Highly skilled developer community",
                      "Flexible business models",
                      "24/7 development support for global clients",
                      "Access to the latest technologies",
                      "Faster project delivery"
                    ].map((point, i) => /* @__PURE__ */ jsxs(
                      motion.li,
                      {
                        variants: fadeInUp$b,
                        className: "flex items-start gap-4",
                        children: [
                          /* @__PURE__ */ jsx(ArrowRight, { className: "w-6 h-6 text-red-500 flex-shrink-0 mt-1" }),
                          /* @__PURE__ */ jsx("span", { children: point })
                        ]
                      },
                      i
                    )) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: staggerContainer$b,
                  children: [
                    /* @__PURE__ */ jsx(
                      "h2",
                      {
                        className: `text-3xl md:text-4xl font-black mb-8 ${isDark ? "text-red-400" : "text-red-600"}`,
                        children: "Why Choose Atlas Knots IT Solution?"
                      }
                    ),
                    /* @__PURE__ */ jsx("ul", { className: "space-y-4 text-lg", children: [
                      "Clear Communication",
                      "Scalable Teams",
                      "Efficient Project Management",
                      "Strong Industry Experience",
                      "Business-Friendly Hiring Models"
                    ].map((point, i) => /* @__PURE__ */ jsxs(
                      motion.li,
                      {
                        variants: fadeInUp$b,
                        className: "flex items-start gap-4",
                        children: [
                          /* @__PURE__ */ jsx(ArrowRight, { className: "w-6 h-6 text-red-500 flex-shrink-0 mt-1" }),
                          /* @__PURE__ */ jsx("span", { children: point })
                        ]
                      },
                      i
                    )) })
                  ]
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: "text-4xl md:text-5xl font-black text-center mb-12",
                  children: [
                    "Our Development ",
                    /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Process" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8 mb-20", children: [
                "Requirement Analysis",
                "Agile Development",
                "Testing and Delivery"
              ].map((step, i) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  transition: { delay: i * 0.15 },
                  className: `border rounded-2xl p-10 text-center transition-all ${isDark ? "bg-gray-900/70 border-red-900/40 hover:border-red-600/60" : "bg-white border-gray-200 hover:border-red-500/60 shadow-md"}`,
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "text-5xl font-black text-red-500 mb-6", children: `0${i + 1}` }),
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: `text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`,
                        children: step
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "p",
                      {
                        className: `text-gray-300 ${isDark ? "text-gray-300" : "text-gray-700"}`,
                        children: [
                          step === "Requirement Analysis" && "We understand your business needs and define the project roadmap.",
                          step === "Agile Development" && "Our developers follow agile methods with regular updates and feedback cycles.",
                          step === "Testing and Delivery" && "We conduct thorough testing before deploying the final product to ensure performance and security."
                        ]
                      }
                    )
                  ]
                },
                i
              )) }),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 50 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: "text-center",
                  children: [
                    /* @__PURE__ */ jsx(
                      motion.img,
                      {
                        initial: { opacity: 0, scale: 0.95 },
                        whileInView: { opacity: 1, scale: 1 },
                        viewport: { once: true },
                        src: images$9.growthChart,
                        alt: "Business growth through software solutions",
                        className: `rounded-2xl shadow-2xl mx-auto max-w-4xl w-full object-cover mb-12 ${isDark ? "border border-red-900/30" : "border border-gray-200"}`
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      motion.h2,
                      {
                        variants: fadeInUp$b,
                        className: "text-4xl md:text-6xl font-black mb-10",
                        children: "Hire a Dedicated Software Development Team"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      motion.p,
                      {
                        variants: fadeInUp$b,
                        className: `text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`,
                        children: "Get access to experienced developers who can build powerful web and mobile applications tailored to your business needs."
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      motion.button,
                      {
                        whileHover: { scale: 1.05 },
                        whileTap: { scale: 0.98 },
                        className: "px-14 py-7 bg-gradient-to-r from-red-600 to-red-800 rounded-full text-2xl md:text-3xl font-black shadow-2xl shadow-red-900/60 hover:shadow-red-700/80 transition-all",
                        children: "Hire Us Now →"
                      }
                    )
                  ]
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/60" : "bg-white/60"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
              /* @__PURE__ */ jsx(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: "text-4xl md:text-5xl font-black text-center mb-16",
                  children: "Frequently Asked Questions"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "space-y-8", children: [
                {
                  q: "What is the cost of software development?",
                  a: "The cost depends on the complexity, features, and timeline of the project."
                },
                {
                  q: "Do you offer custom software development?",
                  a: "Yes, we specialize in building custom software solutions based on business needs."
                },
                {
                  q: "Can I hire a dedicated development team?",
                  a: "Yes, we offer dedicated developer hiring models for businesses."
                },
                {
                  q: "Do you provide maintenance and support?",
                  a: "Yes, we provide post-development support and maintenance services."
                },
                {
                  q: "Which industries do you work with?",
                  a: "We serve industries such as healthcare, education, fintech, retail, logistics, and many others."
                }
              ].map((faq, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: `border rounded-2xl p-8 ${isDark ? "bg-gray-900/70 border-red-900/40" : "bg-white border-gray-200 shadow-md"}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: `text-2xl font-bold mb-4 ${isDark ? "text-red-400" : "text-red-600"}`,
                        children: faq.q
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        className: `text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`,
                        children: faq.a
                      }
                    )
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: scrollToTop,
            className: `fixed bottom-6 right-6 z-50 p-4 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/50 transition-all duration-300 hover:scale-110 active:scale-95 ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"}`,
            "aria-label": "Scroll back to top",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-6 h-6",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                xmlns: "http://www.w3.org/2000/svg",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 10l7-7m0 0l7 7m-7-7v18"
                  }
                )
              }
            )
          }
        )
      ]
    }
  );
}
const mobileProcess = "/assets/mobile-CQ9poE_x.jpeg";
const mobileProcess2 = "/assets/mobilebackground-JhMbvKMX.jpeg";
const images$8 = {
  hero: mobileProcess2,
  android: "https://images.unsplash.com/photo-1607252650355-f2a0a3a5a2c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  ios: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  hybrid: "https://images.unsplash.com/photo-1551651055-1e6e6d5b4a8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  process: mobileProcess,
  // ← Fixed: Using local imported image
  team: mobileProcess
};
const services$4 = [
  {
    title: "Android Application Development",
    desc: "We harness the full power of the Android ecosystem using Kotlin and Java to create fast, secure, and feature-rich applications. Our expert team focuses on modern Material Design, offline capabilities, push notifications, and seamless integration with Google services."
  },
  {
    title: "iOS Application Development",
    desc: "We develop premium native iOS applications using Swift and SwiftUI for iPhone, iPad, and Apple Watch. Our apps are optimized for the latest iOS versions with beautiful interfaces and flawless performance."
  },
  {
    title: "Hybrid & Cross-Platform Development",
    desc: "Using React Native and Flutter, we build high-performance hybrid apps that work seamlessly on both Android and iOS from a single codebase — saving time and cost while maintaining near-native experience."
  }
];
const benefits$1 = [
  "Enhance customer engagement with personalized experiences",
  "Expand your market reach across Android and iOS platforms",
  "Streamline internal business processes and operations",
  "Increase sales and revenue through in-app purchases",
  "Build stronger brand loyalty and customer retention",
  "Gain valuable insights with in-app analytics"
];
const cities = ["Bhopal", "Indore", "Delhi", "Pune", "Jaipur", "Gurgaon", "Noida", "Mumbai", "Hyderabad", "Bangalore"];
const industries$4 = [
  "Finance & Banking",
  "Manufacturing",
  "Legal & Law Firms",
  "Technology & IT",
  "Transportation & Automotive",
  "eCommerce & Retail",
  "Healthcare & Medical",
  "Education & EdTech",
  "Real Estate",
  "Tourism & Hospitality",
  "Event Management",
  "Non-Profit Organizations",
  "Agriculture",
  "Many More..."
];
const fadeInUp$a = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const staggerContainer$a = {
  hidden: { opacity: 1 },
  visible: { transition: { staggerChildren: 0.15 } }
};
function MobileAppDevelopment() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxs("div", { className: `relative min-h-screen overflow-x-hidden transition-colors duration-500
      ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`, children: [
    /* @__PURE__ */ jsx("div", { className: `absolute inset-0 z-0 ${isDark ? "bg-gradient-to-b from-black via-gray-950 to-black" : "bg-gradient-to-b from-gray-50 via-white to-red-50/30"}` }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-16", children: [
      /* @__PURE__ */ jsxs("section", { className: "relative min-h-[75vh] md:min-h-[80vh] flex items-center justify-center px-4 py-12 overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: images$8.hero,
              alt: "Professional mobile app development team working in Bhopal",
              className: "w-full h-full object-cover",
              loading: "eager"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: `absolute inset-0 ${isDark ? "bg-gradient-to-t from-black via-black/85 to-black/60" : "bg-gradient-to-t from-white via-white/90 to-white/70"}` })
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: "hidden",
            animate: "visible",
            variants: staggerContainer$a,
            className: "relative z-10 text-center max-w-5xl mx-auto",
            children: [
              /* @__PURE__ */ jsxs(
                motion.h1,
                {
                  variants: fadeInUp$a,
                  className: "text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none",
                  children: [
                    "Mobile Application ",
                    /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Development" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  variants: fadeInUp$a,
                  className: `text-3xl md:text-4xl font-bold mb-8 ${isDark ? "text-red-400" : "text-red-600"}`,
                  children: "Premium App Development Services in Bhopal"
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  variants: fadeInUp$a,
                  className: `text-lg md:text-xl leading-relaxed mb-12 max-w-4xl mx-auto ${isDark ? "text-gray-300" : "text-gray-700"}`,
                  children: "At Atlas Knots IT Solution, we transform innovative ideas into powerful, user-friendly mobile applications. Our expert team in Bhopal delivers high-performance Android, iOS, and cross-platform apps that drive real business growth."
                }
              ),
              /* @__PURE__ */ jsxs(motion.div, { variants: fadeInUp$a, className: "flex flex-col sm:flex-row gap-6 justify-center", children: [
                /* @__PURE__ */ jsxs("button", { className: "px-12 py-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-full text-xl font-bold shadow-xl flex items-center gap-3 group transition-all hover:scale-105", children: [
                  "Get Free Consultation",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-7 h-7 group-hover:translate-x-2 transition-transform" })
                ] }),
                /* @__PURE__ */ jsx("button", { className: `px-12 py-6 border-2 rounded-full text-xl font-bold transition-all
                ${isDark ? "border-red-600/70 text-red-400 hover:bg-red-950/50" : "border-red-600 text-red-600 hover:bg-red-50"}`, children: "View Our Portfolio →" })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("section", { className: `py-20 px-4 sm:px-6 lg:px-8 rounded-3xl mt-8 mb-12
          ${isDark ? "bg-black/70 border border-red-900/30" : "bg-white shadow-2xl"}`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
        /* @__PURE__ */ jsxs(
          motion.h2,
          {
            initial: { opacity: 0, y: 40 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-4xl md:text-6xl font-black text-center mb-6",
            children: [
              "Our Mobile App ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Development Services" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 40 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: `text-xl text-center mb-16 max-w-4xl mx-auto ${isDark ? "text-gray-300" : "text-gray-700"}`,
            children: "With years of experience and a passion for innovation, Atlas Knots IT Solution offers comprehensive mobile app development solutions tailored to your unique business requirements."
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: services$4.map((service, idx) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: idx * 0.1 },
            className: `group relative overflow-hidden rounded-3xl p-10 border transition-all hover:-translate-y-2
                    ${isDark ? "bg-gray-950 border-red-900/50 hover:border-red-600" : "bg-white border-gray-200 hover:border-red-400 shadow-lg"}`,
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-500", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: idx === 0 ? images$8.android : idx === 1 ? images$8.ios : images$8.hybrid,
                  alt: `${service.title} - Atlas Knots IT Solution`,
                  className: "w-full h-full object-cover",
                  loading: "lazy"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsx("h3", { className: `text-2xl md:text-3xl font-bold mb-6 text-center ${isDark ? "text-red-400" : "text-red-600"}`, children: service.title }),
                /* @__PURE__ */ jsx("p", { className: `text-lg leading-relaxed text-center ${isDark ? "text-gray-300" : "text-gray-700"}`, children: service.desc })
              ] })
            ]
          },
          idx
        )) }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 40 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "mt-16 text-center",
            children: [
              /* @__PURE__ */ jsx("h3", { className: `text-3xl font-bold mb-10 ${isDark ? "text-white" : "text-gray-900"}`, children: "Benefits of Our Mobile App Development Services" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-6", children: benefits$1.map((benefit, i) => /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: `px-8 py-5 rounded-2xl text-lg font-medium border transition-all hover:scale-105
                      ${isDark ? "bg-gray-900 border-red-900/50 hover:border-red-600" : "bg-white border-red-200 hover:border-red-400 shadow-sm"}`,
                  children: benefit
                },
                i
              )) })
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-20 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
        /* @__PURE__ */ jsxs(
          motion.h2,
          {
            initial: { opacity: 0, y: 40 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: `text-4xl md:text-5xl font-black text-center mb-8 ${isDark ? "text-white" : "text-gray-900"}`,
            children: [
              "Our Proven App Development ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Process" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.img,
          {
            src: images$8.process,
            alt: "Detailed mobile app development process roadmap illustration",
            className: "rounded-3xl mx-auto mb-16 shadow-2xl border border-red-900/30 max-w-5xl w-full object-cover",
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-5 gap-8", children: [
          { step: "Discovery & Planning", points: ["Understanding your business goals", "Market research & competitor analysis", "Feature prioritization", "Project roadmap"] },
          { step: "UI/UX Design", points: ["Wireframing & prototypes", "Visual design", "User experience optimization", "Feedback & iteration"] },
          { step: "Development", points: ["Frontend & backend development", "API integration", "Clean & scalable code", "Regular testing"] },
          { step: "Testing & QA", points: ["Manual & automated testing", "Performance & security checks", "Bug fixing", "Cross-device compatibility"] },
          { step: "Launch & Maintenance", points: ["App Store deployment", "Post-launch monitoring", "Regular updates", "Ongoing support"] }
        ].map((phase, idx) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: true },
            transition: { delay: idx * 0.1 },
            className: `border rounded-3xl p-8 transition-all hover:border-red-600 min-h-[300px]
                    ${isDark ? "bg-gray-950 border-red-900/50" : "bg-white border-gray-200 shadow-md"}`,
            children: [
              /* @__PURE__ */ jsx("div", { className: "text-5xl font-black text-red-500 mb-6", children: `0${idx + 1}` }),
              /* @__PURE__ */ jsx("h3", { className: `text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`, children: phase.step }),
              /* @__PURE__ */ jsx("ul", { className: `space-y-3 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`, children: phase.points.map((point, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-red-500 flex-shrink-0 mt-1" }),
                point
              ] }, i)) })
            ]
          },
          idx
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: `py-20 px-4 rounded-3xl mt-8 mb-12
          ${isDark ? "bg-gray-950 border border-red-900/30" : "bg-white shadow-2xl"}`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
        /* @__PURE__ */ jsxs(
          motion.h2,
          {
            initial: { opacity: 0, y: 40 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: `text-4xl md:text-5xl font-black text-center mb-12 ${isDark ? "text-white" : "text-gray-900"}`,
            children: [
              "Tailored Solutions for ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Diverse Industries" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4 mb-20", children: industries$4.map((ind, i) => /* @__PURE__ */ jsx(
          motion.span,
          {
            className: `px-6 py-3 rounded-full text-sm md:text-base border transition-all hover:scale-105
                    ${isDark ? "bg-gray-900 border-red-900/50 hover:border-red-600 text-gray-200" : "bg-gray-100 border-gray-300 hover:border-red-400"}`,
            children: ind
          },
          i
        )) }),
        /* @__PURE__ */ jsxs(
          motion.h2,
          {
            initial: { opacity: 0, y: 40 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: `text-4xl md:text-5xl font-black text-center mb-12 ${isDark ? "text-white" : "text-gray-900"}`,
            children: [
              "Serving Businesses Across Major ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Cities in India" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-6", children: cities.map((city, i) => /* @__PURE__ */ jsx(
          motion.div,
          {
            className: `px-10 py-5 rounded-2xl font-bold text-xl border transition-all hover:border-red-600 hover:scale-105
                    ${isDark ? "bg-gray-900 border-red-900/50" : "bg-white border-gray-200 shadow-sm"}`,
            children: city
          },
          i
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: `py-20 px-4 rounded-3xl mt-8
          ${isDark ? "bg-gray-950 border border-red-900/30" : "bg-white border border-gray-100 shadow-2xl"}`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto text-center", children: [
        /* @__PURE__ */ jsx(
          motion.img,
          {
            src: images$8.team,
            alt: "Experienced mobile app development team at Atlas Knots IT Solution in Bhopal",
            className: "rounded-3xl mx-auto mb-12 shadow-2xl border border-red-900/30 max-w-4xl w-full object-cover",
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ jsx(motion.h2, { className: `text-4xl md:text-6xl font-black mb-10 ${isDark ? "text-white" : "text-gray-900"}`, children: "Ready to Bring Your App Idea to Life?" }),
        /* @__PURE__ */ jsx(motion.p, { className: `text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`, children: "Whether you need a native Android/iOS app or a powerful cross-platform solution, our expert team in Bhopal is ready to deliver a mobile application that exceeds your expectations." }),
        /* @__PURE__ */ jsx(
          motion.button,
          {
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.98 },
            className: "px-14 py-7 bg-gradient-to-r from-red-600 to-red-800 rounded-full text-2xl md:text-3xl font-bold shadow-2xl hover:shadow-red-700/80 transition-all",
            children: "Start Your Project Today →"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: showScrollTop && /* @__PURE__ */ jsx(
      motion.button,
      {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        onClick: scrollToTop,
        className: `fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl transition-all hover:scale-110
              ${isDark ? "bg-red-600 hover:bg-red-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"}`,
        "aria-label": "Scroll to top",
        children: /* @__PURE__ */ jsx(ArrowUp, { size: 26 })
      }
    ) })
  ] });
}
const industury = "/assets/ERPbackground-Bac3fFyn.jpeg";
const images$7 = {
  hero: industury,
  dashboard: "https://images.unsplash.com/photo-1551288049-b01e1b7d0d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  process: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  industry: industury
};
const industries$3 = [
  "Advertising and Media",
  "Construction & Builders",
  "Education",
  "Finance and Insurance",
  "Medical & Healthcare",
  "E-Commerce",
  "Entertainment",
  "Real Estate",
  "Hospitality",
  "Engineering Services",
  "Health and Wellness",
  "Technology",
  "Heating & Cooling",
  "Auto Mechanics",
  "Oil and Gas",
  "Landscaping",
  "Property Management",
  "Business Consulting",
  "Home Renovation",
  "Beauty"
];
const fadeInUp$9 = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const staggerContainer$9 = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};
function ERPDevelopment() {
  const { isDark } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `min-h-screen overflow-hidden transition-colors duration-700 
      ${isDark ? "bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white" : "bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900"}`,
      children: [
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: images$7.hero,
                alt: "ERP software dashboard showing business growth",
                className: "w-full h-full object-cover opacity-25 dark:opacity-30 brightness-50"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `absolute inset-0 bg-gradient-to-t ${isDark ? "from-black via-black/80 to-transparent" : "from-white/90 via-white/80 to-transparent"}`
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: "hidden",
              animate: "visible",
              variants: staggerContainer$9,
              className: "relative z-10 max-w-7xl mx-auto text-center",
              children: [
                /* @__PURE__ */ jsxs(
                  motion.h1,
                  {
                    variants: fadeInUp$9,
                    className: `text-5xl md:text-7xl font-black mb-8 tracking-tight leading-tight ${isDark ? "text-white" : "text-gray-900"}`,
                    children: [
                      "Powerful ERP Solutions That",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600", children: "Streamline, Scale & Succeed" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp$9,
                    className: "text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 mb-6",
                    children: "Drive Business Efficiency With ERP Solutions"
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp$9,
                    className: `text-lg md:text-xl mb-12 max-w-5xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`,
                    children: "Partner with the Leading ERP software development company in India"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    variants: fadeInUp$9,
                    className: "flex flex-col sm:flex-row gap-6 justify-center",
                    children: [
                      /* @__PURE__ */ jsxs("button", { className: "px-12 py-6 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full text-xl md:text-2xl font-bold shadow-2xl shadow-red-900/60 hover:shadow-red-700/80 hover:scale-105 transition-all flex items-center gap-3 group", children: [
                        "Request a Quote",
                        " ",
                        /* @__PURE__ */ jsx(ArrowRight, { className: "w-7 h-7 group-hover:translate-x-2 transition-transform" })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          className: `px-12 py-6 border-2 rounded-full text-xl md:text-2xl font-bold transition-all ${isDark ? "border-red-600/70 text-red-400 hover:bg-red-950/50" : "border-red-600 text-red-600 hover:bg-red-50"}`,
                          children: "Free Consultation →"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/50" : "bg-gray-100"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsx(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-12 ${isDark ? "text-white" : "text-gray-900"}`,
                  children: "Fuel Business Success with Top ERP Software Development Services in India"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8 mb-16", children: ["Be Unique", "Be Scalable", "Be Future-Ready"].map((title, i) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  variants: fadeInUp$9,
                  className: `border border-red-900/40 rounded-2xl p-10 text-center hover:border-red-600/60 hover:shadow-2xl transition-all group ${isDark ? "bg-gradient-to-br from-gray-900 to-black" : "bg-white shadow-md"}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: `text-4xl font-black mb-6 text-red-600 dark:text-red-400 group-hover:text-red-500 transition-colors`,
                        children: title
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "p",
                      {
                        className: `text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`,
                        children: [
                          title === "Be Unique" && "Get ERP solutions tailored precisely to your business workflows",
                          title === "Be Scalable" && "Enable growth with flexible and integrated systems",
                          title === "Be Future-Ready" && "Streamline operations through advanced technologies"
                        ]
                      }
                    )
                  ]
                },
                i
              )) }),
              /* @__PURE__ */ jsxs(
                motion.p,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  className: `text-xl max-w-5xl mx-auto leading-relaxed text-center mb-12 ${isDark ? "text-gray-300" : "text-gray-700"}`,
                  children: [
                    "With years of experience, AI Knots IT Solutions is a full-service ERP software development company in India, delivering intelligent, scalable, and logical enterprise solutions. As a trusted custom ERP software development company, we focus on creating efficient and powerful ERP software that helps businesses automate processes, enhance decision-making, and drive productivity.",
                    /* @__PURE__ */ jsx("br", {}),
                    /* @__PURE__ */ jsx("br", {}),
                    "Whether you are a growing startup or an established enterprise, our expertise in custom ERP software development ensures your system is built around your unique operations. From financials and inventory to HR, CRM, and beyond, we build custom ERP software that unifies your departments and delivers real-time visibility.",
                    /* @__PURE__ */ jsx("br", {}),
                    /* @__PURE__ */ jsx("br", {}),
                    "At AI Knots IT Solutions, a top ERP software development company, we deliver secure, custom ERP software solutions tailored to your business goals and growth."
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  className: "text-center",
                  children: /* @__PURE__ */ jsx("button", { className: "px-14 py-7 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full text-2xl font-bold shadow-2xl shadow-red-900/60 hover:shadow-red-700/80 hover:scale-105 transition-all", children: "Connect with India's Best ERP Software Development Company →" })
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx("section", { className: "py-24 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
          /* @__PURE__ */ jsxs(
            motion.h2,
            {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: `text-4xl md:text-6xl font-black text-center mb-16 ${isDark ? "text-white" : "text-gray-900"}`,
              children: [
                "A Complete Suite of",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-red-600 dark:text-red-500", children: "ERP Software Services" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: `text-xl text-center mb-16 max-w-5xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`,
              children: "We deliver fast, reliable, and high-impact ERP software development services that help businesses streamline operations and drive growth. As a leading ERP software development company, we specialize in custom ERP software tailored to your unique needs."
            }
          ),
          /* @__PURE__ */ jsx(
            motion.img,
            {
              initial: { opacity: 0, scale: 0.95 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              src: images$7.dashboard,
              alt: "Powerful ERP dashboard showing real-time business insights",
              className: "rounded-2xl shadow-2xl border border-red-900/30 dark:border-red-900/30 border-gray-200 mx-auto max-w-4xl w-full object-cover mb-12"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: [
            {
              title: "Custom ERP Software Development",
              desc: "We deliver tailored ERP solutions that streamline operations, built by a trusted ERP software development company in India."
            },
            {
              title: "Enterprise ERP Software",
              desc: "As a custom ERP software development company, we build CRM-integrated ERP systems to streamline enterprise processes and keep all teams connected efficiently."
            },
            {
              title: "ERP Development Consultation",
              desc: "As a custom ERP software development company, we help strategize, design, test, and deploy robust ERP software tailored to your enterprise needs."
            },
            {
              title: "Custom Dashboard Design",
              desc: "Our ERP software development company builds custom ERP software dashboards to ensure comprehensible data, crucial metrics, and smooth access for smarter decisions."
            },
            {
              title: "ERP Data Migration",
              desc: "Our ERP software development company ensures secure, fast ERP data migration across systems with expert support from a custom ERP software development company."
            },
            {
              title: "ERP Application Development",
              desc: "Our ERP software development company builds feature-rich ERP apps to streamline tasks efficiently, powered by a leading custom ERP software development company."
            }
          ].map((service, idx) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 50 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: idx * 0.1 },
              className: `rounded-2xl p-10 transition-all duration-300 ${isDark ? "bg-gray-900/70 backdrop-blur-sm border border-red-900/40 hover:border-red-600/60 hover:shadow-2xl hover:shadow-red-900/30" : "bg-white border border-gray-200 shadow-lg hover:shadow-xl text-gray-900"}`,
              children: [
                /* @__PURE__ */ jsx(
                  "h3",
                  {
                    className: `text-2xl md:text-3xl font-bold mb-6 text-center text-red-600 dark:text-red-500`,
                    children: service.title
                  }
                ),
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    className: `text-lg leading-relaxed text-center ${isDark ? "text-gray-300" : "text-gray-700"}`,
                    children: service.desc
                  }
                )
              ]
            },
            idx
          )) })
        ] }) }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/50" : "bg-gray-100"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-5xl font-black text-center mb-12 ${isDark ? "text-white" : "text-gray-900"}`,
                  children: [
                    "The Process Behind",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-red-600 dark:text-red-500", children: "Smarter Systems" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-xl text-center mb-12 max-w-5xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`,
                  children: "At AI Knots IT Solutions, a leading ERP software development company, we merge proven methodologies with custom frameworks to deliver high-impact ERP solutions. As a custom ERP software development company, our structured approach—from discovery to deployment—ensures seamless, scalable, and secure ERP software development tailored to your unique business needs."
                }
              ),
              /* @__PURE__ */ jsx(
                motion.img,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  src: images$7.process,
                  alt: "ERP software development process workflow",
                  className: "rounded-2xl shadow-2xl border border-red-900/30 dark:border-red-900/30 border-gray-200 mx-auto max-w-4xl w-full object-cover mb-12"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: [
                {
                  step: "01 Client Meeting",
                  desc: "We collect essential insights to deliver ERP software tailored to your needs as a trusted ERP software development company and custom ERP software development company."
                },
                {
                  step: "02 Designing Phase",
                  desc: "In this ERP software development phase, we design system architecture and documentation as a custom ERP software development company and ERP software development company."
                },
                {
                  step: "03 Development Phase",
                  desc: "Our experts begin ERP software development using advanced coding practices, aligning with your goals as a custom ERP software development company and ERP software development company."
                },
                {
                  step: "04 Quality Assurance",
                  desc: "In this ERP software development phase, our custom ERP software development company ensures defect-free delivery, maintaining high standards as a leading ERP software development company."
                },
                {
                  step: "05 Deployment Phase",
                  desc: "After rigorous testing, our ERP software development company ensures smooth deployment of custom ERP software, delivering excellence as a trusted custom ERP software development company."
                },
                {
                  step: "06 Support & Maintenance",
                  desc: "Our ERP software development company ensures optimal performance of custom ERP software through continuous updates, support, and enhancements as a custom ERP software development company."
                }
              ].map((phase, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.15 },
                  className: `border border-red-900/40 rounded-2xl p-8 hover:border-red-600/60 transition-all min-h-[280px] ${isDark ? "bg-gradient-to-br from-gray-900 to-black" : "bg-white shadow-md"}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `text-5xl font-black text-red-600 dark:text-red-500 mb-6`,
                        children: phase.step.split(" ")[0]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: `text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`,
                        children: phase.step.split(" ").slice(1).join(" ")
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        className: `text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`,
                        children: phase.desc
                      }
                    )
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx("section", { className: "py-24 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
          /* @__PURE__ */ jsxs(
            motion.h2,
            {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: `text-4xl md:text-5xl font-black text-center mb-12 ${isDark ? "text-white" : "text-gray-900"}`,
              children: [
                "Industries We Can",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-red-600 dark:text-red-500", children: "Serve" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.img,
            {
              initial: { opacity: 0, scale: 0.95 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              src: images$7.industry,
              alt: "Modern enterprise workspace for ERP solutions",
              className: "rounded-2xl shadow-2xl border border-red-900/30 dark:border-red-900/30 border-gray-200 mx-auto max-w-4xl w-full object-cover mb-12"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4", children: industries$3.map((ind, i) => /* @__PURE__ */ jsx(
            motion.span,
            {
              initial: { opacity: 0, scale: 0.9 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              transition: { delay: i * 0.03 },
              className: `px-6 py-3 border rounded-full text-sm md:text-base transition-all ${isDark ? "bg-gray-900/70 border-red-900/40 text-gray-200 hover:bg-red-900/40 hover:border-red-600/50" : "bg-white border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-300"}`,
              children: ind
            },
            i
          )) })
        ] }) }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/60" : "bg-gray-100"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
              /* @__PURE__ */ jsx(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-5xl font-black text-center mb-16 ${isDark ? "text-white" : "text-gray-900"}`,
                  children: "Frequently Asked Questions – ERP Software Development"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "space-y-8", children: [
                {
                  q: "What is ERP software and why does my business need it?",
                  a: "ERP (Enterprise Resource Planning) software helps businesses manage multiple operations such as finance, HR, inventory, sales, and customer management in one centralized system. AI Knots IT Solutions develops custom ERP solutions that automate processes, reduce manual work, and improve decision-making with real-time data."
                },
                {
                  q: "What industries can benefit from ERP software developed by AI Knots IT Solutions?",
                  a: "ERP software developed by AI Knots IT Solutions can benefit many industries including education, healthcare, manufacturing, real estate, finance, retail, and e-commerce. Our custom ERP systems are designed according to the unique workflow and requirements of each industry."
                },
                {
                  q: "How much does custom ERP software development cost?",
                  a: "The cost of ERP software development depends on features, integrations, and business requirements. A simple ERP system may cost less, while enterprise-level ERP solutions require more development time. AI Knots IT Solutions offers flexible and transparent pricing with no hidden costs."
                },
                {
                  q: "How long does it take to develop ERP software?",
                  a: "ERP development timelines depend on the project complexity and features required. Basic ERP solutions can take a few weeks, while advanced enterprise ERP systems may take several months. AI Knots IT Solutions follows a structured development process to ensure timely delivery and high-quality results."
                },
                {
                  q: "Does AI Knots IT Solutions provide ERP maintenance and support?",
                  a: "Yes. AI Knots IT Solutions provides ongoing ERP support, maintenance, updates, and system optimization after deployment. This ensures your ERP system remains secure, scalable, and aligned with your growing business needs."
                }
              ].map((faq, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: `border border-red-900/40 rounded-2xl p-8 hover:border-red-600/60 transition-all ${isDark ? "bg-gray-900/70" : "bg-white shadow"}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: `text-2xl font-bold mb-4 text-red-600 dark:text-red-500`,
                        children: faq.q
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        className: `text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`,
                        children: faq.a
                      }
                    )
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: scrollToTop,
            className: `fixed bottom-6 right-6 z-50 p-4 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/50 transition-all duration-300 hover:scale-110 active:scale-95 ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"}`,
            "aria-label": "Scroll back to top",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-6 h-6",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                xmlns: "http://www.w3.org/2000/svg",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 10l7-7m0 0l7 7m-7-7v18"
                  }
                )
              }
            )
          }
        )
      ]
    }
  );
}
const images$6 = {
  hero: "https://images.unsplash.com/photo-1556740714-a8395b3a74dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  projects: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
};
const fadeInUp$8 = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const staggerContainer$8 = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};
const modules = [
  {
    icon: Users,
    title: "User Management",
    desc: "Manage users, roles, activities, and transactions securely."
  },
  {
    icon: Search,
    title: "Front End Search",
    desc: "Smart, fast product search to boost user experience & conversions."
  },
  {
    icon: Filter,
    title: "Product Filters",
    desc: "Advanced filtering by category, brand, price — SEO friendly."
  },
  {
    icon: CreditCard,
    title: "Payment Gateway",
    desc: "Secure, encrypted integrations for smooth transactions."
  },
  {
    icon: Percent,
    title: "Discount Coupons",
    desc: "Attract new buyers and encourage repeat purchases."
  },
  {
    icon: Heart,
    title: "Wishlist",
    desc: "Save products for later — improves retention."
  },
  {
    icon: ShoppingCart,
    title: "Shopping Cart",
    desc: "Seamless cart & checkout experience."
  },
  {
    icon: Bell,
    title: "Email/SMS Notifications",
    desc: "Automated updates, offers, and order alerts."
  },
  {
    icon: FileText,
    title: "Billing & Reporting",
    desc: "Accurate invoices, subscriptions, and reports."
  },
  {
    icon: Package,
    title: "Inventory Management",
    desc: "Real-time stock tracking & low-stock alerts."
  },
  {
    icon: Star,
    title: "User Comments & Ratings",
    desc: "Build trust with reviews and social proof."
  },
  {
    icon: Mail,
    title: "Newsletters",
    desc: "Engage customers with updates and personalized offers."
  }
];
const platforms$1 = [
  {
    icon: Monitor,
    title: "Web Application",
    desc: "Smooth communication between customers, sellers, and admin — with support features."
  },
  {
    icon: Smartphone,
    title: "Android Application",
    desc: "Boost visibility, engagement, promotions, and in-app revenue."
  },
  {
    icon: Apple,
    title: "iOS Application",
    desc: "Premium UX, top security, and intuitive interface for loyal users."
  }
];
const faqs$5 = [
  {
    q: "What services does Atlas Knots IT Solutions provide?",
    a: "We offer software development, website development, mobile apps, and full digital marketing (SEO, SEM, SMM, content)."
  },
  {
    q: "Is there any other brand owned by Atlas Knots IT Solutions?",
    a: "No, we operate as a single focused brand delivering quality IT services."
  },
  {
    q: "Where is the company situated?",
    a: "Atlas Knots IT Solutions is based in India. Contact us for full details."
  },
  {
    q: "Where do you provide services?",
    a: "Globally — we serve clients across industries worldwide."
  },
  {
    q: "How to make payments?",
    a: "Via NEFT/IMPS or cheque. Details shared during project onboarding."
  },
  {
    q: "When was Atlas Knots IT Solutions established?",
    a: "[Add your actual year here]"
  },
  {
    q: "What is the advance payment percentage?",
    a: "Minimum 40% of project cost (may vary based on scope)."
  },
  {
    q: "Who are the founders?",
    a: "[Add real founder names/details here for trust]"
  }
];
function EcommerceDevelopment() {
  const { isDark } = useTheme();
  const [openFaq, setOpenFaq] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `relative overflow-hidden ${isDark ? "bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white" : "bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900"}`,
      children: [
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: images$6.hero,
                alt: "Modern ecommerce dashboard",
                className: "w-full h-full object-cover opacity-30 brightness-50",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `absolute inset-0 ${isDark ? "bg-gradient-to-t from-black via-black/80 to-transparent" : "bg-gradient-to-t from-white via-white/80 to-transparent"}`
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: "hidden",
              animate: "visible",
              variants: staggerContainer$8,
              className: "relative z-10 max-w-7xl mx-auto text-center",
              children: [
                /* @__PURE__ */ jsxs(
                  motion.h1,
                  {
                    variants: fadeInUp$8,
                    className: "text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight",
                    children: [
                      "Build High-Converting",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600", children: "E-Commerce Stores" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp$8,
                    className: "text-2xl md:text-4xl font-bold text-red-400 mb-8",
                    children: "Don't Settle for Average — Convert Visitors to Customers"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.p,
                  {
                    variants: fadeInUp$8,
                    className: `text-lg md:text-xl mb-12 max-w-4xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`,
                    children: [
                      "At",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "text-red-400 font-semibold", children: "Atlas Knots IT Solutions" }),
                      ", we craft fast, secure, scalable, and fully customized eCommerce websites & software that drive real sales growth."
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.ul,
                  {
                    variants: fadeInUp$8,
                    className: "flex flex-wrap justify-center gap-6 mb-12 text-lg",
                    children: [
                      "Conversion-driven design",
                      "Advanced integrations",
                      "Omnichannel experience",
                      "100% customized"
                    ].map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(CheckCircle2, { className: "w-6 h-6 text-red-500" }),
                      " ",
                      item
                    ] }, item))
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    variants: fadeInUp$8,
                    className: "flex flex-col sm:flex-row gap-6 justify-center",
                    children: [
                      /* @__PURE__ */ jsxs("button", { className: "px-12 py-6 bg-gradient-to-r from-red-600 to-red-800 rounded-full text-xl md:text-2xl font-bold shadow-2xl shadow-red-900/60 hover:shadow-red-700/80 hover:scale-105 transition-all flex items-center gap-3 group", children: [
                        "Get Free Quote",
                        " ",
                        /* @__PURE__ */ jsx(ArrowRight, { className: "w-7 h-7 group-hover:translate-x-2 transition-transform" })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          className: `px-12 py-6 border-2 rounded-full text-xl md:text-2xl font-bold transition-all ${isDark ? "border-red-600/70 text-red-400 hover:bg-red-950/50" : "border-red-600 text-red-600 hover:bg-red-50"}`,
                          children: "Free Consultation"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/50" : "bg-white/50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: staggerContainer$8,
                  className: "text-center mb-16",
                  children: [
                    /* @__PURE__ */ jsxs(
                      motion.h2,
                      {
                        variants: fadeInUp$8,
                        className: "text-4xl md:text-6xl font-black mb-6",
                        children: [
                          "Seamless Experience Across",
                          " ",
                          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "All Platforms" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      motion.p,
                      {
                        variants: fadeInUp$8,
                        className: `text-xl md:text-2xl max-w-4xl mx-auto ${isDark ? "text-gray-300" : "text-gray-700"}`,
                        children: "Give your customers the same powerful shopping experience — web, Android, or iOS."
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: platforms$1.map((plat, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  variants: fadeInUp$8,
                  className: `rounded-2xl p-10 text-center hover:border-red-600/60 hover:shadow-2xl transition-all group ${isDark ? "bg-gradient-to-br from-gray-900 to-black border border-red-900/40 hover:shadow-red-900/30" : "bg-white border border-gray-200 hover:shadow-red-200/30 shadow-md"}`,
                  children: [
                    /* @__PURE__ */ jsx(plat.icon, { className: "w-16 h-16 text-red-500 mb-6 mx-auto group-hover:scale-110 transition-transform" }),
                    /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black mb-4", children: plat.title }),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        className: `text-lg ${isDark ? "text-gray-300" : "text-gray-700"}`,
                        children: plat.desc
                      }
                    )
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx("section", { className: "py-24 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
          /* @__PURE__ */ jsxs(
            motion.h2,
            {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-4xl md:text-6xl font-black text-center mb-12",
              children: [
                "Powerful ",
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "E-Commerce Modules" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8", children: modules.map((mod, idx) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 50 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: idx * 0.05 },
              className: `backdrop-blur-sm rounded-2xl p-8 hover:border-red-600/60 hover:shadow-2xl transition-all group flex flex-col items-center text-center ${isDark ? "bg-gray-900/70 border border-red-900/40 hover:shadow-red-900/30" : "bg-white border border-gray-200 hover:shadow-red-200/30 shadow-md"}`,
              children: [
                /* @__PURE__ */ jsx(mod.icon, { className: "w-12 h-12 text-red-500 mb-6 group-hover:scale-110 transition-transform" }),
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4", children: mod.title }),
                /* @__PURE__ */ jsx("p", { className: isDark ? "text-gray-300" : "text-gray-700", children: mod.desc })
              ]
            },
            idx
          )) })
        ] }) }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gradient-to-b from-black to-gray-950" : "bg-gradient-to-b from-white to-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto text-center", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: "text-4xl md:text-6xl font-black mb-8",
                  children: [
                    "Our Recent ",
                    /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "E-Commerce Projects" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-xl mb-12 max-w-4xl mx-auto ${isDark ? "text-gray-300" : "text-gray-700"}`,
                  children: "Real results for real businesses — fully custom stores that drive sales."
                }
              ),
              /* @__PURE__ */ jsx(
                motion.img,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  src: images$6.projects,
                  alt: "Ecommerce project showcase",
                  className: `rounded-2xl shadow-2xl mx-auto max-w-5xl w-full object-cover ${isDark ? "border border-red-900/30" : "border border-gray-200"}`,
                  loading: "lazy"
                }
              ),
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: `mt-6 text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`,
                  children: "(Replace with your actual project screenshots/carousel)"
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx("section", { className: "py-24 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxs(
            motion.h2,
            {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-4xl md:text-6xl font-black text-center mb-16",
              children: [
                "Frequently Asked ",
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Questions" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: faqs$5.map((faq, idx) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: idx * 0.1 },
              className: `rounded-xl overflow-hidden ${isDark ? "border border-red-900/40" : "border border-gray-200"}`,
              children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setOpenFaq(openFaq === idx ? null : idx),
                    className: `w-full px-8 py-6 text-left flex justify-between items-center transition-colors ${isDark ? "bg-gray-900/50 hover:bg-gray-800/50" : "bg-gray-100 hover:bg-gray-200"}`,
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold", children: faq.q }),
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: `text-red-500 transition-transform ${openFaq === idx ? "rotate-180" : ""}`,
                          children: "▼"
                        }
                      )
                    ]
                  }
                ),
                openFaq === idx && /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { height: 0 },
                    animate: { height: "auto" },
                    exit: { height: 0 },
                    className: `px-8 pb-6 ${isDark ? "text-gray-300" : "text-gray-700"}`,
                    children: faq.a
                  }
                )
              ]
            },
            idx
          )) })
        ] }) }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/70" : "bg-white/70"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto text-center", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  variants: fadeInUp$8,
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  className: "text-4xl md:text-6xl font-black mb-8",
                  children: [
                    "Ready to Launch Your",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "High-Performing" }),
                    " E-Commerce Store?"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  variants: fadeInUp$8,
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  className: `text-xl md:text-2xl mb-12 ${isDark ? "text-gray-300" : "text-gray-700"}`,
                  children: "Get free expert consultancy — let's build a store that turns visitors into loyal customers."
                }
              ),
              /* @__PURE__ */ jsx(
                motion.button,
                {
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.98 },
                  className: "px-14 py-7 bg-gradient-to-r from-red-600 to-red-800 rounded-full text-2xl md:text-3xl font-black shadow-2xl shadow-red-900/60 hover:shadow-red-700/80 transition-all",
                  children: "Get Started Today →"
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: scrollToTop,
            className: `fixed bottom-6 right-6 z-50 p-4 rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ${isDark ? "bg-red-600 hover:bg-red-700 shadow-red-900/50" : "bg-red-500 hover:bg-red-600 shadow-red-400/50"} ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"}`,
            "aria-label": "Scroll back to top",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-6 h-6",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                xmlns: "http://www.w3.org/2000/svg",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 10l7-7m0 0l7 7m-7-7v18"
                  }
                )
              }
            )
          }
        )
      ]
    }
  );
}
const images$5 = {
  hero: "https://squaredup.com/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fz7wg6mcy%2Fproduction-2025%2F9c2a4a40652ca902db2014a6691f5cd810b9a050-1080x588.png%3Fq%3D100%26fit%3Dmax%26auto%3Dformat&w=3840&q=75",
  migration: "https://www.nsight-inc.com/wp-content/uploads/2023/11/iStock-1239864853-min.jpg",
  k8s: "https://miro.medium.com/1*N2TmMYRqfCcHrYErZJ9JNA.png"
};
const fadeInUp$7 = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };
const staggerContainer$7 = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
const cloudTypes = [
  { icon: Server, title: "Private Cloud", desc: "Fully dedicated environment with complete control, maximum security, and tailored scalability for sensitive workloads.", cta: "Get Started" },
  { icon: Cloud, title: "Enterprise Cloud", desc: "Cost-optimized, high-performance cloud for growing businesses — reliable, flexible, and ready to scale.", cta: "Get Started" },
  { icon: ShieldCheck, title: "BFSI Cloud Solutions", desc: "Banking-grade security, compliance, encryption, and disaster recovery built for financial institutions.", cta: "Get Started" },
  { icon: Globe, title: "Government Cloud", desc: "Compliant, secure infrastructure designed for government digital transformation and public sector needs.", cta: "Get Started" },
  { icon: Cpu, title: "SAP HANA Cloud Solutions", desc: "High-performance real-time analytics, data processing, and decision-making in the cloud.", cta: "Get Started" }
];
const capabilities = [
  { icon: ShieldCheck, title: "Advanced Security & Compliance", desc: "Enterprise-grade protection and regulatory adherence." },
  { icon: HardDrive, title: "Flexible Storage Solutions", desc: "Block, file, object — whatever your needs." },
  { icon: Cpu, title: "Virtual Machines & Compute", desc: "On-demand high-performance computing." },
  { icon: Zap, title: "Serverless Computing", desc: "Pay only for actual usage." },
  { icon: Globe, title: "CDN & Media Services", desc: "Ultra-fast global content delivery." },
  { icon: Database, title: "Database Management", desc: "Optimized storage and querying." },
  { icon: BarChart3, title: "Data Lake & Analytics", desc: "Turn raw data into actionable insights." },
  { icon: Code, title: "DevOps Support", desc: "Automated workflows and faster deployments." },
  { icon: Container, title: "Kubernetes Services", desc: "Container orchestration and auto-scaling." },
  { icon: Lock, title: "Business Continuity & DR", desc: "Zero-downtime recovery plans." }
];
function CloudSolutions() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white dark:bg-gradient-to-b dark:from-gray-950 dark:via-black dark:to-gray-950 text-gray-900 dark:text-white transition-colors duration-500 overflow-hidden", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: images$5.hero,
            alt: "Modern cloud dashboard",
            className: "w-full h-full object-cover opacity-20 dark:opacity-30 brightness-75 dark:brightness-50",
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent dark:from-black dark:via-black/80" })
      ] }),
      /* @__PURE__ */ jsxs(motion.div, { initial: "hidden", animate: "visible", variants: staggerContainer$7, className: "relative z-10 max-w-7xl mx-auto text-center", children: [
        /* @__PURE__ */ jsxs(motion.h1, { variants: fadeInUp$7, className: "text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight", children: [
          "Empowering Indian Businesses with",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700", children: "Smart Cloud Solutions" })
        ] }),
        /* @__PURE__ */ jsx(motion.p, { variants: fadeInUp$7, className: "text-2xl md:text-4xl font-bold text-red-600 dark:text-red-400 mb-8", children: "Scale Securely, Save Costs, Grow Limitlessly" }),
        /* @__PURE__ */ jsxs(motion.p, { variants: fadeInUp$7, className: "text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed", children: [
          "At ",
          /* @__PURE__ */ jsx("span", { className: "text-red-600 dark:text-red-400 font-semibold", children: "Atlas Knots IT Solutions" }),
          ", we deliver fast, secure, and scalable cloud infrastructure tailored for Indian startups, enterprises, and regulated sectors."
        ] }),
        /* @__PURE__ */ jsx(motion.ul, { variants: fadeInUp$7, className: "flex flex-wrap justify-center gap-6 mb-12 text-lg", children: ["Advanced data protection", "Pay-as-you-go savings", "Seamless scaling", "Full compliance support"].map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "w-6 h-6 text-red-600 dark:text-red-500" }),
          " ",
          item
        ] }, item)) }),
        /* @__PURE__ */ jsxs(motion.div, { variants: fadeInUp$7, className: "flex flex-col sm:flex-row gap-6 justify-center", children: [
          /* @__PURE__ */ jsxs("button", { className: "px-12 py-6 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-xl md:text-2xl font-bold shadow-2xl shadow-red-900/50 hover:shadow-red-800 hover:scale-105 transition-all flex items-center gap-3 group", children: [
            "Get Free Assessment ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-7 h-7 group-hover:translate-x-2 transition-transform" })
          ] }),
          /* @__PURE__ */ jsx("button", { className: "px-12 py-6 border-2 border-red-600 text-red-600 dark:border-red-500 dark:text-red-400 rounded-full text-xl md:text-2xl font-bold hover:bg-red-50 dark:hover:bg-red-950/50 transition-all", children: "Free Consultation" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black/50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs(motion.div, { initial: "hidden", whileInView: "visible", viewport: { once: true }, variants: staggerContainer$7, className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs(motion.h2, { variants: fadeInUp$7, className: "text-4xl md:text-6xl font-black mb-6", children: [
          "Why Your Business Needs ",
          /* @__PURE__ */ jsx("span", { className: "text-red-600 dark:text-red-500", children: "Reliable Cloud" }),
          " Today"
        ] }),
        /* @__PURE__ */ jsx(motion.p, { variants: fadeInUp$7, className: "text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto", children: "Move beyond outdated hardware — embrace secure, scalable, cost-efficient cloud that grows with you." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: [
        { icon: Lock, title: "Advanced Security", desc: "Protect data with encryption, firewalls, and compliance." },
        { icon: Server, title: "No More Expensive Hardware", desc: "Eliminate on-prem maintenance costs." },
        { icon: Scale, title: "Instant Scalability", desc: "Scale resources up/down in minutes." },
        { icon: Globe, title: "Global Compliance", desc: "Meet Indian & international data regulations." },
        { icon: BarChart3, title: "Pay-as-You-Use", desc: "Optimize spending with usage-based pricing." }
      ].map((benefit, idx) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          variants: fadeInUp$7,
          className: "bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-red-900/40 rounded-2xl p-10 hover:border-red-600 dark:hover:border-red-600 hover:shadow-2xl transition-all group",
          children: [
            /* @__PURE__ */ jsx(benefit.icon, { className: "w-16 h-16 text-red-600 dark:text-red-500 mb-6 mx-auto group-hover:scale-110 transition-transform" }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4 text-center", children: benefit.title }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 text-center", children: benefit.desc })
          ]
        },
        idx
      )) }),
      /* @__PURE__ */ jsx(
        motion.img,
        {
          initial: { opacity: 0, scale: 0.95 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          src: images$5.migration,
          alt: "Cloud migration visualization",
          className: "rounded-2xl shadow-2xl border border-gray-200 dark:border-red-900/30 mx-auto mt-16 max-w-4xl w-full object-cover",
          loading: "lazy"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-transparent", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs(motion.h2, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-4xl md:text-6xl font-black text-center mb-16", children: [
        "Cloud Solutions ",
        /* @__PURE__ */ jsx("span", { className: "text-red-600 dark:text-red-500", children: "Tailored for You" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: cloudTypes.map((type, idx) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 50 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: idx * 0.1 },
          className: "bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-black border border-gray-200 dark:border-red-900/40 rounded-2xl p-10 hover:border-red-600 dark:hover:border-red-600 hover:shadow-2xl transition-all group text-center",
          children: [
            /* @__PURE__ */ jsx(type.icon, { className: "w-16 h-16 text-red-600 dark:text-red-500 mb-6 mx-auto group-hover:scale-110 transition-transform" }),
            /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black mb-4", children: type.title }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 dark:text-gray-300 mb-8", children: type.desc }),
            /* @__PURE__ */ jsxs("button", { className: "px-8 py-4 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all", children: [
              type.cta,
              " →"
            ] })
          ]
        },
        idx
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gradient-to-b dark:from-black dark:to-gray-950", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs(motion.h2, { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-4xl md:text-6xl font-black text-center mb-12", children: [
        "Enterprise-Grade ",
        /* @__PURE__ */ jsx("span", { className: "text-red-600 dark:text-red-500", children: "Cloud Capabilities" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8", children: capabilities.map((cap, idx) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          variants: fadeInUp$7,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true },
          className: "bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-red-900/40 rounded-2xl p-8 hover:border-red-600 dark:hover:border-red-600 hover:shadow-2xl transition-all group flex flex-col items-center text-center",
          children: [
            /* @__PURE__ */ jsx(cap.icon, { className: "w-12 h-12 text-red-600 dark:text-red-500 mb-6 group-hover:scale-110 transition-transform" }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-3", children: cap.title }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300", children: cap.desc })
          ]
        },
        idx
      )) }),
      /* @__PURE__ */ jsxs(motion.div, { initial: "hidden", whileInView: "visible", viewport: { once: true }, variants: staggerContainer$7, className: "mt-16 grid md:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsx(motion.img, { variants: fadeInUp$7, src: images$5.k8s, alt: "Kubernetes dashboard", className: "rounded-2xl shadow-2xl border border-gray-200 dark:border-red-900/30 w-full", loading: "lazy" }),
        /* @__PURE__ */ jsxs(motion.div, { variants: fadeInUp$7, children: [
          /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black mb-6", children: "Kubernetes-Powered Scaling" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 dark:text-gray-300 leading-relaxed", children: "Orchestrate containers effortlessly, auto-scale workloads, and deploy faster with our managed Kubernetes services — perfect for modern, cloud-native applications." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black/70", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxs(motion.h2, { variants: fadeInUp$7, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "text-4xl md:text-6xl font-black mb-8", children: [
        "Ready to Transform Your Business with ",
        /* @__PURE__ */ jsx("span", { className: "text-red-600 dark:text-red-500", children: "Smart Cloud" }),
        "?"
      ] }),
      /* @__PURE__ */ jsx(motion.p, { variants: fadeInUp$7, className: "text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12", children: "Secure migration, optimized costs, unbreakable security — let's build your future-ready cloud infrastructure today." }),
      /* @__PURE__ */ jsx(
        motion.button,
        {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.98 },
          className: "px-14 py-7 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-2xl md:text-3xl font-black shadow-2xl shadow-red-900/60 hover:shadow-red-800 transition-all",
          children: "Start Your Cloud Journey →"
        }
      )
    ] }) })
  ] });
}
const aws = "/assets/aws-BRH_8aqU.jpeg";
const images$4 = {
  hero: aws,
  neural: "https://content.presentermedia.com/files/clipart/00031000/31269/neural_network_visualization_800_wht.jpg",
  analytics: "https://thumbs.dreamstime.com/b/futuristic-digital-interface-displaying-central-wave-graph-surrounding-data-visualizations-charts-feature-red-blue-391300624.jpg"
};
const fadeInUp$6 = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const staggerContainer$6 = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};
const services$3 = [
  {
    icon: Zap,
    title: "AI-Based Automation",
    desc: "We help automate daily business operations such as customer support, data entry, and workflows, saving time and cost."
  },
  {
    icon: LineChart,
    title: "Predictive Analytics",
    desc: "Using machine learning models, we analyze past data to predict future outcomes like sales trends, customer actions, and market demand."
  },
  {
    icon: MessageSquare,
    title: "Chatbot Development",
    desc: "We build smart AI chatbots that handle customer queries, provide instant responses, and improve user engagement."
  },
  {
    icon: Database,
    title: "Data Analysis & Insights",
    desc: "We process large volumes of data to generate meaningful insights that help businesses make informed decisions."
  },
  {
    icon: Sparkles,
    title: "Recommendation Systems",
    desc: "We create intelligent systems that suggest products or services based on user behavior, improving sales and customer experience."
  },
  {
    icon: Brain,
    title: "Image & Speech Recognition",
    desc: "Our AI solutions can recognize images, voice, and patterns for advanced applications like security, automation, and customer interaction."
  }
];
const keyFeatures = [
  "Data-driven decision making",
  "Scalable and flexible solutions",
  "Easy integration with existing systems",
  "Real-time data processing",
  "Secure and reliable architecture"
];
const industries$2 = [
  {
    icon: Hospital,
    title: "Healthcare",
    desc: "Patient prediction, diagnostics support, personalized care."
  },
  {
    icon: ShoppingCart,
    title: "Retail & E-commerce",
    desc: "Demand forecasting, recommendations, inventory optimization."
  },
  {
    icon: Landmark,
    title: "Finance",
    desc: "Fraud detection, risk assessment, algorithmic trading."
  },
  {
    icon: GraduationCap,
    title: "Education",
    desc: "Adaptive learning, student performance prediction."
  },
  {
    icon: Home$1,
    title: "Real Estate",
    desc: "Property valuation, buyer matching, market trend analysis."
  },
  {
    icon: Users,
    title: "Startups & Small Businesses",
    desc: "Affordable AI tools for growth and efficiency."
  }
];
const useCases = [
  { icon: Users, title: "Customer behavior analysis" },
  { icon: TrendingUp, title: "Sales forecasting" },
  { icon: ShieldAlert, title: "Fraud detection" },
  { icon: Zap, title: "Process automation" },
  { icon: Megaphone, title: "Personalized marketing" },
  { icon: Headphones, title: "Smart chat support" }
];
const faqs$4 = [
  {
    q: "What are AI & Machine Learning services?",
    a: "These services help businesses use data and automation to improve operations, make better decisions, and increase efficiency."
  },
  {
    q: "How can AI help my business?",
    a: "AI helps in reducing manual work, improving customer experience, and increasing accuracy in decision-making."
  },
  {
    q: "Do I need technical knowledge to use AI solutions?",
    a: "No, we provide user-friendly solutions that are easy to use for non-technical users as well."
  },
  {
    q: "How long does it take to implement AI solutions?",
    a: "It depends on the project, but basic solutions can be implemented within a few weeks."
  },
  {
    q: "Are AI solutions expensive?",
    a: "We offer cost-effective solutions based on your business needs and budget."
  }
];
function AIServices() {
  const { isDark } = useTheme();
  const [openFaq, setOpenFaq] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const t = {
    bg: isDark ? "bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white" : "bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900",
    sectionBg: isDark ? "bg-black/40" : "bg-gray-100/80",
    sectionBg2: isDark ? "bg-black/50" : "bg-gray-200/60",
    sectionBg3: isDark ? "bg-gradient-to-r from-gray-950 to-black" : "bg-gradient-to-r from-gray-100 to-white",
    sectionBg4: isDark ? "bg-gradient-to-b from-black to-gray-950" : "bg-gradient-to-b from-white to-gray-100",
    sectionBg5: isDark ? "bg-black/70" : "bg-gray-100",
    card: isDark ? "bg-gray-900/70 backdrop-blur-sm border border-red-900/40 hover:border-red-600/60 hover:shadow-red-900/30" : "bg-white border border-red-200 hover:border-red-400 hover:shadow-red-100/60 shadow-sm",
    cardGrad: isDark ? "bg-gradient-to-br from-gray-900 to-black border border-red-900/40 hover:border-red-600/60 hover:shadow-red-900/30" : "bg-gradient-to-br from-white to-gray-50 border border-red-200 hover:border-red-400 hover:shadow-red-100",
    faqCard: isDark ? "border border-red-900/40 bg-gray-900/30" : "border border-red-200 bg-white shadow-sm",
    faqHover: isDark ? "hover:bg-gray-800/50" : "hover:bg-red-50/60",
    text: isDark ? "text-gray-300" : "text-gray-600",
    featureCard: isDark ? "bg-gray-900/60 border border-red-900/30" : "bg-white border border-red-200 shadow-sm",
    useCase: isDark ? "bg-gray-900/70 border border-red-900/40 hover:border-red-600/60" : "bg-white border border-red-200 hover:border-red-400 shadow-sm"
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `relative ${t.bg} overflow-hidden transition-colors duration-300`,
      children: [
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: images$4.hero,
                alt: "Futuristic AI Dashboard",
                className: `w-full h-full object-cover ${isDark ? "opacity-30 brightness-50" : "opacity-15 brightness-75"}`,
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `absolute inset-0 ${isDark ? "bg-gradient-to-t from-black via-black/80 to-transparent" : "bg-gradient-to-t from-white via-white/85 to-transparent"}`
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: "hidden",
              animate: "visible",
              variants: staggerContainer$6,
              className: "relative z-10 max-w-7xl mx-auto text-center",
              children: [
                /* @__PURE__ */ jsxs(
                  motion.h1,
                  {
                    variants: fadeInUp$6,
                    className: "text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight",
                    children: [
                      "AI & Machine Learning Services in",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600", children: "Bhopal" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp$6,
                    className: "text-2xl md:text-4xl font-bold text-red-500 mb-8",
                    children: "Turn Data into Decisions — Automate, Predict, Win"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.p,
                  {
                    variants: fadeInUp$6,
                    className: `text-lg md:text-xl ${t.text} mb-12 max-w-4xl mx-auto leading-relaxed`,
                    children: [
                      "At",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "text-red-500 font-semibold", children: "AI Knots IT Solutions" }),
                      ", we provide advanced AI & Machine Learning Services that help businesses automate processes, analyze data, and make smarter decisions. In today's fast-growing digital world, using AI is no longer optional — it's essential for staying ahead of the competition."
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.ul,
                  {
                    variants: fadeInUp$6,
                    className: "flex flex-wrap justify-center gap-6 mb-12 text-lg",
                    children: [
                      "Understand customer behavior",
                      "Predict future trends",
                      "Automate repetitive tasks",
                      "Improve decision-making",
                      "Deliver personalized user experiences"
                    ].map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(CheckCircle2, { className: "w-6 h-6 text-red-500" }),
                      " ",
                      item
                    ] }, item))
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    variants: fadeInUp$6,
                    className: "flex flex-col sm:flex-row gap-6 justify-center",
                    children: [
                      /* @__PURE__ */ jsxs("button", { className: "px-12 py-6 bg-gradient-to-r from-red-600 to-red-800 rounded-full text-xl md:text-2xl font-bold shadow-2xl shadow-red-900/60 hover:shadow-red-700/80 hover:scale-105 transition-all flex items-center gap-3 group text-white", children: [
                        "Get Free AI Consultation",
                        /* @__PURE__ */ jsx(ArrowRight, { className: "w-7 h-7 group-hover:translate-x-2 transition-transform" })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          className: `px-12 py-6 border-2 border-red-500 text-red-500 rounded-full text-xl md:text-2xl font-bold transition-all ${isDark ? "hover:bg-red-950/50" : "hover:bg-red-50"}`,
                          children: "Discuss Your Project"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-20 px-4 sm:px-6 lg:px-8 ${t.sectionBg} transition-colors duration-300`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto text-center", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: "text-4xl md:text-6xl font-black mb-10",
                  children: [
                    "What is ",
                    /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "AI & Machine Learning" }),
                    " ",
                    "in Business?"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.p,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-xl ${t.text} max-w-5xl mx-auto leading-relaxed`,
                  children: [
                    "Artificial Intelligence (AI) and Machine Learning (ML) are technologies that allow systems to learn from data and improve over time without manual effort.",
                    /* @__PURE__ */ jsx("br", {}),
                    /* @__PURE__ */ jsx("br", {}),
                    "We help businesses turn their data into powerful insights using AI-driven solutions that improve efficiency, reduce manual work, and increase overall performance."
                  ]
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx("section", { className: "py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
          /* @__PURE__ */ jsxs(
            motion.h2,
            {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-4xl md:text-6xl font-black text-center mb-16",
              children: [
                "Our ",
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "AI & ML Services" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              variants: staggerContainer$6,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8",
              children: services$3.map((service, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  variants: fadeInUp$6,
                  className: `${t.card} rounded-2xl p-8 md:p-10 hover:shadow-2xl transition-all group flex flex-col items-center text-center min-h-[260px]`,
                  children: [
                    /* @__PURE__ */ jsx(service.icon, { className: "w-14 h-14 md:w-16 md:h-16 text-red-500 mb-6 group-hover:scale-110 transition-transform" }),
                    /* @__PURE__ */ jsx("h3", { className: "text-xl md:text-2xl font-bold mb-4", children: service.title }),
                    /* @__PURE__ */ jsx("p", { className: `${t.text} text-base`, children: service.desc })
                  ]
                },
                idx
              ))
            }
          ),
          /* @__PURE__ */ jsx(
            motion.img,
            {
              initial: { opacity: 0, scale: 0.95 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              src: images$4.analytics,
              alt: "Predictive Analytics Dashboard",
              className: `rounded-2xl shadow-2xl border ${isDark ? "border-red-900/30" : "border-red-200"} mx-auto mt-16 max-w-4xl w-full object-cover`,
              loading: "lazy"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-20 px-4 sm:px-6 lg:px-8 ${t.sectionBg3} transition-colors duration-300`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsx(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: "text-4xl md:text-5xl font-black text-center mb-12",
                  children: "Key Features of Our AI & ML Solutions"
                }
              ),
              /* @__PURE__ */ jsx(
                motion.ul,
                {
                  variants: staggerContainer$6,
                  initial: "hidden",
                  whileInView: "visible",
                  className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto",
                  children: keyFeatures.map((feature, idx) => /* @__PURE__ */ jsxs(
                    motion.li,
                    {
                      variants: fadeInUp$6,
                      className: `${t.featureCard} rounded-xl p-6 text-center text-lg font-medium flex items-center justify-center gap-3`,
                      children: [
                        /* @__PURE__ */ jsx(CheckCircle2, { className: "w-6 h-6 text-red-500 flex-shrink-0" }),
                        feature
                      ]
                    },
                    idx
                  ))
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${t.sectionBg2} transition-colors duration-300`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center", children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: staggerContainer$6,
                  children: [
                    /* @__PURE__ */ jsxs(
                      motion.h2,
                      {
                        variants: fadeInUp$6,
                        className: "text-4xl md:text-6xl font-black mb-8",
                        children: [
                          "Why Choose",
                          " ",
                          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "AI Knots IT Solutions" }),
                          "?"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(motion.p, { variants: fadeInUp$6, className: `text-xl ${t.text} mb-8`, children: "AI Knots IT Solutions is a trusted provider of AI & Machine Learning Services in Bhopal, focused on delivering practical and result-oriented solutions. We don't just build technology, we build solutions that solve real business problems." }),
                    /* @__PURE__ */ jsx(motion.ul, { variants: fadeInUp$6, className: "space-y-4 text-lg", children: [
                      "Customized AI solutions for your business",
                      "Experienced development team",
                      "Latest tools and technologies",
                      "Affordable pricing",
                      "Focus on real business outcomes"
                    ].map((point) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsx(CheckCircle2, { className: "w-6 h-6 text-red-500 flex-shrink-0" }),
                      point
                    ] }, point)) })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.img,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  src: images$4.neural,
                  alt: "Neural Network Visualization",
                  className: `rounded-2xl shadow-2xl border ${isDark ? "border-red-900/30" : "border-red-200"} w-full`,
                  loading: "lazy"
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx("section", { className: "py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
          /* @__PURE__ */ jsx(
            motion.h2,
            {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-4xl md:text-6xl font-black text-center mb-16",
              children: "Industries We Serve"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: industries$2.map((ind, idx) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 50 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: idx * 0.08 },
              className: `${t.cardGrad} rounded-2xl p-10 hover:shadow-2xl transition-all group text-center`,
              children: [
                /* @__PURE__ */ jsx(ind.icon, { className: "w-16 h-16 text-red-500 mb-6 mx-auto group-hover:scale-110 transition-transform" }),
                /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black mb-4", children: ind.title }),
                /* @__PURE__ */ jsx("p", { className: `text-lg ${t.text}`, children: ind.desc })
              ]
            },
            idx
          )) })
        ] }) }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-20 px-4 sm:px-6 lg:px-8 ${t.sectionBg} transition-colors duration-300`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsx(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: "text-4xl md:text-5xl font-black text-center mb-12",
                  children: "Use Cases of AI & Machine Learning"
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  variants: staggerContainer$6,
                  initial: "hidden",
                  whileInView: "visible",
                  className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
                  children: useCases.map((useCase, idx) => /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      variants: fadeInUp$6,
                      className: `${t.useCase} rounded-xl p-6 flex items-center gap-4 transition-all`,
                      children: [
                        /* @__PURE__ */ jsx(useCase.icon, { className: "w-10 h-10 text-red-500 flex-shrink-0" }),
                        /* @__PURE__ */ jsx("span", { className: "text-xl font-bold", children: useCase.title })
                      ]
                    },
                    idx
                  ))
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${t.sectionBg4} transition-colors duration-300`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: "text-4xl md:text-6xl font-black text-center mb-16",
                  children: [
                    "Frequently Asked ",
                    /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Questions" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "space-y-4", children: faqs$4.map((faq, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: `${t.faqCard} rounded-xl overflow-hidden`,
                  children: [
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => setOpenFaq(openFaq === idx ? null : idx),
                        className: `w-full px-6 py-5 md:px-8 md:py-6 text-left flex justify-between items-center ${t.faqHover} transition-colors`,
                        children: [
                          /* @__PURE__ */ jsx("span", { className: "text-lg md:text-xl font-bold pr-4", children: faq.q }),
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: `text-red-500 text-xl transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`,
                              children: "▼"
                            }
                          )
                        ]
                      }
                    ),
                    openFaq === idx && /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `px-6 pb-6 md:px-8 ${t.text} text-base leading-relaxed`,
                        children: faq.a
                      }
                    )
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${t.sectionBg5} transition-colors duration-300`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto text-center", children: [
              /* @__PURE__ */ jsx(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: "text-4xl md:text-6xl font-black mb-8",
                  children: "Get Started with AI Today"
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-xl md:text-2xl ${t.text} mb-12 max-w-3xl mx-auto`,
                  children: "Transform your business with smart technology. Partner with AI Knots IT Solutions for reliable and result-driven AI & Machine Learning Services in Bhopal."
                }
              ),
              /* @__PURE__ */ jsx(
                motion.button,
                {
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.98 },
                  className: "px-12 py-6 md:px-14 md:py-7 bg-gradient-to-r from-red-600 to-red-800 rounded-full text-xl md:text-3xl font-black shadow-2xl shadow-red-900/60 hover:shadow-red-700/80 transition-all text-white",
                  children: "Contact Us Now →"
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: scrollToTop,
            className: `fixed bottom-6 right-6 z-50 p-4 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/50 transition-all duration-300 hover:scale-110 active:scale-95 ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"}`,
            "aria-label": "Scroll back to top",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-6 h-6",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 10l7-7m0 0l7 7m-7-7v18"
                  }
                )
              }
            )
          }
        )
      ]
    }
  );
}
const carouselImages$1 = [
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&q=90",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=90",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=90",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=90"
];
const fadeInUp$5 = {
  hidden: { opacity: 0, y: 70 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};
const staggerContainer$5 = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } }
};
function PaidAdvertising() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages$1.length);
    }, 7e3);
    return () => clearInterval(interval);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggleFAQ = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  const faqs2 = [
    {
      q: "Why is AI Knots the best paid advertising agency in Bhopal?",
      a: "Because we focus on ROI, not just clicks. Our campaigns are data-driven and designed to generate real business results."
    },
    {
      q: "What platforms do you run ads on?",
      a: "We run ads on Google, Facebook, Instagram, YouTube, and other performance platforms."
    },
    {
      q: "How do you ensure better ad performance?",
      a: "Through continuous optimization, A/B testing, audience targeting, and real-time data analysis."
    },
    {
      q: "Can you help small businesses generate leads?",
      a: "Yes, we specialize in lead generation campaigns for startups and small businesses with budget-friendly strategies."
    },
    {
      q: "How soon can I see results?",
      a: "You can start seeing initial results within a few days, while optimized performance improves over time."
    },
    {
      q: "Do you provide reporting?",
      a: "Yes, we provide transparent reports with clear insights on performance, leads, and ROI."
    },
    {
      q: "Can you reduce my ad cost?",
      a: "Yes, with proper targeting and optimization, we aim to reduce cost per lead and increase conversions."
    },
    {
      q: "Do you create ad creatives also?",
      a: "Absolutely! We design high-converting creatives and ad copies that grab attention."
    },
    {
      q: "Do you handle remarketing campaigns?",
      a: "Yes, we run advanced remarketing campaigns to convert interested users into customers."
    },
    {
      q: "How can I get started with AI Knots?",
      a: "Simply contact us, and we’ll create a custom ad strategy for your business."
    }
  ];
  const accentClass = "text-red-500";
  const headingClass = isDark ? "text-white" : "text-gray-900";
  const bodyClass = isDark ? "text-gray-300" : "text-gray-700";
  const cardClass = isDark ? "bg-gray-900/80 backdrop-blur-xl border border-gray-700/80 hover:border-red-500/70 hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-500" : "bg-white border border-gray-100 hover:border-red-200 hover:shadow-2xl hover:shadow-red-100/80 transition-all duration-500";
  const premiumButton = `px-12 py-7 rounded-2xl text-xl font-bold transition-all flex items-center gap-3 group shadow-xl
    ${isDark ? "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 shadow-red-900/60" : "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-red-600/50 hover:shadow-red-500/50"}`;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `min-h-screen overflow-hidden transition-colors duration-700
      ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`,
      children: [
        /* @__PURE__ */ jsxs("section", { className: "relative h-screen overflow-hidden", children: [
          carouselImages$1.map((img, index) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "absolute inset-0",
              initial: { opacity: 0 },
              animate: { opacity: index === currentSlide ? 1 : 0 },
              transition: { duration: 1.8, ease: "easeInOut" },
              children: [
                /* @__PURE__ */ jsx(
                  motion.img,
                  {
                    src: img,
                    alt: "Paid Advertising Performance",
                    className: "w-full h-full object-cover brightness-50"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `absolute inset-0 bg-gradient-to-b ${isDark ? "from-black/80 via-black/95 to-black" : "from-black/70 via-black/85 to-black"} flex items-center justify-center`,
                    children: /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        initial: "hidden",
                        animate: "visible",
                        variants: staggerContainer$5,
                        className: "text-center px-6 max-w-6xl z-10",
                        children: [
                          /* @__PURE__ */ jsx(
                            motion.h1,
                            {
                              variants: fadeInUp$5,
                              className: "text-6xl sm:text-8xl md:text-9xl font-black mb-6 tracking-tight bg-gradient-to-r from-red-400 via-red-500 to-white bg-clip-text text-transparent",
                              children: "AI Knots"
                            }
                          ),
                          /* @__PURE__ */ jsxs(
                            motion.p,
                            {
                              variants: fadeInUp$5,
                              className: "text-3xl sm:text-5xl md:text-6xl font-bold mb-8 text-red-400",
                              children: [
                                "Paid Advertising Agency",
                                /* @__PURE__ */ jsx("br", { className: "sm:hidden" }),
                                " in Bhopal"
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            motion.p,
                            {
                              variants: fadeInUp$5,
                              className: `text-xl sm:text-3xl max-w-4xl mx-auto leading-tight mb-10 ${isDark ? "text-gray-200" : "text-white/90"}`,
                              children: "Driving High-Performance Ads Across India • Real Growth • Measurable ROI"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            motion.p,
                            {
                              variants: fadeInUp$5,
                              className: `text-lg md:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed ${isDark ? "text-gray-300" : "text-white/90"}`,
                              children: "At AI Knots, a creative paid advertising agency in Bhopal, we go beyond clicks and impressions — we focus on real business growth."
                            }
                          ),
                          /* @__PURE__ */ jsxs(
                            motion.div,
                            {
                              variants: fadeInUp$5,
                              className: "mt-10 flex flex-col sm:flex-row gap-6 justify-center",
                              children: [
                                /* @__PURE__ */ jsxs("button", { className: premiumButton, children: [
                                  "Free Campaign Audit",
                                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-7 h-7 group-hover:translate-x-2 transition-transform" })
                                ] }),
                                /* @__PURE__ */ jsx(
                                  "button",
                                  {
                                    className: `px-12 py-7 border-2 border-red-500/70 rounded-2xl text-2xl font-bold transition-all
                      ${isDark ? "text-red-400 hover:bg-red-950/60 hover:border-red-500" : "text-red-600 hover:bg-red-50"}`,
                                    children: "Get Started →"
                                  }
                                )
                              ]
                            }
                          )
                        ]
                      }
                    )
                  }
                )
              ]
            },
            index
          )),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20", children: carouselImages$1.map((_, i) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setCurrentSlide(i),
              className: `w-3.5 h-3.5 rounded-full transition-all duration-700 ${i === currentSlide ? "bg-red-600 scale-150 shadow-lg shadow-red-600/50" : isDark ? "bg-gray-600 hover:bg-red-400" : "bg-gray-400 hover:bg-red-500"}`
            },
            i
          )) })
        ] }),
        /* @__PURE__ */ jsxs(
          "main",
          {
            className: `max-w-7xl mx-auto px-6 py-24 lg:py-32 space-y-40 ${isDark ? "" : "bg-white"}`,
            children: [
              /* @__PURE__ */ jsxs(
                motion.section,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: staggerContainer$5,
                  className: "text-center",
                  children: [
                    /* @__PURE__ */ jsx(
                      motion.h2,
                      {
                        variants: fadeInUp$5,
                        className: `text-5xl sm:text-7xl font-black mb-10 ${headingClass}`,
                        children: "We Don’t Just Run Ads, We Drive Results"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      motion.p,
                      {
                        variants: fadeInUp$5,
                        className: `text-2xl max-w-5xl mx-auto leading-relaxed mb-16 ${bodyClass}`,
                        children: "We create smart, result-driven ad campaigns that connect your brand with the right audience at the right time. From Google Ads to Meta Ads and performance marketing, our strategies are designed to generate leads, sales, and measurable ROI across India."
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8 lg:gap-12", children: [
                      {
                        icon: Target,
                        title: "Better Targeting",
                        desc: "We don’t waste your budget on random audiences. With advanced targeting, audience segmentation, and retargeting strategies, we make sure your ads reach people who are actually interested in your business."
                      },
                      {
                        icon: BarChart3,
                        title: "Better Data & Insights",
                        desc: "AI Knots uses real-time data, analytics, and performance tracking tools to optimize campaigns continuously. We study user behavior, clicks, and conversions to improve your ad performance every single day."
                      },
                      {
                        icon: TrendingUp,
                        title: "Better Results",
                        desc: "From brand awareness to lead generation and sales, we focus on outcomes that matter. Our goal is simple - more conversions, lower cost, higher ROI."
                      }
                    ].map((item, i) => /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        variants: fadeInUp$5,
                        className: `rounded-3xl p-10 transition-all group ${cardClass}`,
                        children: [
                          /* @__PURE__ */ jsx(
                            item.icon,
                            {
                              className: `w-16 h-16 mb-8 mx-auto transition-transform group-hover:scale-110 ${accentClass}`
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "h3",
                            {
                              className: `text-3xl font-black mb-5 text-center ${isDark ? "text-red-400" : "text-red-600"}`,
                              children: item.title
                            }
                          ),
                          /* @__PURE__ */ jsx("p", { className: `text-lg leading-relaxed ${bodyClass}`, children: item.desc })
                        ]
                      },
                      i
                    )) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.section,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: staggerContainer$5,
                  children: [
                    /* @__PURE__ */ jsxs(
                      motion.h2,
                      {
                        variants: fadeInUp$5,
                        className: `text-5xl sm:text-7xl font-black text-center mb-16 ${headingClass}`,
                        children: [
                          "Our Paid Advertising ",
                          /* @__PURE__ */ jsx("span", { className: accentClass, children: "Solutions" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: [
                      {
                        icon: Megaphone,
                        title: "Google Ads (Search + Display)",
                        desc: "Get found when your customers are searching. We create high-converting search and display campaigns that bring quality traffic to your website."
                      },
                      {
                        icon: Target,
                        title: "Meta Ads (Facebook & Instagram)",
                        desc: "We design scroll-stopping creatives and run targeted campaigns that turn views into leads and sales."
                      },
                      {
                        icon: Youtube,
                        title: "YouTube Advertising",
                        desc: "Reach your audience through engaging video ads that build trust and brand recall."
                      },
                      {
                        icon: LineChart,
                        title: "Performance Marketing",
                        desc: "We focus on ROI-driven campaigns where every rupee is tracked and optimized for better results."
                      },
                      {
                        icon: Repeat,
                        title: "Remarketing Campaigns",
                        desc: "Turn visitors into customers with smart retargeting strategies that bring them back to your business."
                      }
                    ].map((service, i) => /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        variants: fadeInUp$5,
                        className: `rounded-3xl p-10 transition-all group ${cardClass}`,
                        children: [
                          /* @__PURE__ */ jsx(
                            service.icon,
                            {
                              className: `w-14 h-14 mb-6 mx-auto block transition-transform group-hover:scale-110 ${accentClass}`
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "h3",
                            {
                              className: `text-3xl font-black mb-5 text-center ${isDark ? "text-red-400" : "text-red-600"}`,
                              children: service.title
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "p",
                            {
                              className: `text-lg text-center leading-relaxed ${bodyClass}`,
                              children: service.desc
                            }
                          )
                        ]
                      },
                      i
                    )) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.section,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: staggerContainer$5,
                  className: "text-center",
                  children: [
                    /* @__PURE__ */ jsx(
                      motion.h2,
                      {
                        variants: fadeInUp$5,
                        className: `text-5xl sm:text-7xl font-black mb-10 ${headingClass}`,
                        children: "Why AI Knots is Your Best Choice"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      motion.p,
                      {
                        variants: fadeInUp$5,
                        className: `text-2xl max-w-5xl mx-auto leading-relaxed mb-12 ${bodyClass}`,
                        children: "AI Knots is not just another digital agency, we are your growth partner. We combine creative strategy, data-driven marketing, and performance ads to help your business grow faster. Whether you’re a local business in Bhopal or targeting customers across India, we make sure your ads deliver real impact."
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: [
                      "ROI-Focused Campaigns",
                      "Creative + Data-Driven",
                      "Transparent Reporting",
                      "Budget Optimization",
                      "India-Wide Reach",
                      "Proven Lead & Sales Growth"
                    ].map((point, idx) => /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        variants: fadeInUp$5,
                        className: `rounded-3xl p-8 flex items-center justify-center ${cardClass}`,
                        children: [
                          /* @__PURE__ */ jsx(
                            CheckCircle2,
                            {
                              className: `w-10 h-10 mr-4 flex-shrink-0 ${accentClass}`
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "p",
                            {
                              className: `text-2xl font-bold ${isDark ? "text-red-300" : "text-red-700"}`,
                              children: point
                            }
                          )
                        ]
                      },
                      idx
                    )) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.section,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: staggerContainer$5,
                  className: "text-center",
                  children: [
                    /* @__PURE__ */ jsx(
                      motion.h2,
                      {
                        variants: fadeInUp$5,
                        className: `text-5xl sm:text-7xl font-black mb-10 ${headingClass}`,
                        children: "Success Stories"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      motion.p,
                      {
                        variants: fadeInUp$5,
                        className: `text-2xl max-w-4xl mx-auto leading-relaxed mb-8 ${bodyClass}`,
                        children: "From Clicks to Customers — Real Growth, Real Results"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      motion.p,
                      {
                        variants: fadeInUp$5,
                        className: `text-xl max-w-4xl mx-auto ${bodyClass}`,
                        children: "We don’t just run ads—we build success stories. Our campaigns have helped businesses increase leads, boost sales, and grow their online presence."
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.section,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: fadeInUp$5,
                  className: `text-center py-32 rounded-3xl border ${isDark ? "bg-gradient-to-b from-black/50 to-transparent border-red-900/30" : "bg-red-50 border-red-200"}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      motion.h2,
                      {
                        variants: fadeInUp$5,
                        className: `text-6xl sm:text-8xl font-black mb-10 ${isDark ? "bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent" : "text-red-600"}`,
                        children: "Let’s Talk"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      motion.p,
                      {
                        variants: fadeInUp$5,
                        className: `text-3xl mb-12 max-w-4xl mx-auto ${bodyClass}`,
                        children: "Ready to scale your business with powerful ads? Let’s create campaigns that actually convert."
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      motion.button,
                      {
                        whileHover: { scale: 1.05 },
                        whileTap: { scale: 0.98 },
                        className: `group px-16 py-8 rounded-full text-3xl font-bold shadow-2xl transition-all flex items-center gap-5 mx-auto ${premiumButton}`,
                        children: [
                          "Get Your Free Audit",
                          " ",
                          /* @__PURE__ */ jsx(Sparkles, { className: "w-9 h-9 group-hover:rotate-12 transition-transform" })
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.section,
                {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  variants: staggerContainer$5,
                  className: "max-w-4xl mx-auto",
                  children: [
                    /* @__PURE__ */ jsx(
                      motion.h2,
                      {
                        variants: fadeInUp$5,
                        className: `text-5xl sm:text-7xl font-black text-center mb-16 ${headingClass}`,
                        children: "Frequently Asked Questions"
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "space-y-5", children: faqs2.map((faq, idx) => /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        variants: fadeInUp$5,
                        className: `border rounded-2xl overflow-hidden ${isDark ? "border-gray-800 bg-gray-900/60" : "border-gray-200 bg-white"} ${cardClass}`,
                        children: [
                          /* @__PURE__ */ jsxs(
                            "button",
                            {
                              onClick: () => toggleFAQ(idx),
                              className: `w-full px-8 py-7 text-left flex justify-between items-center transition-all ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`,
                              children: [
                                /* @__PURE__ */ jsx("span", { className: `text-2xl font-bold ${headingClass}`, children: faq.q }),
                                /* @__PURE__ */ jsx(
                                  ChevronDown,
                                  {
                                    className: `w-7 h-7 ${accentClass} transition-transform ${openFaq === idx ? "rotate-180" : ""}`
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsx(AnimatePresence, { children: openFaq === idx && /* @__PURE__ */ jsx(
                            motion.div,
                            {
                              initial: { height: 0, opacity: 0 },
                              animate: { height: "auto", opacity: 1 },
                              exit: { height: 0, opacity: 0 },
                              className: `px-8 pb-8 text-lg leading-relaxed ${bodyClass}`,
                              children: faq.a
                            }
                          ) })
                        ]
                      },
                      idx
                    )) })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: scrollToTop,
            className: `fixed bottom-8 right-8 z-50 p-5 rounded-2xl bg-red-600 hover:bg-red-700 text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"}`,
            "aria-label": "Scroll back to top",
            children: "↑"
          }
        )
      ]
    }
  );
}
const PortfolioAtlaknotsitsolutions = "/assets/PortfolioAtlaknotsitsolutions-D54Ctlbz.pdf";
const carouselImages = [
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=90",
  "https://www.searchberg.com/img/GMB-optimization/bannerImg.webp",
  "https://blog.hootsuite.com/wp-content/uploads/2024/04/whatsapp-marketing-6.png",
  "https://www.crossml.com/wp-content/uploads/2024/11/heat-map-smarter-retail-store.png-1024x760.jpg"
];
const fadeInUp$4 = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const staggerContainer$4 = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};
const faqData = [
  {
    q: "What does AI Knots do in local marketing?",
    a: "We help businesses grow locally through GMB, local SEO, WhatsApp, and SMS marketing."
  },
  {
    q: "Is local marketing useful for small businesses?",
    a: "Yes, it helps attract nearby customers and increase sales."
  },
  {
    q: "How soon can I see results?",
    a: "You can start seeing calls and inquiries within a few days."
  },
  {
    q: "Do you manage Google My Business?",
    a: "Yes, we optimize and manage your GMB profile."
  },
  {
    q: "Can you generate local leads?",
    a: "Yes, we run targeted campaigns to generate nearby customer leads."
  },
  {
    q: "Is WhatsApp marketing effective?",
    a: "Yes, it has high open rates and direct customer engagement."
  },
  {
    q: "Do I need a website for local marketing?",
    a: "Not necessary, but it helps improve results."
  },
  {
    q: "Do you provide reports?",
    a: "Yes, we provide clear performance reports."
  },
  {
    q: "Can you target specific areas in Bhopal?",
    a: "Yes, we can target specific locations and areas."
  },
  {
    q: "How can I get started?",
    a: "Just contact us and we’ll create a local marketing plan."
  }
];
function LocalMarketing() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 6e3);
    return () => clearInterval(interval);
  }, []);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const accentClass = "text-red-500";
  const headingClass = isDark ? "text-white" : "text-gray-900";
  const bodyClass = isDark ? "text-gray-300" : "text-gray-700";
  const cardClass = isDark ? "bg-gray-900/80 backdrop-blur-xl border border-gray-700/80 hover:border-red-500/60 hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-500" : "bg-white border border-gray-100 hover:border-red-200 hover:shadow-2xl hover:shadow-red-100/80 transition-all duration-500";
  const premiumButton = `px-12 py-7 rounded-2xl text-xl font-bold transition-all flex items-center gap-3 group shadow-xl
    ${isDark ? "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 shadow-red-900/60" : "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-red-600/50 hover:shadow-red-500/50"}`;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `min-h-screen transition-colors duration-700 overflow-hidden
      ${isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`,
      children: [
        /* @__PURE__ */ jsxs("section", { className: "relative h-[90vh] overflow-hidden", children: [
          carouselImages.map((img, index) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "absolute inset-0",
              initial: { opacity: 0 },
              animate: { opacity: index === currentSlide ? 1 : 0 },
              transition: { duration: 1.5, ease: "easeInOut" },
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: img,
                    alt: "Local marketing in Bhopal",
                    className: "w-full h-full object-cover brightness-50"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `absolute inset-0 bg-gradient-to-b ${isDark ? "from-black/70 via-gray-950/90 to-gray-950" : "from-black/60 via-black/80 to-black"} flex items-center justify-center`,
                    children: /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        initial: "hidden",
                        animate: "visible",
                        variants: staggerContainer$4,
                        className: "text-center px-6 max-w-6xl z-10",
                        children: [
                          /* @__PURE__ */ jsx(
                            motion.h1,
                            {
                              variants: fadeInUp$4,
                              className: "text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-red-400 via-red-500 to-white bg-clip-text text-transparent",
                              children: "Best Local Marketing Company in Bhopal"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            motion.p,
                            {
                              variants: fadeInUp$4,
                              className: "text-3xl md:text-4xl font-bold text-red-400 mb-8",
                              children: "Top Local Marketing Agency in Bhopal for Real Business Growth"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            motion.p,
                            {
                              variants: fadeInUp$4,
                              className: `text-xl md:text-2xl text-center max-w-5xl mx-auto mb-10 leading-relaxed ${isDark ? "text-gray-300" : "text-white/90"}`,
                              children: "Our Expert Solutions for: Google My Business | Local SEO | WhatsApp Marketing | SMS Marketing | Lead Generation | Brand Awareness"
                            }
                          ),
                          /* @__PURE__ */ jsxs(
                            motion.div,
                            {
                              variants: fadeInUp$4,
                              className: "flex flex-col sm:flex-row gap-6 justify-center",
                              children: [
                                /* @__PURE__ */ jsxs("button", { className: premiumButton, children: [
                                  "Get Special Offer – Enquire Now",
                                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-6 h-6 group-hover:translate-x-2 transition-transform" })
                                ] }),
                                /* @__PURE__ */ jsx(
                                  "a",
                                  {
                                    href: PortfolioAtlaknotsitsolutions,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    download: true,
                                    children: /* @__PURE__ */ jsx(
                                      "button",
                                      {
                                        className: `px-10 py-6 border-2 border-red-500/70 rounded-2xl text-xl md:text-2xl font-bold transition-all
                      ${isDark ? "text-red-400 hover:bg-red-950/60 hover:border-red-500" : "text-red-600 hover:bg-red-50"}`,
                                        children: "Download Offer Brochure Now"
                                      }
                                    )
                                  }
                                )
                              ]
                            }
                          )
                        ]
                      }
                    )
                  }
                )
              ]
            },
            index
          )),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-4 z-20", children: carouselImages.map((_, i) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setCurrentSlide(i),
              className: `w-4 h-4 rounded-full transition-all ${i === currentSlide ? "bg-red-600 scale-150 shadow-lg shadow-red-600/50" : isDark ? "bg-gray-600 hover:bg-red-400" : "bg-gray-400 hover:bg-red-500"}`
            },
            i
          )) })
        ] }),
        /* @__PURE__ */ jsxs("main", { className: "max-w-7xl mx-auto px-6 py-20 space-y-32", children: [
          /* @__PURE__ */ jsxs(
            motion.section,
            {
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              variants: staggerContainer$4,
              className: "text-center",
              children: [
                /* @__PURE__ */ jsx(
                  motion.h2,
                  {
                    variants: fadeInUp$4,
                    className: `text-5xl md:text-6xl font-black mb-10 ${headingClass}`,
                    children: "About AI Knots : Best Local Marketing Agency in Bhopal"
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp$4,
                    className: `text-2xl max-w-5xl mx-auto leading-relaxed mb-6 ${bodyClass}`,
                    children: "Local Reach, Real Results"
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp$4,
                    className: `text-xl max-w-5xl mx-auto leading-relaxed ${bodyClass}`,
                    children: "AI Knots is a leading local marketing agency in Bhopal, helping businesses connect with nearby customers and grow faster. We specialize in Google My Business optimization, local SEO, WhatsApp campaigns, SMS marketing, and hyperlocal advertising to bring more calls, visits, and leads to your business. Recognized as one of the best local marketing companies in Bhopal, we create strategies that make your business visible in your area and turn local searches into real customers."
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "mt-12 grid md:grid-cols-3 gap-8", children: [
                  "Got more local calls after GMB optimization.",
                  "Best local marketing service in Bhopal for small business.",
                  "Good results with WhatsApp and SMS campaigns."
                ].map((review, i) => /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    variants: fadeInUp$4,
                    className: `rounded-2xl p-8 transition-all ${cardClass}`,
                    children: [
                      /* @__PURE__ */ jsxs("p", { className: `text-lg italic ${bodyClass}`, children: [
                        "“",
                        review,
                        "”"
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: `mt-4 font-bold ${accentClass}`, children: "Excellent" })
                    ]
                  },
                  i
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.section,
            {
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              variants: staggerContainer$4,
              children: [
                /* @__PURE__ */ jsx(
                  "h2",
                  {
                    className: `text-5xl md:text-6xl font-black text-center mb-16 ${headingClass}`,
                    children: "Why We’re the Top Local Marketing Agency in Bhopal"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: [
                  {
                    icon: MapPin,
                    title: "Smart Local Strategies",
                    desc: "We target customers near your business using location-based marketing and local SEO."
                  },
                  {
                    icon: Users,
                    title: "Real Customer Engagement",
                    desc: "From WhatsApp to SMS, we connect directly with your audience and increase response rates."
                  },
                  {
                    icon: TrendingUp,
                    title: "Results That Matter",
                    desc: "More calls, more store visits, and more leads — that’s our focus."
                  }
                ].map((item, i) => /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    variants: fadeInUp$4,
                    className: `rounded-3xl p-10 text-center transition-all group ${cardClass}`,
                    children: [
                      /* @__PURE__ */ jsx(
                        item.icon,
                        {
                          className: `w-16 h-16 mx-auto mb-6 transition-transform group-hover:scale-110 ${accentClass}`
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "h3",
                        {
                          className: `text-3xl font-bold mb-5 ${isDark ? "text-red-400" : "text-red-600"}`,
                          children: item.title
                        }
                      ),
                      /* @__PURE__ */ jsx("p", { className: bodyClass, children: item.desc })
                    ]
                  },
                  i
                )) }),
                /* @__PURE__ */ jsx("div", { className: "mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8", children: [
                  "Location-Based Targeting : Reach customers in your city, area, or specific locations.",
                  "Expert Local Marketing Team : We understand the Bhopal market and customer behavior.",
                  "Customized Marketing Plans : Every business gets a strategy based on its location and audience.",
                  "Transparent Reporting : Track calls, leads, and campaign performance easily.",
                  "All Local Marketing Solutions in One Place: From GMB to WhatsApp marketing, everything under one roof.",
                  "High-Quality Local Leads : We focus on real customers, not just traffic.",
                  "Quick Support : Fast response and dedicated support for your campaigns.",
                  "Affordable for Small Businesses : Budget-friendly plans for startups and local shops."
                ].map((point, i) => /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    variants: fadeInUp$4,
                    className: `rounded-2xl p-6 transition-all ${cardClass}`,
                    children: [
                      /* @__PURE__ */ jsx(CheckCircle, { className: `w-6 h-6 mb-3 ${accentClass}` }),
                      /* @__PURE__ */ jsx("p", { className: bodyClass, children: point })
                    ]
                  },
                  i
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.section,
            {
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              variants: staggerContainer$4,
              className: "text-center",
              children: [
                /* @__PURE__ */ jsx("h2", { className: `text-5xl font-black mb-12 ${headingClass}`, children: "Let Our Numbers Speak" }),
                /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-5 gap-8", children: [
                  { num: "2+", label: "Years of Experience" },
                  { num: "79+", label: "Clients Served" },
                  { num: "30+", label: "Projects Completed" },
                  { num: "85%+", label: "Client Retention Rate" },
                  { num: "10+", label: "Team Members" }
                ].map((stat, i) => /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    variants: fadeInUp$4,
                    className: `rounded-3xl p-8 transition-all ${cardClass}`,
                    children: [
                      /* @__PURE__ */ jsx("p", { className: `text-5xl font-black ${accentClass}`, children: stat.num }),
                      /* @__PURE__ */ jsx("p", { className: `text-xl mt-4 ${bodyClass}`, children: stat.label })
                    ]
                  },
                  i
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.section,
            {
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              variants: fadeInUp$4,
              className: "text-center py-20",
              children: [
                /* @__PURE__ */ jsx("h2", { className: `text-6xl font-black mb-10 ${headingClass}`, children: "Unlock Your Special Offer – Just Fill the Form Today" }),
                /* @__PURE__ */ jsxs("div", { className: `max-w-md mx-auto rounded-3xl p-10 ${cardClass}`, children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      placeholder: "Name",
                      className: `w-full p-4 mb-4 rounded-lg outline-none transition-all ${isDark ? "bg-gray-900 border border-gray-700 focus:border-red-500" : "bg-white border border-gray-200 focus:border-red-500"}`
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "tel",
                      placeholder: "Number",
                      className: `w-full p-4 mb-6 rounded-lg outline-none transition-all ${isDark ? "bg-gray-900 border border-gray-700 focus:border-red-500" : "bg-white border border-gray-200 focus:border-red-500"}`
                    }
                  ),
                  /* @__PURE__ */ jsxs("button", { className: premiumButton + " w-full text-2xl py-7", children: [
                    "Request a Call Back ",
                    /* @__PURE__ */ jsx(Phone, { className: "w-6 h-6" })
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.section,
            {
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              variants: staggerContainer$4,
              children: [
                /* @__PURE__ */ jsx(
                  "h2",
                  {
                    className: `text-5xl font-black text-center mb-12 ${headingClass}`,
                    children: "Industries We Serve"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4", children: [
                  "Retail Shops",
                  "Home Services",
                  "Clinics and Healthcare",
                  "Real Estate",
                  "Coaching Institutes",
                  "Restaurants and Cafes"
                ].map((ind, i) => /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    variants: fadeInUp$4,
                    className: `px-6 py-4 rounded-2xl text-lg font-medium transition-all ${cardClass}`,
                    children: ind
                  },
                  i
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.section,
            {
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              variants: staggerContainer$4,
              className: "max-w-4xl mx-auto",
              children: [
                /* @__PURE__ */ jsx(
                  motion.h2,
                  {
                    variants: fadeInUp$4,
                    className: `text-5xl font-black text-center mb-16 ${headingClass}`,
                    children: "Frequently Asked Questions (FAQs)"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "space-y-4", children: faqData.map((faq, index) => /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    variants: fadeInUp$4,
                    className: `border rounded-2xl overflow-hidden ${isDark ? "border-gray-800 bg-gray-900/60" : "border-gray-200 bg-white"} ${cardClass}`,
                    children: [
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          onClick: () => toggleFAQ(index),
                          className: `w-full px-8 py-6 text-left flex justify-between items-center transition-all ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`,
                          children: [
                            /* @__PURE__ */ jsx("span", { className: `text-xl font-bold ${headingClass}`, children: faq.q }),
                            /* @__PURE__ */ jsx(
                              ChevronDown,
                              {
                                className: `w-8 h-8 ${accentClass} transition-transform ${openIndex === index ? "rotate-180" : ""}`
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx(AnimatePresence, { children: openIndex === index && /* @__PURE__ */ jsx(
                        motion.div,
                        {
                          initial: { height: 0, opacity: 0 },
                          animate: { height: "auto", opacity: 1 },
                          exit: { height: 0, opacity: 0 },
                          className: `px-8 pb-6 text-lg ${bodyClass}`,
                          children: faq.a
                        }
                      ) })
                    ]
                  },
                  index
                )) })
              ]
            }
          )
        ] })
      ]
    }
  );
}
const images$3 = {
  hero: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=2340"
};
const fadeInUp$3 = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const staggerContainer$3 = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};
const platforms = [
  {
    icon: Facebook,
    title: "Facebook",
    desc: "We help your business build a strong presence on Facebook through engaging posts, ads, and community interaction."
  },
  {
    icon: Instagram,
    title: "Instagram",
    desc: "From reels to creatives, we make your brand visually attractive and engaging for today’s audience."
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    desc: "Perfect for B2B growth—build professional credibility and connect with the right business audience."
  },
  {
    icon: Twitter,
    title: "Twitter (X)",
    desc: "Stay relevant with trending conversations and real-time engagement strategies."
  },
  {
    icon: Youtube,
    title: "YouTube",
    desc: "We help you grow through video marketing, content strategy, and audience engagement."
  },
  {
    icon: Pin,
    title: "Pinterest",
    desc: "Drive traffic and brand discovery through creative visual content."
  }
];
const tools$1 = ["Buffer", "Hootsuite", "Sprout Social", "Later", "Canva"];
const advantages = [
  {
    icon: Target,
    title: "Social Media Strategy",
    desc: "We create proper strategies based on your business goals, target audience, platform selection, content plan, and performance tracking."
  },
  {
    icon: Zap,
    title: "Social Media Optimization (SMO)",
    desc: "We optimize your profiles with the right keywords, content, and posting strategy to increase reach and engagement."
  },
  {
    icon: Megaphone,
    title: "Paid Social Media Promotions",
    desc: "We run targeted ads on platforms like Facebook, Instagram, and LinkedIn to generate leads and boost visibility."
  },
  {
    icon: BarChart3,
    title: "Performance Marketing",
    desc: "We focus on results using data, analytics, and testing to improve conversions and ROI."
  },
  {
    icon: Users,
    title: "Influencer Marketing",
    desc: "We collaborate with relevant influencers to build trust and reach the right audience."
  },
  {
    icon: Calendar,
    title: "Organic Social Media Management",
    desc: "From content creation to posting and engagement, we manage everything to keep your brand active and growing."
  }
];
const whyChoose$3 = [
  "Customized strategies for every business",
  "Data-driven campaigns",
  "Transparent reporting",
  "Affordable pricing",
  "Focus on leads, sales, and growth"
];
const areas = [
  "MP Nagar",
  "Arera Colony",
  "Shahpura",
  "New Market",
  "Bairagarh",
  "Kolar",
  "Ayodhya Nagar",
  "Hoshangabad Road",
  "Gulmohar",
  "Bawadia Kalan"
];
const faqs$3 = [
  {
    q: "What social media services do you offer in Bhopal?",
    a: "We offer complete services including content creation, social media management, paid ads, influencer marketing, and performance tracking."
  },
  {
    q: "Why should I hire AI Knots IT Solutions?",
    a: "We provide customized strategies, real results, and transparent work focused on your business growth."
  },
  {
    q: "Which platforms do you work on?",
    a: "We work on Facebook, Instagram, LinkedIn, Twitter (X), YouTube, and Pinterest."
  },
  {
    q: "How long does it take to see results?",
    a: "You may start seeing engagement in a few weeks, while leads and conversions improve over time with consistent efforts."
  },
  {
    q: "Do you provide local marketing for Bhopal businesses?",
    a: "Yes, we create geo-targeted campaigns to help you reach your local audience effectively."
  },
  {
    q: "Do you handle both organic and paid marketing?",
    a: "Yes, we combine both strategies for better growth, visibility, and ROI."
  }
];
function SocialMediaMarketing() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );
  const [openFaq, setOpenFaq] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);
  const accentClass = "text-red-500";
  const headingClass = isDark ? "text-white" : "text-gray-900";
  const bodyClass = isDark ? "text-gray-300" : "text-gray-700";
  const cardClass = isDark ? "bg-gray-900/70 backdrop-blur-sm border border-gray-800 hover:border-red-500/60 hover:shadow-red-900/30" : "bg-white border border-gray-200 hover:border-red-300 hover:shadow-2xl";
  const buttonClass = `px-12 py-6 rounded-full text-xl font-bold transition-all flex items-center gap-3 group shadow-xl
    ${isDark ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-red-900/60" : "bg-red-600 hover:bg-red-700 text-white shadow-red-600/50"}`;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `min-h-screen overflow-hidden transition-colors duration-700
      ${isDark ? "bg-black text-white" : "bg-white text-gray-900"}`,
      children: [
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: images$3.hero,
                alt: "Social Media Marketing in Bhopal",
                className: "w-full h-full object-cover brightness-50"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `absolute inset-0 bg-gradient-to-br ${isDark ? "from-black/90 via-black/80 to-black/90" : "from-black/70 via-black/60 to-transparent"}`
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: "hidden",
              animate: "visible",
              variants: staggerContainer$3,
              className: "relative z-10 max-w-6xl mx-auto text-center",
              children: [
                /* @__PURE__ */ jsxs(
                  motion.h1,
                  {
                    variants: fadeInUp$3,
                    className: "text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8 text-white",
                    children: [
                      "Social Media Marketing Company in",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-red-500 to-white", children: "Bhopal" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp$3,
                    className: `text-2xl md:text-3xl font-bold mb-8 ${accentClass}`,
                    children: "Real Engagement • Real Leads • Real Growth"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.p,
                  {
                    variants: fadeInUp$3,
                    className: `text-lg md:text-xl max-w-5xl mx-auto leading-relaxed mb-12 ${isDark ? "text-gray-300" : "text-white/90"}`,
                    children: [
                      "At",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "font-semibold text-red-400", children: "AI Knots IT Solutions" }),
                      ", we are one of the most trusted Social Media Marketing agencies in Bhopal. We create powerful strategies that deliver actual results — more followers, better engagement, and quality leads."
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    variants: fadeInUp$3,
                    className: "flex flex-col sm:flex-row gap-6 justify-center",
                    children: [
                      /* @__PURE__ */ jsxs("button", { className: buttonClass, children: [
                        "Get Free Strategy Call",
                        /* @__PURE__ */ jsx(ArrowRight, { className: "w-7 h-7 group-hover:translate-x-2 transition-transform" })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          className: `px-12 py-6 border-2 border-red-500/70 rounded-full text-xl font-bold transition-all
                ${isDark ? "text-red-400 hover:bg-red-950/60 hover:border-red-500" : "text-red-600 hover:bg-red-50 border-red-600"}`,
                          children: "Free Social Media Audit"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gray-950" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-16 ${headingClass}`,
                  children: [
                    "Platforms We ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Master" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: platforms.map((plat, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 50 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: `rounded-3xl p-10 transition-all group ${cardClass}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      plat.icon,
                      {
                        className: `w-16 h-16 mb-8 mx-auto transition-transform group-hover:scale-110 ${accentClass}`
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: `text-2xl font-bold mb-6 text-center ${headingClass}`,
                        children: plat.title
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: `text-center leading-relaxed ${bodyClass}`, children: plat.desc })
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-20 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto text-center", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-5xl font-black mb-12 ${headingClass}`,
                  children: [
                    "Professional Tools We ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Use" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-6 md:gap-10", children: tools$1.map((tool, idx) => /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: `px-10 py-5 text-xl font-semibold rounded-2xl border transition-all
                  ${isDark ? "bg-gray-900 border-red-900/30" : "bg-gray-100 border-gray-300"}`,
                  children: tool
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gray-950" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-16 ${headingClass}`,
                  children: [
                    "Why Choose ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "AI Knots" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: advantages.map((adv, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 50 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.08 },
                  className: `rounded-3xl p-10 transition-all group ${cardClass}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      adv.icon,
                      {
                        className: `w-16 h-16 mb-8 mx-auto transition-transform group-hover:scale-110 ${accentClass}`
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: `text-2xl font-bold mb-6 text-center ${headingClass}`,
                        children: adv.title
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: `text-center leading-relaxed ${bodyClass}`, children: adv.desc })
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsx(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-16 ${headingClass}`,
                  children: "Why Bhopal Businesses Trust Us"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6 mb-20", children: whyChoose$3.map((point, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: `rounded-3xl p-8 flex items-start gap-4 ${cardClass}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      CheckCircle2,
                      {
                        className: `w-8 h-8 mt-1 flex-shrink-0 ${accentClass}`
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: `text-lg font-medium ${bodyClass}`, children: point })
                  ]
                },
                idx
              )) }),
              /* @__PURE__ */ jsxs(
                motion.h3,
                {
                  className: `text-3xl font-bold text-center mb-10 ${headingClass}`,
                  children: [
                    "Areas We Serve in ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Bhopal" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4", children: areas.map((area, idx) => /* @__PURE__ */ jsxs(
                motion.span,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.05 },
                  className: `px-6 py-3 rounded-full text-lg font-medium flex items-center gap-2 transition-all ${cardClass}`,
                  children: [
                    /* @__PURE__ */ jsx(MapPin, { className: `w-5 h-5 ${accentClass}` }),
                    " ",
                    area
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gray-950" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-16 ${headingClass}`,
                  children: [
                    "Frequently Asked ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Questions" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "space-y-4", children: faqs$3.map((faq, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: `border rounded-2xl overflow-hidden ${isDark ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-white"}`,
                  children: [
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        onClick: () => setOpenFaq(openFaq === idx ? null : idx),
                        className: "w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-800/30 transition-colors",
                        children: [
                          /* @__PURE__ */ jsx("span", { className: `text-xl font-bold ${headingClass}`, children: faq.q }),
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: `text-2xl text-red-500 transition-transform ${openFaq === idx ? "rotate-180" : ""}`,
                              children: "▼"
                            }
                          )
                        ]
                      }
                    ),
                    openFaq === idx && /* @__PURE__ */ jsx("div", { className: `px-8 pb-8 text-lg ${bodyClass}`, children: faq.a })
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto text-center", children: [
              /* @__PURE__ */ jsx(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black mb-8 ${headingClass}`,
                  children: "Ready to Grow Your Brand on Social Media?"
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-xl md:text-2xl max-w-3xl mx-auto mb-12 ${bodyClass}`,
                  children: "Let AI Knots IT Solutions help you build a powerful social media presence in Bhopal and beyond."
                }
              ),
              /* @__PURE__ */ jsx(
                motion.button,
                {
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.98 },
                  className: `px-16 py-7 rounded-full text-2xl font-bold transition-all ${isDark ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800" : "bg-red-600 hover:bg-red-700 text-white"}`,
                  children: "Get Started Today →"
                }
              ),
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: `mt-10 text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`,
                  children: "📞 +91 78696 36070   |   support@atlaknots.com"
                }
              )
            ] })
          }
        )
      ]
    }
  );
}
const images$2 = {
  hero: "https://framerusercontent.com/images/1VvwbJM00c9GavOhO9e1DTdMg.jpg?width=1920&height=1080",
  bhopalLocal: "https://media.licdn.com/dms/image/v2/D4D22AQEi5Cvxfd_t-g/feedshare-shrink_800/B4DZrABYmtIMAg-/0/1764158180158?e=2147483647&v=beta&t=O1BquIYxDkYWQmO3xUD-S_7bEe4u8Rdb5wU1wpB7-Pk",
  newsletter: "https://piktochart.com/wp-content/uploads/2024/04/company-newsletter-examples-featured-image.png"
};
const fadeInUp$2 = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const staggerContainer$2 = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};
const services$2 = [
  {
    icon: FileText,
    title: "Website Content Writing",
    desc: "Clear, engaging, SEO-friendly copy that turns visitors into customers."
  },
  {
    icon: BookOpen,
    title: "Blog Writing",
    desc: "High-value blogs that boost rankings, traffic, and audience trust."
  },
  {
    icon: Newspaper,
    title: "Press Release Writing",
    desc: "Professional releases to amplify your brand message and visibility."
  },
  {
    icon: Link$1,
    title: "Guest Posting",
    desc: "Strategic placements on authoritative sites for reach and strong backlinks."
  },
  {
    icon: Pen,
    title: "Article Writing",
    desc: "Well-researched, readable articles that establish brand authority."
  },
  {
    icon: Megaphone,
    title: "Ad Copy Writing",
    desc: "Compelling ads for Google, Facebook, Instagram that drive clicks and sales."
  },
  {
    icon: Code,
    title: "Technical Writing",
    desc: "Simplified explanations of complex topics for better understanding."
  },
  {
    icon: Mail,
    title: "Email & Newsletter Writing",
    desc: "Engaging sequences that nurture leads and increase conversions."
  }
];
const whyChoose$2 = [
  "100% Human Content – Authentic and emotionally resonant",
  "In-House Writers – Consistent quality aligned with your voice",
  "Plagiarism-Free Content – Always original and checked",
  "SEO-Optimized Content – Keyword-rich for better rankings",
  "Content That Engages and Converts – Designed for real results"
];
const engagementPoints = [
  "Grabs attention with powerful headlines and hooks",
  "Builds trust through valuable, authentic storytelling",
  "Drives action with clear CTAs and persuasive messaging"
];
const industries$1 = [
  "Education",
  "E-commerce",
  "Healthcare",
  "Real Estate",
  "Technology & IT",
  "Finance",
  "Travel & Hospitality",
  "Startups & Local Businesses in Bhopal"
];
const faqs$2 = [
  {
    q: "What types of content writing services do you offer?",
    a: "We offer website content, blog writing, SEO content, ad copy, social media content, email marketing content, and more based on your business needs."
  },
  {
    q: "Is your content SEO-friendly?",
    a: "Yes, all our content is written with proper keyword research and SEO structure to help your website rank better on search engines."
  },
  {
    q: "How long does it take to deliver content?",
    a: "Delivery time depends on the project size, but most content is delivered within 2 to 5 working days."
  },
  {
    q: "Will the content be original?",
    a: "Yes, we provide 100% original and plagiarism-free content that is tailored specifically for your brand."
  },
  {
    q: "Can you write content for my specific industry?",
    a: "Yes, we create content for various industries like education, healthcare, real estate, eCommerce, and more."
  }
];
function ContentWritingBranding() {
  const { isDark } = useTheme();
  const [openFaq, setOpenFaq] = useState(null);
  const cardClass = isDark ? "bg-gray-900/70 backdrop-blur-sm border border-gray-800 hover:border-red-600/60 rounded-2xl p-10 hover:shadow-2xl hover:shadow-red-900/30 transition-all group text-center" : "bg-white border border-gray-200 shadow-lg hover:shadow-2xl rounded-2xl p-10 transition-all group text-center";
  const headingClass = isDark ? "text-white" : "text-gray-900";
  const bodyClass = isDark ? "text-gray-300" : "text-gray-700";
  const accentClass = "text-red-500";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `min-h-screen transition-colors duration-700 overflow-hidden
      ${isDark ? "bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white" : "bg-gray-50 text-gray-900"}`,
      children: [
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: images$2.hero,
                alt: "Creative Content Writing Workspace",
                className: "w-full h-full object-cover",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `absolute inset-0 transition-all duration-700
            ${isDark ? "bg-gradient-to-t from-black via-black/80 to-transparent" : "bg-gradient-to-t from-black/70 via-black/60 to-transparent"}`
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: "hidden",
              animate: "visible",
              variants: staggerContainer$2,
              className: "relative z-10 max-w-7xl mx-auto text-center",
              children: [
                /* @__PURE__ */ jsxs(
                  motion.h1,
                  {
                    variants: fadeInUp$2,
                    className: `text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight ${headingClass}`,
                    children: [
                      "Content Writing & Branding Services in",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600", children: "Bhopal" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp$2,
                    className: "text-3xl md:text-5xl font-bold text-red-500 mb-8",
                    children: "Turn Your Ideas Into Words That Sell"
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp$2,
                    className: `text-xl md:text-2xl mb-10 max-w-5xl mx-auto leading-relaxed ${bodyClass}`,
                    children: "Your brand deserves content that connects, engages, and converts."
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp$2,
                    className: `text-lg md:text-xl mb-12 max-w-4xl mx-auto leading-relaxed ${bodyClass}`,
                    children: "At AI Knots IT Solutions, we create simple, clear, and impactful content for websites, blogs, ads, emails, and more — tailored for Bhopal businesses and beyond."
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    variants: fadeInUp$2,
                    className: "flex flex-col sm:flex-row gap-6 justify-center",
                    children: [
                      /* @__PURE__ */ jsxs("button", { className: "px-12 py-6 bg-gradient-to-r from-red-600 to-red-800 rounded-full text-xl md:text-2xl font-bold shadow-2xl shadow-red-900/60 hover:shadow-red-700/80 hover:scale-105 transition-all flex items-center gap-3 group", children: [
                        "Get Free Content Consultation",
                        " ",
                        /* @__PURE__ */ jsx(ArrowRight, { className: "w-7 h-7 group-hover:translate-x-2 transition-transform" })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          className: `px-12 py-6 border-2 rounded-full text-xl md:text-2xl font-bold transition-all
              ${isDark ? "border-red-600/70 text-red-400 hover:bg-red-950/50" : "border-red-600 text-red-600 hover:bg-red-50"}`,
                          children: "Contact Us"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-16 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/40" : "bg-gray-100"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto text-center", children: [
              /* @__PURE__ */ jsx(
                motion.h3,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-3xl font-bold mb-8 ${headingClass}`,
                  children: "Engaging Email & Newsletter Designs That Convert"
                }
              ),
              /* @__PURE__ */ jsx(
                motion.img,
                {
                  src: images$2.newsletter,
                  alt: "Modern Newsletter Layout Examples",
                  className: "rounded-2xl shadow-2xl mx-auto w-full max-w-5xl"
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/40" : "bg-gray-100"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-16 ${headingClass}`,
                  children: [
                    "Content Marketing ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Services" }),
                    " We Offer"
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: services$2.map((serv, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 50 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: cardClass,
                  children: [
                    /* @__PURE__ */ jsx(
                      serv.icon,
                      {
                        className: `w-16 h-16 mx-auto mb-6 ${accentClass} group-hover:scale-110 transition-transform`
                      }
                    ),
                    /* @__PURE__ */ jsx("h3", { className: `text-2xl font-bold mb-4 ${headingClass}`, children: serv.title }),
                    /* @__PURE__ */ jsx("p", { className: `text-center ${bodyClass}`, children: serv.desc })
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/50" : "bg-gray-100"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-16 ${headingClass}`,
                  children: [
                    "Why Choose AI Knots as Your",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Content Partner" }),
                    " in Bhopal"
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: whyChoose$2.map((point, idx) => /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: cardClass,
                  children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4", children: [
                    /* @__PURE__ */ jsx(
                      CheckCircle2,
                      {
                        className: `w-8 h-8 flex-shrink-0 ${accentClass}`
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: `text-lg font-semibold ${bodyClass}`, children: point })
                  ] })
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-20 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto text-center", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-5xl font-black mb-12 ${headingClass}`,
                  children: [
                    "Content That",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Engages and Converts" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("p", { className: `text-xl mb-10 max-w-4xl mx-auto ${bodyClass}`, children: "Good content is not just about writing — it’s about results." }),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: engagementPoints.map((point, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 50 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: cardClass,
                  children: [
                    /* @__PURE__ */ jsx(Zap, { className: `w-12 h-12 mx-auto mb-6 ${accentClass}` }),
                    /* @__PURE__ */ jsx("p", { className: `text-lg font-semibold ${bodyClass}`, children: point })
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-16 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/40" : "bg-gray-100"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto text-center", children: [
              /* @__PURE__ */ jsx(
                motion.img,
                {
                  src: images$2.bhopalLocal,
                  alt: "Futuristic Bhopal - Growing Hub for Businesses",
                  className: "rounded-2xl shadow-2xl mx-auto w-full max-w-5xl"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: `mt-6 text-xl ${bodyClass}`, children: "Empowering Bhopal businesses with powerful, local-first content strategies." })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto text-center", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-5xl font-black mb-12 ${headingClass}`,
                  children: [
                    "Industries We ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Serve" }),
                    " in Bhopal & Beyond"
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-6", children: industries$1.map((ind, idx) => /* @__PURE__ */ jsxs(
                motion.span,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.05 },
                  className: `border rounded-full px-8 py-4 text-lg font-medium flex items-center gap-3 transition-all
                  ${isDark ? "bg-red-950/40 border-red-800/50" : "bg-white border-red-200 shadow"}`,
                  children: [
                    /* @__PURE__ */ jsx(Globe, { className: `w-6 h-6 ${accentClass}` }),
                    " ",
                    ind
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gradient-to-b from-black to-gray-950" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-16 ${headingClass}`,
                  children: [
                    "Frequently Asked ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Questions" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "space-y-4", children: faqs$2.map((faq, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: `border rounded-xl overflow-hidden transition-all
                  ${isDark ? "border-gray-800 bg-gray-900/30" : "border-gray-200 bg-white shadow"}`,
                  children: [
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        onClick: () => setOpenFaq(openFaq === idx ? null : idx),
                        className: `w-full px-8 py-6 text-left flex justify-between items-center transition-colors
                    ${isDark ? "hover:bg-gray-800/50" : "hover:bg-gray-100"}`,
                        children: [
                          /* @__PURE__ */ jsx("span", { className: `text-xl font-bold ${headingClass}`, children: faq.q }),
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: `text-red-500 text-2xl transition-transform ${openFaq === idx ? "rotate-180" : ""}`,
                              children: "▼"
                            }
                          )
                        ]
                      }
                    ),
                    openFaq === idx && /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `px-8 pb-8 pt-2 leading-relaxed ${bodyClass}`,
                        children: faq.a
                      }
                    )
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gradient-to-br from-red-950/30 to-black" : "bg-red-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto text-center", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black mb-8 ${headingClass}`,
                  children: [
                    "Ready to Get Content That ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Sells" }),
                    "?"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-xl md:text-2xl mb-10 max-w-3xl mx-auto ${bodyClass}`,
                  children: "Let AI Knots help your Bhopal business stand out with words that connect and convert."
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.button,
                {
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.98 },
                  className: "px-14 py-7 bg-gradient-to-r from-red-600 to-red-800 rounded-full text-2xl md:text-3xl font-black shadow-2xl shadow-red-900/60 hover:shadow-red-700/80 transition-all flex items-center gap-4 mx-auto",
                  children: [
                    "Contact Us Today ",
                    /* @__PURE__ */ jsx(ArrowRight, { className: "w-8 h-8" })
                  ]
                }
              )
            ] })
          }
        )
      ]
    }
  );
}
const images$1 = {
  hero: "https://miro.medium.com/1*mdU5f4UCSQZKZ_PSoehmWA.avif",
  responsive: "https://goodmockups.com/wp-content/uploads/2024/07/Free-Apple-Devices-Responsive-Web-Design-Stationery-8K-Mockup-PSD.jpg",
  process: "https://thumbs.dreamstime.com/b/flat-line-illustration-website-design-process-idea-startup-development-quality-assurance-60716700.jpg",
  ctaExample: "https://www.sliderrevolution.com/wp-content/uploads/2025/03/call-to-action-buttons.jpg"
};
const fadeInUp$1 = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const staggerContainer$1 = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};
const benefits = [
  "Boost Search Rankings – Google favors fast, mobile-friendly sites",
  "Reduce Maintenance Cost – One site for all devices",
  "Get Found Online – Better visibility to the right audience",
  "Increase Traffic and Leads – Superior UX = more engagement",
  "Reach More Customers – Mobile dominance in 2026",
  "Improve Conversion Rate – Action-oriented design",
  "Better User Experience – Keeps visitors longer",
  "Strong Brand Image – Instant credibility"
];
const services$1 = [
  {
    icon: Palette,
    title: "Custom Website Design",
    desc: "Unique, brand-aligned websites built from scratch for maximum impact."
  },
  {
    icon: Code,
    title: "WordPress Website Design",
    desc: "Powerful, easy-to-manage sites with advanced features and flexibility."
  },
  {
    icon: ShoppingCart,
    title: "eCommerce Website Design",
    desc: "Smooth, high-converting online stores that drive sales."
  },
  {
    icon: RefreshCw,
    title: "Website Redesign",
    desc: "Modernize outdated sites for better performance and user experience."
  },
  {
    icon: FileText,
    title: "Landing Page Design",
    desc: "High-conversion pages optimized for ads, campaigns, and lead generation."
  }
];
const processSteps = [
  "Understanding your business & goals",
  "Planning structure & user flow",
  "Designing modern, responsive layouts",
  "Development, testing & optimization",
  "Launch with full support & handover"
];
const differences = [
  "Custom Design – No generic templates",
  "Full Control – You own everything",
  "SEO-Friendly Structure – Built to rank",
  "Data-Driven Approach – Based on real user behavior",
  "Transparent Process – Stay involved always"
];
const additionalServices = [
  "Content Writing",
  "SEO Optimization",
  "Logo Design",
  "Conversion Rate Optimization",
  "Technical SEO",
  "Website Maintenance",
  "Website Hosting"
];
const whyChoose$1 = [
  "No long-term contracts",
  "Transparent pricing",
  "Dedicated team",
  "Affordable solutions",
  "Complete ongoing support"
];
const faqs$1 = [
  {
    q: "How long does it take to design a website?",
    a: "Usually 7 to 15 days depending on your requirements and complexity."
  },
  {
    q: "Will my website be mobile-friendly?",
    a: "Yes, all our websites are fully responsive and optimized for all devices."
  },
  {
    q: "Do you build SEO-friendly websites?",
    a: "Yes, we follow the latest SEO best practices including Core Web Vitals and mobile-first indexing."
  },
  {
    q: "Can you redesign my existing website?",
    a: "Yes, we specialize in upgrading old sites for modern performance and conversions."
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes, we offer maintenance, updates, and support packages."
  }
];
function WebsiteDesignDevelopment() {
  const { isDark } = useTheme();
  const [openFaq, setOpenFaq] = useState(null);
  const cardClass = isDark ? "bg-gray-900/70 backdrop-blur-sm border border-gray-800 hover:border-red-600/60 rounded-2xl p-8 hover:shadow-2xl hover:shadow-red-900/30 transition-all" : "bg-white border border-gray-200 shadow-lg hover:shadow-2xl rounded-2xl p-8 transition-all";
  const headingClass = isDark ? "text-white" : "text-gray-900";
  const bodyClass = isDark ? "text-gray-300" : "text-gray-700";
  const accentClass = "text-red-500";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `min-h-screen transition-colors duration-700 overflow-hidden
      ${isDark ? "bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white" : "bg-gray-50 text-gray-900"}`,
      children: [
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: images$1.hero,
                alt: "Modern Website Dashboard",
                className: "w-full h-full object-cover",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `absolute inset-0 transition-all duration-700
            ${isDark ? "bg-gradient-to-t from-black via-black/80 to-transparent" : "bg-gradient-to-t from-black/70 via-black/50 to-transparent"}`
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: "hidden",
              animate: "visible",
              variants: staggerContainer$1,
              className: "relative z-10 max-w-7xl mx-auto text-center",
              children: [
                /* @__PURE__ */ jsxs(
                  motion.h1,
                  {
                    variants: fadeInUp$1,
                    className: `text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight ${isDark ? "text-white" : "text-gray-900"}`,
                    children: [
                      "Website Design & Development Services",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600", children: "AI Knots IT Solutions" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp$1,
                    className: "text-3xl md:text-5xl font-bold text-red-500 mb-8",
                    children: "Fast, Functional and Focused on Results"
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp$1,
                    className: `text-xl md:text-2xl mb-10 max-w-5xl mx-auto leading-relaxed ${bodyClass}`,
                    children: "Convert Visitors Into Customers With Smart Web Design"
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp$1,
                    className: `text-lg md:text-xl mb-12 max-w-4xl mx-auto leading-relaxed ${bodyClass}`,
                    children: "Don’t lose potential customers because of a poor website. We build fast-loading, conversion-focused sites that generate leads, build trust, and grow your business in 2026."
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    variants: fadeInUp$1,
                    className: "flex flex-col sm:flex-row gap-6 justify-center",
                    children: [
                      /* @__PURE__ */ jsxs("button", { className: "px-12 py-6 bg-gradient-to-r from-red-600 to-red-800 rounded-full text-xl md:text-2xl font-bold shadow-2xl shadow-red-900/60 hover:shadow-red-700/80 hover:scale-105 transition-all flex items-center gap-3 group", children: [
                        "Get My Free Proposal",
                        " ",
                        /* @__PURE__ */ jsx(ArrowRight, { className: "w-7 h-7 group-hover:translate-x-2 transition-transform" })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          className: `px-12 py-6 border-2 rounded-full text-xl md:text-2xl font-bold transition-all
              ${isDark ? "border-red-600/70 text-red-400 hover:bg-red-950/50" : "border-red-600 text-red-600 hover:bg-red-50"}`,
                          children: "Build My Website"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-16 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/40" : "bg-gray-100"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto text-center", children: [
              /* @__PURE__ */ jsx(
                motion.img,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  src: images$1.responsive,
                  alt: "Responsive Website on Multiple Devices",
                  className: "rounded-2xl shadow-2xl mx-auto w-full max-w-5xl"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: `mt-6 text-xl ${bodyClass}`, children: "Fully responsive across desktop, tablet, and mobile – essential for 2026 traffic." })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-16 ${headingClass}`,
                  children: [
                    "Why Your Business Needs a",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Modern Website" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-xl mb-12 max-w-4xl mx-auto text-center ${bodyClass}`,
                  children: "In 2026, your website is your 24/7 salesperson. Outdated or slow sites lose customers to competitors instantly."
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: benefits.map((benefit, idx) => /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 50 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: cardClass,
                  children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                    /* @__PURE__ */ jsx(
                      CheckCircle2,
                      {
                        className: `w-8 h-8 ${accentClass} mr-4 flex-shrink-0`
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: `text-lg ${bodyClass}`, children: benefit })
                  ] })
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/50" : "bg-gray-100"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-16 ${headingClass}`,
                  children: [
                    "Our ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Website Design Services" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: services$1.map((serv, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 50 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: cardClass,
                  children: [
                    /* @__PURE__ */ jsx(
                      serv.icon,
                      {
                        className: `w-16 h-16 ${accentClass} mb-6 mx-auto group-hover:scale-110 transition-transform`
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: `text-2xl font-bold mb-4 text-center ${headingClass}`,
                        children: serv.title
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: `text-center ${bodyClass}`, children: serv.desc })
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-20 px-4 sm:px-6 lg:px-8 ${isDark ? "" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto text-center", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-5xl font-black mb-12 ${headingClass}`,
                  children: [
                    "Our Simple & Effective ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Process" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.img,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  src: images$1.process,
                  alt: "Website Design Process Timeline",
                  className: "rounded-2xl shadow-2xl mx-auto w-full max-w-4xl mb-12"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-5 gap-6", children: processSteps.map((step, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.15 },
                  className: cardClass,
                  children: [
                    /* @__PURE__ */ jsx("div", { className: `text-3xl font-black ${accentClass} mb-2`, children: idx + 1 }),
                    /* @__PURE__ */ jsx("p", { className: `text-lg font-semibold ${bodyClass}`, children: step })
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/40" : "bg-gray-100"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-16 ${headingClass}`,
                  children: [
                    "What Makes Us ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Different" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: differences.map((diff, idx) => /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: cardClass,
                  children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4", children: [
                    /* @__PURE__ */ jsx(
                      CheckCircle2,
                      {
                        className: `w-8 h-8 ${accentClass} flex-shrink-0`
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: `text-lg font-semibold ${bodyClass}`, children: diff })
                  ] })
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-16 px-4 sm:px-6 lg:px-8 ${isDark ? "" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto text-center", children: [
              /* @__PURE__ */ jsx(
                motion.h3,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-3xl font-bold mb-8 ${headingClass}`,
                  children: "Conversion-Focused Design in Action"
                }
              ),
              /* @__PURE__ */ jsx(
                motion.img,
                {
                  src: images$1.ctaExample,
                  alt: "High-Converting CTA Buttons Examples",
                  className: "rounded-2xl shadow-2xl mx-auto w-full"
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gradient-to-b from-black to-gray-950" : "bg-gray-50"}`,
            children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-16", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs(
                  motion.h2,
                  {
                    initial: { opacity: 0, y: 40 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    className: `text-4xl md:text-5xl font-black mb-8 ${headingClass}`,
                    children: [
                      "Additional ",
                      /* @__PURE__ */ jsx("span", { className: accentClass, children: "Services" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("ul", { className: `space-y-4 text-lg ${bodyClass}`, children: additionalServices.map((serv, idx) => /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(Zap, { className: `w-6 h-6 ${accentClass} mr-3` }),
                  " ",
                  serv
                ] }, idx)) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs(
                  motion.h2,
                  {
                    initial: { opacity: 0, y: 40 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    className: `text-4xl md:text-5xl font-black mb-8 ${headingClass}`,
                    children: [
                      "Why Choose ",
                      /* @__PURE__ */ jsx("span", { className: accentClass, children: "AI Knots" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "grid gap-6", children: whyChoose$1.map((point, idx) => /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -30 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: { once: true },
                    transition: { delay: idx * 0.1 },
                    className: cardClass,
                    children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                      /* @__PURE__ */ jsx(CheckCircle2, { className: `w-8 h-8 ${accentClass} mr-4` }),
                      /* @__PURE__ */ jsx("p", { className: `text-xl font-semibold ${bodyClass}`, children: point })
                    ] })
                  },
                  idx
                )) })
              ] })
            ] }) })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-16 ${headingClass}`,
                  children: [
                    "Frequently Asked ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Questions" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "space-y-4", children: faqs$1.map((faq, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: `border rounded-xl overflow-hidden transition-all
                  ${isDark ? "border-gray-800 bg-gray-900/30" : "border-gray-200 bg-white shadow"}`,
                  children: [
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        onClick: () => setOpenFaq(openFaq === idx ? null : idx),
                        className: `w-full px-8 py-6 text-left flex justify-between items-center transition-colors
                    ${isDark ? "hover:bg-gray-800/50" : "hover:bg-gray-100"}`,
                        children: [
                          /* @__PURE__ */ jsx("span", { className: `text-xl font-bold ${headingClass}`, children: faq.q }),
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: `text-red-500 text-2xl transition-transform ${openFaq === idx ? "rotate-180" : ""}`,
                              children: "▼"
                            }
                          )
                        ]
                      }
                    ),
                    openFaq === idx && /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `px-8 pb-8 pt-2 leading-relaxed ${bodyClass}`,
                        children: faq.a
                      }
                    )
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gradient-to-br from-red-950/30 to-black" : "bg-red-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto text-center", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black mb-8 ${headingClass}`,
                  children: [
                    "Ready to Build Your",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "High-Performing" }),
                    " Website?"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-xl md:text-2xl mb-10 max-w-3xl mx-auto ${bodyClass}`,
                  children: "Let’s create a website that attracts visitors, engages them, and converts them into loyal customers."
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.button,
                {
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.98 },
                  className: "px-14 py-7 bg-gradient-to-r from-red-600 to-red-800 rounded-full text-2xl md:text-3xl font-black shadow-2xl shadow-red-900/60 hover:shadow-red-700/80 transition-all flex items-center gap-4 mx-auto",
                  children: [
                    "Contact Us for Free Proposal ",
                    /* @__PURE__ */ jsx(ArrowRight, { className: "w-8 h-8" })
                  ]
                }
              )
            ] })
          }
        )
      ]
    }
  );
}
const images = {
  hero: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2000"
};
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};
const whyChoose = [
  {
    icon: Users,
    title: "Certified UI/UX Designers",
    desc: "Access to expert, certified professionals with years of experience."
  },
  {
    icon: Zap,
    title: "Highly Customized Solutions",
    desc: "Tailored designs that align perfectly with your brand and goals."
  },
  {
    icon: Clock,
    title: "On-Time Project Delivery",
    desc: "We stick to timelines without compromising quality."
  },
  {
    icon: CheckCircle2,
    title: "95% Client Retention Rate",
    desc: "Long-term partnerships built on trust and results."
  },
  {
    icon: Shield,
    title: "Transparent Billing Process",
    desc: "No surprises – clear, upfront pricing."
  },
  {
    icon: DollarSign,
    title: "No Contract Lock-Ins",
    desc: "Flexible engagement that puts you in control."
  }
];
const services = [
  {
    icon: Layout$1,
    title: "Wireframes & Prototypes",
    desc: "Structured wireframes and interactive prototypes to visualize your product early and align with business needs."
  },
  {
    icon: PenTool,
    title: "User Interface Design",
    desc: "Visually stunning, intuitive interfaces for web and mobile that create strong first impressions and smooth navigation."
  },
  {
    icon: MousePointer,
    title: "Interaction Design",
    desc: "Seamless, meaningful user interactions with smart micro-animations and intuitive elements."
  },
  {
    icon: RefreshCw,
    title: "Redesign Services",
    desc: "Modernize outdated designs with better usability, structure, and 2026 trends like glassmorphism & immersive elements."
  },
  {
    icon: Eye,
    title: "User Testing",
    desc: "Rigorous usability testing to identify issues and ensure high-performing, user-approved products."
  },
  {
    icon: Palette,
    title: "Visual Design",
    desc: "Compelling visuals with color theory, typography, and graphics that boost engagement and brand identity."
  }
];
const tools = [
  "Figma",
  "Adobe XD",
  "Photoshop",
  "Illustrator",
  "Sketch",
  "InVision"
];
const trustedPoints = [
  "Dedicated Project Team – Close collaboration for timely, high-quality delivery",
  "Tailor-Made Solutions – Built around your unique goals and audience",
  "Technical Expertise – Creative design fused with scalable, secure tech",
  "Advanced Tools & Techniques – Modern methods for performance and usability",
  "Budget-Friendly Approach – Premium quality without breaking the bank",
  "Ongoing Support – Continuous assistance for long-term success"
];
const importance = [
  {
    title: "Improves Customer Satisfaction & ROI",
    desc: "Better UX drives engagement, conversions, and loyalty."
  },
  {
    title: "Easy Navigation & Usability",
    desc: "Smooth experiences keep users coming back."
  },
  {
    title: "Better Understanding of Target Audience",
    desc: "Aligns products with real user expectations."
  },
  {
    title: "Strengthens Brand Image",
    desc: "Professional designs build instant trust."
  },
  {
    title: "Saves Time & Cost",
    desc: "Efficient designs reduce future fixes and updates."
  }
];
const industries = [
  {
    icon: Truck,
    title: "Logistics",
    desc: "Scalable solutions for tracking, cloud systems, and management."
  },
  {
    icon: Zap,
    title: "Utility",
    desc: "Custom monitoring and optimization platforms."
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    desc: "Seamless, high-converting online shopping experiences."
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    desc: "Secure, compliant solutions meeting industry standards."
  },
  {
    icon: GraduationCap,
    title: "Education",
    desc: "Interactive e-learning platforms for modern needs."
  },
  {
    icon: Plane,
    title: "Aviation",
    desc: "Advanced, complex IT solutions tailored to aviation."
  }
];
const faqs = [
  {
    q: "Is there any hidden cost?",
    a: "No, we maintain complete transparency with no hidden charges."
  },
  {
    q: "Where are your UI/UX designers located?",
    a: "Our team operates across India with global project delivery capabilities."
  },
  {
    q: "How do you ensure data and IP security?",
    a: "We follow strict confidentiality protocols and security standards."
  },
  {
    q: "How does payment work?",
    a: "Flexible payment models based on project scope and milestones."
  },
  {
    q: "Can I choose my designer?",
    a: "Yes, we provide the option to work with preferred resources."
  },
  {
    q: "How do you communicate during the project?",
    a: "Regular updates via calls, emails, and project management tools."
  }
];
function UiUxDesign() {
  const { isDark } = useTheme();
  const [openFaq, setOpenFaq] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const cardClass = isDark ? "bg-gray-900/70 backdrop-blur-sm border border-gray-800 hover:border-red-600/60 rounded-2xl p-10 hover:shadow-2xl hover:shadow-red-900/30 transition-all group" : "bg-white border border-gray-200 shadow-lg hover:shadow-2xl rounded-2xl p-10 transition-all group";
  const headingClass = isDark ? "text-white" : "text-gray-900";
  const bodyClass = isDark ? "text-gray-300" : "text-gray-700";
  const accentClass = "text-red-500";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `min-h-screen transition-colors duration-700 overflow-hidden
      ${isDark ? "bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white" : "bg-gray-50 text-gray-900"}`,
      children: [
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: images.hero,
                alt: "Futuristic UI/UX Dashboard",
                className: "w-full h-full object-cover",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `absolute inset-0 transition-all duration-700
            ${isDark ? "bg-gradient-to-t from-black via-black/80 to-transparent opacity-90" : "bg-gradient-to-t from-black/70 via-black/50 to-transparent"}`
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: "hidden",
              animate: "visible",
              variants: staggerContainer,
              className: "relative z-10 max-w-7xl mx-auto text-center",
              children: [
                /* @__PURE__ */ jsxs(
                  motion.h1,
                  {
                    variants: fadeInUp,
                    className: `text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight ${isDark ? "text-white" : "text-gray-900"}`,
                    children: [
                      "Best UI/UX Design Company",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600", children: "AI Knots IT Solutions" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp,
                    className: "text-3xl md:text-5xl font-bold text-red-500 mb-8",
                    children: "Design Experiences That Convert Visitors Into Customers"
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp,
                    className: `text-xl md:text-2xl mb-10 max-w-5xl mx-auto leading-relaxed ${bodyClass}`,
                    children: "AI Knots IT Solutions delivers high-performing UI/UX designs, websites, and digital solutions tailored to grow your business in 2026 and beyond."
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    variants: fadeInUp,
                    className: `text-lg md:text-xl mb-12 max-w-4xl mx-auto leading-relaxed ${bodyClass}`,
                    children: "We specialize in intuitive, engaging interfaces enhanced by AI personalization, immersive elements, and user psychology to boost usability, engagement, and conversions."
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    variants: fadeInUp,
                    className: "flex flex-col sm:flex-row gap-6 justify-center",
                    children: [
                      /* @__PURE__ */ jsxs("button", { className: "px-12 py-6 bg-gradient-to-r from-red-600 to-red-800 rounded-full text-xl md:text-2xl font-bold shadow-2xl shadow-red-900/60 hover:shadow-red-700/80 hover:scale-105 transition-all flex items-center gap-3 group", children: [
                        "Get Free Design Consultation",
                        " ",
                        /* @__PURE__ */ jsx(ArrowRight, { className: "w-7 h-7 group-hover:translate-x-2 transition-transform" })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          className: `px-12 py-6 border-2 rounded-full text-xl md:text-2xl font-bold transition-all
              ${isDark ? "border-red-600/70 text-red-400 hover:bg-red-950/50" : "border-red-600 text-red-600 hover:bg-red-50"}`,
                          children: "Free UX Audit"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-16 ${headingClass}`,
                  children: [
                    "Why Choose",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "AI Knots IT Solutions" }),
                    "?"
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: whyChoose.map((item, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 50 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: cardClass,
                  children: [
                    /* @__PURE__ */ jsx(
                      item.icon,
                      {
                        className: `w-16 h-16 ${accentClass} mb-6 group-hover:scale-110 transition-transform mx-auto`
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: `text-2xl font-bold mb-4 text-center ${headingClass}`,
                        children: item.title
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: `text-center ${bodyClass}`, children: item.desc })
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/40" : "bg-gray-100"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-16 ${headingClass}`,
                  children: [
                    "Our ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "UI/UX Design Services" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: services.map((serv, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 50 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: cardClass,
                  children: [
                    /* @__PURE__ */ jsx(
                      serv.icon,
                      {
                        className: `w-16 h-16 ${accentClass} mb-6 mx-auto group-hover:scale-110 transition-transform`
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: `text-2xl font-bold mb-4 text-center ${headingClass}`,
                        children: serv.title
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: `text-center ${bodyClass}`, children: serv.desc })
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-20 px-4 sm:px-6 lg:px-8 ${isDark ? "" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto text-center", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-5xl font-black mb-12 ${headingClass}`,
                  children: [
                    "Our Expertise in ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "UI/UX Design" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-xl mb-10 max-w-4xl mx-auto ${bodyClass}`,
                  children: "Strong capabilities in wireframing, prototyping, user research, visual design, and branding – enhanced with 2026 trends like AI collaboration and multimodal interfaces."
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-6 md:gap-10", children: tools.map((tool, idx) => /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: `px-8 py-4 text-xl font-semibold rounded-xl border transition-all
                  ${isDark ? "bg-gray-800/60 border-red-900/30 hover:border-red-500/50" : "bg-white border-gray-300 hover:border-red-500"}`,
                  children: tool
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/50" : "bg-gray-100"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-16 ${headingClass}`,
                  children: [
                    "What Makes AI Knots a",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Trusted UI/UX Partner" }),
                    "?"
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: trustedPoints.map((point, idx) => /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: cardClass,
                  children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4", children: [
                    /* @__PURE__ */ jsx(
                      CheckCircle2,
                      {
                        className: `w-8 h-8 ${accentClass} flex-shrink-0`
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: `text-lg font-semibold ${bodyClass}`, children: point })
                  ] })
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-16 ${headingClass}`,
                  children: [
                    "Why ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "UI/UX Design" }),
                    " Matters in 2026"
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: importance.map((item, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 50 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: cardClass,
                  children: [
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: `text-2xl font-bold mb-4 text-center ${headingClass}`,
                        children: item.title
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: `text-center ${bodyClass}`, children: item.desc })
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-20 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/40" : "bg-gray-100"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto text-center", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-5xl font-black mb-12 ${headingClass}`,
                  children: [
                    "Industries We ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Serve" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: industries.map((ind, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 50 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: cardClass,
                  children: [
                    /* @__PURE__ */ jsx(
                      ind.icon,
                      {
                        className: `w-16 h-16 ${accentClass} mb-6 group-hover:scale-110 transition-transform mx-auto`
                      }
                    ),
                    /* @__PURE__ */ jsx("h3", { className: `text-2xl font-bold mb-4 ${headingClass}`, children: ind.title }),
                    /* @__PURE__ */ jsx("p", { className: `text-center ${bodyClass}`, children: ind.desc })
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gradient-to-b from-black to-gray-950" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black text-center mb-16 ${headingClass}`,
                  children: [
                    "Frequently Asked ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Questions" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "space-y-4", children: faqs.map((faq, idx) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.1 },
                  className: `border rounded-xl overflow-hidden transition-all
                  ${isDark ? "border-red-900/40 bg-gray-900/30" : "border-gray-200 bg-white shadow"}`,
                  children: [
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        onClick: () => setOpenFaq(openFaq === idx ? null : idx),
                        className: `w-full px-8 py-6 text-left flex justify-between items-center transition-colors
                    ${isDark ? "hover:bg-gray-800/50" : "hover:bg-gray-100"}`,
                        children: [
                          /* @__PURE__ */ jsx("span", { className: `text-xl font-bold ${headingClass}`, children: faq.q }),
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: `text-red-500 text-2xl transition-transform ${openFaq === idx ? "rotate-180" : ""}`,
                              children: "▼"
                            }
                          )
                        ]
                      }
                    ),
                    openFaq === idx && /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `px-8 pb-8 pt-2 leading-relaxed ${bodyClass}`,
                        children: faq.a
                      }
                    )
                  ]
                },
                idx
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "section",
          {
            className: `py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gradient-to-br from-red-950/30 to-black" : "bg-red-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto text-center", children: [
              /* @__PURE__ */ jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-4xl md:text-6xl font-black mb-8 ${headingClass}`,
                  children: [
                    "Let’s Build Something ",
                    /* @__PURE__ */ jsx("span", { className: accentClass, children: "Amazing" }),
                    " ",
                    "Together"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: `text-xl md:text-2xl mb-10 max-w-3xl mx-auto ${bodyClass}`,
                  children: "Looking for a UI/UX design company that delivers creativity, performance, and real business results? AI Knots IT Solutions is your partner."
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.button,
                {
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.98 },
                  className: "px-14 py-7 bg-gradient-to-r from-red-600 to-red-800 rounded-full text-2xl md:text-3xl font-black shadow-2xl shadow-red-900/60 hover:shadow-red-700/80 transition-all flex items-center gap-4 mx-auto",
                  children: [
                    "Contact Us Today ",
                    /* @__PURE__ */ jsx(ArrowRight, { className: "w-8 h-8" })
                  ]
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: scrollToTop,
            className: `fixed bottom-6 right-6 z-50 p-4 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/50 transition-all duration-300 hover:scale-110 active:scale-95 ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"}`,
            "aria-label": "Scroll back to top",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-6 h-6",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                xmlns: "http://www.w3.org/2000/svg",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 10l7-7m0 0l7 7m-7-7v18"
                  }
                )
              }
            )
          }
        )
      ]
    }
  );
}
const PrivacyPolicy = () => {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);
  const accentClass = "text-red-500";
  const headingClass = isDark ? "text-white" : "text-gray-900";
  const bodyClass = isDark ? "text-gray-300" : "text-gray-700";
  const cardClass = isDark ? "bg-gray-900/80 backdrop-blur-xl border border-gray-700/80" : "bg-white border border-gray-200 shadow-sm";
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `min-h-screen transition-colors duration-700
      ${isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`,
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 lg:px-8 py-20", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-px bg-red-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-red-400 uppercase tracking-[3px] text-sm font-medium", children: "Legal" }),
            /* @__PURE__ */ jsx("div", { className: "w-8 h-px bg-red-500" })
          ] }),
          /* @__PURE__ */ jsx(
            "h1",
            {
              className: `text-5xl md:text-6xl font-bold tracking-tighter mb-3 ${headingClass}`,
              children: "Privacy Policy"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-[15.8px] leading-relaxed space-y-12", children: [
          /* @__PURE__ */ jsxs(
            "p",
            {
              className: `text-lg ${isDark ? "text-gray-200" : "text-gray-700"}`,
              children: [
                "At",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-red-400 font-medium", children: "AI Knots IT Solution" }),
                ", we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website, request services, or interact with us."
              ]
            }
          ),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "1. Information We Collect" }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
              /* @__PURE__ */ jsxs("div", { className: `p-7 rounded-2xl ${cardClass}`, children: [
                /* @__PURE__ */ jsx("h3", { className: `text-xl font-medium mb-4 ${headingClass}`, children: "Personal Information" }),
                /* @__PURE__ */ jsxs("ul", { className: `space-y-3 ${bodyClass}`, children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-red-500 mt-1", children: "•" }),
                    " Name, email address, phone number, and company details"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-red-500 mt-1", children: "•" }),
                    " Project requirements, business needs, and inquiry details"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-red-500 mt-1", children: "•" }),
                    " Payment and billing information (processed securely via third-party gateways)"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: `p-7 rounded-2xl ${cardClass}`, children: [
                /* @__PURE__ */ jsx("h3", { className: `text-xl font-medium mb-4 ${headingClass}`, children: "Technical Information" }),
                /* @__PURE__ */ jsxs("ul", { className: `space-y-3 ${bodyClass}`, children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-red-500 mt-1", children: "•" }),
                    " IP address, browser type, device, and operating system"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-red-500 mt-1", children: "•" }),
                    " Website usage data, pages visited, and session duration"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-red-500 mt-1", children: "•" }),
                    " Cookies and similar tracking technologies"
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "2. How We Use Your Information" }),
            /* @__PURE__ */ jsx("p", { className: `mb-5 ${bodyClass}`, children: "We use your data to deliver excellent service and improve your experience:" }),
            /* @__PURE__ */ jsx("div", { className: `space-y-4 pl-2 ${bodyClass}`, children: [
              "Provide software development, digital marketing, web design, and IT consulting services",
              "Respond to your inquiries, prepare proposals, and communicate about projects",
              "Send important updates, service information, and occasional promotional content",
              "Analyze website performance and enhance user experience",
              "Comply with legal obligations and ensure security"
            ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 text-sm font-medium shrink-0 mt-0.5", children: [
                "0",
                i + 1
              ] }),
              /* @__PURE__ */ jsx("p", { children: item })
            ] }, i)) })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "3. Data Sharing & Third Parties" }),
            /* @__PURE__ */ jsx("p", { className: bodyClass, children: "We do not sell your personal data. We may share information only with:" }),
            /* @__PURE__ */ jsxs("ul", { className: `list-disc pl-6 space-y-2 mt-4 ${bodyClass}`, children: [
              /* @__PURE__ */ jsx("li", { children: "Trusted service providers (cloud hosting, analytics, payment processors, email tools)" }),
              /* @__PURE__ */ jsx("li", { children: "Legal authorities when required by law" }),
              /* @__PURE__ */ jsx("li", { children: "Business partners in case of merger, acquisition, or company restructuring" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "4. Your Rights (DPDP Act, 2023)" }),
            /* @__PURE__ */ jsx("p", { className: `mb-6 ${bodyClass}`, children: "As per the Digital Personal Data Protection Act, you have the right to:" }),
            /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              "Access and obtain a copy of your personal data",
              "Correct inaccurate or incomplete data",
              "Request deletion or withdrawal of consent",
              "File a grievance with our Data Protection Officer"
            ].map((right, i) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: `p-5 rounded-xl flex items-start gap-3 ${cardClass}`,
                children: [
                  /* @__PURE__ */ jsx("span", { className: "text-red-400 text-xl", children: "✓" }),
                  /* @__PURE__ */ jsx("p", { className: bodyClass, children: right })
                ]
              },
              i
            )) }),
            /* @__PURE__ */ jsxs("p", { className: `mt-6 ${accentClass}`, children: [
              "To exercise any of these rights, email us at",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "mailto:support@atlaknots.com",
                  className: "underline hover:text-red-300",
                  children: "support@atlaknots.com"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "5. Data Security & Retention" }),
            /* @__PURE__ */ jsx("p", { className: bodyClass, children: "We use industry-standard security measures to protect your data. We retain your personal information only as long as necessary for the purposes mentioned or as required by law." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "6. Cookies" }),
            /* @__PURE__ */ jsx("p", { className: bodyClass, children: "Our website uses cookies to improve functionality and analyze traffic. You can manage your cookie preferences through your browser settings at any time." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "7. Changes to This Policy" }),
            /* @__PURE__ */ jsx("p", { className: bodyClass, children: "We may update this Privacy Policy occasionally. Any changes will be posted on this page with the updated date. We encourage you to review it periodically." })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `p-8 md:p-10 rounded-3xl mt-12 ${cardClass} border ${isDark ? "border-red-900/30" : "border-red-200"}`,
              children: [
                /* @__PURE__ */ jsx("h3", { className: `text-2xl font-semibold mb-6 ${headingClass}`, children: "Questions or Concerns?" }),
                /* @__PURE__ */ jsx("p", { className: `mb-6 ${bodyClass}`, children: "If you have any questions about this Privacy Policy, please feel free to contact us." }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-6 text-sm", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Email" }),
                    /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: "mailto:support@atlaknots.com",
                        className: `hover:underline ${accentClass}`,
                        children: "support@atlaknots.com"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Phone" }),
                    /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: "tel:+917869636070",
                        className: `hover:underline ${accentClass}`,
                        children: "+91 78696 36070"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Location" }),
                    /* @__PURE__ */ jsx("p", { children: "Bhopal, Madhya Pradesh, India" })
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: `text-center text-sm pt-10 border-t ${isDark ? "border-zinc-800 text-gray-500" : "border-gray-200 text-gray-500"}`,
              children: "By using our website and services, you acknowledge that you have read, understood, and agree to this Privacy Policy."
            }
          )
        ] })
      ] })
    }
  );
};
const CookiePolicy = () => {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);
  const accentClass = "text-red-500";
  const headingClass = isDark ? "text-white" : "text-gray-900";
  const bodyClass = isDark ? "text-gray-300" : "text-gray-700";
  const cardClass = isDark ? "bg-gray-900/80 backdrop-blur-xl border border-gray-700/80" : "bg-white border border-gray-200 shadow-sm";
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `min-h-screen transition-colors duration-700
      ${isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`,
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 lg:px-8 py-20", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-px bg-red-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-red-400 uppercase tracking-[3px] text-sm font-medium", children: "Legal" }),
            /* @__PURE__ */ jsx("div", { className: "w-8 h-px bg-red-500" })
          ] }),
          /* @__PURE__ */ jsx(
            "h1",
            {
              className: `text-5xl md:text-6xl font-bold tracking-tighter mb-3 ${headingClass}`,
              children: "Cookie Policy"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-[15.8px] leading-relaxed space-y-12", children: [
          /* @__PURE__ */ jsxs(
            "p",
            {
              className: `text-lg ${isDark ? "text-gray-200" : "text-gray-700"}`,
              children: [
                "At",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-red-400 font-medium", children: "AI Knots IT Solution" }),
                ", we use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and provide personalized services. This Cookie Policy explains what cookies are, how we use them, and how you can manage them."
              ]
            }
          ),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "1. What Are Cookies?" }),
            /* @__PURE__ */ jsx("p", { className: bodyClass, children: "Cookies are small text files that are stored on your device (computer, smartphone, or tablet) when you visit a website. They help the website remember your preferences, improve functionality, and provide insights into how the website is used." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "2. Types of Cookies We Use" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
              /* @__PURE__ */ jsxs("div", { className: `p-7 rounded-2xl ${cardClass}`, children: [
                /* @__PURE__ */ jsx("h3", { className: `text-xl font-medium mb-3 ${headingClass}`, children: "Essential Cookies" }),
                /* @__PURE__ */ jsx("p", { className: bodyClass, children: "These cookies are necessary for the website to function properly. They enable core functionalities like page navigation, security, and access to secure areas. You cannot opt-out of these cookies." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: `p-7 rounded-2xl ${cardClass}`, children: [
                /* @__PURE__ */ jsx("h3", { className: `text-xl font-medium mb-3 ${headingClass}`, children: "Performance & Analytics Cookies" }),
                /* @__PURE__ */ jsx("p", { className: bodyClass, children: "These cookies help us understand how visitors interact with our website. We use tools like Google Analytics to collect information such as pages visited, time spent, and bounce rates. This helps us improve our website and services." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: `p-7 rounded-2xl ${cardClass}`, children: [
                /* @__PURE__ */ jsx("h3", { className: `text-xl font-medium mb-3 ${headingClass}`, children: "Functional Cookies" }),
                /* @__PURE__ */ jsx("p", { className: bodyClass, children: "These cookies allow the website to remember your choices (such as language preference or region) and provide enhanced, personalized features." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: `p-7 rounded-2xl ${cardClass}`, children: [
                /* @__PURE__ */ jsx("h3", { className: `text-xl font-medium mb-3 ${headingClass}`, children: "Marketing & Advertising Cookies" }),
                /* @__PURE__ */ jsx("p", { className: bodyClass, children: "These cookies are used to deliver relevant advertisements and track the effectiveness of our marketing campaigns. They may also be used by third-party advertising networks." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "3. Third-Party Cookies" }),
            /* @__PURE__ */ jsx("p", { className: bodyClass, children: "We may use third-party services (such as Google Analytics, Facebook Pixel, or payment gateways) that set their own cookies when you visit our website. These cookies are governed by the respective third parties' privacy policies." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "4. How to Manage Cookies" }),
            /* @__PURE__ */ jsx("p", { className: `mb-6 ${bodyClass}`, children: "You can control and manage cookies in several ways:" }),
            /* @__PURE__ */ jsx("div", { className: `p-7 md:p-10 rounded-3xl ${cardClass}`, children: /* @__PURE__ */ jsxs("ul", { className: `list-disc pl-6 space-y-4 ${bodyClass}`, children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Browser Settings:" }),
                " Most browsers allow you to block or delete cookies. Please note that disabling essential cookies may affect the functionality of our website."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Cookie Consent Banner:" }),
                " When you first visit our website, you will see a cookie consent banner where you can accept or customize your preferences."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Opt-out Options:" }),
                " You can opt-out of analytics and marketing cookies through the consent manager."
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "5. Updates to This Cookie Policy" }),
            /* @__PURE__ */ jsx("p", { className: bodyClass, children: 'We may update this Cookie Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page with the revised "Last updated" date. We encourage you to review this page periodically.' })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "6. Contact Us" }),
            /* @__PURE__ */ jsx("p", { className: `mb-6 ${bodyClass}`, children: "If you have any questions about our use of cookies or this Cookie Policy, please feel free to contact us:" }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `p-8 md:p-10 rounded-3xl ${cardClass} border ${isDark ? "border-red-900/30" : "border-red-200"}`,
                children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-8 text-sm", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Email" }),
                    /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: "mailto:support@atlaknots.com",
                        className: `hover:underline ${accentClass}`,
                        children: "support@atlaknots.com"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Phone" }),
                    /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: "tel:+917869636070",
                        className: `hover:underline ${accentClass}`,
                        children: "+91 78696 36070"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Address" }),
                    /* @__PURE__ */ jsx("p", { children: "Bhopal, Madhya Pradesh, India" })
                  ] })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: `text-center text-sm pt-10 border-t ${isDark ? "border-zinc-800 text-gray-500" : "border-gray-200 text-gray-500"}`,
              children: "By continuing to use our website, you consent to the use of cookies as described in this Cookie Policy."
            }
          )
        ] })
      ] })
    }
  );
};
const TermsOfService = () => {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);
  const accentClass = "text-red-500";
  const headingClass = isDark ? "text-white" : "text-gray-900";
  const bodyClass = isDark ? "text-gray-300" : "text-gray-700";
  const cardClass = isDark ? "bg-gray-900/80 backdrop-blur-xl border border-gray-700/80" : "bg-white border border-gray-200 shadow-sm";
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `min-h-screen transition-colors duration-700
      ${isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`,
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 lg:px-8 py-20", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-px bg-red-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-red-400 uppercase tracking-[3px] text-sm font-medium", children: "Legal" }),
            /* @__PURE__ */ jsx("div", { className: "w-8 h-px bg-red-500" })
          ] }),
          /* @__PURE__ */ jsx(
            "h1",
            {
              className: `text-5xl md:text-6xl font-bold tracking-tighter mb-3 ${headingClass}`,
              children: "Terms of Service"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-[15.8px] leading-relaxed space-y-12", children: [
          /* @__PURE__ */ jsxs(
            "p",
            {
              className: `text-lg ${isDark ? "text-gray-200" : "text-gray-700"}`,
              children: [
                "Welcome to",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-red-400 font-medium", children: "AI Knots IT Solution" }),
                ". These Terms of Service govern your use of our website and the IT services we provide. By accessing or using our services, you agree to be bound by these terms."
              ]
            }
          ),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "1. Acceptance of Terms" }),
            /* @__PURE__ */ jsx("p", { className: bodyClass, children: "By visiting our website, requesting a quote, or engaging with our services (Software Development, Digital Marketing, Web Design, Mobile App Development, etc.), you accept these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "2. Our Services" }),
            /* @__PURE__ */ jsx("p", { className: `mb-4 ${bodyClass}`, children: "AI Knots provides the following professional IT services:" }),
            /* @__PURE__ */ jsx("ul", { className: `grid sm:grid-cols-2 gap-3 ${bodyClass}`, children: [
              "Custom Software Development",
              "Mobile App Development (Android & iOS)",
              "E-commerce Website Development",
              "UI/UX Design & Branding",
              "Digital Marketing (SEO, SMM, PPC)",
              "Cloud Solutions & ERP Development",
              "AI & Machine Learning Solutions",
              "Website Design & Maintenance"
            ].map((service, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "✔" }),
              " ",
              service
            ] }, i)) })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "3. Client Responsibilities" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-4 pl-2", children: [
              "Provide accurate and complete information required for project execution",
              "Make timely payments as per the agreed payment schedule",
              "Give timely feedback and approvals to avoid project delays",
              "Ensure you have the necessary rights to any content or materials provided to us"
            ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 text-sm font-medium shrink-0 mt-0.5", children: i + 1 }),
              /* @__PURE__ */ jsx("p", { className: bodyClass, children: item })
            ] }, i)) })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "4. Payment Terms" }),
            /* @__PURE__ */ jsxs("div", { className: `space-y-4 ${bodyClass}`, children: [
              /* @__PURE__ */ jsx("p", { children: "• We require 40-50% advance payment before starting any project (unless otherwise agreed)." }),
              /* @__PURE__ */ jsx("p", { children: "• Remaining payment will be milestone-based or upon project completion." }),
              /* @__PURE__ */ jsx("p", { children: "• All payments are non-refundable except as per our Refund Policy mentioned below." }),
              /* @__PURE__ */ jsx("p", { children: "• Late payments may attract 1.5% monthly interest." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "5. Project Timeline & Delivery" }),
            /* @__PURE__ */ jsx("p", { className: bodyClass, children: "Project timelines are estimates and may vary due to scope changes, delayed feedback, or unforeseen circumstances. We will keep you informed of any delays and provide revised timelines." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "6. Intellectual Property" }),
            /* @__PURE__ */ jsx("p", { className: bodyClass, children: "Once full payment is received, all rights to the final deliverables (website, software, designs, etc.) will be transferred to you. However, we retain the right to showcase the project in our portfolio unless a Non-Disclosure Agreement (NDA) is signed." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "7. Refund & Cancellation Policy" }),
            /* @__PURE__ */ jsxs("ul", { className: `list-disc pl-6 space-y-2 ${bodyClass}`, children: [
              /* @__PURE__ */ jsx("li", { children: "No refund after project initiation or any milestone payment." }),
              /* @__PURE__ */ jsx("li", { children: "Partial refund may be considered only in exceptional cases before work begins (subject to 10-15% cancellation fee)." }),
              /* @__PURE__ */ jsx("li", { children: "Refund requests must be made in writing within 7 days of payment." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "8. Limitation of Liability" }),
            /* @__PURE__ */ jsx("p", { className: bodyClass, children: "AI Knots shall not be liable for any indirect, incidental, special, or consequential damages arising out of the use of our services. Our total liability shall not exceed the total amount paid by you for the specific service." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "9. Termination" }),
            /* @__PURE__ */ jsx("p", { className: bodyClass, children: "We reserve the right to terminate or suspend services if you breach any terms, fail to make payments, or engage in illegal activities. You may also request termination with proper notice." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "10. Governing Law" }),
            /* @__PURE__ */ jsx("p", { className: bodyClass, children: "These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bhopal, Madhya Pradesh." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: `text-3xl font-semibold mb-5 ${headingClass}`, children: "11. Changes to Terms" }),
            /* @__PURE__ */ jsx("p", { className: bodyClass, children: "We may update these Terms of Service from time to time. Continued use of our services after changes constitutes your acceptance of the new terms." })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `p-8 md:p-10 rounded-3xl mt-12 ${cardClass} border ${isDark ? "border-red-900/30" : "border-red-200"}`,
              children: [
                /* @__PURE__ */ jsx("h3", { className: `text-2xl font-semibold mb-6 ${headingClass}`, children: "Questions or Concerns?" }),
                /* @__PURE__ */ jsx("p", { className: `mb-6 ${bodyClass}`, children: "If you have any questions about these Terms of Service, please feel free to contact us." }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-6 text-sm", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Email" }),
                    /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: "mailto:support@atlaknots.com",
                        className: `hover:underline ${accentClass}`,
                        children: "support@atlaknots.com"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Phone" }),
                    /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: "tel:+917869636070",
                        className: `hover:underline ${accentClass}`,
                        children: "+91 78696 36070"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Location" }),
                    /* @__PURE__ */ jsx("p", { children: "Bhopal, Madhya Pradesh, India" })
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: `text-center text-sm pt-10 border-t ${isDark ? "border-zinc-800 text-gray-500" : "border-gray-200 text-gray-500"}`,
              children: "By using our website and services, you acknowledge that you have read, understood, and agree to these Terms of Service."
            }
          )
        ] })
      ] })
    }
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: /* @__PURE__ */ jsx(Layout, {}),
    children: [
      { index: true, element: /* @__PURE__ */ jsx(Home, {}) },
      { path: "home", element: /* @__PURE__ */ jsx(Home, {}) },
      { path: "about", element: /* @__PURE__ */ jsx(About, {}) },
      { path: "service", element: /* @__PURE__ */ jsx(Service, {}) },
      { path: "contact", element: /* @__PURE__ */ jsx(Contact, {}) },
      // Mobile & Fitness
      { path: "mobile", element: /* @__PURE__ */ jsx(FitnessMobile, {}) },
      { path: "mobile-onboarding", element: /* @__PURE__ */ jsx(MobileOnboarding, {}) },
      { path: "fitness", element: /* @__PURE__ */ jsx(FitnessMobile, {}) },
      // Technology
      { path: "technology", element: /* @__PURE__ */ jsx(Technology, {}) },
      { path: "technews", element: /* @__PURE__ */ jsx(TechNews, {}) },
      { path: "technology/:slug", element: /* @__PURE__ */ jsx(TechnologyDetail, {}) },
      // Work & Career
      { path: "recentwork", element: /* @__PURE__ */ jsx(RecentWork, {}) },
      { path: "careers", element: /* @__PURE__ */ jsx(CareerPage, {}) },
      { path: "gallery", element: /* @__PURE__ */ jsx(Gallery, {}) },
      { path: "portfolio", element: /* @__PURE__ */ jsx(Portfolio, {}) },
      // Blog
      { path: "blog", element: /* @__PURE__ */ jsx(Blog, {}) },
      { path: "blog/:slug", element: /* @__PURE__ */ jsx(BlogDetail, {}) },
      // Services
      { path: "digital-marketing", element: /* @__PURE__ */ jsx(DigitalMarketing, {}) },
      { path: "seo", element: /* @__PURE__ */ jsx(SEO, {}) },
      { path: "graphics", element: /* @__PURE__ */ jsx(GraphicDesigning, {}) },
      { path: "graphicdesign", element: /* @__PURE__ */ jsx(GraphicDesigning, {}) },
      { path: "software", element: /* @__PURE__ */ jsx(SoftwareDevelopment, {}) },
      { path: "mobiledevelopment", element: /* @__PURE__ */ jsx(MobileAppDevelopment, {}) },
      { path: "erpdevelopment", element: /* @__PURE__ */ jsx(ERPDevelopment, {}) },
      { path: "ecommercedevelopment", element: /* @__PURE__ */ jsx(EcommerceDevelopment, {}) },
      { path: "cloudsolutions", element: /* @__PURE__ */ jsx(CloudSolutions, {}) },
      { path: "ai-mlservice", element: /* @__PURE__ */ jsx(AIServices, {}) },
      { path: "paidadv", element: /* @__PURE__ */ jsx(PaidAdvertising, {}) },
      { path: "localmarketing", element: /* @__PURE__ */ jsx(LocalMarketing, {}) },
      { path: "socialmediamarketing", element: /* @__PURE__ */ jsx(SocialMediaMarketing, {}) },
      { path: "contentwritingbranding", element: /* @__PURE__ */ jsx(ContentWritingBranding, {}) },
      { path: "websitedesigndevelopment", element: /* @__PURE__ */ jsx(WebsiteDesignDevelopment, {}) },
      { path: "uidesign", element: /* @__PURE__ */ jsx(UiUxDesign, {}) },
      // Legal Pages
      { path: "privacypolicy", element: /* @__PURE__ */ jsx(PrivacyPolicy, {}) },
      { path: "cookiepolicy", element: /* @__PURE__ */ jsx(CookiePolicy, {}) },
      { path: "termsofservice", element: /* @__PURE__ */ jsx(TermsOfService, {}) }
    ]
  }
]);
const App = () => {
  return /* @__PURE__ */ jsx(RouterProvider, { router });
};
const store = configureStore({
  reducer: {
    technology: technologyReducer,
    techNews: techNewsReducer,
    contact: contactReducer,
    blog: blogReducer,
    portfolio: portfolioReducer
    // other reducers...
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
    // optional - if you have non-serializable data
  })
  // devTools: process.env.NODE_ENV !== 'production', // optional
});
const app = /* @__PURE__ */ jsx(Provider, { store, children: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx(App, {}) }) }) });
if (typeof window !== "undefined") {
  createRoot(document.getElementById("root")).render(app);
}
export {
  app as default
};
