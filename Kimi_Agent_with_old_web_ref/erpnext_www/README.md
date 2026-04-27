# MechWorld Eco Pvt. Ltd. - Website for ERPNext

This folder contains a complete website for MechWorld Eco Pvt. Ltd. that can be integrated with ERPNext/Frappe.

## Installation

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
   - **Route**: `mechworld-eco`
   - **Content Type**: HTML
   - Paste the contents of `index.html` into the HTML field
3. Upload images to **File Manager** and update image paths

## File Structure

```
www/
├── index.html              # Main HTML file
├── README.md               # This file
├── hero_system.jpg         # Hero background image
├── commercial_building.jpg # Commercial section image
├── residential_building.jpg# Residential section image
├── product_domestic.jpg    # Domestic heat pump product
├── product_commercial.jpg  # Commercial heat pump product
├── product_pool.jpg        # Pool heat pump product
├── product_wasteheat.jpg   # Waste heat recovery product
├── app_hotel.jpg           # Hotels application
├── app_hospital.jpg        # Hospitals application
├── app_dairy.jpg           # Dairy industry application
├── app_hostel.jpg          # Hostels application
├── app_pool.jpg            # Swimming pool application
├── app_pharma.jpg          # Pharma application
├── app_housing.jpg         # Housing complex application
├── app_textile.jpg         # Textile industry application
└── app_automobile.jpg      # Automobile industry application
```

## Website Sections

1. **Hero Slider** - Auto-rotating banner with heat pump images
2. **Customer Section** - Commercial and Residential cards
3. **Products Section** - Filterable product catalog with 8 products
4. **Applications Section** - 9 industry applications with hover effects
5. **Testimonials Section** - Client testimonials slider
6. **Clients Section** - Showcase of major clients
7. **Footer** - About Us, Important Links, and Contact Information

## Features

- Fully responsive design (mobile, tablet, desktop)
- Smooth scrolling navigation
- Product filtering by category
- Image hover effects
- Auto-rotating hero slider
- Testimonial slider with navigation
- No external dependencies (except Google Fonts)

## Customization

### Change Colors
Edit the CSS variables in the `<style>` section:
```css
:root {
    --primary: #F36B24;      /* Main brand color */
    --primary-dark: #E55A15; /* Darker shade */
    --dark: #1a1a1a;         /* Dark text */
    --light: #ffffff;        /* White */
    --gray: #f5f5f5;         /* Background gray */
    --text-dark: #333333;    /* Body text */
    --text-light: #666666;   /* Secondary text */
}
```

### Update Contact Information
Find and replace in the footer section:
- Phone: `+91 253 2453556`, `+91 9130093942`
- Email: `sales@mechworldeco.com`
- Address: `607/207, Anand C.H.S, Motwani Road, Datta Mandir, Nashik Road, Nashik 422101`

### Connect Forms to ERPNext

To save form submissions to ERPNext Leads, add this API method to your custom app:

```python
# your_custom_app/api.py
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
- Title: "MechWorld Eco Pvt. Ltd. - Heat Pump Water Heating Solutions"
- Description: Optimized for heat pump keywords

## Support

For questions about this template, contact your development team.
