import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
} from "lucide-react";
import useFetch from "@/hooks/UseFetch";

type Props = {};

const Footer = (props: Props) => {
  const { data, isLoading, failureReason } = useFetch<any>({
    queryKey: ["settings?collection=contact"],
    endpoint: `settings?collection=contact`,
  });

  const contactInfo = data?.data[3]?.value || {
    companyName: "Egypt Travel Light",
    email: "",
    phone: "",
    address: "",
    footerDesc: "",
    whatsApp: "",
  };

  const learnMoreLinks = [
    { title: "Terms Condition", href: "/terms" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Contact", href: "/contact" },
    { title: "About Us", href: "/about" },
    { title: "FAQ", href: "/faq" },
  ];

  const countries = ["Egypt", "Saudi Arabia", "Oman", "Qatar"];

  const socialLinks = [
    { platform: "Facebook", url: "#" },
    { platform: "LinkedIn", url: "#" },
    { platform: "Instagram", url: "#" },
    { platform: "Twitter", url: "#" },
  ];

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "Facebook":
        return <Facebook className="w-6 h-6" />;
      case "LinkedIn":
        return <Linkedin className="w-6 h-6" />;
      case "Instagram":
        return <Instagram className="w-6 h-6" />;
      case "Twitter":
        return <Twitter className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-gray-800 px-8 font-sans tracking-wide mt-20">
      <div className="relative">
        <div className="bg-blue-600 rounded-md flex flex-col sm:flex-row items-center justify-between sm:px-12 px-4 py-4 absolute top-[-66px] w-full">
          <div className="text-white text-lg font-semibold mb-2 sm:mb-0">
            Looking for help?
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-white" />
              <span className="text-white">{contactInfo.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-white" />
              <span className="text-white">{contactInfo.phone}</span>
            </div>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-100 transition-colors">
              Find a branch
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 pt-24">
          <div className="text-white">{contactInfo.companyName} Logo</div>
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white">
              Learn More
            </h4>
            <ul className="space-y-4">
              {learnMoreLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-base hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white">Countries</h4>
            <ul className="space-y-4">
              {countries.map((country, index) => (
                <li key={index} className="text-gray-400 text-base">
                  {country}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white">Follow Us</h4>
            <ul className="flex items-center flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.url}
                    className="text-white hover:text-blue-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {contactInfo.footerDesc && (
          <div className="mt-8 text-gray-400 text-sm">
            <p dangerouslySetInnerHTML={{ __html: contactInfo.footerDesc }} />
          </div>
        )}
      </div>
      <div className="bg-gray-900 py-4 px-4 -mx-8 text-center mt-10">
        <p className="text-gray-400 text-base">
          © {contactInfo.companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
