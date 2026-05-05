export const parsingService = {
  parseLinkedInUrl: (url: string) => {
    // Improved Mock parsing logic
    // Real-world implementation would use a specialized API (e.g., Proxycurl, ScrapingFish)
    // because direct browser scraping of LinkedIn is blocked by CORS/anti-bot measures.
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/').filter(Boolean);
      
      let name = "New Contact";
      if (pathParts[0] === 'in' && pathParts[1]) {
        // LinkedIn slugs can be: 'john-doe' or 'john-doe-12345af'
        // We try to remove the trailing alphanumeric ID common in many slugs
        let slug = pathParts[1];
        
        // Split by dashes and filter out the last part if it looks like a hash/id 
        // (usually alphanumeric, often 8+ chars or just numbers)
        const parts = slug.split('-');
        if (parts.length > 1) {
          const lastPart = parts[parts.length - 1];
          // If the last part is mostly digits or a mix of letters and numbers (common for IDs)
          if (/^[a-z0-9]{5,}$/i.test(lastPart) && (/\d/.test(lastPart) || lastPart.length > 8)) {
            parts.pop();
          }
        }
        
        name = parts
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
      }

      // Removed random mock companies/roles to avoid misleading users.
      // Real-world role/company extraction requires a paid enrichment API (CORS prevents direct scraping).
      return {
        name: name || "",
        role: "",
        company: ""
      };
    } catch (e) {
      return {
        name: "",
        role: "",
        company: ""
      };
    }
  }
};
