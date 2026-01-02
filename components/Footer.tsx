const Footer = () => {
  return (
    <footer className="w-full py-6 px-6 md:px-16 text-gray-400 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <span>
          © {new Date().getFullYear()} TrustNet AI. All rights reserved.
        </span>

        <span className="text-gray-500">Built with AI & Blockchain</span>
      </div>
    </footer>
  );
};

export default Footer;
