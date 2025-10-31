import Layout from "@/components/Layout";
import { Shield, Mail } from "lucide-react";

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-md">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Privacy Policy — ReBooked Living</h1>
              <div className="text-sm text-muted-foreground">Last Updated: 31 October 2025</div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>1. Introduction</h2>
            <p>
              ReBooked Living ("ReBooked Living", "we", "us", "our") is a platform owned and operated by ReBooked Solutions (Pty) Ltd, a South African company ("ReBooked Solutions").
              This Privacy Policy explains how we collect, use, share, and protect your personal information in accordance with the Protection of Personal Information Act (POPIA) and other applicable South African privacy laws.
            </p>
            <p>By using www.rebookedliving.com (the "Site"), you agree to this Privacy Policy.</p>

            <h3>Contact Information</h3>
            <p>
              Data Protection &amp; Legal: <a href="mailto:legal@rebookedsolutions.co.za" className="text-primary underline">legal@rebookedsolutions.co.za</a><br />
              Support: <a href="mailto:support@rebookedsolutions.co.za" className="text-primary underline">support@rebookedsolutions.co.za</a><br />
              Company: ReBooked Solutions (Pty) Ltd
            </p>

            <h2>2. Information We Collect</h2>
            <h3>A. Personal Information</h3>
            <ul>
              <li>Full name and surname</li>
              <li>Email address</li>
              <li>University or institution name</li>
            </ul>

            <h3>B. Automatically Collected Information</h3>
            <ul>
              <li>IP address and browser type</li>
              <li>Device information</li>
              <li>Pages visited and session activity</li>
              <li>Cookies and analytics data (including Google Ads cookies)</li>
            </ul>

            <h3>C. University Data</h3>
            <p>
              We collect and display PDFs, accreditation documents, and public accommodation lists issued by South African universities. These materials are published publicly by the universities, and we display them for informational and reference purposes only. We do not alter the content of university-issued documents except for formatting or display purposes.
            </p>

            <h2>3. Purpose of Processing</h2>
            <p>We process information for:</p>
            <ul>
              <li>Displaying accredited student accommodation listings</li>
              <li>Managing user accounts and inquiries</li>
              <li>Sending updates and service notices</li>
              <li>Displaying Google Ads and measuring ad performance</li>
              <li>Improving our website and user experience</li>
              <li>Legal compliance and fraud prevention</li>
            </ul>

            <h2>4. Google Ads &amp; Cookies</h2>
            <p>
              We use Google Ads and Analytics to display and measure advertising on our platform. Cookies are used to maintain essential site functionality, analyse site usage, and deliver relevant advertisements. You can manage or disable cookies in your browser or Google’s ad settings.
            </p>

            <h2>5. Data Sharing</h2>
            <p>We may share limited data with:</p>
            <ul>
              <li>Trusted service providers under confidentiality agreements</li>
              <li>Google Ads / Analytics for advertising and measurement</li>
              <li>Universities or accommodation providers for verification</li>
              <li>Law enforcement if required by law</li>
            </ul>
            <p>We do not sell your data for monetary gain.</p>

            <h2>6. Data Retention</h2>
            <p>We retain personal information only as long as needed for the purposes above or required by law:</p>
            <ul>
              <li>Account information: kept until deletion</li>
              <li>Analytics: retained up to 24 months</li>
              <li>Support emails: retained for up to 2 years</li>
            </ul>

            <h2>7. Security</h2>
            <p>We use encryption, secure hosting, and strict access controls to protect personal information. However, no system is 100% secure, and we cannot guarantee absolute protection against unauthorized access.</p>

            <h2>8. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct or delete inaccurate data</li>
              <li>Withdraw consent where applicable</li>
              <li>Object to processing for direct marketing</li>
              <li>Lodge a complaint with the Information Regulator of South Africa</li>
            </ul>
            <p>For all privacy requests: <a href="mailto:legal@rebookedsolutions.co.za" className="text-primary underline">legal@rebookedsolutions.co.za</a></p>

            <h2>9. Third-Party Links</h2>
            <p>Our Site contains links to third-party websites (universities, advertisers, accommodation providers). We are not responsible for their privacy practices or content. Always review their own privacy policies.</p>

            <h2>10. Children’s Privacy</h2>
            <p>Our services are intended for users 18 years and older. We do not knowingly collect information from minors.</p>

            <h2>11. Disclaimer on Information Validity</h2>
            <p>
              While ReBooked Living strives to ensure accuracy of displayed accommodations and university accreditation data, we cannot guarantee that any information shown on our platform is accurate, up-to-date, or valid. All accommodation details, accreditation status, contact information, and pricing are subject to change by third parties (universities or property owners) without notice. Users are strongly advised to verify all information directly with the university or accommodation provider before taking any action, making payments, or entering agreements.
            </p>

            <h2>12. Changes to this Policy</h2>
            <p>We may update this Privacy Policy periodically. Updates will be posted on this page with a new "Last Updated" date. Continued use of the Site after changes means acceptance of the updated policy.</p>

            <h2>13. Contact</h2>
            <p>
              Legal inquiries: <a href="mailto:legal@rebookedsolutions.co.za" className="text-primary underline">legal@rebookedsolutions.co.za</a><br />
              Support: <a href="mailto:support@rebookedsolutions.co.za" className="text-primary underline">support@rebookedsolutions.co.za</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
