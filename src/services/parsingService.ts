export const parsingService = {
  parseLinkedInUrl: (url: string) => {
    // Mock parsing logic
    // In a real app, this might call a backend that scrapes or uses an API
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/').filter(Boolean);
      
      // Try to get a name from the slug (e.g., linkedin.com/in/john-doe)
      let name = "Unknown Contact";
      if (pathParts[0] === 'in' && pathParts[1]) {
        name = pathParts[1]
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }

      // Randomly assign some mock data if it's a generic URL
      // In a real app, we'd extract this from the profile
      const companies = ["Google", "Meta", "Stripe", "Airbnb", "OpenAI", "Tesla"];
      const roles = ["Software Engineer", "Product Manager", "Recruiter", "Hiring Manager", "Designer", "Data Scientist"];
      
      return {
        name,
        role: roles[Math.floor(Math.random() * roles.length)],
        company: companies[Math.floor(Math.random() * companies.length)]
      };
    } catch (e) {
      return {
        name: "New Contact",
        role: "Professional",
        company: "Target Company"
      };
    }
  }
};
