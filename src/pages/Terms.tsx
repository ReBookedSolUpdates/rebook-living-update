import Layout from "@/components/Layout";
import { FileText, Mail } from "lucide-react";

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-md">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Terms &amp; Conditions — ReBooked Living</h1>
              <div className="text-sm text-muted-foreground">Last Updated: 31 October 2025</div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>1. Overview</h2>
            <p>These Terms &amp; Conditions ("Terms") govern your use of the website ReBooked Living ("the Site"), operated by ReBooked Solutions (Pty) Ltd. By accessing or using the Site, you agree to these Terms. If you do not agree, please stop using the Site immediately.</p>

            <h2>2. Company Details</h2>
            <p>
              ReBooked Living is owned and operated by ReBooked Solutions (Pty) Ltd, a company incorporated in South Africa.<br />
              Support: <a href="mailto:support@rebookedsolutions.co.za" className="text-primary underline">support@rebookedsolutions.co.za</a><br />
              Legal: <a href="mailto:legal@rebookedsolutions.co.za" className="text-primary underline">legal@rebookedsolutions.co.za</a><br />
              Address: [Insert registered company address]
            </p>

            <h2>3. Services</h2>
            <p>ReBooked Living provides listings of university-accredited student accommodations, display of official university accreditation PDFs and listings, general contact and reference information, and advertising via Google Ads. We are not an accommodation provider, broker, or agent. We display publicly verified information only.</p>

            <h2>4. Accuracy of Information</h2>
            <p>
              ReBooked Living sources its accommodation listings from official university accreditation documents and publicly available information. While we make every effort to verify the source and accuracy, we cannot guarantee that all displayed information is accurate, current, or complete. University data, accreditation status, pricing, and availability may change without notice. Users must independently confirm details directly with the university or accommodation provider before making any bookings, payments, or other decisions.
            </p>

            <h2>5. No Liability</h2>
            <p>
              You acknowledge and agree that ReBooked Living and ReBooked Solutions shall not be held liable for any loss, damage, claim, or expense — direct or indirect — arising from your use or reliance on the Site. This includes, without limitation, financial loss, fraud, misrepresentation by third parties, inaccuracy, or omission of data. All use of the Site is at your own risk.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>All text, code, design, logos, and content on this Site are owned or licensed by ReBooked Solutions (Pty) Ltd. You may not reproduce, modify, or distribute any content without written consent.</p>

            <h2>7. User Responsibilities</h2>
            <ul>
              <li>Provide accurate information when registering or contacting us</li>
              <li>Use the Site lawfully and responsibly</li>
              <li>Not attempt to hack, scrape, or damage the Site’s functionality</li>
            </ul>

            <h2>8. Advertising &amp; Third Parties</h2>
            <p>We display advertisements (including Google Ads) and third-party links. ReBooked Solutions does not endorse any advertiser or guarantee any product or service. Any dealings you have with advertisers are solely between you and the advertiser.</p>

            <h2>9. Indemnity</h2>
            <p>You agree to indemnify and hold harmless ReBooked Solutions, its directors, employees, and affiliates from all claims, liabilities, damages, and expenses arising out of your use or misuse of the Site.</p>

            <h2>10. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, ReBooked Solutions shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from use of the Site. Total liability, if ever established, shall not exceed R1,000 or the total amount you paid to ReBooked Solutions in the previous 12 months, whichever is lower. Certain statutory rights under the Consumer Protection Act (CPA) may still apply and cannot be waived.</p>

            <h2>11. Termination</h2>
            <p>We may suspend or terminate access to the Site or any part thereof at our discretion, without notice, if we believe you have violated these Terms or applicable laws.</p>

            <h2>12. Governing Law</h2>
            <p>These Terms are governed by the laws of the Republic of South Africa. All disputes shall be resolved exclusively in South African courts.</p>

            <h2>13. Changes to Terms</h2>
            <p>We may update these Terms at any time. Updates will be posted with a new "Last Updated" date. Continued use after updates means you accept the new Terms.</p>

            <h2>14. Contact</h2>
            <p>
              Support: <a href="mailto:support@rebookedsolutions.co.za" className="text-primary underline">support@rebookedsolutions.co.za</a><br />
              Legal: <a href="mailto:legal@rebookedsolutions.co.za" className="text-primary underline">legal@rebookedsolutions.co.za</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
