import footerBg from "@/assets/Footer/footerBg.jpg";
import Link from "next/link";
import LogoIcon from "@/assets/Shared/LogoIcon.png";
import Image from "next/image";
import { FaFacebookF, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer
      className="relative bg-cover bg-center bg-no-repeat bg-fixed mt-16"
      style={{
        backgroundImage: `url(${footerBg.src})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Main Footer Content */}
      <div className="relative z-10 text-white w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto py-14  px-5 xl:px-0">
          {/* Brand Info */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <Image src={LogoIcon} alt="Logo" width={45} height={45} />
              <span className="text-2xl font-bold text-primary tracking-wide josefin">
                Academix
              </span>
            </Link>
            <p className="leading-relaxed text-sm md:text-base">
              Empower your learning journey with Academix. Connect, grow, and
              unlock your full potential in our global knowledge community.
            </p>
            <div className="flex gap-4 pt-2">
              <FaFacebookF
                className="hover:text-primary cursor-pointer transition duration-200"
                size={20}
              />
              <FaLinkedin
                className="hover:text-primary cursor-pointer transition duration-200"
                size={20}
              />
              <FaYoutube
                className="hover:text-primary cursor-pointer transition duration-200"
                size={20}
              />
              <FaTwitter
                className="hover:text-primary cursor-pointer transition duration-200"
                size={20}
              />
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 josefin">Company</h4>
            <ul className="space-y-3 text-sm md:text-base">
              <li>
                <Link href="/support" className="hover:text-primary transition">
                  Support Team
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition">
                  Privacy & Policy
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 josefin">Support</h4>
            <ul className="space-y-3 text-sm md:text-base">
              <li>
                <Link
                  href="/help-center"
                  className="hover:text-primary transition"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="hover:text-primary transition"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4 josefin">Contact</h4>
            <ul className="space-y-3 text-sm md:text-base">
              <li>Email: support@academix.com</li>
              <li>Phone: +1 123 456 7890</li>
              <li>Address: 123 Learning Lane, Edu City</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full border-t border-white/20 py-6 text-center text-sm md:text-base">
          © {new Date().getFullYear()} Academix. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
