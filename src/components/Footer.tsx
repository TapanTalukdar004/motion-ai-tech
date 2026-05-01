import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface-container-low border-t-0 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h3 className="font-heading font-bold text-2xl text-on-surface">Motion AI & Tech</h3>
            <p className="text-on-surface-variant max-w-sm body-md">
              The Kinetic Laboratory. Empowering the next generation through robotics, engineering, and AI-driven education.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-lg text-on-surface">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="/courses" className="text-on-surface-variant hover:text-primary transition-colors">Browse Courses</Link></li>
              <li><Link href="/about" className="text-on-surface-variant hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/dashboard" className="text-on-surface-variant hover:text-primary transition-colors">Student Dashboard</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-lg text-on-surface">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant text-sm">
            © {new Date().getFullYear()} Motion AI & Tech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
