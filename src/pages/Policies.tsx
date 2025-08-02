import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

export default function Policies() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Privacy Policy */}
          <section id="privacy" className="space-y-6">
            <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: December 2024</p>
            
            <div className="space-y-6 text-foreground">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <p className="mb-4">
                  At Valiblox, we collect information necessary to provide our QA analysis and validation services effectively:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact information (name, email, phone number, company details)</li>
                  <li>Project specifications and technical documentation</li>
                  <li>Design files and blueprints for analysis purposes</li>
                  <li>Communication records related to our services</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide comprehensive QA analysis and validation services</li>
                  <li>Generate detailed compliance reports and recommendations</li>
                  <li>Communicate project updates and findings</li>
                  <li>Improve our services and maintain quality standards</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                <p>
                  We implement industry-standard security measures to protect your confidential project information. 
                  All data is encrypted in transit and at rest, with strict access controls and regular security audits.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p>
                  For any privacy-related questions, please contact us at{" "}
                  <a href="mailto:privacy@valiblox.com" className="text-primary hover:underline">
                    privacy@valiblox.com
                  </a>
                </p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Terms of Service */}
          <section id="terms" className="space-y-6">
            <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: December 2024</p>
            
            <div className="space-y-6 text-foreground">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Service Agreement</h2>
                <p className="mb-4">
                  By engaging Valiblox for QA analysis and validation services, you agree to the following terms:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All project specifications must be provided accurately and completely</li>
                  <li>Design files and documentation remain your intellectual property</li>
                  <li>Our analysis and recommendations are based on provided information</li>
                  <li>Final implementation decisions remain your responsibility</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Service Delivery</h2>
                <p className="mb-4">
                  Valiblox commits to delivering:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Comprehensive QA analysis within agreed timeframes</li>
                  <li>Detailed compliance reports and actionable recommendations</li>
                  <li>Professional support throughout the validation process</li>
                  <li>Confidential handling of all project information</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                <p>
                  Our services provide analysis and recommendations based on industry standards and best practices. 
                  While we maintain the highest quality standards, final design and implementation decisions remain 
                  your responsibility.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
                <p>
                  All client-provided materials remain your property. Valiblox retains rights to methodologies, 
                  processes, and general knowledge gained through service delivery.
                </p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Cookie Policy */}
          <section id="cookies" className="space-y-6">
            <h1 className="text-4xl font-bold text-foreground">Cookie Policy</h1>
            <p className="text-muted-foreground">Last updated: December 2024</p>
            
            <div className="space-y-6 text-foreground">
              <div>
                <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
                <p>
                  Cookies are small text files stored on your device when you visit our website. 
                  They help us provide a better user experience and analyze website usage.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for website functionality and security</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  <li><strong>Marketing Cookies:</strong> Track effectiveness of our communications</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
                <p className="mb-4">
                  You can control cookies through your browser settings:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>View and delete existing cookies</li>
                  <li>Block cookies from specific websites</li>
                  <li>Block all cookies (may affect website functionality)</li>
                  <li>Set preferences for third-party cookies</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
                <p>
                  We may use third-party services for analytics and functionality. These services may 
                  set their own cookies. Please refer to their respective privacy policies for more information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
                <p>
                  We may update this cookie policy periodically. Please check this page regularly 
                  for any changes. Continued use of our website constitutes acceptance of any updates.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}