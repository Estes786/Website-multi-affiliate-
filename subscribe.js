import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;

    if (!email || !email.includes('@')) {
      res.status(400).json({ message: 'Invalid email address.' });
      return;
    }

    // Store the email. For a real application, you'd use a database.
    // For this example, we'll append to a file in the project.
    // IMPORTANT: This is a simplified example and not secure for production.
    // File system access might be restricted in some environments.
    const filePath = path.join(process.cwd(), 'subscribers.txt');
    const emailEntry = `${new Date().toISOString()}: ${email}\n`;

    try {
      fs.appendFileSync(filePath, emailEntry);
      res.status(200).json({ message: 'Successfully subscribed!' });
    } catch (error) {
      console.error('Failed to save email:', error);
      res.status(500).json({ message: 'Subscription failed. Please try again.' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

