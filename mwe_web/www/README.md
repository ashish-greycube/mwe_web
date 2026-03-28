# MechWorld Eco Heat Pumps - ERPNext Website

This folder contains a complete website for MechWorld Eco Heat Pumps that can be integrated with ERPNext/Frappe.

## Installation Options

### Option 1: Place in Custom App www Folder (Recommended)

1. Copy all files from this folder to your custom Frappe app's `www` folder:
   ```
   /apps/your_custom_app/your_custom_app/www/
   ```

2. The website will be accessible at:
   ```
   https://your-site.com/your_custom_app/
   ```

3. To make it the homepage, create a `homepage.py` file in your app:
   ```python
   # your_custom_app/your_custom_app/www/homepage.py
   import frappe
   
   def get_context(context):
       context.no_cache = 1
       return context
   ```

### Option 2: Use as ERPNext Web Page

1. Go to **Website > Web Page** in ERPNext
2. Create a new Web Page with:
   - **Route**: `mechworld-heat-pumps`
   - **Content Type**: HTML
   - Paste the contents of `index.html` into the HTML field
3. Upload images to **File Manager** and update image paths

### Option 3: Standalone Deployment

Deploy the files to any static hosting service:
- Netlify
- Vercel
- AWS S3 + CloudFront
- GitHub Pages

## File Structure

```
www/
├── index.html          # Main HTML file
├── hero_equipment.jpg  # Hero background image
├── feature_*.jpg       # Feature section images
├── app_*.jpg           # Application section images
├── custom_engineer.jpg # Engineering section image
├── roi_control_panel.jpg # ROI section image
├── reliability_inspection.jpg # Reliability section image
├── quote_installation.jpg # Quote section image
├── about_facility.jpg  # About section image
└── why_installation_wide.jpg # Why heat pumps image
```

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Lead Capture Forms**: Quote request and contact forms
- **Industry Applications**: Hotels, Manufacturing, District Heating
- **Technical Information**: Specifications and ROI data
- **Contact Information**: Phone, email, and address

## Customization

### Change Colors
Edit the CSS variables in the `<style>` section:
```css
:root {
    --bg-primary: #0B0F17;    /* Main background */
    --bg-secondary: #111827;   /* Card background */
    --accent: #F36B24;         /* Orange accent */
    --text-primary: #F3F5F9;   /* Main text */
    --text-secondary: #A9B3C2; /* Secondary text */
}
```

### Update Contact Information
Find and replace:
- Phone: `+1 (555) 014-2082`
- Email: `sales@mechworld.example`
- Address: `1280 Industrial Parkway, Building 4, Suite 200, Houston, TX 77032`

### Connect Forms to ERPNext

To save form submissions to ERPNext, modify the form handlers:

```javascript
// Replace the form submit handlers with:
document.getElementById('quoteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    frappe.call({
        method: 'your_custom_app.api.create_lead',
        args: {
            name: this.name.value,
            company: this.company.value,
            email: this.email.value,
            phone: this.phone.value,
            notes: this.notes.value
        },
        callback: function(r) {
            alert('Thank you! We will contact you soon.');
        }
    });
});
```

Create the API method in your app:
```python
# your_custom_app/your_custom_app/api.py
import frappe

@frappe.whitelist(allow_guest=True)
def create_lead(name, company, email, phone, notes):
    lead = frappe.get_doc({
        'doctype': 'Lead',
        'lead_name': name,
        'company_name': company,
        'email_id': email,
        'phone': phone,
        'notes': notes,
        'source': 'Website'
    })
    lead.insert(ignore_permissions=True)
    frappe.db.commit()
    return lead.name
```

## SEO

The page includes basic SEO meta tags:
- Title: "MechWorld Eco Heat Pumps - Industrial Heat Pumps for Large-Scale Water Heating"
- Description: Optimized for industrial heat pump keywords

Add more meta tags as needed:
```html
<meta name="keywords" content="industrial heat pump, commercial water heating, boiler replacement">
<meta property="og:title" content="MechWorld Eco Heat Pumps">
<meta property="og:description" content="...">
```

## Support

For questions about this template, contact your development team.
